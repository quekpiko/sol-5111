"use strict";

const staticText = {
  briefing: ["Mission briefing", "Брифінг місії"],
  briefingEyebrow: ["SOL 5111 · SEVEN SOLS", "SOL 5111 · СІМ СОЛІВ"],
  storyTitle: ["Your assignment · Fiction", "Твоє завдання · Ігровий сценарій"],
  storyBody: [
    "A planet-wide dust storm forced the main crew to evacuate to orbit. You are the junior engineer on duty at outpost Sol 5111. Your rescue shuttle can land at the end of Sol 7. Keep air and water available, save a crop, and power the landing beacon until touchdown.",
    "Планетарна пилова буря змусила основний екіпаж евакуюватися на орбіту. Ти — молодший інженер на чергуванні в аванпості Sol 5111. Рятувальний шатл зможе сісти наприкінці 7-го солу, марсіанського дня. Збережи повітря, воду й урожай та забезпеч живлення посадкового маяка до приземлення."
  ],
  historyTitle: ["Real NASA observations", "Реальні спостереження NASA"],
  historyOpportunity: ["On June 10, 2018, dust cut Opportunity’s available energy to 21 Wh on its sol 5111.", "10 червня 2018 року пил знизив доступну енергію Opportunity до 21 Вт·год на 5111-й сол роботи марсохода."],
  historyCuriosity: ["On May 20, 2024, Curiosity’s radiation detector recorded 8,100 µGy during a solar particle event.", "20 травня 2024 року радіаційний детектор Curiosity зафіксував 8100 мкГр під час потоку сонячних частинок."],
  historyPhoenix: ["Phoenix detected perchlorate salts in Martian soil, inspiring the greenhouse contamination in this mission.", "Phoenix виявив солі перхлоратів у марсіанському ґрунті. Це стало основою сценарію забруднення теплиці."],
  historyMro: ["MRO’s MARCI camera tracks dust storms. The game’s forecasts, dose points and cleanup are simulated.", "Камера MARCI на MRO відстежує пилові бурі. Прогнози, бали опромінення й очищення теплиці в грі змодельовані."],
  briefingContinue: ["Begin training", "Почати навчання"],
  tutorialSkip: ["Skip tutorial", "Пропустити навчання"],
  tutorialBack: ["Back", "Назад"],
  tutorialNext: ["Next", "Далі"],
  tutorialDone: ["Prepare the base", "Підготувати базу"],
  reportLog: ["Previous orbital reports", "Попередні орбітальні зведення"],
  stationBeacon: ["Landing beacon", "Посадковий маяк"],
  setup: ["Before you start", "Перед стартом"],
  restart: ["Restart mission", "Перезапустити місію"],
  restartDetail: ["Return to setup? Your progress in this attempt will be lost.", "Повернутися до підготовки? Прогрес цієї спроби буде втрачено."],
  hint: ["Hint", "Підказка"],
  missions: ["Missions", "Місії"],
  mapLabel: ["Mars outpost", "Марсіанська база"],
  telemetry: ["Sensor readings", "Показники датчика"],
  dustChart: ["Opacity index · 0–100", "Індекс запиленості · 0–100"],
  solarChart: ["Solar output relative to clear sky, %", "Виробіток відносно ясного неба, %"],
  sensorScience: [
    "The game sensor uses an illustrative opacity index derived from the solar curve. Both plots share that model. The greenhouse mirrors the idea of comparing growing conditions in Veggie.",
    "Датчик показує умовний індекс запиленості, розрахований за кривою виробітку. Обидва графіки походять з однієї моделі. Дослід у теплиці відтворює ідею порівняння умов вирощування у Veggie."
  ],
  mapHelp: ["Click a building to walk there and open its controls. With WASD, walk to the door and press E. Space pauses time.", "Натисни на будівлю, і кадет дійде до неї та відкриє пульт. Якщо рухаєшся клавішами WASD, біля входу натисни E. Пауза — пробіл."],
  replayMission: ["Replay mission", "Почати місію заново"],
  solarOutput: ["SOLAR", "ПАНЕЛІ"],
  energyRate: ["u/s", "од./с"],
  exitRoom: ["Exit to map", "Вийти на карту"],
  stationRidge: ["Rock outcrop", "Скельний вихід"],
  stationBasin: ["Regolith site", "Ділянка реголіту"],
  defenseSources: ["Technical sources for the simulation", "Технічні джерела симуляції"],
  paperPower: ["NASA NTRS · Mars Surface Power Generation", "NASA NTRS · Енергетика на поверхні Марса"],
  paperPowerUse: [" — dust opacity explains the drop in available solar energy.", " — пил знижує прозорість атмосфери й вихід сонячної енергії."],
  paperVeggie: ["NASA NTRS · Veggie technical paper", "NASA NTRS · Технічна доповідь Veggie"],
  paperVeggieUse: [" — light, water and delayed growth. The ISS lettuce experiment took 33 days.", " — світло, вода й тривалість росту. Експеримент із салатом на МКС тривав 33 дні."],
  paperSampling: ["NASA NTRS · Perseverance presentation", "NASA NTRS · Презентація Perseverance"],
  paperSamplingUse: [" — samples are collected from different targets with context. The lab and its results in this mission are fictional.", " — зразки беруть із різних ділянок і фіксують місце відбору. Лабораторія та її результати в місії змодельовані."],
  commander: ["MISSION COMMANDER", "КОМАНДИР МІСІЇ"],
  editAvatar: ["Customize astronaut", "Налаштувати астронавта"],
  callSign: ["Call sign", "Позивний"],
  helmet: ["Helmet", "Шолом"],
  classicHelmet: ["Classic", "Класичний"],
  panoramaHelmet: ["Panoramic", "Панорамний"],
  pilotHelmet: ["Pilot", "Шолом пілота"],
  suit: ["Suit color", "Колір скафандра"],
  orangeSuit: ["Copper", "Мідний"],
  blueSuit: ["Blue", "Синій"],
  greenSuit: ["Green", "Зелений"],
  whiteSuit: ["White", "Білий"],
  patch: ["Mission patch", "Емблема місії"],
  starPatch: ["Star", "Зірка"],
  moonPatch: ["Moon", "Місяць"],
  diamondPatch: ["Diamond", "Ромб"],
  saveAvatar: ["Save astronaut", "Зберегти астронавта"],
  cancelAvatar: ["Cancel", "Скасувати"],
  close: ["Close science notes", "Закрити наукові джерела"],
  closeAvatar: ["Close astronaut editor", "Закрити редактор астронавта"],
  stationSolar: ["Solar array", "Сонячні панелі"],
  stationGreenhouse: ["Greenhouse", "Теплиця"],
  stationHabitat: ["Habitat", "Житловий модуль"],
  stationShelter: ["Shelter", "Укриття"],
  stationStorage: ["Storage", "Склад"],
  "sourceButton": [
    "NASA data",
    "Дані NASA"
  ],
  "science": [
    "SCIENCE NOTES",
    "НАУКОВІ ДЖЕРЕЛА"
  ],
  "scienceHeading": [
    "From rover to outpost",
    "Від марсохода до бази"
  ],
  "model": [
    "The fictional crew scenario combines two separate real events. Energy, reserves, crop progress and radiation scores are simplified training units.",
    "Вигадана місія поєднує дві окремі реальні події. Енергію, запаси, ріст рослин та опромінення показано у спрощених ігрових одиницях."
  ],
  "dustHeading": [
    "2018 · Opportunity dust storm",
    "2018 · Пилова буря, яку спостерігав Opportunity"
  ],
  "dustBody": [
    "Opportunity had 21 Wh available on sol 5111. Six chart points anchor a normalized curve. The time scale, intermediate values and recovery are modeled.",
    "На 5111-й сол марсохід Opportunity мав 21 Вт·год доступної енергії. Шість точок із графіка задають нормалізовану криву. Масштаб часу, проміжні значення й відновлення змодельовані."
  ],
  "chartLink": [
    "Original NASA chart ↗",
    "Оригінальний графік NASA ↗"
  ],
  "solarHeading": [
    "2024 · Curiosity watches a solar storm",
    "2024 · Curiosity спостерігає сонячну бурю"
  ],
  "solarBody": [
    "NASA reported a dose of 8,100 μGy for the May 20 event at Curiosity's location. In the game, the shelter walls reduce exposure. Ventilation draws power to keep air safe inside.",
    "Під час події 20 травня NASA зафіксувало дозу 8100 мкГр у місці перебування Curiosity. У грі стіни укриття зменшують опромінення. Вентиляція потребує енергії, щоб підтримувати повітря придатним для дихання."
  ],
  "radLink": [
    "Curiosity RAD event ↗",
    "Вимірювання Curiosity RAD ↗"
  ],
  "systems": [
    "How the systems work",
    "Як працюють системи"
  ],
  "eclssIntro": [
    "Air cleaning and water recycling are based on functions of NASA's",
    "Очищення повітря й переробка води спираються на принципи системи NASA"
  ],
  "veggieIntro": [
    "Light, water and a delayed harvest follow the concept of NASA's",
    "Використання світла й води та поступовий ріст рослин спираються на"
  ],
  "veggieLink": [
    "Veggie experiments ↗",
    "експерименти NASA Veggie ↗"
  ],
  "shieldIntro": [
    "Crew sheltering follows NASA's",
    "Робота укриття спирається на"
  ],
  "shieldLink": [
    "radiation protection brief ↗",
    "огляд NASA щодо захисту від радіації ↗"
  ],
  "language": [
    "Language",
    "Мова"
  ],
  "chart": [
    "NASA chart showing Opportunity energy dropping as dust rises, reaching 21 watt-hours at sol 5111.",
    "Графік NASA показує, як із посиленням пилової бурі доступна енергія Opportunity падає до 21 Вт·год на 5111-й сол."
  ],
  "description": [
    "A junior astronaut training game. Run a Mars outpost through a dust storm using NASA rover observations.",
    "Тренажер для юних астронавтів. Керуй марсіанською базою під час пилової бурі за даними марсохода NASA."
  ]
};

