"use strict";

const byId = (id) => document.getElementById(id);
const { phases, initial, limits, defaults, simulate, isSuccess, historicalSols } = Mission;
const reserveKeys = ["battery", "air", "water", "food", "crop", "radiation"];
let language = readLanguage();
let copy = languages[language];

let turn = 0;
let state = { ...initial };
let history = [];
let comparison = null;
let done = false;
let turnStart = state;

function readPlan() {
  return {
    air: byId("air").checked,
    water: byId("water").checked,
    grow: Number(document.querySelector("input[name=grow]:checked").value),
    shelter: byId("shelter").checked,
    spare: byId("use-cell").checked,
    analysis: byId("analysis").checked
  };
}

function setPlan(plan) {
  byId("air").checked = plan.air;
  byId("water").checked = plan.water;
  document.querySelector(`input[name=grow][value="${plan.grow}"]`).checked = true;
  byId("shelter").disabled = phases[turn].status !== "STORM";
  byId("shelter").checked = plan.shelter;
  byId("use-cell").checked = Boolean(plan.spare && state.spare);
  byId("analysis").checked = Boolean(plan.analysis && pendingSample());
}

function pendingSample() {
  return state.samples.find((sample) => !state.analyzed.includes(sample));
}

function sampleName(sample) {
  const key = sample === "ridge" ? "stationRidge" : "stationBasin";
  return staticText[key][language === "uk" ? 1 : 0];
}

function renderTelemetry() {
  byId("reserves").innerHTML = reserveKeys.map((key, index) => {
    const label = copy.reserves[index];
    return `
    <div class="reserve" data-key="${key}">
      <div><span>${label}</span><strong>${state[key]}/${limits[key]}</strong></div>
      <progress aria-label="${label}" value="${state[key]}" max="${limits[key]}"></progress>
    </div>`;
  }).join("");
  byId("objectives").innerHTML = copy.objectives(history.length, phases.length, state.harvests, state.samples.length, state.analyzed.length)
    .map(([label, complete]) => `<li data-complete="${complete}">${complete ? "✓" : "◇"} ${label}</li>`).join("");
}

function updatePlan() {
  const sample = pendingSample();
  byId("analysis-system").hidden = !sample;
  byId("analysis").disabled = !sample;
  byId("analysis-help").textContent = sample ? copy.scienceCost(sampleName(sample)) : copy.noSample;
  const plan = readPlan();
  const estimate = simulate(state, phases[turn], plan);
  byId("execute").disabled = !estimate.valid;
  byId("available").textContent = estimate.available;
  byId("reserve-toggle").hidden = state.spare === 0;
  byId("cell-label").textContent = copy.cellLabel(state.spare);
  byId("budget-detail").textContent = copy.budget(phases[turn].solar, state.battery, limits.battery) +
    (plan.spare ? copy.cellBudget(state.spare) : "");
  const feedback = byId("plan-feedback");
  window.dispatchEvent(new CustomEvent("mission-plan", { detail: estimate }));
  feedback.dataset.warning = String(!estimate.valid || Boolean(estimate.failure));
  if (!estimate.valid) {
    feedback.textContent = copy.overBudget(estimate.draw - estimate.available);
    return;
  }
  feedback.textContent = copy.turnPreview(estimate.draw, estimate.after.battery,
    estimate.after.food, estimate.after.crop, estimate.after.air, estimate.after.water) +
    (estimate.failure ? ` · ${copy.warning}: ${copy.warnings[estimate.failure]}` : "");
}

function renderTurn(plan = defaults()) {
  const phase = phases[turn];
  const next = phases[turn + 1];
  byId("forecast").textContent = next ? copy.next + " · " + copy.forecast(next.solar, next.status === "STORM") : "";
  byId("sol-label").textContent = copy.turnInfo(turn + 1, phases.length, phase.sol);
  const chapter = Math.floor(turn / 6);
  byId("sequence").innerHTML = copy.campaign.map((title, index) => `
    <div class="seq-step" ${index === chapter ? 'aria-current="step"' : ""}>
      <b>0${index + 1}</b><strong>${title}</strong>
    </div>`).join("");
  byId("budget-source").textContent = historicalSols.includes(phase.sol) ? copy.observed : copy.modeled;
  byId("shelter-help").textContent = phase.status === "STORM"
    ? copy.shelter : copy.standby;
  byId("mission-jump").href = "#controls";
  byId("result").hidden = true;
  byId("command").hidden = false;
  setPlan(plan);
  renderTelemetry();
  updatePlan();
}

