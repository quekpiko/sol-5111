"use strict";

const terrain = byId("terrain");
const player = byId("field-player");
const interactButton = byId("interact");
const guideButton = byId("guide");
const room = byId("interior");
const stations = {
  solar: { x: 30, y: 52, label: "stationSolar", area: "2% 24%, 18% 15%, 30% 20%, 33% 38%, 23% 49%, 4% 47%" },
  greenhouse: { x: 88, y: 40, label: "stationGreenhouse", inside: true, area: "64% 20%, 69% 8%, 81% 5%, 91% 11%, 94% 28%, 92% 38%, 69% 30%" },
  habitat: { x: 54, y: 37, label: "stationHabitat", inside: true, area: "28% 14%, 37% 4%, 55% 3%, 64% 19%, 57% 33%, 45% 34%, 31% 27%" },
  shelter: { x: 84, y: 85, label: "stationShelter", inside: true, area: "64% 76%, 68% 63%, 81% 60%, 91% 68%, 93% 78%, 85% 86%, 73% 88%" },
  storage: { x: 31, y: 84, label: "stationStorage", area: "7% 73%, 13% 63%, 26% 58%, 32% 66%, 29% 82%, 18% 89%, 8% 86%" },
  ridge: { x: 15, y: 22, label: "stationRidge", sample: true },
  basin: { x: 67, y: 59, label: "stationBasin", sample: true }
};
const markers = [...terrain.querySelectorAll("[data-station]")];
const sites = new Map();
const keys = new Set();
const movement = { ArrowLeft: [-1,0], KeyA: [-1,0], ArrowRight: [1,0], KeyD: [1,0],
  ArrowUp: [0,-1], KeyW: [0,-1], ArrowDown: [0,1], KeyS: [0,1] };
const spawn = { x: 47, y: 63 };
let position = { ...spawn };
let destination = null;
let currentRoom = "";
let nearby = "";
let radio = "";
let lastMovement = performance.now();

function stationLabel(id) {
  return staticText[stations[id].label][language === "uk" ? 1 : 0];
}

const fieldHint = byId("field-hint");
let drawnReadings = null;
const prepItems = ["greenhouse", "battery", "sensor"].map((id) => {
  const item = document.createElement("li");
  const button = document.createElement("button");
  button.type = "button";
  button.className = "setup-step";
  const title = document.createElement("strong");
  const description = document.createElement("span");
  button.append(title, description);
  item.append(button);
  byId("setup-list").append(item);
  button.addEventListener("click", () => {
    const target = id === "greenhouse" ? id : state[id === "battery" ? "pack" : id] === "storage" ? "storage" : "solar";
    walkTo(target);
  });
  return { id, button, title, description };
});

function updateSetup() {
  byId("setup").hidden = started;
  if (started) return;
  for (const { id, button, title, description } of prepItems) {
    const stage = id === "greenhouse" ? canLaunch() ? "ready" : "required" : state[id === "battery" ? "pack" : id];
    title.textContent = copy.setupSteps[id].title;
    description.textContent = copy.setupSteps[id][stage];
    button.dataset.done = String(["ready", "connected", "installed"].includes(stage));
  }
}

function guideTarget() {
  const phase = phaseKey();
  if (phase === "ready") return canLaunch() ? "" : "greenhouse";
  if (phase === "warning" && !state.shelter) return "shelter";
  if (phase === "dust" && state.mission === "training") return state.pack === "carried" ? "solar" : "greenhouse";
  if (!fieldHint.open || state.mission === "extended") return "";
  if (phase === "prepare") return state.sensor === "storage" ? "storage" : "solar";
  if (phase === "warning" || phase === "shelter") return "shelter";
  if (phase === "recover") return hasHarvest() && state.samples.length ? "habitat" : "greenhouse";
  return "";
}

