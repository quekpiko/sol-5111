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
let displayedHarvests = 0;
let foodNoticeUntil = 0;
const restartDialog = byId("restart-confirm");
const tutorialTargets = ["terrain", "hud", "setup"];
let tutorialStep = 0;
let tutorialSelection = null;

const meters = Object.fromEntries(resources.map((key) => {
  const element = document.createElement("div");
  element.className = "meter";
  element.dataset.meter = key;
  element.innerHTML = "<div><span></span><strong></strong></div><progress></progress><small></small>";
  byId("hud").append(element);
  const activity = ["food", "battery"].includes(key) ? document.createElement("small") : null;
  if (activity) {
    activity.className = "meter-activity";
    element.append(activity);
  }
  const detail = key === "battery" ? document.createElement("small") : null;
  if (detail) element.insertBefore(detail, activity);
  return [key, {
    element, label: element.querySelector("span"), value: element.querySelector("strong"),
    gauge: element.querySelector("progress"), note: element.querySelector("small"), activity, detail
  }];
}));

function phaseKey() {
  if (finished) return "complete";
  if (!started) return "ready";
  const { particleStart, particleEnd, warning, dust } = state.scenario;
  if (state.time >= particleEnd) return "beacon";
  if (state.time >= particleStart) return "shelter";
  if (state.time >= warning) return "warning";
  if (state.toxins > 0) return "breach";
  if (state.time >= dust) return "dust";
  return "prepare";
}

function hasHarvest() {
  return state.trays.some((tray) => tray.harvestedAt !== null);
}

function harvestCount() {
  return state.trays.filter((tray) => tray.harvestedAt !== null).length;
}

function canLaunch() {
  return state.trays.some((tray) => tray.light !== "off");
}

function radioKey() {
  if (finished) return state.failure ? "failed" : "complete";
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
  if (finished) return "";
  const particles = Mission.particleStatus(state);
  if (particles === "expected") return copy.particleCountdown(formatTime(state.scenario.particleStart - state.time));
  if (particles === "active") return copy.particleRemaining(formatTime(state.scenario.particleEnd - state.time));
  return "";
}

function powerReadings(energy) {
  return {
    main: Number.isFinite(energy.mainBatterySeconds) ? formatTime(energy.mainBatterySeconds) : copy.charge,
    spare: copy.panels.reserveValue(decimal(state.reserve))
  };
}

function lightingLesson() {
  return tutorialTargets[tutorialStep] === "hud";
}

function renderLightingResult() {
  const result = byId("tutorial-result");
  result.hidden = !lightingLesson() || !tutorialSelection;
  if (result.hidden) return;
  const { index, light } = tutorialSelection;
  const prediction = forecast(state, Mission.peakDustSolar, index, light);
  const harvest = prediction.harvestSeconds[index];
  const battery = prediction.batterySeconds;
  result.textContent = copy.panels.tutorialResult(copy.tray(index + 1), copy.lights[light],
    Number.isFinite(harvest) ? formatTime(harvest) : copy.noHarvest,
    Number.isFinite(battery) ? formatTime(battery) : copy.charge);
}

function renderTutorial(navigate = false) {
  const tutorial = byId("tutorial");
  const target = tutorialTargets[tutorialStep];
  tutorial.hidden = !target;
  document.body.dataset.tutorial = target || "";
  if (target) {
    const [title, text] = copy.campaign.tutorial[tutorialStep];
    byId("tutorial-step").textContent = copy.campaign.tutorialProgress(tutorialStep + 1, tutorialTargets.length);
    byId("tutorial-title").textContent = title;
    byId("tutorial-text").textContent = text;
    byId("tutorial-back").hidden = !tutorialStep;
    byId("tutorial-next").textContent = staticText[tutorialStep === tutorialTargets.length - 1 ? "tutorialDone" : "tutorialNext"][language === "uk" ? 1 : 0];
  }
  byId("tutorial-try").hidden = !lightingLesson();
  renderLightingResult();
  window.dispatchEvent(new Event("mission-change"));
  if (navigate) {
    if (target) byId(target).scrollIntoView({ block: "nearest" });
    else byId("guide").focus();
  }
}

