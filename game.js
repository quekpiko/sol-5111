"use strict";

const byId = (id) => document.getElementById(id);
const { duration, particleStart, particleEnd, newState, forecast, advance } = Mission;
let language = readLanguage();
let copy = languages[language];
let state = newState();
let started = false;
let paused = true;
let finished = false;
let lastFrame = performance.now();
let nextRefresh = 0;
const resources = ["battery", "air", "water", "food", "crop", "radiation"];

function phaseKey() {
  if (finished) return "complete";
  if (!started) return "ready";
  if (state.time >= particleEnd) return "recover";
  if (state.time >= particleStart) return "shelter";
  if (state.time >= particleStart - 14) return "warning";
  if (state.time >= 22) return "dust";
  return "prepare";
}

function radioKey() {
  if (finished) return state.failure ? "failed" : state.harvests ? "complete" : "partial";
  const phase = phaseKey();
  if (phase === "prepare" && state.lights !== "off") return "running";
  if (phase === "shelter" && state.shelter) return "protected";
  return phase;
}

function formatTime(seconds) {
  const rounded = Math.ceil(seconds);
  return [Math.floor(rounded / 60), rounded % 60].map((part) => String(part).padStart(2,"0")).join(":");
}

function renderHUD() {
  byId("phase").textContent = copy.phases[phaseKey()];
  byId("mission-clock").textContent = formatTime(Math.max(0, duration - state.time));
  const energy = forecast(state);
  byId("solar-now").textContent = energy.solar.toFixed(1);
  byId("terrain").dataset.phase = phaseKey();
  byId("hud").innerHTML = resources.map((key) => {
    const value = Math.round(state[key]);
    const capacity = key === "radiation" ? 19 : 100;
    const low = key === "radiation" ? value >= 12 : value < 24 && key !== "crop";
    const status = key === "battery" ? copy.live(energy.net > .05 ? copy.charge : energy.net < -.05 ? copy.discharge : copy.balanced, Math.abs(energy.net).toFixed(1)) : "";
    return `<div class="meter" data-meter="${key}" data-low="${low}">
      <div><span>${copy.instruments[key]}</span><strong>${value}${key === "radiation" ? "" : "%"}</strong></div>
      <progress aria-label="${copy.instruments[key]}" value="${value}" max="${capacity}"></progress>
      ${status ? `<small>${status}</small>` : ""}
    </div>`;
  }).join("");
}

function renderDebrief() {
  const key = radioKey();
  byId("outcome-title").textContent = copy.brief[key][0];
  byId("outcome-text").textContent = state.failure ? copy.failures[state.failure] : copy.brief[key][1];
  const stats = [`${copy.totalTime} · ${formatTime(state.time)}`, `${copy.harvests} · ${state.harvests}`, `${copy.samples} · ${state.analyzed.length}`,
    ...state.analyzed.map((sample) => copy.sampleResult[sample])];
  byId("outcome-stats").replaceChildren(...stats.map((text) => {
    const item = document.createElement("li");
    item.textContent = text;
    return item;
  }));
}

function syncPause() {
  const text = paused ? copy.resume : copy.pause;
  byId("pause").textContent = text;
  byId("room-pause").textContent = text;
  byId("pause").disabled = byId("room-pause").disabled = !started || finished;
  byId("pause").setAttribute("aria-pressed", String(paused && started && !finished));
  byId("room-pause").setAttribute("aria-pressed", String(paused && started && !finished));
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
  started = true;
  paused = false;
  lastFrame = performance.now();
  syncPause();
  window.dispatchEvent(new Event("mission-change"));
}

function tick(now) {
  const elapsed = Math.min((now - lastFrame) / 1000, .2);
  lastFrame = now;
  if (started && !paused && !finished && !document.hidden) {
    advance(state, elapsed);
    if (state.failure || state.time >= duration) {
      finished = true;
      paused = true;
      for (const dialog of document.querySelectorAll("dialog[open]")) dialog.close();
      renderDebrief();
      byId("debrief").showModal();
      syncPause();
    }
  }
  if (now >= nextRefresh) {
    renderHUD();
    window.dispatchEvent(new Event("mission-change"));
    nextRefresh = now + 180;
  }
  requestAnimationFrame(tick);
}

byId("pause").addEventListener("click", togglePause);
byId("room-pause").addEventListener("click", togglePause);
byId("open-sources").addEventListener("click", () => {
  if (started && !paused && !finished) togglePause();
  byId("sources").showModal();
});
byId("replay").addEventListener("click", () => {
  byId("debrief").close();
  state = newState();
  started = finished = false;
  paused = true;
  syncPause();
  renderHUD();
  window.dispatchEvent(new Event("mission-reset"));
  byId("guide").focus();
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
  if (event.code !== "Space" || event.repeat || event.target.closest("button, input, select, textarea, a")) return;
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
