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

function guideTarget() {
  const phase = phaseKey();
  if (phase === "ready") return "greenhouse";
  if (phase === "prepare") return state.lights === "off" ? "greenhouse" : state.pack === "storage" ? "storage" : state.pack === "carried" ? "solar" : "greenhouse";
  if (phase === "dust") return state.pack === "carried" ? "solar" : state.lights === "off" && state.pack === "storage" ? "storage" : "greenhouse";
  if (phase === "warning" || phase === "shelter") return "shelter";
  if (phase === "recover") return state.harvests && state.samples.length ? "habitat" : "greenhouse";
  return "";
}

function updateWorld() {
  const key = radioKey();
  if (key !== radio) {
    radio = key;
    byId("radio-title").textContent = copy.brief[key][0];
    byId("radio-message").textContent = copy.brief[key][1];
  }
  const target = guideTarget();
  for (const marker of markers) marker.dataset.target = String(marker.dataset.station === target);
  guideButton.textContent = finished ? copy.outcome : started ? `${copy.guide} · ${stationLabel(target)}` : copy.start;
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

function addControl(label, execute, key, detail = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "secondary";
  button.dataset.control = key;
  const heading = document.createElement("strong");
  heading.textContent = label;
  const description = document.createElement("small");
  description.textContent = detail;
  button.append(heading, description);
  button.addEventListener("click", () => {
    if (finished || button.disabled) return;
    execute();
    refreshRoom();
    updateWorld();
  });
  byId("room-controls").append(button);
}

function buildRoom() {
  const id = currentRoom;
  byId("room-title").textContent = stationLabel(id);
  byId("room-view").dataset.room = stations[id].inside ? id : "";
  byId("room-view").hidden = !stations[id].inside;
  byId("room-detail").textContent = copy.room[id];
  byId("room-power").hidden = id !== "greenhouse" && id !== "solar";
  byId("room-feedback").textContent = "";
  byId("room-controls").replaceChildren();

  if (id === "greenhouse") {
    for (const light of Object.keys(copy.lights)) {
      addControl(copy.lights[light], () => { state.lights = light; }, light);
    }
  } else if (id === "habitat") {
    addControl(copy.air, () => { state.airOn = !state.airOn; }, "air");
    addControl(copy.water, () => { state.waterOn = !state.waterOn; }, "water");
    addControl(copy.lab, () => {
      const sample = state.samples.find((item) => !state.analyzed.includes(item));
      if (sample && !state.lab) state.lab = { sample, remaining: 8 };
    }, "lab");
  } else if (id === "shelter") {
    addControl(copy.ventilation, () => { state.shelter = !state.shelter; }, "shelter");
  } else if (id === "storage" && state.pack === "storage") {
    addControl(copy.pick, () => { state.pack = "carried"; byId("room-feedback").textContent = copy.feedback.pick; }, "pack");
  } else if (id === "solar" && state.pack === "carried") {
    addControl(copy.connect, () => { state.pack = "connected"; state.reserve = Mission.spareCapacity; byId("room-feedback").textContent = copy.feedback.connect; }, "connect");
  } else if (stations[id].sample) {
    addControl(copy.collect, () => { state.samples.push(id); byId("room-feedback").textContent = copy.feedback.collect; }, "sample");
  }
}

function refreshRoom() {
  if (!byId("room-power").hidden) {
    const { solar, load } = forecast(state);
    byId("room-power").textContent = copy.power(solar.toFixed(1), load, Math.round(state.reserve));
  }
  for (const button of byId("room-controls").querySelectorAll("button")) {
    const key = button.dataset.control;
    const line = button.querySelector("small");
    if (currentRoom === "greenhouse") {
      const outlook = forecast(state, key, 1);
      const battery = Number.isFinite(outlook.batterySeconds) ? `${copy.lasts} ${Math.ceil(outlook.batterySeconds)} ${copy.second}` : copy.continuous;
      const harvest = Number.isFinite(outlook.harvestSeconds) ? `${copy.harvest} ${Math.ceil(outlook.harvestSeconds)} ${copy.second}` : copy.noHarvest;
      line.textContent = `${battery} · ${harvest}`;
      button.setAttribute("aria-pressed", String(state.lights === key));
    } else if (["air","water","shelter"].includes(key)) {
      const active = state[key === "shelter" ? key : key + "On"];
      line.textContent = active ? copy.feedback.on : copy.feedback.off;
      button.setAttribute("aria-pressed", String(active));
    } else if (key === "lab") {
      button.disabled = Boolean(state.lab) || state.samples.length === state.analyzed.length;
      line.textContent = state.lab ? `${copy.feedback.queued} · ${Math.ceil(state.lab.remaining)} ${copy.second}`
        : state.analyzed.length ? copy.feedback.sampleDone : "";
    } else if (key === "pack") button.disabled = state.pack !== "storage";
    else if (key === "connect") button.disabled = state.pack !== "carried";
    else if (key === "sample") button.disabled = state.samples.includes(currentRoom) || phaseKey() === "shelter";
  }
  if (currentRoom === "greenhouse") {
    byId("room-view").dataset.light = state.lights;
    byId("room-feedback").textContent = copy.projected;
  } else if (currentRoom === "shelter") {
    byId("room-feedback").textContent = state.shelter ? copy.shelterReady : "";
  }
}

function enter(station) {
  if (finished || room.open || document.querySelector("dialog[open]")) return;
  keys.clear();
  currentRoom = station;
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
  } else if (!started) {
    startMission();
    walk(stations.greenhouse, "greenhouse");
  } else {
    const target = guideTarget();
    if (target) walk(stations[target], target);
  }
});
room.addEventListener("close", () => {
  currentRoom = "";
  if (!finished && !document.querySelector("dialog[open]")) terrain.focus({ preventScroll: true });
});
window.addEventListener("mission-change", updateWorld);
window.addEventListener("mission-language", () => {
  radio = "";
  updateWorld();
});
window.addEventListener("mission-reset", () => {
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
