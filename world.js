"use strict";

const terrain = byId("terrain");
const player = byId("field-player");
const interactButton = byId("interact");
const guideButton = byId("guide");
const room = byId("interior");
const stations = {
  solar: { x: 30, y: 52, label: "stationSolar" },
  greenhouse: { x: 88, y: 40, label: "stationGreenhouse", inside: true },
  habitat: { x: 54, y: 37, label: "stationHabitat", inside: true },
  shelter: { x: 84, y: 85, label: "stationShelter", inside: true },
  storage: { x: 31, y: 84, label: "stationStorage" },
  ridge: { x: 15, y: 22, label: "stationRidge", sample: true },
  basin: { x: 67, y: 59, label: "stationBasin", sample: true }
};
const markers = [...terrain.querySelectorAll("[data-station]")];
const keys = new Set();
const movement = { ArrowLeft: [-1,0], KeyA: [-1,0], ArrowRight: [1,0], KeyD: [1,0],
  ArrowUp: [0,-1], KeyW: [0,-1], ArrowDown: [0,1], KeyS: [0,1] };
const spawn = { x: 47, y: 63 };
let position = { ...spawn };
let destination = null;
let openOnArrival = "";
let currentRoom = "";
let nearby = "";
let radio = "";
let lastMovement = performance.now();

function stationLabel(id) {
  return staticText[stations[id].label][language === "uk" ? 1 : 0];
}

const fieldHint = byId("field-hint");
let drawnReadings = null;

function guideTarget() {
  const phase = phaseKey();
  if (phase === "ready") return canLaunch() ? "" : "greenhouse";
  if (!fieldHint.open || state.mission === "extended") return "";
  if (phase === "prepare") return state.sensor === "storage" ? "storage" : "solar";
  if (phase === "dust") return state.pack === "carried" ? "solar" : "greenhouse";
  if (phase === "warning" || phase === "shelter") return "shelter";
  if (phase === "recover") return hasHarvest() && state.samples.length ? "habitat" : "greenhouse";
  return "";
}

function updateWorld() {
  const key = radioKey();
  const phase = phaseKey();
  if (key !== radio) {
    radio = key;
    byId("mission-name").textContent = copy.missions[state.mission].name;
    const [title, body] = copy.brief[key];
    byId("radio-title").textContent = title;
    byId("radio-message").textContent = key === "ready" ? copy.missions[state.mission].intro : body;
    byId("field-hint-text").textContent = (state.mission === "extended" ? copy.hardHints : copy.hints)[phase] || "";
  }
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
  for (const marker of markers) marker.dataset.target = String(marker.dataset.station === target);
  guideButton.hidden = started && !finished && !target;
  guideButton.textContent = finished ? copy.outcome : !started && canLaunch() ? copy.start(formatTime(state.scenario.duration)) : target ? `${copy.guide} · ${stationLabel(target)}` : "";
  const rect = terrain.getBoundingClientRect();
  let best = 46;
  nearby = "";
  for (const [id, point] of Object.entries(stations)) {
    const distance = Math.hypot((position.x - point.x) * rect.width / 100, (position.y - point.y) * rect.height / 100);
    if (distance <= best) {
      best = distance;
      nearby = id;
    }
  }
  const actionLabel = nearby && stations[nearby].inside ? copy.enter : copy.inspect;
  interactButton.textContent = nearby ? `${actionLabel} · ${stationLabel(nearby)}` : copy.standby;
  interactButton.disabled = !nearby || Boolean(destination);
  if (room.open && currentRoom) refreshRoom();
}

