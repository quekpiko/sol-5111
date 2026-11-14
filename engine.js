"use strict";

const Mission = (() => {
  // Historical chart anchors from Opportunity and modeled conditions around them.
  const phases = [
    [5094,10,"NORMAL"], [5096,10,"NORMAL"], [5098,10,"NORMAL"], [5100,10,"NORMAL"],
    [5102,10,"WATCH"], [5103,10,"WATCH"], [5105,7,"DUST"], [5106,6,"DUST"],
    [5107,5,"DUST"], [5108,2,"ALERT"], [5110,2,"ALERT"], [5111,1,"STORM"],
    [5114,2,"DUST"], [5119,4,"DUST"], [5124,6,"DUST"], [5131,8,"WATCH"],
    [5140,9,"NORMAL"], [5150,10,"NORMAL"]
  ].map(([sol, solar, status]) => ({ sol, solar, status }));
  const historicalSols = [5098,5103,5105,5106,5108,5111];
  const sampleSites = ["ridge", "basin"];
  const initial = Object.freeze({
    battery: 8, air: 6, water: 6, food: 9, crop: 3, radiation: 0,
    harvests: 0, spare: 0, pack: "storage", samples: [], analyzed: []
  });
  const defaults = () => ({ air: true, water: true, grow: 0, shelter: false });
  const limits = { battery: 20, air: 8, water: 10, food: 14, crop: 8, radiation: 4 };

  function isSuccess(state) {
    return state.harvests >= 2 && state.analyzed.length === sampleSites.length;
  }

  function simulate(state, phase, plan) {
    const primaryEnergy = state.battery + phase.solar;
    const available = primaryEnergy + (plan.spare ? state.spare : 0);
    const sample = plan.analysis ? state.samples.find((item) => !state.analyzed.includes(item)) : undefined;
    const draw = (plan.air ? 3 : 0) + (plan.water ? 2 : 0) + plan.grow + (plan.shelter ? 1 : 0) + (sample ? 3 : 0);
    if (draw > available) return { valid: false, available, draw };

    const air = Math.min(limits.air, state.air + (plan.air ? 1 : -2));
    const water = Math.min(limits.water, state.water + (plan.water ? 2 : -1) - (plan.grow ? 1 : 0));
    const growth = plan.grow === 4 ? 3 : plan.grow === 2 ? 2 : 0;
    const crop = state.crop + growth;
    const harvested = crop >= limits.crop && water > 0;
    const food = Math.min(limits.food, state.food - 1 + (harvested ? 5 : 0));
    const radiation = state.radiation + (phase.status === "STORM" ? (plan.shelter ? 1 : 5) : 0);
    const after = {
      battery: Math.min(limits.battery, Math.max(0, primaryEnergy - draw)),
      air: Math.max(0, air),
      water: Math.max(0, water),
      food: Math.max(0, food),
      crop: harvested ? 0 : Math.min(limits.crop, crop),
      radiation,
      harvests: state.harvests + Number(harvested),
      spare: state.spare - Math.max(0, draw - primaryEnergy),
      pack: state.pack,
      samples: state.samples,
      analyzed: sample ? [...state.analyzed, sample] : state.analyzed
    };
    const failure = air <= 0 ? "air" : water <= 0 ? "water" : food <= 0 ? "food" : radiation >= limits.radiation ? "radiation" : "";
    return { valid: true, available, draw, after, harvested, growth, failure, sample };
  }

  return { phases, initial, defaults, limits, simulate, isSuccess, historicalSols };
})();

if (typeof module !== "undefined") module.exports = Mission;
