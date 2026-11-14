"use strict";

const Mission = (() => {
  const timeScale = 3;
  const spareCapacity = 24;
  const exposureLimit = 19;
  const peakDustSolar = 1;
  const clearSkySolar = 10;
  const foodRate = .55 / timeScale;
  const settings = {
    lights: { off: { power: 0, growth: 0 }, dim: { power: 1, growth: 2.05 }, full: { power: 3.9, growth: 3.5 } },
    air: 2, water: 1, shelter: 1, lab: 2
  };
  const scenarios = {
    training: {
      duration: 300, dust: 66, warning: 147, particleStart: 186, particleEnd: 226, food: 52, battery: 58,
      // Six normalized Opportunity anchors, with interpolated values and a fictional recovery.
      solar: [[0, 10], [66, 10], [96, 7], [114, 6], [141, 2], [162, 1], [201, 1], [233, 3], [271, 8], [300, 10]]
    },
    extended: {
      duration: 360, dust: 56, warning: 174, particleStart: 214, particleEnd: 254, food: 46, battery: 58,
      solar: [[0, 10], [56, 10], [83, 7], [102, 6], [126, 2], [145, 1], [244, 1], [267, 3], [315, 8], [360, 10]]
    }
  };

  function solarAt(time, scenario = scenarios.training) {
    const index = scenario.solar.findIndex(([second]) => second >= time);
    if (index === -1) return scenario.solar.at(-1)[1];
    if (!index) return scenario.solar[0][1];
    const [start, low] = scenario.solar[index - 1];
    const [end, high] = scenario.solar[index];
    return low + (high - low) * (time - start) / (end - start);
  }

  function newState(mission = "training") {
    const scenario = scenarios[mission];
    return {
      mission, scenario, time: 0, battery: scenario.battery, food: scenario.food, air: 80, water: 65, radiation: 0,
      trays: Array.from({ length: 2 }, () => ({
        light: "off", growth: 0, energy: 0, harvestedAt: null, pauseSeconds: 0
      })),
      airOn: true, waterOn: true, shelter: false, powered: true, minimumEnergy: scenario.battery,
      pack: "storage", reserve: 0, reserveUsed: 0, samples: [], analyzed: [], lab: null, failure: "",
      sensor: "storage", readings: [], nextReading: 0,
      lightCuts: [], outage: 0, scrubberOff: 0, recyclerOff: 0, stormSheltered: 0, stormVentilated: 0
    };
  }

  function forecast(state, solar = solarAt(state.time, state.scenario), trayIndex = -1, light = "off") {
    const lamps = state.trays.map((tray, index) => settings.lights[tray.harvestedAt !== null ? "off" : index === trayIndex ? light : tray.light]);
    const base = 1 + (state.airOn ? settings.air : 0) + (state.waterOn ? settings.water : 0) +
      (state.shelter ? settings.shelter : 0) + (state.lab ? settings.lab : 0);
    const generation = solar / timeScale;
    const load = (base + lamps.reduce((sum, lamp) => sum + lamp.power, 0)) / timeScale;
    const net = generation - load;
    return {
      solar, generation, load, net,
      batterySeconds: net < 0 ? (state.battery + state.reserve) / -net : Infinity,
      foodSeconds: state.food / foodRate,
      harvestSeconds: state.trays.map((tray, index) => {
        const rate = lamps[index].growth / timeScale;
        return rate > 0 && state.water > 0 ? (100 - tray.growth) / rate : Infinity;
      })
    };
  }

  function exposureRate(state) {
    return state.shelter ? .07 : .55;
  }

  function solarPercent(output) {
    return Math.round(100 * output / clearSkySolar);
  }

  function setTrayLight(state, index, light) {
    const tray = state.trays[index];
    if (state.time >= state.scenario.dust && settings.lights[light].power < settings.lights[tray.light].power) {
      state.lightCuts.push({ index, time: state.time });
    }
    tray.light = light;
  }

  function recordReading(state) {
    if (state.sensor !== "installed" || state.time < state.nextReading) return;
    const solar = solarAt(state.time, state.scenario);
    // The game uses normalized opacity inferred from the solar profile.
    state.readings.push({ time: state.time, solar, opacity: (clearSkySolar - solar) / (clearSkySolar - peakDustSolar) * 100 });
    state.nextReading = state.time + 4;
  }

  function advance(state, elapsed) {
    const { duration, particleStart, particleEnd } = state.scenario;
    if (state.failure || state.time >= duration || elapsed <= 0) return;
    const start = state.time;
    const seconds = Math.min(elapsed, duration - start);
    const { net } = forecast(state, solarAt(start + seconds / 2, state.scenario));
    const stored = state.battery + state.reserve;
    const poweredSeconds = net < 0 ? Math.min(seconds, stored / -net) : seconds;
    state.outage += seconds - poweredSeconds;
    if (!state.airOn) state.scrubberOff += seconds;
    if (!state.waterOn) state.recyclerOff += seconds;
    const reserveUsed = Math.min(state.reserve, Math.max(0, -(state.battery + net * seconds)));
    state.reserve -= reserveUsed;
    state.reserveUsed += reserveUsed;
    state.battery = Math.min(100, Math.max(0, state.battery + net * seconds + reserveUsed));
    state.minimumEnergy = Math.min(state.minimumEnergy, state.battery + state.reserve);
    state.time += seconds;
    state.powered = net >= 0 || state.battery > 0 || state.reserve > 0;

    const airRate = state.shelter ? -3.35 : -2.2;
    const airOnline = state.airOn ? poweredSeconds : 0;
    state.air = Math.min(100, Math.max(0, state.air + (.65 * airOnline + airRate * (seconds - airOnline)) / timeScale));
    const waterOnline = state.waterOn ? poweredSeconds : 0;
    const irrigation = state.trays.filter((tray) => tray.harvestedAt === null).length * .22 * poweredSeconds;
    state.water = Math.min(100, Math.max(0, state.water + (.57 * waterOnline - .8 * (seconds - waterOnline) - irrigation) / timeScale));
    state.food = Math.max(0, state.food - foodRate * seconds);
    for (const tray of state.trays) {
      if (tray.harvestedAt !== null) continue;
      const lamp = settings.lights[tray.light];
      const rate = lamp.growth / timeScale;
      const active = state.water > 0 && rate ? Math.min(poweredSeconds, (100 - tray.growth) / rate) : 0;
      const lampSeconds = tray.growth + rate * active >= 100 - 1e-8 ? active : poweredSeconds;
      tray.energy += lamp.power * lampSeconds / timeScale;
      tray.growth = Math.min(100, tray.growth + rate * active);
      if (tray.growth >= 100 - 1e-8) {
        tray.growth = 100;
        tray.harvestedAt = start + active;
        state.food = Math.min(100, state.food + 24);
      } else {
        tray.pauseSeconds += seconds - active;
      }
    }
    const stormSeconds = Math.max(0, Math.min(state.time, particleEnd) - Math.max(start, particleStart));
    state.radiation += exposureRate(state) * stormSeconds;
    if (state.shelter) {
      state.stormSheltered += stormSeconds;
      if (state.airOn) {
        const poweredEnd = Math.min(start + poweredSeconds, particleEnd);
        state.stormVentilated += Math.max(0, poweredEnd - Math.max(start, particleStart));
      }
    }
    if (state.lab) {
      state.lab.remaining -= poweredSeconds;
      if (state.lab.remaining <= 0) {
        state.analyzed.push(state.lab.sample);
        state.lab = null;
      }
    }
    recordReading(state);
    state.failure = !state.air ? "air" : !state.water ? "water" : !state.food ? "food" : state.radiation >= exposureLimit ? "radiation" : "";
  }

  return { spareCapacity, exposureLimit, peakDustSolar, scenarios, solarAt, solarPercent, newState, forecast, exposureRate, setTrayLight, recordReading, advance };
})();

if (typeof module !== "undefined") module.exports = Mission;