function renderHUD() {
  const phase = phaseKey();
  const energy = forecast(state);
  const { foodSeconds, batterySeconds, harvestSeconds } = energy;
  const cropETA = Math.min(...harvestSeconds);
  const harvests = harvestCount();
  const allHarvested = harvests === state.trays.length;
  const nextCrop = Number.isFinite(cropETA) ? state.trays[harvestSeconds.indexOf(cropETA)].growth :
    Math.max(...state.trays.filter((tray) => tray.harvestedAt === null).map((tray) => tray.growth), allHarvested ? 100 : 0);
  const exposure = phase === "shelter" ? exposureRate(state) : 0;
  const event = eventCountdown();
  const now = performance.now();
  if (harvests > displayedHarvests) foodNoticeUntil = now + 4500;
  displayedHarvests = harvests;
  const goal = byId("harvest-goal");
  const goalText = copy.harvestGoal(harvests > 0);
  if (goal.textContent !== goalText) goal.textContent = goalText;
  goal.dataset.done = String(harvests > 0);
  byId("final-goal").hidden = !started || finished;
  const crew = byId("crew-status");
  crew.hidden = !state.shelter && phase !== "warning" && phase !== "shelter";
  crew.textContent = state.shelter ? copy.crewSheltered : copy.crewExposed;
  crew.dataset.sheltered = String(state.shelter);
  byId("phase").textContent = copy.phases[phase];
  byId("mission-clock").textContent = started ? formatTime(state.scenario.duration - state.time) : "—:—";
  byId("solar-now").textContent = decimal(energy.generation);
  byId("solar-relative").textContent = copy.relativeSolar(Mission.solarPercent(energy.solar));
  byId("terrain").dataset.phase = phase;
  byId("event-clock").hidden = !event;
  if (byId("event-clock").textContent !== event) byId("event-clock").textContent = event;
  const status = {
    battery: copy.panels.totalRunway(Number.isFinite(batterySeconds) ? formatTime(batterySeconds) : copy.charge),
    air: copy.systemState(state.airOn && state.powered),
    water: copy.systemState(state.waterOn && state.powered),
    food: copy.foodETA(formatTime(foodSeconds)),
    crop: state.toxins > 0 ? copy.campaign.growthLocked : Number.isFinite(cropETA) ? copy.cropETA(formatTime(cropETA)) : harvests ? copy.harvestNote(harvests) : copy.noHarvest,
    radiation: exposure ? copy.exposureNow(decimal(exposure, 2)) : phase === "warning" ? copy.radiationExpected : copy.noExposure
  };
  const solCount = byId("sol-count");
  solCount.hidden = !started;
  solCount.textContent = copy.campaign.sol(Mission.currentSol(state), Mission.totalSols);
  const toxinGoal = byId("toxins-goal");
  toxinGoal.hidden = state.breach === "intact";
  toxinGoal.textContent = state.toxins > 0 ? copy.campaign.toxins(Math.ceil(state.toxins)) : copy.campaign.clean;
  toxinGoal.dataset.done = String(state.toxins === 0);
  const landingGoal = byId("beacon-goal");
  landingGoal.hidden = state.time < state.scenario.beaconStart;
  landingGoal.textContent = Mission.beaconReady(state) ? copy.campaign.signalReady : copy.campaign.signalNeeded;
  landingGoal.dataset.done = String(Mission.beaconReady(state));
  byId("terrain").dataset.beacon = String(Mission.beaconReady(state));

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
  const backupActive = started && !finished && energy.net < 0;
  const foodRefilled = now < foodNoticeUntil;
  meters.battery.element.dataset.backup = String(backupActive);
  meters.food.element.dataset.refilled = String(foodRefilled);
  meters.battery.activity.hidden = !backupActive;
  const power = powerReadings(energy);
  meters.battery.detail.textContent = copy.panels.batteryDetail(power.main, power.spare);
  meters.battery.activity.textContent = state.powered ? copy.onBattery : copy.powerShortfall;
  meters.food.activity.hidden = !foodRefilled;
  meters.food.activity.textContent = copy.foodRefilled;
}

