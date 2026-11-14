"use strict";

(() => {
  const map = byId("terrain");
  const actor = byId("field-player");
  const model = byId("avatar-field");
  const marker = byId("walk-marker");
  const ground = byId("surface-ground");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const cell = byId("field-cell");
  const route = byId("field-route");
  const action = byId("field-action");
  const status = byId("field-status");
  const control = byId("module-control");
  const note = byId("field-note");
  const stations = {
    solar: { x: 20, y: 46, source: "https://science.nasa.gov/resource/on-mars-light-is-energy/" },
    greenhouse: { x: 72, y: 35, source: "https://www.nasa.gov/wp-content/uploads/2023/03/veggie-fact-sheet-508.pdf" },
    habitat: { x: 47, y: 29, source: "https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/" },
    shelter: { x: 78, y: 76, source: "https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/" },
    storage: { x: 27, y: 79 }
  };
  const labels = {
    solar: "stationSolar", greenhouse: "stationGreenhouse", habitat: "stationHabitat",
    shelter: "stationShelter", storage: "stationStorage"
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
    for (const station of map.querySelectorAll("[data-station]")) {
      station.dataset.near = String(station.dataset.station === near);
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
    control.hidden = done || Boolean(destination) || !strings.remote[near] ||
      (near === "shelter" && phases[turn].status !== "STORM");
    if (!control.hidden) control.textContent = strings.remote[near];
    const phase = phases[turn];
    map.dataset.weather = phase.status;
    byId("surface-signal").textContent = copy.statuses[phase.status];
    byId("surface-sol").textContent = copy.sol(phase.sol);
    action.textContent = !done && near === "storage" && state.pack === "storage" ? strings.pick
      : !done && near === "solar" && state.pack === "carried" ? strings.install
      : strings.interact;
  }

  function paintGround() {
    const { clientWidth: width, clientHeight: height } = map;
    const ratio = Math.min(devicePixelRatio || 1, 2);
    ground.width = Math.round(width * ratio);
    ground.height = Math.round(height * ratio);
    const ctx = ground.getContext("2d");
    if (!ctx || !width || !height) return;
    ctx.scale(ratio, ratio);
    let seed = 5111;
    const random = () => {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      return seed / 4294967296;
    };
    const wash = ctx.createLinearGradient(0,0,width,height);
    wash.addColorStop(0,"#936447");
    wash.addColorStop(.52,"#a06b48");
    wash.addColorStop(1,"#624033");
    ctx.fillStyle = wash;
    ctx.fillRect(0,0,width,height);
    for (let n = 0; n < 1850; n++) {
      const x = random() * width, y = random() * height;
      ctx.fillStyle = n % 3 ? "#4b291d23" : "#edbd862c";
      ctx.fillRect(x, y, 1 + random() * 5, 1 + random() * 2);
    }
    const path = (positions, color, lineWidth) => {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      positions.forEach(([x,y], n) => {
        if (n) ctx.lineTo(x * width / 100, y * height / 100);
        else ctx.moveTo(x * width / 100,y * height / 100);
      });
      ctx.stroke();
    };
    const road = [[2,66],[20,57],[47,64],[66,54],[96,51]];
    path(road,"#60463777",29);
    path(road,"#c7965b65",21);
    for (const station of Object.values(stations)) {
      const cable = [[47,64],[station.x,64],[station.x,station.y]];
      path(cable,"#543f2f9e",7);
      path(cable,"#b9a2779e",2);
    }
    for (let n = 0; n < 76; n++) {
      const x = random() * width, y = random() * height;
      const size = 2 + random() * (n < 19 ? 17 : 5);
      if (n < 19 && x > .19 * width && x < .81 * width && y > .22 * height && y < .8 * height) continue;
      ctx.fillStyle = "#432d2580";
      ctx.beginPath();
      ctx.ellipse(x+size*.35,y+size*.4,size,size*.48,-.2,0,2*Math.PI);
      ctx.fill();
      ctx.fillStyle = n % 3 === 0 ? "#b78f6d" : "#89614c";
      ctx.beginPath();
      ctx.moveTo(x-size*.85,y+size*.2);
      ctx.lineTo(x-size*.4,y-size*.48);
      ctx.lineTo(x+size*.25,y-size*.52);
      ctx.lineTo(x+size*.73,y-size*.07);
      ctx.lineTo(x+size*.31,y+size*.34);
      ctx.closePath();
      ctx.fill();
    }
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
    paragraph.textContent = selectedNote === "installed" ? copy.field.installed : copy.field.notes[station];
    note.append(heading, paragraph);
    if (stations[station].source) {
      const link = document.createElement("a");
      link.href = stations[station].source;
      link.textContent = copy.field.links[station];
      link.target = "_blank";
      link.rel = "noopener";
      note.append(link);
    }
  }

  function interact() {
    if (!near || destination) return;
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
  control.addEventListener("click", () => {
    if (control.hidden || destination) return;
    const plan = readPlan();
    let setting;
    if (near === "greenhouse") {
      plan.grow = (plan.grow + 2) % 6;
      setting = copy.levels[plan.grow];
    } else if (near === "habitat") {
      plan.air = !plan.air;
      setting = plan.air ? copy.on : copy.off;
    } else {
      plan.shelter = true;
      setting = copy.on;
    }
    setPlan(plan);
    updatePlan();
    status.textContent = `${copy.field.settings} · ${stationName(near)} · ${setting}`;
    lastStatus = status.textContent;
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
  new ResizeObserver(() => {
    paintGround();
    updateMap();
  }).observe(map);
  updateMap();
})();