function walk(point, station = "") {
  keys.clear();
  destination = point;
  openOnArrival = station;
  terrain.focus({ preventScroll: true });
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
    position = { x: destination.x, y: destination.y };
    destination = null;
    if (openOnArrival) enter(openOnArrival);
    openOnArrival = "";
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
    state.trays.forEach((tray, index) => {
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
        addControl(copy.lights[light], () => { tray.light = light; }, light, controls);
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
    if (index === 0) ctx.moveTo(x(point.time), y(point[key]));
    else ctx.lineTo(x(point.time), y(point[key]));
  }
  ctx.stroke();
  const last = state.readings.at(-1);
  ctx.beginPath();
  ctx.arc(x(last.time), y(last[key]), 3, 0, Math.PI * 2);
  ctx.fill();
}

function refreshTelemetry() {
  const last = state.readings.at(-1);
  byId("sensor-charts").hidden = !last;
  byId("chart-time").hidden = !last;
  byId("chart-time").textContent = copy.chartTime(formatTime(state.scenario.duration));
  byId("sensor-status").textContent = last ? copy.sensorReading(formatTime(last.time), Math.round(last.opacity), decimal(last.solar), state.readings.length)
    : state.sensor === "carried" ? copy.sensorPicked : copy.sensorAtStorage;
  if (last && last !== drawnReadings) {
    drawChart(byId("dust-chart"), "opacity", 100, "#f39d76");
    drawChart(byId("solar-chart"), "solar", 10, "#ffd18a");
    drawnReadings = last;
  }
}

function refreshTrays() {
  for (const [index, panel] of [...byId("room-trays").children].entries()) {
    const tray = state.trays[index];
    const done = tray.harvestedAt !== null;
    panel.dataset.light = done ? "harvest" : tray.light;
    panel.querySelector("progress").value = tray.growth;
    panel.querySelector("p").textContent = done ? copy.trayReady(formatTime(tray.harvestedAt), decimal(tray.energy)) :
      copy.trayLive(Math.floor(tray.growth), decimal(tray.energy));
    for (const button of panel.querySelectorAll("button")) {
      const light = button.dataset.control;
      const goal = forecast(state, 1, index, light);
      const eta = goal.harvestSeconds[index];
      button.disabled = done;
      button.setAttribute("aria-pressed", String(!done && tray.light === light));
      button.querySelector("small").textContent = done ? "" :
        `${Number.isFinite(eta) ? copy.cropETA(formatTime(eta)) : copy.noHarvest} · ${Number.isFinite(goal.batterySeconds) ? copy.batteryETA(formatTime(goal.batterySeconds)) : copy.charge}`;
    }
  }
  byId("room-feedback").textContent = copy.projected;
}

function refreshRoom() {
  const energy = forecast(state);
  const alert = eventCountdown();
  byId("room-alert").hidden = !alert;
  byId("room-alert").textContent = alert;
  if (!byId("room-power").hidden) {
    byId("room-power").textContent = copy.power(decimal(energy.generation), decimal(energy.load), decimal(state.reserve));
  }
  for (const button of byId("room-controls").querySelectorAll("button")) {
    const key = button.dataset.control;
    const line = button.querySelector("small");
    if (["air", "water", "shelter"].includes(key)) {
      const active = state[key === "shelter" ? key : key + "On"];
      line.textContent = active && !state.powered ? copy.noPower : copy.systemState(active);
      button.setAttribute("aria-pressed", String(active));
    } else if (key === "lab") {
      button.disabled = Boolean(state.lab) || state.samples.length === state.analyzed.length;
      line.textContent = state.lab ? `${copy.feedback.queued} · ${formatTime(state.lab.remaining)}`
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
  marker.addEventListener("click", () => walk(stations[id], id));
}
terrain.addEventListener("click", (event) => {
  if (event.target.closest("button, .crew, .map-readout")) return;
  const rect = terrain.getBoundingClientRect();
  walk({ x: (event.clientX - rect.left) * 100 / rect.width, y: (event.clientY - rect.top) * 100 / rect.height });
});
terrain.addEventListener("keydown", (event) => {
  if (event.target !== terrain) return;
  if (event.code === "KeyE" && nearby && !destination) enter(nearby);
  if (!movement[event.code]) return;
  event.preventDefault();
  destination = null;
  openOnArrival = "";
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
    if (target) walk(stations[target], target);
  }
});
room.addEventListener("close", () => {
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
  openOnArrival = "";
  keys.clear();
  position = { ...spawn };
  positionPlayer();
  updateWorld();
});
positionPlayer();
updateWorld();
requestAnimationFrame(animate);
