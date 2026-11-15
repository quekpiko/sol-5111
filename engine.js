"use strict";

const Mission = (() => {
  const timeScale = 3;
  const spareCapacity = 24;
  const exposureLimit = 19;
  const peakDustSolar = 1;
  const clearSkySolar = 10;
  const foodRate = .55 / timeScale;
  const totalSols = 7;
  const beaconLockSeconds = 12;
  const toxinLimit = 100;
  const deconRate = 2.5;
  const settings = {
    lights: { off: { power: 0, growth: 0 }, dim: { power: 1, growth: 2.05 }, full: { power: 3.9, growth: 3.5 } },
    air: 2, water: 1, shelter: 1, lab: 2, decon: 5.4, beacon: 2.7
  };
  function scenario(solLength, food, recovery) {
    const at = (sols) => solLength * sols;
    return {
      solLength, duration: at(totalSols), dust: at(1), breach: at(2.18), warning: at(3.65),
      particleStart: at(4.11), particleEnd: at(5), beaconStart: at(5), food, battery: 58,
      // The six Opportunity anchors are 10, 10, 7, 6, 2 and 1. All timing is fictional.
      solar: [[0, 10], [at(1), 10], [at(1.65), 7], [at(2.15), 6], [at(2.9), 4.4],
        [at(3.9), 5.2], [at(5), 4.8], [at(5.32), 2], [at(5.62), 1], [at(recovery), 1],
        [at(6.6), 5.5], [at(7), 7.7]]
    };
  }
  const scenarios = { training: scenario(45, 54, 6.16), extended: scenario(50, 48, 6.39) };

  function currentSol(state) {
    return Math.min(totalSols, 1 + Math.floor(state.time / state.scenario.solLength));
  }

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
      lightCuts: [], outage: 0, scrubberOff: 0, recyclerOff: 0, stormSheltered: 0, stormVentilated: 0,
      breach: "intact", toxins: 0, decon: false, clearedAt: null,
      beaconOn: false, beaconSignal: 0
    };
  }

  function systemDraw(state, system) {
    const improvement = system === "water" && state.analyzed.includes("ridge") ? .85 : 1;
    return settings[system] * improvement / timeScale;
  }

  function forecast(state, solar = solarAt(state.time, state.scenario), trayIndex = -1, light = "off") {
    const lamps = state.trays.map((tray, index) => settings.lights[tray.harvestedAt !== null ? "off" : index === trayIndex ? light : tray.light]);
    const base = 1 / timeScale + (state.airOn ? systemDraw(state, "air") : 0) + (state.waterOn ? systemDraw(state, "water") : 0) +
      (state.shelter ? systemDraw(state, "shelter") : 0) + (state.lab ? systemDraw(state, "lab") : 0) +
      (state.decon ? systemDraw(state, "decon") : 0) + (state.beaconOn ? systemDraw(state, "beacon") : 0);
    const generation = solar / timeScale;
    const load = base + lamps.reduce((sum, lamp) => sum + lamp.power, 0) / timeScale;
    const net = generation - load;
    return {
      solar, generation, load, net,
      batterySeconds: net < 0 ? (state.battery + state.reserve) / -net : Infinity,
      foodSeconds: state.food / foodRate,
      harvestSeconds: state.trays.map((tray, index) => {
        const rate = lamps[index].growth / timeScale;
        return rate > 0 && state.water > 0 && state.toxins === 0 ? (100 - tray.growth) / rate : Infinity;
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
    if (state.shelter || tray.harvestedAt !== null) return;
    if (state.time >= state.scenario.dust && settings.lights[light].power < settings.lights[tray.light].power) {
      state.lightCuts.push({ index, time: state.time });
    }
    tray.light = light;
  }

  function sealGreenhouse(state) {
    if (!state.shelter && state.breach === "open") state.breach = "sealed";
  }

  function toggleDecon(state) {
    if (!state.shelter && state.breach === "sealed" && state.toxins > 0 && state.analyzed.includes("basin")) state.decon = !state.decon;
  }

  function toggleBeacon(state) {
    if (state.shelter || state.time < state.scenario.beaconStart) return;
    state.beaconOn = !state.beaconOn;
    if (!state.beaconOn) state.beaconSignal = 0;
  }

  function beaconReady(state) {
    return state.beaconOn && state.powered && state.beaconSignal >= beaconLockSeconds;
  }

  function recordReading(state) {
    if (state.sensor !== "installed" || state.time < state.nextReading) return;
    const solar = solarAt(state.time, state.scenario);
    // The game uses normalized opacity inferred from the solar profile.
    state.readings.push({ time: state.time, solar, opacity: (clearSkySolar - solar) / (clearSkySolar - peakDustSolar) * 100 });
    state.nextReading = state.time + 4;
  }

  function advance(state, elapsed) {
    const { duration, breach, particleStart, particleEnd } = state.scenario;
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
    if (state.breach === "intact" && state.time >= breach) {
      state.breach = "open";
      state.toxins = 22;
    }
    if (state.breach === "open") state.toxins = Math.min(toxinLimit, state.toxins + 1.15 * Math.min(seconds, state.time - breach));
    if (state.decon) {
      state.toxins = Math.max(0, state.toxins - deconRate * poweredSeconds);
      if (state.toxins === 0) {
        state.decon = false;
        state.clearedAt = state.time;
      }
    }
    if (state.beaconOn) {
      state.beaconSignal = poweredSeconds < seconds ? 0 : Math.min(beaconLockSeconds, state.beaconSignal + seconds);
    }

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
      const active = state.water > 0 && state.toxins === 0 && rate ? Math.min(poweredSeconds, (100 - tray.growth) / rate) : 0;
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
    if (!state.air) state.failure = "air";
    else if (!state.water) state.failure = "water";
    else if (!state.food) state.failure = "food";
    else if (state.radiation >= exposureLimit) state.failure = "radiation";
    else if (state.toxins >= toxinLimit) state.failure = "toxins";
    else if (state.time >= duration) {
      if (state.toxins > 0) state.failure = "contamination";
      else if (state.trays.every((tray) => tray.harvestedAt === null)) state.failure = "harvest";
      else if (!beaconReady(state)) state.failure = "beacon";
    }
  }

  return { spareCapacity, exposureLimit, peakDustSolar, totalSols, beaconLockSeconds, deconRate, scenarios, currentSol,
    solarAt, solarPercent, newState, forecast, systemDraw, exposureRate, setTrayLight, sealGreenhouse, toggleDecon,
    toggleBeacon, beaconReady, recordReading, advance };
})();

if (typeof module !== "undefined") module.exports = Mission;