function updateWorld() {
  const key = radioKey();
  const phase = phaseKey();
  byId("mission-radio").dataset.event = phase;
  if (key !== radio) {
    radio = key;
    byId("mission-name").textContent = copy.missions[state.mission].name;
    const [title, body] = copy.brief[key];
    byId("radio-title").textContent = title;
    byId("radio-message").textContent = key === "ready" ? copy.missions[state.mission].intro : body;
    byId("field-hint-text").textContent = (state.mission === "extended" ? copy.hardHints : copy.hints)[phase] || "";
  }
  updateSetup();
  fieldHint.hidden = finished;
  byId("missions").hidden = started && !finished;
  byId("missions").textContent = copy.missionMenu;
  terrain.dataset.lighting = state.powered ? state.trays.reduce((level, tray) =>
    tray.harvestedAt !== null ? level : Math.max(level, ["off", "dim", "full"].indexOf(tray.light)), 0) : 0;
  terrain.dataset.ventilation = String(state.shelter && state.powered && state.airOn);
  terrain.dataset.weakSolar = String(forecast(state).solar < 5);
  terrain.dataset.sensor = state.sensor;
  byId("cargo").textContent = [
    state.sensor === "carried" ? copy.sensorItem : "",
    state.pack === "carried" ? copy.batteryItem : ""
  ].filter(Boolean).join(" · ");
  byId("cargo").hidden = !byId("cargo").textContent;
  const target = guideTarget();
  for (const marker of markers) {
    const id = marker.dataset.station;
    marker.dataset.target = String(id === target);
    sites.get(id).dataset.moving = String(id === destination?.station);
  }
  const route = destination?.station ? copy.walking(byId("field-name").textContent, stationLabel(destination.station)) : "";
  const routeLabel = byId("map-route");
  routeLabel.hidden = !route;
  if (routeLabel.textContent !== route) routeLabel.textContent = route;
  guideButton.hidden = started && !finished && !target;
  guideButton.textContent = finished ? copy.outcome : !started ?
    canLaunch() ? copy.start(formatTime(state.scenario.duration)) : copy.openGreenhouse :
    target ? `${copy.guide} · ${stationLabel(target)}` : "";
  const rect = terrain.getBoundingClientRect();
  let best = 46;
  let nameOverlaps = false;
  nearby = "";
  for (const [id, point] of Object.entries(stations)) {
    const distance = Math.hypot((position.x - point.x) * rect.width / 100, (position.y - point.y) * rect.height / 100);
    if (distance < 55) nameOverlaps = true;
    if (distance <= best) {
      best = distance;
      nearby = id;
    }
  }
  player.dataset.nearStation = String(nameOverlaps);
  const actionLabel = nearby && stations[nearby].inside ? copy.enter : copy.inspect;
  interactButton.textContent = nearby ? `${actionLabel} · ${stationLabel(nearby)}` : copy.standby;
  interactButton.disabled = !nearby || Boolean(destination);
  if (room.open && currentRoom) refreshRoom();
}

function walk(point, station = "") {
  keys.clear();
  destination = { x: point.x, y: point.y, station };
  terrain.focus({ preventScroll: true });
  updateWorld();
}

function walkTo(station) {
  walk(stations[station], station);
}

function positionPlayer() {
  player.style.left = `${position.x}%`;
  player.style.top = `${position.y}%`;
}

function animate(now) {
  const elapsed = Math.min((now - lastMovement) / 1000, .05);
  lastMovement = now;
  const rect = terrain.getBoundingClientRect();
  let dx = 0;
  let dy = 0;
  if (destination) {
    dx = (destination.x - position.x) * rect.width / 100;
    dy = (destination.y - position.y) * rect.height / 100;
  } else {
    for (const key of keys) {
      dx += movement[key][0];
      dy += movement[key][1];
    }
  }
  const distance = Math.hypot(dx, dy);
  const step = elapsed * (destination ? 630 : 290);
  if (destination && distance <= step) {
    const { x, y, station } = destination;
    position = { x, y };
    destination = null;
    if (station) enter(station);
    updateWorld();
  } else if (distance && rect.width && rect.height) {
    position.x = Math.max(3, Math.min(97, position.x + dx / distance * step * 100 / rect.width));
    position.y = Math.max(3, Math.min(97, position.y + dy / distance * step * 100 / rect.height));
    if (dx) player.style.setProperty("--facing", dx < 0 ? "-1" : "1");
  }
  player.dataset.walking = String(Boolean(distance));
  positionPlayer();
  requestAnimationFrame(animate);
}

function addControl(label, execute, key, parent = byId("room-controls")) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary";
  button.dataset.control = key;
  const heading = document.createElement("strong");
  heading.textContent = label;
  const description = document.createElement("small");
  button.append(heading, description);
  button.addEventListener("click", () => {
    if (finished || button.disabled) return;
    execute();
    refreshRoom();
    updateWorld();
  });
  parent.append(button);
  return button;
}