const languages = {
  en: {
    title: "Sol 5111 — Mars Mission Trainer", defaultCallSign: "Cadet",
    start: (time) => `Start mission · ${time}`, pause: "Pause", resume: "Resume", guide: "Walk to", enter: "Enter", inspect: "Inspect",
    standby: "Walk up to a station", outcome: "View mission report", missionMenu: "Missions", nextMission: "Open mission 2",
    openGreenhouse: "Open greenhouse",
    selected: "Selected",
    walking: (name, destination) => `${name} on the way · ${destination}`,
    setupSteps: {
      greenhouse: { title: "Switch on greenhouse lights", required: "Required · Turn on one tray", ready: "Ready · At least one tray lit" },
      battery: { title: "Connect a spare battery", storage: "Optional · Pick it up in Storage", carried: "Optional · Connect it at the solar array", connected: "Ready · Reserve connected" },
      sensor: { title: "Install the dust sensor", storage: "Optional · Pick it up in Storage", carried: "Optional · Fit it at the solar array", installed: "Ready · Sensor recording" }
    },
    harvestGoal: (done) => done ? "Harvest complete · 1/1" : "Goal · Harvest one tray · 0/1",
    harvestNote: (count) => count === 1 ? "One tray harvested" : "Both trays harvested",
    foodRefilled: "Harvest added to rations",
    crewSheltered: "Crew in shelter",
    crewExposed: "Crew outside shelter",
    currentCharge: (value) => `At current load and sunlight · ${value}`,
    peakCharge: (value) => `Battery at peak dust · ${value}`,
    relativeSolar: (percent) => `${percent}% of clear sky`,
    onBattery: "Base drawing from the battery",
    powerShortfall: "Not enough power for the base",
    harvestDelta: (time, faster) => `Harvest ${time} ${faster ? "earlier" : "later"}`,
    chargeDelta: (time, longer) => `Battery lasts ${time} ${longer ? "longer" : "less"} at peak dust`,
    startsGrowth: "Starts growing the crop",
    stopsGrowth: "Growth will stop",
    startsDischarge: "Battery will start draining now",
    labBeforeStart: "Analysis will start when you launch the mission.",
    labPaused: "Analysis paused",
    radiationExpected: "Solar particles expected",
    roomAlerts: {
      dust: "Dust blocks sunlight → the panels supply less power.",
      warning: "Solar particle alert → move the crew into the shelter.",
      shelter: "Exposure is accumulating → keep the crew behind shielding."
    },
    shelterTradeoff: (outside, inside, draw) => `Exposure ${outside} → ${inside} pts/s · Ventilation adds ${draw} u/s to demand`,
    sharedGrid: (time, spare) => `At peak dust, both the current lights and shelter ventilation can run on battery for ${time}.${spare ? ` Your spare adds ${spare}.` : ""}`,
    lightCut: (tray, time) => `After the dust storm began, you reduced the light on tray ${tray} at ${time}.`,
    ventilationHeld: "Ventilation kept running while the crew sheltered throughout the particle event.",
    shelterResult: (time, ventilation) => `Shelter walls reduced exposure for ${time}. Ventilation ran for ${ventilation} of that time.`,
    firstHarvest: (time) => `The first harvest replenished the crew’s food at ${time}.`,
    outageReason: (time) => `The grid could not cover the load for ${time}. Turning down the lights or connecting the spare can protect life support.`,
    systemOffReason: (system, time) => `The ${system === "air" ? "air scrubber" : "water recycler"} was switched off for ${time}.`,
    foodReason: (harvested) => harvested ? "The first harvest did not cover the remaining food needs. Keep the second tray growing when the grid can support it." :
      "No tray ripened before the food ran out. Turn on a tray earlier and check the harvest estimate.",
    radiationReason: "The crew spent too much of the particle event outside shielding. Enter the shelter as soon as the alert comes in.",
    unlockNote: "Complete the Sol 7 rescue in the training campaign to unlock the extended campaign.",
    missions: {
      training: { name: "01 · DUST ON THE HORIZON", intro: "You run a Mars base. Grow food, keep the base powered during a dust storm, and shelter the crew when the solar particle alert arrives." },
      extended: { name: "02 · THE LONG STORM", intro: "A longer dust storm and less food. Set your growing plan before you start." }
    },
    phases: { ready: "SETUP", prepare: "OPERATIONS", dust: "DUST STORM", warning: "PARTICLE ALERT", shelter: "RADIATION STORM", recover: "RECOVERY", complete: "DEBRIEF" },
    brief: {
      ready: ["Prepare the outpost", ""],
      checked: ["Ready for launch", "Your growing plan is set. You can still explore and set up equipment before starting the clock."],
      prepare: ["Outpost running", "The lights grow food. The solar panels power the base and recharge its battery."],
      dust: ["Dust reduces sunlight", "Less sunlight means less power. The greenhouse and shelter share the battery. Check how long it can run both."],
      warning: ["Solar particle alert", "Move the crew into the shelter before solar particles arrive."],
      shelter: ["Solar particle event", "The exposure meter now tracks the crew’s cumulative dose in training points."],
      protected: ["Crew behind shielding", "The shelter walls reduce the rate of exposure."],
      recover: ["The sky is clearing", "Solar output is rising again. The particle alert has ended."],
      complete: ["Mission complete", "The crew survived and harvested food."],
      partial: ["Crew safe, harvest missed", "The crew survived on stored rations."],
      failed: ["Mission interrupted", ""]
    },
    hints: {
      ready: "Try bright light in tray 1 and dim light in tray 2. Pick up the sensor and spare battery in Storage. Install the sensor next to the solar panels.",
      prepare: "Check the sensor before the sky darkens. This gives you a clear-sky reading to compare with the storm.",
      dust: "Compare time to harvest with time to battery depletion. If the battery will run out first, dim a tray or connect the spare.",
      warning: "Walk to the shelter and use its control to move the crew behind the shielding. Ventilation adds to the electrical load.",
      shelter: "Keep the crew sheltered until the countdown ends. If battery runtime is short, pause and reduce greenhouse demand.",
      recover: "Return the crew from the shelter. If a tray still needs light, check that the panels can support it."
    },
    hardHints: {
      ready: "One tray needs to mature before stored food runs out. Establish a power reserve while the sky is clear.",
      prepare: "You can monitor the remaining food time and use it as a deadline for the first harvest.",
      dust: "Check how long the crew can tolerate lower air or water production if you need to free power.",
      warning: "Use your shelter plan from the first mission. Check the battery and ventilation.",
      shelter: "Compare the remaining storm time with battery and air reserves.",
      recover: "Compare your harvests, rations and lowest charge against the first mission."
    },
    room: {
      greenhouse: "Two trays of the same crop share water and start at the same growth level. Choose a light setting for each.",
      habitat: "The air scrubber, water recycler and sample analyzer share the grid.",
      shelter: "Shielding reduces exposure. Ventilation draws power while the crew stays inside.",
      solar: "The array supplies the grid. The sensor tracks how the modeled dust storm changes the sunlight reaching it.",
      storage: "Equipment available for transfer to the solar array.",
      ridge: "Catalogue the rock for comparison in the habitat lab.",
      basin: "Catalogue loose regolith for comparison with the rock sample."
    },
    roomHint: {
      greenhouse: "Compare time to harvest with battery runtime and the crew’s food deadline. Changing light can help the crew and changes the experiment.",
      habitat: "If the battery is low, wait to run the analyzer. Turning off the scrubber or recycler saves power and lowers the corresponding reserve.",
      shelter: "Use the shelter control to move the crew behind shielding. Release the crew after the alert clears to save energy.",
      solar: "Install the sensor early to capture a baseline. The spare battery takes over automatically when the main battery is depleted.",
      storage: "Carry both items to the solar array. You can do this while time is paused.",
      ridge: "Bring the sample to the habitat and use the analyzer when you have spare power.",
      basin: "Bring the sample to the habitat and use the analyzer when you have spare power."
    },
    instruments: { battery: "Battery", air: "Air", water: "Water", food: "Rations", crop: "Next crop", radiation: "Exposure · pts" },
    lights: { off: "Off", dim: "Dim", full: "Bright" },
    charge: "Charge holds", noHarvest: "No growth", harvested: "Both trays harvested", unripe: "unripe",
    batteryETA: (time) => `Charge lasts ${time}`, foodETA: (time) => `Food left for ${time}`, cropETA: (time) => `Harvest in ${time}`,
    exposureNow: (rate) => `+${rate} pts/s`, noExposure: "No radiation event",
    systemState: (active) => active ? "Running" : "Offline", noPower: "No power",
    particleCountdown: (time) => `Particles arrive in ${time}`,
    particleRemaining: (time) => `Particle event ends in ${time}`,
    projected: "Forecast at constant light and water, with battery runtime at peak dust.",
    power: (solar, load, reserve, relative) => `Solar ${solar} u/s (${relative}) · Demand ${load} u/s · Spare charge ${reserve} u`,
    tray: (number) => `Tray ${number}`,
    trayReady: (time, energy) => `Harvested at ${time} · ${energy} u of light energy`,
    trayLive: (growth, energy) => `${growth}% grown · ${energy} u of light energy`,
    trayResult: (number, harvest, energy, pause) => `Tray ${number} · ${harvest} · ${energy} u of light energy · ${pause} without growth`,
    trayComparison: (number, time, energy) => `Tray ${number} finished ${time} earlier and used ${energy} more units of light energy.`,
    pick: "Pick up spare battery", connect: "Connect spare battery", collect: "Collect sample",
    lab: "Analyze next sample", air: "Air scrubber", water: "Water recycler", ventilation: "Shelter crew and ventilate",
    shelterStatus: (rate, online) => `Exposure during the event +${rate} pts/s · Ventilation ${online ? "running" : "offline"}`,
    pickSensor: "Pick up dust sensor", installSensor: "Install dust sensor", sensorPicked: "Sensor carried. Install it at the solar array.",
    sensorAtStorage: "Available in Storage", cargoTaken: "Taken", connected: "Connected", sensorOnline: "Recording",
    batteryAtStorage: "Spare battery is in Storage", chartTime: (end) => `Mission time · 00:00 to ${end}`,
    sensorItem: "Carrying sensor", batteryItem: "Carrying spare battery",
    sensorReading: (time, opacity, solar, count) => `${time} · Opacity ${opacity}/100 · Solar ${solar}% of clear sky · ${count} readings`,
    sensorResult: (count, solar) => `Sensor · ${count} readings · lowest solar output ${solar}% of clear sky`,
    totalTime: "Mission clock",
    runScore: (run) => `Harvests ${run.harvests} · Food remaining ${run.food}% · Lowest stored charge ${run.energy} u`,
    previousScore: (line) => `Mission 1 result · ${line}`,
    exposureTotal: (amount) => `Total exposure ${amount} pts`,
    reserveUsed: (amount) => `Spare battery supplied ${amount} u`,
    feedback: { pick: "Battery carried. Bring it to the solar array.", connect: "Reserve connected. It kicks in when the main battery empties.", collect: "Sample catalogued. Analyze it in the habitat.", queued: "Analysis running", sampleDone: "Analysis complete" },
    failures: { air: "The air reserve ran out. Check grid load and the scrubber.", water: "The water reserve ran out. Check grid load and the recycler.", food: "The crew ran out of food before the next harvest.", radiation: "The crew exceeded the simulated exposure limit. Move them to the shelter earlier." },
    sampleResult: { ridge: "Rock sample · coarse grains consistent with slow cooling.", basin: "Regolith · mixed dust and rock fragments. Mineral analysis could help identify their origin." }
  },
  uk: {
    title: "Sol 5111 — Тренажер марсіанської місії", defaultCallSign: "Кадет",
    start: (time) => `Почати місію · ${time}`, pause: "Пауза", resume: "Продовжити", guide: "Іти до модуля", enter: "Увійти", inspect: "Оглянути",
    standby: "Підійди до модуля", outcome: "Переглянути звіт", missionMenu: "Місії", nextMission: "Відкрити місію 2",
    openGreenhouse: "Відкрити теплицю",
    selected: "Обрано",
    walking: (name, destination) => `${name} у дорозі · ${destination}`,
    setupSteps: {
      greenhouse: { title: "Увімкни світло в теплиці", required: "Обов’язково · Освіти хоча б один лоток", ready: "Готово · Світло ввімкнено" },
      battery: { title: "Під’єднай резервну батарею", storage: "Додатково · Забери батарею зі складу", carried: "Додатково · Під’єднай батарею біля панелей", connected: "Готово · Резерв під’єднано" },
      sensor: { title: "Встанови датчик пилу", storage: "Додатково · Забери датчик зі складу", carried: "Додатково · Встанови датчик біля панелей", installed: "Готово · Датчик збирає дані" }
    },
    harvestGoal: (done) => done ? "Урожай зібрано · 1/1" : "Ціль · Збери врожай з одного лотка · 0/1",
    harvestNote: (count) => count === 1 ? "Зібрано один лоток" : "Зібрано обидва лотки",
    foodRefilled: "Врожай поповнив запаси їжі",
    crewSheltered: "Екіпаж в укритті",
    crewExposed: "Екіпаж поза укриттям",
    currentCharge: (value) => `За поточних умов · ${value}`,
    peakCharge: (value) => `Заряд на піку бурі · ${value}`,
    relativeSolar: (percent) => `${percent}% від ясного неба`,
    onBattery: "База працює від батареї",
    powerShortfall: "Базі бракує живлення",
    harvestDelta: (time, faster) => `Врожай на ${time} ${faster ? "раніше" : "пізніше"}`,
    chargeDelta: (time, longer) => `На піку бурі заряду на ${time} ${longer ? "більше" : "менше"}`,
    startsGrowth: "Рослини почнуть рости",
    stopsGrowth: "Ріст зупиниться",
    startsDischarge: "База почне витрачати заряд зараз",
    labBeforeStart: "Аналіз почнеться після запуску місії.",
    labPaused: "Аналіз на паузі",
    radiationExpected: "Очікується потік сонячних частинок",
    roomAlerts: {
      dust: "Пил затуляє сонце → панелі виробляють менше енергії.",
      warning: "Наближаються сонячні частинки → переведи екіпаж в укриття.",
      shelter: "Опромінення зростає → тримай екіпаж за захисними стінами."
    },
    shelterTradeoff: (outside, inside, draw) => `Опромінення ${outside} → ${inside} бала/с · Вентиляція додає ${draw} од./с до витрат`,
    sharedGrid: (time, spare) => `На піку бурі заряду для поточного світла й вентиляції вистачить на ${time}.${spare ? ` Резерв додає ${spare}.` : ""}`,
    lightCut: (tray, time) => `Після початку пилової бурі ти зменшила або вимкнула світло в лотку ${tray} на позначці ${time}.`,
    ventilationHeld: "Екіпаж залишався в укритті з робочою вентиляцією протягом усієї радіаційної події.",
    shelterResult: (time, ventilation) => `Стіни укриття зменшували опромінення протягом ${time}. Із цього часу вентиляція працювала ${ventilation}.`,
    firstHarvest: (time) => `Перший урожай поповнив запас їжі на позначці ${time}.`,
    outageReason: (time) => `Мережі бракувало енергії протягом ${time}. Приглушене світло або резервна батарея можуть зберегти живлення систем життєзабезпечення.`,
    systemOffReason: (system, time) => `${system === "air" ? "Очищувач повітря" : "Переробник води"} було вимкнено протягом ${time}.`,
    foodReason: (harvested) => harvested ? "Першого врожаю не вистачило до кінця місії. Підтримуй ріст другого лотка, коли мережа має запас потужності." :
      "Їжа закінчилася до першого врожаю. Увімкни освітлення раніше й перевір час дозрівання.",
    radiationReason: "Екіпаж надто довго залишався поза захистом під час радіаційної події. Переходь в укриття одразу після тривоги.",
    unlockNote: "Заверши евакуацію на сьомий сол у навчальній місії, щоб відкрити тривалу кампанію.",
    missions: {
      training: { name: "01 · ПИЛ НА ГОРИЗОНТІ", intro: "Ти керуєш базою на Марсі. Вирости їжу, підтримуй живлення під час пилової бурі й укрий екіпаж, коли надійде сонячна тривога." },
      extended: { name: "02 · ТРИВАЛА БУРЯ", intro: "Довша пилова буря й менший запас їжі. Перед початком налаштуй теплицю." }
    },
    phases: { ready: "ПІДГОТОВКА", prepare: "РОБОТА БАЗИ", dust: "ПИЛОВА БУРЯ", warning: "СОНЯЧНА ТРИВОГА", shelter: "РАДІАЦІЙНА БУРЯ", recover: "ВІДНОВЛЕННЯ", complete: "ПІДСУМКИ" },
    brief: {
      ready: ["Підготуй базу", ""],
      checked: ["База готова до старту", "Освітлення налаштовано. До запуску таймера ще можна оглянути базу й підготувати обладнання."],
      prepare: ["База працює", "Освітлення допомагає рослинам рости. Сонячні панелі живлять базу й заряджають батарею."],
      dust: ["Пил затуляє сонце", "Панелі виробляють менше. Теплиця й укриття живляться від однієї батареї. Перевір, на скільки її вистачить для обох."],
      warning: ["Сонячна тривога", "Переведи екіпаж в укриття до приходу сонячних частинок."],
      shelter: ["Потік сонячних частинок", "Лічильник показує накопичене опромінення екіпажу в умовних балах."],
      protected: ["Екіпаж під захистом", "За стінами укриття опромінення накопичується повільніше."],
      recover: ["Небо прояснюється", "Виробіток панелей зростає. Сонячна тривога минула."],
      complete: ["Місію виконано", "Екіпаж пережив обидві події та зібрав врожай."],
      partial: ["Екіпаж у безпеці, врожаю бракує", "Екіпаж протримався на запасах їжі."],
      failed: ["Місію перервано", ""]
    },
    hints: {
      ready: "Спробуй яскраве світло в першому лотку й приглушене в другому. Забери зі складу датчик і батарею, а датчик встанови біля панелей.",
      prepare: "Перевір датчик за ясного неба. Так матимеш початкове вимірювання для порівняння з бурею.",
      dust: "Порівняй час до врожаю із запасом заряду. Якщо заряд закінчиться раніше, приглуши світло в одному лотку або під’єднай резервну батарею.",
      warning: "Іди до укриття й переведи екіпаж за захисні стіни за допомогою пульта. Вентиляція збільшить витрати енергії.",
      shelter: "Залишай екіпаж в укритті до завершення відліку. Якщо заряду мало, постав гру на паузу й зменш споживання теплиці.",
      recover: "Виведи екіпаж з укриття. Якщо лотку ще потрібне світло, перевір, чи вистачає виробітку панелей."
    },
    hardHints: {
      ready: "Хоча б один лоток має дозріти до того, як вичерпаються пайки. Підготуй резерв, поки небо ясне.",
      prepare: "Поглянь, на скільки вистачить їжі. Це крайній термін для першого врожаю.",
      dust: "Якщо треба зекономити енергію, перевір, на скільки вистачить повітря або води без поповнення.",
      warning: "Застосуй план укриття з першої місії. Перевір батарею й вентиляцію.",
      shelter: "Порівняй час до завершення тривоги із запасами заряду й повітря.",
      recover: "Порівняй врожаї, їжу й найнижчий запас заряду з першою місією."
    },
    room: {
      greenhouse: "Два лотки з однаковою культурою, поливом і початковим ростом. Вибери освітлення для кожного.",
      habitat: "Очищувач повітря, переробник води й аналізатор живляться від однієї мережі.",
      shelter: "Стіни зменшують опромінення. Поки екіпаж в укритті, вентиляція споживає енергію.",
      solar: "Панелі живлять базу. Датчик показує, як змодельована буря впливає на доступне сонячне світло.",
      storage: "Обладнання можна перенести до сонячних панелей.",
      ridge: "Зареєструй зразок породи для порівняння в лабораторії.",
      basin: "Зареєструй реголіт для порівняння зі зразком породи."
    },
    roomHint: {
      greenhouse: "Порівняй час до врожаю із зарядом і запасом їжі. Зміна світла може допомогти екіпажу й впливає на результати досліду.",
      habitat: "За низького заряду відклади роботу аналізатора. Вимкнення очищувача або переробника економить енергію й зменшує відповідний запас.",
      shelter: "Скористайся пультом, щоб укрити екіпаж. Після тривоги виведи екіпаж, щоб заощадити енергію.",
      solar: "Встанови датчик до бурі, щоб мати початкові показники. Резервна батарея увімкнеться, коли розрядиться основна.",
      storage: "Віднеси обидва прилади до панелей. Це можна зробити на паузі.",
      ridge: "Віднеси зразок у житловий модуль і запусти аналіз за наявності енергії.",
      basin: "Віднеси зразок у житловий модуль і запусти аналіз за наявності енергії."
    },
    instruments: { battery: "Батарея", air: "Повітря", water: "Вода", food: "Їжа", crop: "Наступний врожай", radiation: "Опромінення · бали" },
    lights: { off: "Вимкнено", dim: "Приглушене", full: "Яскраве" },
    charge: "Заряд тримається", noHarvest: "Ріст зупинено", harvested: "Обидва лотки зібрано", unripe: "не дозрів",
    batteryETA: (time) => `Заряду на ${time}`, foodETA: (time) => `Їжі на ${time}`, cropETA: (time) => `Врожай за ${time}`,
    exposureNow: (rate) => `+${rate} бала/с`, noExposure: "Радіаційної події немає",
    systemState: (active) => active ? "Працює" : "Вимкнено", noPower: "Бракує живлення",
    particleCountdown: (time) => `До потоку частинок ${time}`,
    particleRemaining: (time) => `До кінця потоку ${time}`,
    projected: "Час до врожаю за незмінного світла й поливу. Запас заряду наведено для піку пилової бурі.",
    power: (solar, load, reserve, relative) => `Панелі ${solar} од./с (${relative}) · Витрати ${load} од./с · Резерв ${reserve} од.`,
    tray: (number) => `Лоток ${number}`,
    trayReady: (time, energy) => `Зібрано на ${time} · ${energy} од. енергії на світло`,
    trayLive: (growth, energy) => `Ріст ${growth}% · ${energy} од. енергії на світло`,
    trayResult: (number, harvest, energy, pause) => `Лоток ${number} · ${harvest} · ${energy} од. енергії на світло · ${pause} без росту`,
    trayComparison: (number, time, energy) => `Лоток ${number} дозрів на ${time} раніше й витратив на світло на ${energy} од. енергії більше.`,
    pick: "Забрати резервну батарею", connect: "Під’єднати резервну батарею", collect: "Відібрати зразок",
    lab: "Аналізувати наступний зразок", air: "Очищення повітря", water: "Переробка води", ventilation: "Укрити екіпаж і ввімкнути вентиляцію",
    shelterStatus: (rate, online) => `Опромінення під час події +${rate} бала/с · Вентиляція ${online ? "працює" : "вимкнена"}`,
    pickSensor: "Забрати датчик пилу", installSensor: "Встановити датчик пилу", sensorPicked: "Датчик у тебе. Встанови його біля сонячних панелей.",
    sensorAtStorage: "Доступно на складі", cargoTaken: "Забрано", connected: "Під’єднано", sensorOnline: "Збирає дані",
    batteryAtStorage: "Резервна батарея на складі", chartTime: (end) => `Час місії · від 00:00 до ${end}`,
    sensorItem: "Несеш датчик пилу", batteryItem: "Несеш резервну батарею",
    sensorReading: (time, opacity, solar, count) => `${time} · Запиленість ${opacity}/100 · Виробіток ${solar}% від ясного неба · Вимірювань ${count}`,
    sensorResult: (count, solar) => `Датчик · Вимірювань ${count} · Найнижчий виробіток ${solar}% від ясного неба`,
    totalTime: "Час місії",
    runScore: (run) => `Врожаї ${run.harvests} · Залишок їжі ${run.food}% · Найнижчий запас заряду ${run.energy} од.`,
    previousScore: (line) => `Результат місії 1 · ${line}`,
    exposureTotal: (amount) => `Сумарне опромінення ${amount} бала`,
    reserveUsed: (amount) => `Резервна батарея віддала ${amount} од.`,
    feedback: { pick: "Батарея в тебе. Віднеси її до панелей.", connect: "Резерв під’єднано. Він увімкнеться, якщо розрядиться основна батарея.", collect: "Зразок зареєстровано. Проаналізуй його в житловому модулі.", queued: "Триває аналіз", sampleDone: "Аналіз завершено" },
    failures: { air: "Закінчився запас повітря. Перевір витрати енергії й очищувач.", water: "Закінчився запас води. Перевір витрати енергії й переробник.", food: "Екіпаж використав усю їжу до наступного врожаю.", radiation: "Екіпаж досяг умовної межі опромінення. Переведи його в укриття раніше." },
    sampleResult: { ridge: "Порода · грубі зерна, які могли сформуватися під час повільного охолодження.", basin: "Реголіт · пил і уламки порід. Визначення мінерального складу допомогло б з’ясувати їхнє походження." }
  }
};

