"use strict";

const staticText = {
  hint: ["Hint", "Підказка"],
  missions: ["Missions", "Місії"],
  mapLabel: ["Mars outpost", "Марсіанська база"],
  telemetry: ["Sensor readings", "Показники датчика"],
  dustChart: ["Opacity index · 0–100", "Індекс запиленості · 0–100"],
  solarChart: ["Solar output · normalized 0–10", "Виробіток панелей · шкала 0–10"],
  sensorScience: [
    "The game sensor uses an illustrative opacity index derived from the solar curve. Both plots share that model. The greenhouse mirrors the idea of comparing growing conditions in Veggie.",
    "Датчик показує умовний індекс запиленості, розрахований за кривою виробітку. Обидва графіки походять з однієї моделі. Дослід у теплиці відтворює ідею порівняння умов вирощування у Veggie."
  ],
  mapHelp: ["Select a location or walk with WASD. Press E to interact. Space pauses time.", "Вибери місце на карті або йди за допомогою WASD. Взаємодія — E. Пауза — пробіл."],
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
    unlockNote: "Keep the crew safe and harvest at least one tray in Mission 1 to unlock Mission 2.",
    missions: {
      training: { name: "01 · DUST ON THE HORIZON", intro: "Keep the crew safe and harvest food. Set the lights on at least one tray before starting the clock." },
      extended: { name: "02 · THE LONG STORM", intro: "A longer dust storm and less food. Set your growing plan before you start." }
    },
    phases: { ready: "SETUP", prepare: "OPERATIONS", dust: "DUST STORM", warning: "PARTICLE ALERT", shelter: "RADIATION STORM", recover: "RECOVERY", complete: "DEBRIEF" },
    brief: {
      ready: ["Prepare the outpost", ""],
      checked: ["Ready for launch", "Your growing plan is set. You can still explore and set up equipment before starting the clock."],
      prepare: ["Outpost running", "Keep the crew safe and harvest at least one tray."],
      dust: ["Dust reduces sunlight", "Solar output has dropped. The outpost draws on stored energy when demand exceeds output."],
      warning: ["Solar particle alert", "The solar particle event is separate from the dust storm."],
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
    exposureNow: (rate) => `+${rate} pts/s`, noExposure: "No active event",
    systemState: (active) => active ? "Running" : "Offline", noPower: "No power",
    particleCountdown: (time) => `Particles arrive in ${time}`,
    particleRemaining: (time) => `Particle event ends in ${time}`,
    projected: "Forecast at constant light and water, with battery runtime at peak dust.",
    power: (solar, load, reserve) => `Solar ${solar} u/s · Demand ${load} u/s · Spare charge ${reserve} u`,
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
    sensorReading: (time, opacity, solar, count) => `${time} · Opacity ${opacity}/100 · Solar ${solar}/10 · ${count} readings`,
    sensorResult: (count, solar) => `Sensor · ${count} readings · lowest solar output ${solar}/10`,
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
    unlockNote: "Збережи екіпаж і збери врожай хоча б з одного лотка в першій місії, щоб відкрити другу.",
    missions: {
      training: { name: "01 · ПИЛ НА ГОРИЗОНТІ", intro: "Збережи екіпаж і збери врожай. Перш ніж запустити таймер, увімкни світло хоча б над одним лотком." },
      extended: { name: "02 · ТРИВАЛА БУРЯ", intro: "Довша пилова буря й менший запас їжі. Перед початком налаштуй теплицю." }
    },
    phases: { ready: "ПІДГОТОВКА", prepare: "РОБОТА БАЗИ", dust: "ПИЛОВА БУРЯ", warning: "СОНЯЧНА ТРИВОГА", shelter: "РАДІАЦІЙНА БУРЯ", recover: "ВІДНОВЛЕННЯ", complete: "ПІДСУМКИ" },
    brief: {
      ready: ["Підготуй базу", ""],
      checked: ["База готова до старту", "Освітлення налаштовано. До запуску таймера ще можна оглянути базу й підготувати обладнання."],
      prepare: ["База працює", "Збережи екіпаж і збери врожай хоча б з одного лотка."],
      dust: ["Пил затуляє сонце", "Виробіток панелей впав. Коли витрати перевищують виробіток, база живиться від батареї."],
      warning: ["Сонячна тривога", "Потік сонячних частинок — окрема подія від пилової бурі."],
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
    exposureNow: (rate) => `+${rate} бала/с`, noExposure: "Подія неактивна",
    systemState: (active) => active ? "Працює" : "Вимкнено", noPower: "Бракує живлення",
    particleCountdown: (time) => `До потоку частинок ${time}`,
    particleRemaining: (time) => `До кінця потоку ${time}`,
    projected: "Час до врожаю за незмінного світла й поливу. Запас заряду наведено для піку пилової бурі.",
    power: (solar, load, reserve) => `Панелі ${solar} од./с · Витрати ${load} од./с · Резерв ${reserve} од.`,
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
    sensorReading: (time, opacity, solar, count) => `${time} · Запиленість ${opacity}/100 · Панелі ${solar}/10 · Вимірювань ${count}`,
    sensorResult: (count, solar) => `Датчик · Вимірювань ${count} · Найнижчий виробіток ${solar}/10`,
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