function buildRoom() {
  const id = currentRoom;
  byId("room-title").textContent = stationLabel(id);
  byId("room-view").dataset.room = stations[id].inside ? id : "";
  byId("room-view").hidden = !stations[id].inside;
  byId("room-detail").textContent = copy.room[id];
  byId("room-hint-text").textContent = copy.roomHint[id];
  byId("room-power").hidden = id !== "greenhouse" && id !== "solar";
  byId("room-feedback").textContent = "";
  byId("room-controls").replaceChildren();
  byId("room-trays").hidden = id !== "greenhouse";
  byId("room-trays").replaceChildren();
  byId("telemetry").hidden = id !== "solar";
  drawnReadings = null;

  if (id === "greenhouse") {
    state.trays.forEach((_, index) => {
      const panel = document.createElement("section");
      panel.className = "tray";
      const title = document.createElement("h3");
      title.textContent = copy.tray(index + 1);
      const meter = document.createElement("progress");
      meter.max = 100;
      meter.setAttribute("aria-label", title.textContent);
      const stats = document.createElement("p");
      const controls = document.createElement("div");
      controls.className = "tray-controls";
      for (const light of Object.keys(copy.lights)) {
        const button = addControl(copy.lights[light], () => Mission.setTrayLight(state, index, light), light, controls);
        const harvest = button.querySelector("small");
        harvest.className = "tray-harvest";
        const battery = document.createElement("small");
        battery.className = "tray-battery";
        const change = document.createElement("small");
        change.className = "tray-change";
        const selected = document.createElement("span");
        selected.className = "tray-selected";
        selected.textContent = copy.selected;
        button.querySelector("strong").append(selected);
        button.append(battery, change);
      }
      panel.append(title, meter, stats, controls);
      byId("room-trays").append(panel);
    });
  } else if (id === "habitat") {
    addControl(copy.air, () => { state.airOn = !state.airOn; }, "air");
    addControl(copy.water, () => { state.waterOn = !state.waterOn; }, "water");
    addControl(copy.lab, () => {
      const sample = state.samples.find((item) => !state.analyzed.includes(item));
      if (sample && !state.lab) state.lab = { sample, remaining: 16 };
    }, "lab");
  } else if (id === "shelter") {
    addControl(copy.ventilation, () => { state.shelter = !state.shelter; }, "shelter");
  } else if (id === "storage") {
    addControl(copy.pick, () => { state.pack = "carried"; byId("room-feedback").textContent = copy.feedback.pick; }, "pack");
    addControl(copy.pickSensor, () => { state.sensor = "carried"; byId("room-feedback").textContent = copy.sensorPicked; }, "sensor");
  } else if (id === "solar") {
    addControl(copy.connect, () => {
      state.pack = "connected";
      state.reserve = Mission.spareCapacity;
      byId("room-feedback").textContent = copy.feedback.connect;
    }, "connect");
    addControl(copy.installSensor, () => {
      state.sensor = "installed";
      Mission.recordReading(state);
    }, "install");
  } else if (stations[id].sample) {
    addControl(copy.collect, () => { state.samples.push(id); byId("room-feedback").textContent = copy.feedback.collect; }, "sample");
  }
}