languages.en.campaign = {
  sol: (day, total) => `SOL ${day} / ${total}`,
  orbital: (day) => `MRO ORBITAL REPORT · SOL ${day} · SIMULATED`,
  setupIntro: "Set up the outpost before the seven-sol clock starts. A light in at least one tray is required. Collect a regolith sample for the lab if you have time.",
  tutorialProgress: (step, total) => `TRAINING · ${step}/${total}`,
  tutorial: [
    ["Explore the outpost", "Click a building to walk there and open its controls. Use WASD or the arrow keys to walk manually. Press E at a doorway. Try moving the cadet on the map."],
    ["One grid, six readings", "Battery, air, water and food are reserves. Crop shows the next harvest and exposure shows the radiation dose. Every powered system shares one grid. Press Space to pause and plan."],
    ["Prepare before starting the clock", "Turn on a greenhouse tray. Carry the spare battery and dust sensor from Storage to the solar panels. The battery supplies backup power, and the sensor shows how dust affects the panels."]
  ],
  reports: [
    ["Sol 1 · Check the outpost", "Cloud bands are approaching. This is your best chance to install the dust sensor, connect the spare battery and analyze regolith in the habitat."],
    ["Sol 2 · Dust is cutting solar output", "Expect roughly 60–70% of clear-sky output by the start of Sol 3. Dim a tray if you need to save charge for the next shift."],
    ["Sol 3 · Greenhouse seal under strain", "Wind is driving dust against the dome. If it breaks through, seal the dome and analyze regolith to unlock the cleanup recipe."],
    ["Sol 4 · Clear the greenhouse", "Cleanup draws extra power while the trays cannot grow. Turn down unused lights. A separate solar particle alert is expected before the next sol."],
    ["Sol 5 · Solar particle event", "Mission Control relays a space-weather alert. Get behind shielding. You must leave the shelter before servicing equipment outside."],
    ["Sol 6 · Solar output near its minimum", "Expect as little as 10% of clear-sky output. The landing beacon is available now. Budget for life support and keep the beacon powered through touchdown."],
    ["Sol 7 · Shuttle on final approach", "The landing beacon needs 12 seconds of continuous power to lock on. Keep it powered until touchdown, with a clean greenhouse and a harvested tray."]
  ],
  regolithPrep: { title: "Prepare the regolith analysis", missing: "Optional now · Collect regolith at the marked site", carried: "Optional now · Queue its analysis in the habitat", queued: "Ready · Analysis begins when the clock starts" },
  phaseHints: {
    prepare: "Collect regolith at the marked site and run its analysis in the habitat. The recipe is available even if you analyze it before the breach.",
    breach: "Seal the dome first to stop the rise in contamination. Analyze regolith in the habitat, then start the cleanup when the grid has enough power.",
    beacon: "If you lack charge at the start of Sol 6, let output recover before activating the beacon. Leave at least 12 seconds until touchdown."
  },
  growthLocked: "Growth blocked by contamination",
  toxins: (amount) => `Greenhouse contamination · ${amount}%`,
  toxinsStatus: (amount, open, eta) => `Contamination ${amount}% · ${open ? "Dust entering through the breach" : eta ? `Cleanup needs ${eta} of powered time` : "Breach sealed. Growth remains blocked until cleanup."}`,
  clean: "Greenhouse clean",
  breachAlert: "Greenhouse breach → dust and perchlorates are blocking growth.",
  signalReady: "Landing signal locked",
  signalNeeded: "Landing beacon needed",
  signalProgress: (time) => `Signal locks after ${time} of continuous power`,
  beaconRoom: "The shuttle needs this signal to find the landing pad. A blackout cancels the lock. Keep power on until touchdown.",
  beaconToggle: "Power the landing beacon",
  stopBeacon: "Switch off the landing beacon",
  beaconCost: (cost, seconds) => `${cost} u/s · Needs ${seconds} seconds of continuous power. Switching off resets the signal.`,
  seal: "Seal the greenhouse breach",
  sealCost: "0 u/s · Stops new dust from entering. Contamination already inside still blocks growth.",
  decon: "Run perchlorate cleanup",
  pauseDecon: "Pause perchlorate cleanup",
  deconCost: (cost) => `${cost} u/s while running · Restores growth after cleanup. High demand can drain the battery.`,
  needSeal: "Seal the breach first",
  needFormula: "Analyze regolith to unlock the recipe",
  leaveShelter: "Leave shelter",
  shield: (cost) => `Shelter cuts exposure by about 87% · Ventilation draws ${cost} u/s · You cannot service outside modules while inside.`,
  unshield: (cost) => `Saves ${cost} u/s and restores map access · The crew will be exposed during the particle event.`,
  draw: (power) => `${power} u/s`,
  lifeSupport: {
    air: (power, on) => `${on ? "Running" : "Off"} · ${power} u/s · Switching off saves power while the air reserve falls.`,
    water: (power, on) => `${on ? "Running" : "Off"} · ${power} u/s · Switching off saves power while the water reserve falls.`
  },
  analyze: { basin: "Analyze regolith", ridge: "Analyze rock" },
  needSample: "Collect the sample outside first",
  labCost: (cost, sample) => `${cost} u/s for 16 seconds · ${sample === "basin" ? "Unlocks greenhouse cleanup" : "Cuts water recycling draw by 15%"} · Adds to grid demand`,
  fieldActions: {
    pack: "0 u/s · Carry it to the panels for backup during a deficit.",
    connect: "0 u/s · Adds a finite reserve. It takes over when the main battery runs out.",
    sensor: "0 u/s · Carry it to the panels to measure the storm.",
    install: "0 u/s in this model · Records when output falls. Install early for a clear-sky baseline.",
    sample: "0 u/s · Bring it to the habitat lab. Outside, you are exposed during a solar particle event."
  },
  cleanResult: (time) => `The regolith analysis unlocked cleanup. At ${time} the cleanup finished, so plants could grow again.`,
  filterResult: "The rock analysis cut the water recycler’s electrical draw by 15%.",
  signalResult: "The landing beacon held a continuous powered signal through touchdown.",
  rescueTitle: "Rescue shuttle on the ground",
  rescue: "The shuttle has touched down at Sol 5111. You’re aboard, the outpost is secured, and the evacuation is complete.",
  ranks: ["Cadet", "Flight Engineer", "Mission Commander"],
  rank: (name) => `Engineering rank · ${name}`,
  failures: {
    toxins: "Greenhouse lost. Perchlorate contamination reached 100%. Seal the dome as soon as dust gets in, then run cleanup.",
    contamination: "The shuttle reached the outpost, but the greenhouse was still contaminated. Analyze regolith and budget power for cleanup earlier.",
    harvest: "The greenhouse was safe, but no crop was harvested. Start a tray earlier or restore lighting after cleanup.",
    beacon: "The shuttle could not land without a stable beacon signal. Enable the beacon on Sol 6 or 7 and supply at least 12 uninterrupted seconds of power through touchdown.",
    radiation: "Exposure exceeded the training limit. Get behind the shelter walls before the solar particles arrive.",
    air: "The breathable air reserve ran out. Check the scrubber, the battery and what else was drawing power."
  }
};