function score() {
  return {
    harvests: harvestCount(),
    food: Math.round(state.food),
    energy: Math.round(state.minimumEnergy)
  };
}

function missionExplanation() {
  const firstHarvest = Math.min(...state.trays.filter((tray) => tray.harvestedAt !== null).map((tray) => tray.harvestedAt));
  const lessons = [];
  if (state.reserveUsed >= .1) lessons.push(copy.reserveUsed(decimal(state.reserveUsed)));
  const stormElapsed = Math.max(0, Math.min(state.time, state.scenario.particleEnd) - state.scenario.particleStart);
  if (stormElapsed >= 1) {
    if (state.stormVentilated >= stormElapsed - .1) lessons.push(copy.ventilationHeld);
    else if (state.stormSheltered >= 1) lessons.push(copy.shelterResult(formatTime(state.stormSheltered), formatTime(state.stormVentilated)));
  }
  if (Number.isFinite(firstHarvest)) lessons.push(copy.firstHarvest(formatTime(firstHarvest)));
  if (state.clearedAt !== null) lessons.push(copy.campaign.cleanResult(formatTime(state.clearedAt)));
  if (state.analyzed.includes("ridge")) lessons.push(copy.campaign.filterResult);
  if (!state.failure) lessons.push(copy.campaign.signalResult);
  if (state.failure) {
    const outage = state.outage >= 1 ? formatTime(state.outage) : "";
    const systemsOff = state.failure === "air" ? state.scrubberOff : state.recyclerOff;
    if (state.failure === "air" || state.failure === "water") {
      if (outage) lessons.push(copy.outageReason(outage));
      if (systemsOff >= 1) lessons.push(copy.systemOffReason(state.failure, formatTime(systemsOff)));
    }
    if (state.failure === "food") lessons.push(copy.foodReason(Number.isFinite(firstHarvest)));
    if (state.failure === "radiation") lessons.push(copy.radiationReason);
  }
  return lessons;
}

function missionDecisions() {
  const decisions = [];
  if (state.waterShutdown) {
    const { time, savings } = state.waterShutdown;
    decisions.push(copy.panels.waterDecision(formatTime(time), decimal(savings, 2), Math.round(state.water),
      Mission.beaconReady(state), state.waterOn));
  }
  if (state.stormSheltered > 0) {
    decisions.push(copy.panels.shelterDecision(formatTime(state.stormSheltered), decimal(state.radiation)));
  }
  if (state.cleanupStartedAt !== null) {
    decisions.push(copy.panels.cleanupDecision(formatTime(state.cleanupStartedAt), Math.ceil(state.toxins)));
  }
  const lastCut = state.lightCuts.at(-1);
  if (lastCut) {
    const harvested = state.trays[lastCut.index].harvestedAt;
    decisions.push(copy.panels.lightDecision(lastCut.index + 1, formatTime(lastCut.time),
      harvested === null ? "" : formatTime(harvested)));
  }
  return decisions.slice(0, 3);
}

