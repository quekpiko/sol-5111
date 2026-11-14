"use strict";

(() => {
  const map = byId("terrain");
  const actor = byId("field-player");
  const model = byId("avatar-field");
  const marker = byId("walk-marker");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const cell = byId("field-cell");
  const route = byId("field-route");
  const action = byId("field-action");
  const status = byId("field-status");
  const guideAction = byId("guide-action");
  const room = byId("interior");
  const roomControls = byId("room-controls");
  const rooms = ["greenhouse", "habitat", "shelter"];
  const markers = [...map.querySelectorAll("[data-station]")];
  const note = byId("field-note");
  const stations = {
    solar: { x: 30, y: 52, source: "https://science.nasa.gov/resource/on-mars-light-is-energy/" },
    greenhouse: { x: 88, y: 40, source: "https://ntrs.nasa.gov/citations/20160004060" },
    habitat: { x: 54, y: 37, source: "https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/" },
    shelter: { x: 84, y: 85, source: "https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/" },
    storage: { x: 31, y: 84 },
    ridge: { x: 15, y: 22, sample: true, source: "https://ntrs.nasa.gov/citations/20220011452" },
    basin: { x: 67, y: 59, sample: true, source: "https://science.nasa.gov/mission/mars-2020-perseverance/mars-rock-samples/" }
  };
  const labels = {
    solar: "stationSolar", greenhouse: "stationGreenhouse", habitat: "stationHabitat",
    shelter: "stationShelter", storage: "stationStorage", ridge: "stationRidge", basin: "stationBasin"
  };
  const position = { x: 47, y: 64 };
  const moves = {
    ArrowLeft: [-1,0], KeyA: [-1,0], ArrowRight: [1,0], KeyD: [1,0],
    ArrowUp: [0,-1], KeyW: [0,-1], ArrowDown: [0,1], KeyS: [0,1]
  };
  const heldKeys = new Set();
  let destination = null;
  let moving = false;
  let frame = 0;
  let lastTime = 0;
  let near = "";
  let selectedNote = "";
  let lastStatus = "";
  let activeRoom = "";
  let currentHint = "";

  function nextStep() {
    const plan = readPlan();
    const phase = phases[turn];
    const estimate = simulate(state, phase, plan);
    if (done) return ["complete"];
    if (phase.status === "STORM" && !plan.shelter) return ["shelter", "shelter"];
    if (!estimate.valid) return ["budget"];
    if (state.food <= 4 && !plan.grow && !plan.shelter) return ["grow", "greenhouse"];
    if (estimate.failure) return ["danger"];
    if (phase.status === "STORM") return ["safe"];
    if (turn === 0) return plan.grow ? ["prepare"] : ["first", "greenhouse"];
    if (!state.samples.includes("ridge")) return ["ridge", "ridge"];
    if (!state.samples.includes("basin")) return ["basin", "basin"];
    if (pendingSample() && !plan.analysis && estimate.available - estimate.draw >= 3) return ["lab", "habitat"];
    if (state.pack === "storage") return ["storage", "storage"];
    if (state.pack === "carried") return ["solar", "solar"];
    return ["proceed"];
  }

  function renderGuide() {
    const [step, target] = nextStep();
    const key = [language, step, Boolean(destination), near === target].join("/");
    if (key === currentHint) return;
    currentHint = key;
    for (const marker of markers) marker.dataset.target = String(marker.dataset.station === target);
    const [title, detail] = copy.guide[step];
    byId("guide-title").textContent = title;
    byId("guide-detail").textContent = detail;
    guideAction.disabled = Boolean(destination);
    guideAction.textContent = destination ? copy.transit : target
      ? (near === target ? action.textContent : copy.go)
      : done ? copy.viewDebrief : copy.reviewPlan;
  }

  function openRoomStation(station) {
    activeRoom = station;
    byId("room-view").dataset.room = station;
    byId("interior-title").textContent = stationName(station);
    byId("room-brief").textContent = copy.roomDescriptions[station];
    byId("room-feedback").textContent = "";
    roomControls.replaceChildren();

    function choice(label, field, value, disabled = false) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary";
      button.textContent = label;
      button.disabled = disabled || done;
      button.dataset.field = field;
      button.dataset.value = value;
      button.addEventListener("click", () => {
        const plan = readPlan();
        plan[field] = field === "grow" ? value : !plan[field];
        setPlan(plan);
        updatePlan();
        syncRoomChoices();
        byId("room-feedback").textContent = copy.roomPlanSaved;
      });
      roomControls.append(button);
    }

    if (station === "greenhouse") {
      copy.lightOptions.forEach((label, index) => choice(label, "grow", index * 2));
    } else if (station === "habitat") {
      choice(copy.airControl, "air", true);
      choice(copy.waterControl, "water", true);
      if (pendingSample()) {
        const sample = document.createElement("p");
        sample.textContent = copy.analysisInfo(sampleName(pendingSample()));
        roomControls.append(sample);
        choice(copy.openLab, "analysis", true);
      }
    } else {
      choice(copy.inShelter, "shelter", true, phases[turn].status !== "STORM");
    }
    syncRoomChoices();
    room.showModal();
  }

  function syncRoomChoices() {
    const plan = readPlan();
    for (const button of roomControls.querySelectorAll("button")) {
      button.setAttribute("aria-pressed", String(String(plan[button.dataset.field]) === button.dataset.value));
    }
  }

  function setPosition(element, { x, y }) {
    element.style.left = `${x}%`;
    element.style.top = `${y}%`;
  }

  function stationName(station) {
    return staticText[labels[station]][language === "uk" ? 1 : 0];
  }

  function updateMap() {
    setPosition(actor, position);
    actor.dataset.walking = String(moving);
    marker.hidden = !destination;
    if (destination) setPosition(marker, destination);
    const rect = map.getBoundingClientRect();
    const distanceTo = (point) => Math.hypot(
      (position.x - point.x) * rect.width / 100,
      (position.y - point.y) * rect.height / 100
    );
    near = "";
    let closest = 46;
    for (const [key, point] of Object.entries(stations)) {
      const distance = distanceTo(point);
      if (distance <= closest) {
        near = key;
        closest = distance;
      }
    }
    for (const station of markers) {
      station.dataset.near = String(station.dataset.station === near);
      station.dataset.collected = String(state.samples.includes(station.dataset.station));
    }

    cell.hidden = state.pack === "connected";
    if (!cell.hidden) {
      const cellPosition = state.pack === "storage" ? stations.storage : position;
      setPosition(cell, { x: Math.min(94, cellPosition.x + 5), y: cellPosition.y + 3 });
    }
    const strings = copy.field;
    const text = destination ? strings.walking : state.pack === "carried" ? strings.carrying
      : near ? `${strings.nearby} · ${stationName(near)}` : strings.approaching;
    if (text !== lastStatus) {
      status.textContent = text;
      lastStatus = text;
    }
    action.disabled = !near || Boolean(destination);
    const phase = phases[turn];
    map.dataset.weather = phase.status;
    byId("surface-signal").textContent = copy.statuses[phase.status];
    byId("surface-sol").textContent = copy.sol(phase.sol);
    action.textContent = !done && near === "storage" && state.pack === "storage" ? strings.pick
      : !done && near === "solar" && state.pack === "carried" ? strings.install
      : !done && phases[turn].status !== "STORM" && stations[near]?.sample && !state.samples.includes(near) ? copy.sampling
      : rooms.includes(near) ? copy.enter : strings.interact;
    renderGuide();
  }

  function startFrame() {
    if (frame) return;
    lastTime = 0;
    frame = requestAnimationFrame(step);
  }

  function walk(point) {
    heldKeys.clear();
    if (reducedMotion.matches) {
      destination = null;
      moving = false;
      Object.assign(position, point);
      updateMap();
      return;
    }
    destination = point;
    updateMap();
    startFrame();
  }

  function face(dx, dy) {
    if (!dx && !dy) return;
    model.dataset.look = Math.abs(dx) > Math.abs(dy) * .65 ? "side" : dy < 0 ? "north" : "south";
    model.style.setProperty("--facing", model.dataset.look === "side" && dx < 0 ? "-1" : "1");
  }

  function step(time) {
    frame = 0;
    const rect = map.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const travel = lastTime ? Math.min(40, time - lastTime) * (heldKeys.size ? .31 : .68) : 0;
    lastTime = time;
    if (heldKeys.size) {
      let dx = 0, dy = 0;
      for (const key of heldKeys) {
        const direction = moves[key];
        dx += direction[0];
        dy += direction[1];
      }
      const length = Math.hypot(dx, dy) || 1;
      face(dx, dy);
      position.x = Math.min(94, Math.max(6, position.x + (dx / length) * travel * 100 / rect.width));
      position.y = Math.min(91, Math.max(9, position.y + (dy / length) * travel * 100 / rect.height));
      moving = Boolean(dx || dy);
    } else if (destination) {
      const dx = (destination.x - position.x) * rect.width / 100;
      const dy = (destination.y - position.y) * rect.height / 100;
      const distance = Math.hypot(dx, dy);
      face(dx, dy);
      if (distance <= Math.max(1, travel)) {
        Object.assign(position, destination);
        destination = null;
      } else {
        position.x += (destination.x - position.x) * travel / distance;
        position.y += (destination.y - position.y) * travel / distance;
      }
      moving = Boolean(destination);
    } else {
      moving = false;
    }
    updateMap();
    if (destination || heldKeys.size) frame = requestAnimationFrame(step);
  }

  function showNote() {
    note.hidden = !selectedNote;
    note.replaceChildren();
    if (!selectedNote) return;
    const heading = document.createElement("strong");
    const paragraph = document.createElement("p");
    const station = selectedNote === "installed" ? "solar" : selectedNote;
    heading.textContent = stationName(station);
    paragraph.textContent = selectedNote === "installed" ? copy.field.installed : stations[station].sample
      ? (state.samples.includes(station) ? copy.sampled : done ? copy.sampleClosed : copy.unsafeSampling) : copy.field.notes[station];
    note.append(heading, paragraph);
    if (stations[station].source) {
      const link = document.createElement("a");
      link.href = stations[station].source;
      link.textContent = stations[station].sample ? staticText.paperSampling[language === "uk" ? 1 : 0] : copy.field.links[station];
      link.target = "_blank";
      link.rel = "noopener";
      note.append(link);
    }
  }

  function interact() {
    if (!near || destination) return;
    if (rooms.includes(near)) {
      openRoomStation(near);
      return;
    }
    if (stations[near].sample) collectSample(near);
    if (near === "storage") handlePack("pick");
    const installed = near === "solar" && handlePack("install");
    selectedNote = installed ? "installed" : near;
    showNote();
    updateMap();
  }

  for (const element of map.querySelectorAll("[data-station]")) {
    setPosition(element, stations[element.dataset.station]);
  }

  map.addEventListener("click", (event) => {
    const station = event.target.closest("[data-station]");
    if (station && station.dataset.station === near && !destination) {
      interact();
      return;
    }
    const rect = map.getBoundingClientRect();
    walk(station ? stations[station.dataset.station] : {
      x: Math.min(94, Math.max(6, (event.clientX - rect.left) * 100 / rect.width)),
      y: Math.min(91, Math.max(9, (event.clientY - rect.top) * 100 / rect.height))
    });
  });
  route.addEventListener("change", () => {
    if (route.value) walk(stations[route.value]);
    route.value = "";
  });
  map.addEventListener("keydown", (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target !== map && event.key === "Enter") return;
    if (event.code === "KeyE" || event.key === "Enter") {
      event.preventDefault();
      if (!event.repeat) interact();
      return;
    }
    if (!moves[event.code]) return;
    event.preventDefault();
    destination = null;
    if (!heldKeys.has(event.code)) {
      const [dx, dy] = moves[event.code];
      const rect = map.getBoundingClientRect();
      face(dx,dy);
      position.x = Math.min(94, Math.max(6, position.x + dx * 600 / rect.width));
      position.y = Math.min(91, Math.max(9, position.y + dy * 600 / rect.height));
      moving = true;
      updateMap();
    }
    heldKeys.add(event.code);
    startFrame();
  });
  map.addEventListener("keyup", (event) => {
    if (!heldKeys.delete(event.code)) return;
    event.preventDefault();
  });
  map.addEventListener("blur", () => heldKeys.clear());
  action.addEventListener("click", interact);
  guideAction.addEventListener("click", () => {
    const [step, target] = nextStep();
    if (target && near === target) {
      interact();
    } else if (target) {
      walk(stations[target]);
    } else if (step === "complete") {
      byId("result-title").focus();
    } else {
      byId("manual-plan").open = step === "budget" || step === "danger";
      byId("control-heading").focus();
    }
  });
  room.addEventListener("close", () => {
    activeRoom = "";
    roomControls.replaceChildren();
  });
  window.addEventListener("mission-plan", () => {
    if (activeRoom) syncRoomChoices();
    updateMap();
  });
  byId("language").addEventListener("change", () => {
    updateMap();
    showNote();
  });
  window.addEventListener("mission-state", () => {
    if (selectedNote === "installed" && state.pack !== "connected") {
      selectedNote = "";
      showNote();
    }
    updateMap();
  });
  new ResizeObserver(updateMap).observe(map);
  updateMap();
})();