languages.uk.campaign = {
  sol: (day, total) => `СОЛ ${day} / ${total}`,
  orbital: (day) => `ОРБІТАЛЬНЕ ЗВЕДЕННЯ MRO · СОЛ ${day} · СИМУЛЯЦІЯ`,
  setupIntro: "Підготуй базу до відліку семи солів. Потрібно освітити хоча б один лоток. За можливості відбери зразок реголіту для лабораторії.",
  tutorialProgress: (step, total) => `НАВЧАННЯ · ${step}/${total}`,
  tutorial: [
    ["Оглянь аванпост", "Натисни на будівлю, щоб дійти до неї й відкрити пульт. Для ручного руху використовуй WASD або стрілки, біля входу натискай E. Спробуй пройтися картою."],
    ["Одна мережа й шість показників", "Батарея, повітря, вода та їжа — це запаси. Ріст показує, скільки лишилося до врожаю, а опромінення — накопичену дозу. Усі прилади живляться від однієї мережі. Пробіл ставить гру на паузу."],
    ["Підготуйся до запуску таймера", "Увімкни світло над одним лотком. Віднеси резервну батарею й датчик пилу зі складу до панелей. Батарея підхопить живлення, а датчик покаже, як пил знижує виробіток."]
  ],
  reports: [
    ["Сол 1 · Перевірка бази", "Наближаються хмари пилу. Саме час встановити датчик, під’єднати резервну батарею й проаналізувати реголіт у житловому модулі."],
    ["Сол 2 · Пил знижує виробіток", "До початку третього солу очікуємо близько 60–70% виробітку за ясного неба. Приглуши світло в лотку, якщо треба зберегти заряд."],
    ["Сол 3 · Купол теплиці під загрозою", "Вітер несе пил на купол. Якщо герметичність порушиться, закрий пробоїну та проаналізуй реголіт, щоб отримати формулу очищення."],
    ["Сол 4 · Знезараження теплиці", "Під час очищення рослини ще не ростуть, а система потребує додаткового живлення. Вимкни зайве світло. До наступного солу можлива окрема сонячна тривога."],
    ["Сол 5 · Потік сонячних частинок", "Центр керування передає радіаційну тривогу. Йди за захисні стіни. Для ремонту інших модулів доведеться вийти з укриття."],
    ["Сол 6 · Мало сонячної енергії", "Виробіток може впасти до 10% від ясного неба. Маяк доступний. Розподіли заряд між життєзабезпеченням і сигналом шатла."],
    ["Сол 7 · Шатл заходить на посадку", "Маяку потрібно 12 секунд безперервного живлення для захоплення сигналу. Тримай його ввімкненим до посадки, очисть теплицю та збери врожай."]
  ],
  regolithPrep: { title: "Підготуй аналіз реголіту", missing: "Можна заздалегідь · Відбери реголіт на карті", carried: "Можна заздалегідь · Заплануй аналіз у житловому модулі", queued: "Готово · Аналіз почнеться із запуском таймера" },
  phaseHints: {
    prepare: "Відбери реголіт на позначеній ділянці й проаналізуй його в житловому модулі. Формулу можна отримати до аварії.",
    breach: "Спочатку закрий пробоїну, щоб забруднення не зростало. Проаналізуй реголіт у лабораторії, потім запусти очищення, коли вистачатиме енергії.",
    beacon: "Якщо на початку шостого солу заряду мало, дочекайся відновлення виробітку. Залиш щонайменше 12 секунд до посадки, щоб маяк захопив сигнал."
  },
  growthLocked: "Забруднення зупинило ріст",
  toxins: (amount) => `Забруднення теплиці · ${amount}%`,
  toxinsStatus: (amount, open, eta) => `Забруднення ${amount}% · ${open ? "Пил потрапляє через пробоїну" : eta ? `На очищення потрібне живлення протягом ${eta}` : "Купол герметичний. Ріст відновиться після очищення."}`,
  clean: "Теплицю очищено",
  breachAlert: "Порушено герметичність теплиці → пил із перхлоратами зупинив ріст.",
  signalReady: "Маяк тримає сигнал",
  signalNeeded: "Потрібен сигнал маяка",
  signalProgress: (time) => `До захоплення сигналу потрібно ${time} безперервного живлення`,
  beaconRoom: "За цим сигналом шатл знаходить майданчик. Без живлення маяк втрачає захоплення. Тримай його ввімкненим до посадки.",
  beaconToggle: "Увімкнути посадковий маяк",
  stopBeacon: "Вимкнути посадковий маяк",
  beaconCost: (cost, seconds) => `${cost} од./с · Потрібно ${seconds} с безперервного живлення. Вимкнення скидає сигнал.`,
  seal: "Загерметизувати купол",
  sealCost: "0 од./с · Зупиняє надходження пилу. Забруднення всередині ще блокує ріст.",
  decon: "Запустити очищення від перхлоратів",
  pauseDecon: "Призупинити очищення",
  deconCost: (cost) => `${cost} од./с під час роботи · Повертає ріст після очищення. Високе навантаження може розрядити батарею.`,
  needSeal: "Спочатку загерметизуй купол",
  needFormula: "Проаналізуй реголіт, щоб отримати формулу",
  leaveShelter: "Вийти з укриття",
  shield: (cost) => `Укриття зменшує опромінення приблизно на 87% · Вентиляція потребує ${cost} од./с · Поки ти всередині, інші модулі недоступні.`,
  unshield: (cost) => `Економить ${cost} од./с і відкриває доступ до карти · Під час потоку частинок опромінення зростатиме швидше.`,
  draw: (power) => `${power} од./с`,
  lifeSupport: {
    air: (power, on) => `${on ? "Працює" : "Вимкнено"} · ${power} од./с · Вимкнення економить енергію, але запас повітря падає.`,
    water: (power, on) => `${on ? "Працює" : "Вимкнено"} · ${power} од./с · Вимкнення економить енергію, але запас води падає.`
  },
  analyze: { basin: "Проаналізувати реголіт", ridge: "Проаналізувати породу" },
  needSample: "Спочатку відбери зразок на карті",
  labCost: (cost, sample) => `${cost} од./с протягом 16 с · ${sample === "basin" ? "Відкриває очищення теплиці" : "Зменшує витрати переробника води на 15%"} · Збільшує навантаження на мережу`,
  fieldActions: {
    pack: "0 од./с · Віднеси до панелей для резервного живлення.",
    connect: "0 од./с · Додає запас енергії. Резерв вмикається після розряду основної батареї.",
    sensor: "0 од./с · Віднеси до панелей, щоб виміряти наслідки бурі.",
    install: "0 од./с у цій моделі · Записує падіння виробітку. Для порівняння встанови за ясного неба.",
    sample: "0 од./с · Віднеси зразок до лабораторії. Під час радіаційної події надворі зростає опромінення."
  },
  cleanResult: (time) => `Аналіз реголіту відкрив очищення. На позначці ${time} очищення завершилося, і рослини знову могли рости.`,
  filterResult: "Аналіз породи зменшив витрати енергії на переробку води на 15%.",
  signalResult: "Посадковий маяк тримав безперервний сигнал до приземлення.",
  rescueTitle: "Рятувальний шатл приземлився",
  rescue: "Шатл успішно сів на майданчик Sol 5111. Ти на борту, аванпост у безпеці. Евакуацію завершено.",
  ranks: ["Кадет", "Бортінженер", "Командир місії"],
  rank: (name) => `Інженерний ранг · ${name}`,
  failures: {
    toxins: "Теплицю втрачено. Забруднення перхлоратами досягло 100%. Одразу загерметизуй купол і запусти очищення.",
    contamination: "Шатл дістався аванпосту, але теплиця залишилася забрудненою. Проаналізуй реголіт і раніше виділи енергію на очищення.",
    harvest: "Теплиця безпечна, але врожаю немає. Увімкни світло раніше або віднови його після очищення.",
    beacon: "Шатл не зміг сісти без стабільного сигналу. Увімкни маяк на шостий або сьомий сол і забезпеч щонайменше 12 секунд безперервного живлення до посадки.",
    radiation: "Опромінення перевищило навчальну межу. Зайди за стіни укриття до приходу сонячних частинок.",
    air: "Запас придатного для дихання повітря вичерпано. Перевір очищувач, заряд батареї та споживання інших систем."
  }
};

for (const [id, keys] of Object.entries({ en: ["GREENHOUSE BREACH", "RESCUE BEACON"], uk: ["ПРОБИТТЯ КУПОЛА", "РЯТУВАЛЬНИЙ МАЯК"] })) {
  languages[id].phases.breach = keys[0];
  languages[id].phases.beacon = keys[1];
}

function readLanguage() {
  try {
    return localStorage.getItem("sol-5111-language") === "uk" ? "uk" : "en";
  } catch {
    return "en";
  }
}

function applyLanguage(language) {
  const index = language === "uk" ? 1 : 0;
  document.documentElement.lang = language;
  document.title = languages[language].title;
  document.getElementById("language").value = language;
  document.getElementById("briefing-language").value = language;
  document.getElementById("avatar-name").placeholder = languages[language].defaultCallSign;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = staticText[element.dataset.i18n][index];
  });
  for (const attribute of ["aria-label", "alt", "content"]) {
    const marker = `data-i18n-${attribute}`;
    document.querySelectorAll(`[${marker}]`).forEach((element) => {
      element.setAttribute(attribute, staticText[element.getAttribute(marker)][index]);
    });
  }
}
