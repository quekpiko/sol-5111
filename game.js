"use strict";

const byId = (id) => document.getElementById(id);
const { newState, forecast, advance, exposureRate, exposureLimit } = Mission;
const resources = ["battery", "air", "water", "food", "crop", "radiation"];
const progressKey = "sol-5111-training-record";
let language = readLanguage();
let copy = languages[language];
let trainingRecord;
try { trainingRecord = JSON.parse(localStorage.getItem(progressKey)); } catch {}
let state = newState();
let started = false;
let paused = false;
let finished = false;
let lastFrame = performance.now();
let nextRefresh = 0;

const meters = Object.fromEntries(resources.map((key) => {
  const element = document.createElement("div");
  element.className = "meter";
  element.dataset.meter = key;
  element.innerHTML = "<div><span></span><strong></strong></div><progress></progress><small></small>";
  byId("hud").append(element);
  return [key, {
    element, label: element.querySelector("span"), value: element.querySelector("strong"),
    gauge: element.querySelector("progress"), note: element.querySelector("small")
  }];
}));

function phaseKey() {
  if (finished) return "complete";
  if (!started) return "ready";
  const { particleStart, particleEnd, warning, dust } = state.scenario;
  if (state.time >= particleEnd) return "recover";
  if (state.time >= particleStart) return "shelter";
  if (state.time >= warning) return "warning";
  if (state.time >= dust) return "dust";
  return "prepare";
}

function hasHarvest() {
  return state.trays.some((tray) => tray.harvestedAt !== null);
}

function canLaunch() {
  return state.trays.some((tray) => tray.light !== "off");
}

function radioKey() {
  if (finished) return state.failure ? "failed" : hasHarvest() ? "complete" : "partial";
  const phase = phaseKey();
  if (phase === "ready" && canLaunch()) return "checked";
  if (phase === "shelter" && state.shelter) return "protected";
  return phase;
}

function formatTime(seconds) {
  const rounded = Math.ceil(Math.max(0, seconds));
  return [Math.floor(rounded / 60), rounded % 60].map((part) => String(part).padStart(2, "0")).join(":");
}

function decimal(value, digits = 1) {
  return value.toLocaleString(language === "uk" ? "uk-UA" : "en", {
    minimumFractionDigits: digits, maximumFractionDigits: digits
  });
}

function eventCountdown() {
  const phase = phaseKey();
  if (phase === "warning") return copy.particleCountdown(formatTime(state.scenario.particleStart - state.time));
  if (phase === "shelter") return copy.particleRemaining(formatTime(state.scenario.particleEnd - state.time));
  return "";
}

function renderHUD() {
  const phase = phaseKey();
  const energy = forecast(state);
  const { foodSeconds, batterySeconds, harvestSeconds } = energy;
  const cropETA = Math.min(...harvestSeconds);
  const allHarvested = state.trays.every((tray) => tray.harvestedAt !== null);
  const nextCrop = Number.isFinite(cropETA) ? state.trays[harvestSeconds.indexOf(cropETA)].growth :
    Math.max(...state.trays.filter((tray) => tray.harvestedAt === null).map((tray) => tray.growth), allHarvested ? 100 : 0);
  const exposure = phase === "shelter" ? exposureRate(state) : 0;
  const event = eventCountdown();
  byId("phase").textContent = copy.phases[phase];
  byId("mission-clock").textContent = started ? formatTime(state.scenario.duration - state.time) : "—:—";
  byId("solar-now").textContent = decimal(energy.generation);
  byId("terrain").dataset.phase = phase;
  byId("event-clock").hidden = !event;
  if (byId("event-clock").textContent !== event) byId("event-clock").textContent = event;
  const status = {
    battery: Number.isFinite(batterySeconds) ? copy.batteryETA(formatTime(batterySeconds)) : copy.charge,
    air: copy.systemState(state.airOn && state.powered),
    water: copy.systemState(state.waterOn && state.powered),
    food: copy.foodETA(formatTime(foodSeconds)),
    crop: Number.isFinite(cropETA) ? copy.cropETA(formatTime(cropETA)) : allHarvested ? copy.harvested : copy.noHarvest,
    radiation: exposure ? copy.exposureNow(decimal(exposure, 2)) : copy.noExposure
  };

  for (const key of resources) {
    const meter = meters[key];
    const amount = key === "crop" ? nextCrop : state[key];
    const value = key === "radiation" ? decimal(amount) : Math.round(amount);
    const capacity = key === "radiation" ? exposureLimit : 100;
    const low = key === "radiation" ? amount >= 12 : key === "food" ? foodSeconds < 60 :
      key === "battery" ? batterySeconds < 45 : key !== "crop" && amount < 24;
    meter.element.dataset.low = String(low);
    meter.label.textContent = copy.instruments[key];
    meter.value.textContent = key === "radiation" ? value : `${value}%`;
    meter.gauge.setAttribute("aria-label", copy.instruments[key]);
    meter.gauge.max = capacity;
    meter.gauge.value = amount;
    meter.note.textContent = status[key];
  }
}

function score() {
  return {
    harvests: state.trays.filter((tray) => tray.harvestedAt !== null).length,
    food: Math.round(state.food),
    energy: Math.round(state.minimumEnergy)
  };
}

