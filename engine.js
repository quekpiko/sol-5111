"use strict";

const Mission = (() => {
  // Samples 1–5 are approximate relative readings of the yellow curve in NASA's
  // chart. The last point represents the published 21 Wh record, scaled to 1 unit.
  const phases = [
    { sol: 5098, solar: 10, status: "NORMAL" },
    { sol: 5103, solar: 10, status: "WATCH" },
    { sol: 5105, solar: 7, status: "DUST" },
    { sol: 5106, solar: 6, status: "DUST" },
    { sol: 5108, solar: 2, status: "ALERT" },
    { sol: 5111, solar: 1, status: "STORM" }
  ];
  const initial = Object.freeze({ battery: 7, air: 5, water: 5, food: 6, crop: 1, radiation: 0, harvests: 0, spare: 0, pack: "storage" });
  const defaults = (phase) => ({ air: true, water: true, grow: 0, shelter: phase.status === "STORM" });
  const limits = { battery: 16, air: 6, water: 8, food: 9, crop: 10, radiation: 4 };

  function simulate(state, phase, plan) {
    const primaryEnergy = state.battery + phase.solar;
    const available = primaryEnergy + (plan.spare ? state.spare : 0);
    const draw = (plan.air ? 3 : 0) + (plan.water ? 2 : 0) + plan.grow + (plan.shelter ? 1 : 0);
    if (draw > available) return { valid: false, available, draw };

    const air = Math.min(limits.air, state.air + (plan.air ? 1 : -2));
    const water = Math.min(limits.water, state.water + (plan.water ? 2 : -1) - (plan.grow ? 1 : 0));
    const growth = plan.grow === 4 ? 3 : plan.grow === 2 ? 2 : 0;
    const crop = state.crop + growth;
    const harvested = crop >= limits.crop && water > 0;
    const food = Math.min(limits.food, state.food - 1 + (harvested ? 3 : 0));
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
      pack: state.pack
    };
    const failure = air <= 0 ? "air" : water <= 0 ? "water" : food <= 0 ? "food" : radiation >= limits.radiation ? "radiation" : "";
    return { valid: true, available, draw, after, harvested, growth, failure };
  }

  return { phases, initial, defaults, limits, simulate };
})();

if (typeof module !== "undefined") module.exports = Mission;