function drawChart(canvas, key, limit, color) {
  const ctx = canvas.getContext("2d");
  const { width, height } = canvas;
  const heightInset = 8;
  ctx.lineWidth = 1;
  const x = (time) => 6 + (width - 12) * time / state.scenario.duration;
  const y = (value) => height - heightInset - (height - 2 * heightInset) * value / limit;
  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = "#51432e";
  ctx.beginPath();
  for (const level of [0, .5, 1]) {
    ctx.moveTo(x(0), y(level * limit));
    ctx.lineTo(x(state.scenario.duration), y(level * limit));
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = ctx.fillStyle = color;
  for (const [index, point] of state.readings.entries()) {
    if (index === 0) ctx.moveTo(x(point.time), y(key === "solar" ? Mission.solarPercent(point.solar) : point.opacity));
    else ctx.lineTo(x(point.time), y(key === "solar" ? Mission.solarPercent(point.solar) : point.opacity));
  }
  ctx.stroke();
  const last = state.readings.at(-1);
  ctx.beginPath();
  ctx.arc(x(last.time), y(key === "solar" ? Mission.solarPercent(last.solar) : last.opacity), 3, 0, Math.PI * 2);
  ctx.fill();
}

function refreshTelemetry() {
  const last = state.readings.at(-1);
  byId("sensor-charts").hidden = !last;
  byId("chart-time").hidden = !last;
  byId("chart-time").textContent = copy.chartTime(formatTime(state.scenario.duration));
  byId("sensor-status").textContent = last ? copy.sensorReading(formatTime(last.time), Math.round(last.opacity), Mission.solarPercent(last.solar), state.readings.length)
    : state.sensor === "carried" ? copy.sensorPicked : copy.sensorAtStorage;
  if (last && last !== drawnReadings) {
    drawChart(byId("dust-chart"), "opacity", 100, "#f39d76");
    drawChart(byId("solar-chart"), "solar", 100, "#ffd18a");
    drawnReadings = last;
  }
}

function timeDifference(before, after) {
  return Number.isFinite(before) && Number.isFinite(after) && Math.abs(after - before) >= 1
    ? formatTime(Math.abs(after - before)) : "";
}

function refreshTrays() {
  const current = forecast(state);
  const peak = forecast(state, Mission.peakDustSolar);
  for (const [index, panel] of [...byId("room-trays").children].entries()) {
    const tray = state.trays[index];
    const done = tray.harvestedAt !== null;
    panel.dataset.light = done ? "harvest" : tray.light;
    panel.querySelector("progress").value = tray.growth;
    panel.querySelector("p").textContent = done ? copy.trayReady(formatTime(tray.harvestedAt), decimal(tray.energy)) :
      copy.trayLive(Math.floor(tray.growth), decimal(tray.energy));
    for (const button of panel.querySelectorAll("button")) {
      const light = button.dataset.control;
      const goal = forecast(state, Mission.peakDustSolar, index, light);
      const live = forecast(state, current.solar, index, light);
      const eta = goal.harvestSeconds[index];
      const selected = tray.light === light;
      button.disabled = done;
      button.setAttribute("aria-pressed", String(!done && selected));
      button.querySelector(".tray-selected").hidden = done || !selected;
      button.querySelector(".tray-harvest").textContent = done ? "" : Number.isFinite(eta) ? copy.cropETA(formatTime(eta)) :
        light === "off" && !selected ? copy.stopsGrowth : copy.noHarvest;
      button.querySelector(".tray-battery").textContent = done ? "" :
        copy.peakCharge(Number.isFinite(goal.batterySeconds) ? formatTime(goal.batterySeconds) : copy.charge);
      const harvestDelta = timeDifference(peak.harvestSeconds[index], eta);
      const batteryDelta = timeDifference(peak.batterySeconds, goal.batterySeconds);
      const change = [];
      if (harvestDelta) change.push(copy.harvestDelta(harvestDelta, eta < peak.harvestSeconds[index]));
      if (!Number.isFinite(peak.harvestSeconds[index]) && Number.isFinite(eta)) change.push(copy.startsGrowth);
      if (batteryDelta) change.push(copy.chargeDelta(batteryDelta, goal.batterySeconds > peak.batterySeconds));
      if (current.net >= 0 && live.net < 0) change.push(copy.startsDischarge);
      button.querySelector(".tray-change").textContent = done || selected ? "" : change.join(" · ");
    }
  }
  const feedback = byId("room-feedback");
  if (feedback.textContent !== copy.projected) feedback.textContent = copy.projected;
}

function refreshRoom() {
  const energy = forecast(state);
  const phase = phaseKey();
  const alert = copy.roomAlerts[phase];
  const banner = byId("room-alert");
  banner.hidden = !alert;
  banner.dataset.event = phase === "dust" ? "dust" : "particles";
  byId("room-alert-title").textContent = alert || "";
  byId("room-alert-time").textContent = eventCountdown();
  const powerChoice = byId("room-power-choice");
  powerChoice.hidden = !alert || !["greenhouse", "shelter"].includes(currentRoom);
  if (!powerChoice.hidden) {
    const sheltered = { ...state, shelter: true };
    const peak = forecast(sheltered, Mission.peakDustSolar);
    const withoutSpare = forecast({ ...sheltered, reserve: 0 }, Mission.peakDustSolar);
    powerChoice.textContent = copy.sharedGrid(formatTime(peak.batterySeconds), timeDifference(withoutSpare.batterySeconds, peak.batterySeconds));
  }
  if (!byId("room-power").hidden) {
    byId("room-power").textContent = copy.power(decimal(energy.generation), decimal(energy.load), decimal(state.reserve),
      copy.relativeSolar(Mission.solarPercent(energy.solar)));
  }
  for (const button of byId("room-controls").querySelectorAll("button")) {
    const key = button.dataset.control;
    const line = button.querySelector("small");
    if (["air", "water", "shelter"].includes(key)) {
      const active = state[key === "shelter" ? key : key + "On"];
      line.textContent = active && !state.powered ? copy.noPower : copy.systemState(active);
      if (key === "shelter") {
        const outside = forecast({ ...state, shelter: false });
        const inside = forecast({ ...state, shelter: true });
        line.textContent = copy.shelterTradeoff(decimal(exposureRate({ shelter: false }), 2),
          decimal(exposureRate({ shelter: true }), 2), decimal(inside.load - outside.load, 2));
      }
      button.setAttribute("aria-pressed", String(active));
    } else if (key === "lab") {
      button.disabled = Boolean(state.lab) || state.samples.length === state.analyzed.length;
      line.textContent = state.lab ? !started ? copy.labBeforeStart :
        `${paused ? copy.labPaused : state.powered ? copy.feedback.queued : copy.noPower} · ${formatTime(state.lab.remaining)}`
        : state.analyzed.length ? copy.feedback.sampleDone : "";
    } else if (key === "pack") {
      button.disabled = state.pack !== "storage";
      line.textContent = button.disabled ? copy.cargoTaken : "";
    } else if (key === "connect") {
      button.disabled = state.pack !== "carried";
      line.textContent = state.pack === "connected" ? copy.connected : button.disabled ? copy.batteryAtStorage : "";
    } else if (key === "sensor") {
      button.disabled = state.sensor !== "storage";
      line.textContent = button.disabled ? copy.cargoTaken : "";
    } else if (key === "install") {
      button.disabled = state.sensor !== "carried";
      line.textContent = state.sensor === "installed" ? copy.sensorOnline : button.disabled ? copy.sensorAtStorage : "";
    } else if (key === "sample") {
      button.disabled = state.samples.includes(currentRoom) || phaseKey() === "shelter";
    }
  }
  if (currentRoom === "greenhouse") {
    byId("room-view").dataset.light = ["off", "dim", "full"][Number(terrain.dataset.lighting)];
    refreshTrays();
  } else if (currentRoom === "solar") {
    refreshTelemetry();
  } else if (currentRoom === "shelter") {
    byId("room-feedback").textContent = copy.shelterStatus(decimal(exposureRate(state), 2), state.shelter && state.powered && state.airOn);
  }
}

function enter(station) {
  if (finished || room.open || document.querySelector("dialog[open]")) return;
  keys.clear();
  currentRoom = station;
  byId("room-hint").open = false;
  buildRoom();
  refreshRoom();
  room.showModal();
}

for (const marker of markers) {
  const id = marker.dataset.station;
  marker.style.left = `${stations[id].x}%`;
  marker.style.top = `${stations[id].y}%`;
  const site = document.createElement("div");
  site.className = "station-site";
  sites.set(id, site);
  marker.replaceWith(site);
  site.append(marker);
  if (stations[id].area) {
    const footprint = document.createElement("div");
    footprint.className = "station-footprint";
    footprint.dataset.building = id;
    footprint.setAttribute("aria-hidden", "true");
    footprint.style.clipPath = `polygon(${stations[id].area})`;
    site.prepend(footprint);
  }
  site.addEventListener("click", () => walkTo(id));
}
terrain.addEventListener("click", (event) => {
  if (event.target.closest("button, .crew, .map-readout, .station-site")) return;
  const rect = terrain.getBoundingClientRect();
  walk({ x: (event.clientX - rect.left) * 100 / rect.width, y: (event.clientY - rect.top) * 100 / rect.height });
});
terrain.addEventListener("keydown", (event) => {
  if (event.target !== terrain) return;
  if (event.code === "KeyE" && nearby && !destination) enter(nearby);
  if (!movement[event.code]) return;
  event.preventDefault();
  destination = null;
  keys.add(event.code);
  if (!event.repeat) {
    const [dx, dy] = movement[event.code];
    position.x = Math.max(3, Math.min(97, position.x + dx * .6));
    position.y = Math.max(3, Math.min(97, position.y + dy * .6));
  }
});
window.addEventListener("keyup", (event) => keys.delete(event.code));
terrain.addEventListener("blur", () => keys.clear());
interactButton.addEventListener("click", () => { if (nearby && !destination) enter(nearby); });
guideButton.addEventListener("click", () => {
  if (finished) {
    renderDebrief();
    byId("debrief").showModal();
  } else if (!started && canLaunch()) {
    startMission();
  } else {
    const target = guideTarget();
    if (target) walkTo(target);
  }
});
room.addEventListener("close", () => {
  if (room.open) return;
  currentRoom = "";
  if (!finished && !document.querySelector("dialog[open]")) terrain.focus({ preventScroll: true });
});
fieldHint.addEventListener("toggle", updateWorld);
window.addEventListener("mission-change", updateWorld);
window.addEventListener("mission-language", () => {
  radio = "";
  updateWorld();
});
window.addEventListener("mission-reset", () => {
  radio = "";
  destination = null;
  keys.clear();
  position = { ...spawn };
  positionPlayer();
  updateWorld();
});
positionPlayer();
updateWorld();
requestAnimationFrame(animate);