function renderDebrief() {
  const key = radioKey();
  const current = score();
  byId("outcome-title").textContent = copy.brief[key][0];
  byId("outcome-text").textContent = state.failure ? copy.failures[state.failure] : copy.brief[key][1];
  const [first, second] = state.trays;
  const faster = first.harvestedAt < second.harvestedAt ? 0 : 1;
  const energyGap = state.trays[faster].energy - state.trays[1 - faster].energy;
  const comparison = first.harvestedAt !== null && second.harvestedAt !== null &&
    Math.abs(first.harvestedAt - second.harvestedAt) >= 1 && energyGap > .1;
  const stats = [
    `${copy.totalTime} · ${formatTime(state.time)}`, copy.runScore(current),
    copy.exposureTotal(decimal(state.radiation)), copy.reserveUsed(decimal(state.reserveUsed)),
    ...state.trays.map((tray, index) => copy.trayResult(index + 1, tray.harvestedAt === null ? copy.unripe : formatTime(tray.harvestedAt),
      decimal(tray.energy), formatTime(tray.pauseSeconds))),
    comparison ? copy.trayComparison(faster + 1, formatTime(Math.abs(first.harvestedAt - second.harvestedAt)), decimal(energyGap)) : "",
    state.readings.length > 1 ? copy.sensorResult(state.readings.length, decimal(Math.min(...state.readings.map((item) => item.solar)), 1)) : "",
    state.mission === "extended" && trainingRecord ? copy.previousScore(copy.runScore(trainingRecord)) : "",
    ...state.analyzed.map((sample) => copy.sampleResult[sample])
  ];
  byId("outcome-stats").replaceChildren(...stats.filter(Boolean).map((label) => {
    const item = document.createElement("li");
    item.textContent = label;
    return item;
  }));
  byId("next-mission").hidden = state.mission !== "training" || !trainingRecord;
  byId("next-mission").textContent = copy.nextMission;
}

function syncPause() {
  const label = paused ? copy.resume : copy.pause;
  for (const id of ["pause", "room-pause"]) {
    byId(id).textContent = label;
    byId(id).disabled = !started || finished;
    byId(id).setAttribute("aria-pressed", String(paused && started && !finished));
  }
  document.body.dataset.paused = String(paused);
}

function togglePause() {
  if (!started || finished) return;
  paused = !paused;
  lastFrame = performance.now();
  syncPause();
  window.dispatchEvent(new Event("mission-change"));
}

function startMission() {
  if (started || !canLaunch()) return;
  started = true;
  paused = false;
  lastFrame = performance.now();
  renderHUD();
  syncPause();
  window.dispatchEvent(new Event("mission-change"));
  byId("terrain").focus({ preventScroll: true });
}

function finishMission() {
  finished = true;
  paused = true;
  if (state.mission === "training" && !state.failure && hasHarvest()) {
    trainingRecord = score();
    try { localStorage.setItem(progressKey, JSON.stringify(trainingRecord)); } catch {}
  }
  for (const dialog of document.querySelectorAll("dialog[open]")) dialog.close();
  renderDebrief();
  syncPause();
  byId("debrief").showModal();
}

function tick(now) {
  const elapsed = Math.min((now - lastFrame) / 1000, .2);
  lastFrame = now;
  if (started && !paused && !finished && !document.hidden) {
    advance(state, elapsed);
    if (state.failure || state.time >= state.scenario.duration) finishMission();
  }
  if (now >= nextRefresh) {
    renderHUD();
    window.dispatchEvent(new Event("mission-change"));
    nextRefresh = now + 240;
  }
  requestAnimationFrame(tick);
}

function resetMission(id) {
  for (const dialog of document.querySelectorAll("dialog[open]")) dialog.close();
  state = newState(id);
  started = finished = paused = false;
  byId("field-hint").open = false;
  syncPause();
  renderHUD();
  window.dispatchEvent(new Event("mission-reset"));
  byId("guide").focus();
}

byId("pause").addEventListener("click", togglePause);
byId("room-pause").addEventListener("click", togglePause);
byId("open-sources").addEventListener("click", () => {
  if (started && !paused && !finished) togglePause();
  byId("sources").showModal();
});
byId("replay").addEventListener("click", () => resetMission(state.mission));
byId("next-mission").addEventListener("click", () => resetMission("extended"));
byId("missions").addEventListener("click", () => {
  const options = Object.keys(Mission.scenarios).map((id) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "secondary";
    button.textContent = copy.missions[id].name;
    button.disabled = id === "extended" && !trainingRecord;
    button.addEventListener("click", () => resetMission(id));
    return button;
  });
  byId("mission-options").replaceChildren(...options);
  byId("picker-note").hidden = Boolean(trainingRecord);
  byId("picker-note").textContent = copy.unlockNote;
  byId("mission-picker").showModal();
});
byId("language").addEventListener("change", ({ target }) => {
  language = target.value;
  copy = languages[language];
  try { localStorage.setItem("sol-5111-language", language); } catch {}
  applyLanguage(language);
  syncPause();
  renderHUD();
  window.dispatchEvent(new Event("mission-language"));
});
document.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat || event.target.closest("button, input, select, textarea, a, summary")) return;
  event.preventDefault();
  togglePause();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && started && !paused && !finished) togglePause();
});
byId("edit-avatar").addEventListener("click", () => {
  if (started && !paused && !finished) togglePause();
});

applyLanguage(language);
syncPause();
renderHUD();
requestAnimationFrame(tick);