function renderDebrief() {
  const key = radioKey();
  const current = score();
  byId("outcome-title").textContent = state.failure ? copy.brief[key][0] : copy.campaign.rescueTitle;
  byId("outcome-text").textContent = state.failure ? (copy.campaign.failures[state.failure] || copy.failures[state.failure]) : copy.campaign.rescue;
  const rank = byId("outcome-rank");
  rank.hidden = Boolean(state.failure);
  const promotion = current.harvests === 2 && state.analyzed.includes("ridge") && state.sensor === "installed" ? 2 :
    state.outage < 1 && state.radiation < 8 ? 1 : 0;
  rank.textContent = copy.campaign.rank(copy.campaign.ranks[promotion]);
  const [first, second] = state.trays;
  const faster = first.harvestedAt < second.harvestedAt ? 0 : 1;
  const energyGap = state.trays[faster].energy - state.trays[1 - faster].energy;
  const comparison = first.harvestedAt !== null && second.harvestedAt !== null &&
    Math.abs(first.harvestedAt - second.harvestedAt) >= 1 && energyGap > .1;
  const stats = [
    `${copy.totalTime} · ${formatTime(state.time)}`, copy.runScore(current),
    copy.exposureTotal(decimal(state.radiation)),
    ...state.trays.map((tray, index) => copy.trayResult(index + 1, tray.harvestedAt === null ? copy.unripe : formatTime(tray.harvestedAt),
      decimal(tray.energy), formatTime(tray.pauseSeconds))),
    comparison ? copy.trayComparison(faster + 1, formatTime(Math.abs(first.harvestedAt - second.harvestedAt)), decimal(energyGap)) : "",
    state.readings.length > 1 ? copy.sensorResult(state.readings.length, Mission.solarPercent(Math.min(...state.readings.map((item) => item.solar)))) : "",
    state.mission === "extended" && trainingRecord ? copy.previousScore(copy.runScore(trainingRecord)) : "",
    ...state.analyzed.map((sample) => copy.sampleResult[sample])
  ];
  const decisions = missionDecisions();
  byId("outcome-review").hidden = !decisions.length;
  for (const [id, entries] of [["outcome-decisions", decisions], ["outcome-explanation", missionExplanation()], ["outcome-stats", stats]]) {
    byId(id).replaceChildren(...entries.filter(Boolean).map((label) => {
      const item = document.createElement("li");
      item.textContent = label;
      return item;
    }));
  }
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
  byId("restart").hidden = byId("room-restart").hidden = !paused || !started || finished;
}

function togglePause() {
  if (!started || finished) return;
  paused = !paused;
  lastFrame = performance.now();
  syncPause();
  window.dispatchEvent(new Event("mission-change"));
}

function startMission() {
  if (started || !canLaunch() || tutorialStep < tutorialTargets.length) return;
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
  tutorialSelection = null;
  started = finished = paused = false;
  displayedHarvests = foodNoticeUntil = 0;
  byId("field-hint").open = false;
  byId("report-log").open = false;
  syncPause();
  renderHUD();
  window.dispatchEvent(new Event("mission-reset"));
  byId("guide").focus();
}

byId("pause").addEventListener("click", togglePause);
byId("room-pause").addEventListener("click", togglePause);
for (const id of ["restart", "room-restart"]) {
  byId(id).addEventListener("click", () => {
    if (!paused || !started || finished) return;
    restartDialog.returnValue = "";
    restartDialog.showModal();
  });
}
restartDialog.addEventListener("close", () => {
  if (restartDialog.returnValue === "restart") resetMission(state.mission);
});
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
function switchLanguage({ target }) {
  language = target.value;
  copy = languages[language];
  try { localStorage.setItem("sol-5111-language", language); } catch {}
  applyLanguage(language);
  syncPause();
  renderHUD();
  renderTutorial();
  window.dispatchEvent(new Event("mission-language"));
}
for (const id of ["language", "briefing-language"]) byId(id).addEventListener("change", switchLanguage);
byId("briefing").addEventListener("close", () => {
  renderTutorial(true);
  byId("tutorial-next").focus({ preventScroll: true });
});
byId("tutorial-next").addEventListener("click", () => { tutorialStep += 1; renderTutorial(true); });
byId("tutorial-back").addEventListener("click", () => { tutorialStep -= 1; renderTutorial(true); });
byId("tutorial-skip").addEventListener("click", () => { tutorialStep = tutorialTargets.length; renderTutorial(true); });
document.addEventListener("keydown", (event) => {
  if (event.code !== "Space" || event.repeat || restartDialog.open || event.target.closest("button, input, select, textarea, a, summary")) return;
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
byId("briefing").showModal();
requestAnimationFrame(tick);