function selectedPlan(entry) {
  const { plan } = entry;
  const air = `${copy.reserves[1]} ${plan.air ? copy.on : copy.off}`;
  const water = `${copy.reserves[2]} ${plan.water ? copy.on : copy.off}`;
  const lights = `${copy.lights} ${copy.levels[plan.grow]}`;
  const choices = [air, water, lights];
  if (phases[entry.turn].status === "STORM") {
    choices.push(`${copy.shelterName} ${plan.shelter ? copy.on : copy.off}`);
  }
  if (entry.result.sample) choices.push(copy.analysisLog(sampleName(entry.result.sample)));
  return choices.join(" · ");
}

function summary(entry) {
  return reserveKeys.map((key, index) => `${copy.reserves[index]} ${entry.result.after[key]}`).join(" · ");
}

function renderLog(entry) {
  byId("rewind").hidden = !entry;
  if (!entry) {
    byId("log-heading").textContent = comparison ? copy.tryDifferent : copy.lastTurn;
    byId("log").innerHTML = comparison
      ? `<p class="compare">${copy.previousPlan} · ${selectedPlan(comparison)}<br>${copy.previousOutcome} · ${summary(comparison)}</p>`
      : `<p>${copy.firstTurn}</p>`;
    return;
  }
  byId("log-heading").textContent = `${copy.lastTurn} · ${copy.sol(phases[entry.turn].sol)}`;
  const result = entry.result;
  const items = [
    copy.batteryLog(result.after.battery, limits.battery, result.draw),
    result.harvested ? copy.harvestLog : copy.cropLog(result.growth)
  ];
  if (result.sample) items.push(copy.analysisLog(sampleName(result.sample)));
  if (phases[entry.turn].status === "STORM") items.push(copy.exposureLog(result.after.radiation - entry.before.radiation));
  byId("log").innerHTML = `<ul class="log-items">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  if (entry.previous) byId("log").insertAdjacentHTML("beforeend", `
    <p class="compare"><b>${copy.same}</b><br>${copy.previous} · ${summary(entry.previous)}<br>${copy.replay} · ${summary(entry)}</p>`);
}

function renderScienceReport() {
  const report = byId("science-report");
  report.hidden = state.analyzed.length === 0;
  report.replaceChildren();
  if (report.hidden) return;
  const heading = document.createElement("h3");
  heading.textContent = copy.scienceTitle;
  report.append(heading);
  for (const sample of state.analyzed) {
    const observation = document.createElement("p");
    observation.textContent = copy.scienceFindings[sample];
    report.append(observation);
  }
  if (state.analyzed.length === 2) {
    const question = document.createElement("p");
    const feedback = document.createElement("p");
    question.textContent = copy.compareEvidence;
    feedback.setAttribute("aria-live", "polite");
    const answers = document.createElement("div");
    answers.className = "action-row";
    copy.scienceChoices.forEach((choice, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "secondary";
      button.textContent = choice;
      button.onclick = () => { feedback.textContent = copy.scienceFeedback[index]; };
      answers.append(button);
    });
    report.append(question, answers, feedback);
  }
}

function showResult(entry) {
  const success = !entry.result.failure && isSuccess(state);
  byId("mission-jump").href = "#result";
  byId("command").hidden = true;
  byId("result").hidden = false;
  byId("result-title").textContent = success ? copy.success : entry.result.failure ? copy.interrupted : copy.incomplete;
  byId("result-explanation").textContent = success
    ? copy.successBody(state.harvests)
    : copy.failures[entry.result.failure] ?? copy.missingObjectives;
  const key = success && !entry.previous ? (history.find((item) => item.result.harvested) ?? entry) : entry;
  byId("decision").innerHTML = entry.previous
    ? `<div><h3>${copy.previous} · ${copy.sol(phases[entry.turn].sol)}</h3><p>${selectedPlan(entry.previous)}<br>${summary(entry.previous)}</p></div>
       <div><h3>${copy.sameReserves}</h3><p>${selectedPlan(entry)}<br>${summary(entry)}</p></div>`
    : `<div><h3>${copy.decision(phases[key.turn].sol)}</h3><p>${selectedPlan(key)}</p></div>
       <div><h3>${copy.outcome}</h3><p>${summary(key)}</p></div>`;
  const review = byId("review-turn");
  review.hidden = false;
  review.setAttribute("aria-label", copy.reviewLabel);
  review.replaceChildren(...history.map((item, index) => new Option(
    copy.turnInfo(index+1, phases.length, phases[index].sol), index, false, item.turn === key.turn
  )));
  byId("replay-key").onclick = () => replay(history[Number(review.value)]);
  renderScienceReport();
  renderTelemetry();
}

function execute() {
  if (done) return;
  const plan = readPlan();
  const result = simulate(state, phases[turn], plan);
  if (!result.valid) return;
  const entry = { turn, before: turnStart, plan, result, previous: comparison };
  history.push(entry);
  comparison = null;
  state = result.after;
  if (result.failure || turn === phases.length - 1) {
    done = true;
    showResult(entry);
    window.dispatchEvent(new Event("mission-state"));
    byId("result-title").focus();
    return;
  }
  turn += 1;
  turnStart = state;
  renderTurn({ ...plan, analysis: false, shelter: false });
  window.dispatchEvent(new Event("mission-state"));
  renderLog(entry);
  byId("turn-record").open = true;
}

function replay(entry) {
  if (!entry) return;
  comparison = entry;
  turn = entry.turn;
  state = entry.before;
  turnStart = state;
  history = history.filter((item) => item.turn < turn);
  done = false;
  renderTurn(entry.plan);
  renderLog(null);
  byId("turn-record").open = Boolean(comparison);
  window.dispatchEvent(new Event("mission-state"));
  byId("control-heading").focus();
}

function reset() {
  turn = 0;
  state = { ...initial };
  turnStart = state;
  history = [];
  comparison = null;
  done = false;
  renderTurn();
  renderLog(null);
  byId("turn-record").open = Boolean(comparison);
  window.dispatchEvent(new Event("mission-state"));
  byId("control-heading").focus({ preventScroll: true });
}

byId("language").addEventListener("change", (event) => {
  language = event.target.value === "uk" ? "uk" : "en";
  copy = languages[language];
  try {
    localStorage.setItem("sol-5111-language", language);
  } catch {
    // The current page remains usable if browser storage is disabled.
  }
  applyLanguage(language);
  if (done) {
    showResult(history.at(-1));
  } else {
    renderTurn(readPlan());
    renderLog(comparison ? null : history.at(-1));
  }
});

function handlePack(action) {
  if (done) return false;
  if (action === "pick" && state.pack === "storage") {
    state = { ...state, pack: "carried" };
  } else if (action === "install" && state.pack === "carried") {
    state = { ...state, pack: "connected", spare: 5 };
  } else {
    return false;
  }
  updatePlan();
  return true;
}

function collectSample(sample) {
  if (done || phases[turn].status === "STORM" || state.samples.includes(sample)) return false;
  state = { ...state, samples: [...state.samples, sample] };
  renderTelemetry();
  updatePlan();
  return true;
}

byId("analysis").addEventListener("change", updatePlan);
byId("use-cell").addEventListener("change", updatePlan);
byId("switches").addEventListener("change", updatePlan);
byId("execute").addEventListener("click", execute);
byId("reset").addEventListener("click", reset);
byId("play-again").addEventListener("click", reset);
byId("rewind").addEventListener("click", () => replay(history.at(-1)));
byId("open-sources").addEventListener("click", () => byId("sources").showModal());
applyLanguage(language);
renderTurn();
renderLog(null);
