"use strict";

const Mission = (() => {
  const duration = 100;
  const particleStart = 64;
  const particleEnd = 78;
  const spareCapacity = 24;
  // Six normalized Opportunity observations, placed on a compressed scenario clock.
  const solarAnchors = [[0, 10], [22, 10], [32, 7], [38, 6], [47, 2], [54, 1]];
  const solarProfile = [...solarAnchors, [67, 1], [78, 3], [91, 8], [duration, 10]];
  const settings = {
    lights: { off: { power: 0, growth: 0 }, dim: { power: 2, growth: 1.7 }, full: { power: 5, growth: 3 } },
    air: 2, water: 1, shelter: 1, lab: 2
  };

  function solarAt(time) {
    const index = solarProfile.findIndex(([second]) => second >= time);
    if (index <= 0) return solarProfile[index === 0 ? 0 : solarProfile.length - 1][1];
    const [start, low] = solarProfile[index - 1];
    const [end, high] = solarProfile[index];
    return low + (high - low) * (time - start) / (end - start);
  }

  function newState() {
    return {
      time: 0, battery: 55, food: 57, air: 80, water: 65, radiation: 0, crop: 0, harvests: 0,
      lights: "off", airOn: true, waterOn: true, shelter: false,
      pack: "storage", reserve: 0, samples: [], analyzed: [], lab: null, failure: ""
    };
  }

  function forecast(state, lights = state.lights, solar = solarAt(state.time)) {
    const lamp = settings.lights[lights];
    const load = 1 + lamp.power + (state.airOn ? settings.air : 0) +
      (state.waterOn ? settings.water : 0) + (state.shelter ? settings.shelter : 0) + (state.lab ? settings.lab : 0);
    return {
      solar, load, net: solar - load,
      batterySeconds: load > solar ? (state.battery + state.reserve) / (load - solar) : Infinity,
      harvestSeconds: lamp.growth > 0 ? (100 - state.crop) / lamp.growth : Infinity
    };
  }

  function advance(state, elapsed) {
    if (state.failure || state.time >= duration || elapsed <= 0) return;
    const seconds = Math.min(elapsed, duration - state.time);
    const start = state.time;
    const { net } = forecast(state, state.lights, solarAt(state.time + seconds / 2));
    const reserveUsed = Math.min(state.reserve, Math.max(0, -(state.battery + net * seconds)));
    state.reserve -= reserveUsed;
    state.battery = Math.min(100, Math.max(0, state.battery + net * seconds + reserveUsed));
    state.time += seconds;
    const powered = net >= 0 || state.battery > 0 || state.reserve > 0;
    const lamp = powered ? settings.lights[state.lights] : settings.lights.off;
    const airRate = powered && state.airOn ? .65 : state.shelter ? -3.35 : -2.2;
    state.air = Math.min(100, Math.max(0, state.air + airRate * seconds));
    state.water = Math.min(100, Math.max(0, state.water + ((powered && state.waterOn ? .57 : -.8) - lamp.growth * .18) * seconds));
    state.food = Math.max(0, state.food - .55 * seconds);
    if (state.water > 0) state.crop += lamp.growth * seconds;
    if (state.crop >= 100) {
      state.crop -= 100;
      state.harvests += 1;
      state.food = Math.min(100, state.food + 35);
    }
    const stormSeconds = Math.max(0, Math.min(state.time, particleEnd) - Math.max(start, particleStart));
    state.radiation += (state.shelter ? .21 : 1.65) * stormSeconds;
    if (state.lab && powered) {
      state.lab.remaining -= seconds;
      if (state.lab.remaining <= 0) {
        state.analyzed.push(state.lab.sample);
        state.lab = null;
      }
    }
    state.failure = !state.air ? "air" : !state.water ? "water" : !state.food ? "food" : state.radiation >= 19 ? "radiation" : "";
  }

  return { duration, particleStart, particleEnd, spareCapacity, solarAt, newState, forecast, advance };
})();

if (typeof module !== "undefined") module.exports = Mission;
