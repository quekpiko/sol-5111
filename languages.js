"use strict";

const staticText = {
  commander: ["MISSION COMMANDER", "КОМАНДИР МІСІЇ"],
  editAvatar: ["Customize astronaut", "Налаштувати астронавта"],
  closeAvatar: ["Close astronaut editor", "Закрити редактор астронавта"],
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
  surfaceLabel: ["MARS SURFACE", "ПОВЕРХНЯ МАРСА"],
  surface: ["Explore the outpost", "Досліди базу"],
  toControls: ["Mission controls ↓", "Керування місією ↓"],
  surfaceHelp: ["Click or tap the terrain to walk, or focus the map and use the arrow keys or WASD. Approach a module and press E or use the action button.", "Натисни на місцевість, щоб іти, або вибери карту й рухайся стрілками чи WASD. Підійди до модуля та натисни E або кнопку дії."],
  fieldRoute: ["Walk to a module", "Підійти до модуля"],
  fieldSelect: ["Choose a module", "Вибери модуль"],
  stationSolar: ["Solar array", "Сонячні панелі"],
  stationGreenhouse: ["Greenhouse", "Теплиця"],
  stationHabitat: ["Habitat", "Житловий модуль"],
  stationShelter: ["Shelter", "Укриття"],
  stationStorage: ["Storage", "Склад"],
  "skip": [
    "Skip to mission controls",
    "Перейти до керування місією"
  ],
  "sourceButton": [
    "NASA data",
    "Дані NASA"
  ],
  "trainer": [
    "JUNIOR ASTRONAUT MISSION TRAINER",
    "ТРЕНАЖЕР ДЛЯ ЮНИХ АСТРОНАВТІВ"
  ],
  "headlineFirst": [
    "Keep your Mars",
    "Врятуй базу"
  ],
  "headlineLast": [
    "outpost alive",
    "на Марсі"
  ],
  "intro": [
    "Lead a crew through six turns. Keep air and water flowing, bring in a greenhouse harvest, and shelter from a solar storm.",
    "Проведи екіпаж через шість ходів. Забезпеч повітря й воду, збери врожай у теплиці та захисти екіпаж від сонячної бурі."
  ],
  "photoCredit": [
    "Mars panorama · NASA/JPL-Caltech/ASU/MSSS",
    "Панорама Марса · NASA/JPL-Caltech/ASU/MSSS"
  ],
  "telemetry": [
    "OUTPOST TELEMETRY",
    "СТАН БАЗИ"
  ],
  "reserves": [
    "Base reserves",
    "Запаси бази"
  ],
  "training": [
    "Training units",
    "Ігрові одиниці"
  ],
  "allocate": [
    "Allocate power",
    "Розподіли енергію"
  ],
  "available": [
    "energy available",
    "доступно енергії"
  ],
  "scrubber": [
    "Air scrubber",
    "Очищувач повітря"
  ],
  "scrubberHelp": [
    "Powered: air reserve +1 · Off: −2",
    "Увімкнено: запас повітря +1 · Вимкнено: −2"
  ],
  "costThree": [
    "3 units",
    "3 од."
  ],
  "recycler": [
    "Water recycler",
    "Переробка води"
  ],
  "recyclerHelp": [
    "Powered: water reserve +2 · Off: −1",
    "Увімкнено: запас води +2 · Вимкнено: −1"
  ],
  "costTwo": [
    "2 units",
    "2 од."
  ],
  "greenhouse": [
    "Greenhouse lights",
    "Освітлення теплиці"
  ],
  "greenhouseHelp": [
    "Growing uses 1 water. Harvest at 10 growth.",
    "Ріст потребує 1 од. води. Урожай дозріває за 10 балів росту."
  ],
  "lightsOff": [
    "Off",
    "Вимкнено"
  ],
  "costZero": [
    "0 units",
    "0 од."
  ],
  "lightsDim": [
    "Dim",
    "Приглушене"
  ],
  "lightsFull": [
    "Full",
    "Повне"
  ],
  "dimCost": [
    "2 units · +2 growth",
    "2 од. · ріст +2"
  ],
  "fullCost": [
    "4 units · +3 growth",
    "4 од. · ріст +3"
  ],
  "shelter": [
    "Radiation shelter",
    "Радіаційне укриття"
  ],
  "costOne": [
    "1 unit",
    "1 од."
  ],
  "execute": [
    "Run this turn",
    "Виконати хід"
  ],
  "restart": [
    "Restart",
    "Почати спочатку"
  ],
  "control": [
    "MISSION CONTROL",
    "ЦЕНТР КЕРУВАННЯ"
  ],
  "log": [
    "FLIGHT LOG",
    "ЖУРНАЛ МІСІЇ"
  ],
  "rewind": [
    "↶ Replay last turn",
    "↶ Повторити останній хід"
  ],
  "debrief": [
    "MISSION DEBRIEF",
    "ПІДСУМКИ МІСІЇ"
  ],
  "replay": [
    "↶ Replay a decision",
    "↶ Переграти рішення"
  ],
  "newMission": [
    "New mission",
    "Нова місія"
  ],
  "reflectionQuestion": [
    "Why can switching off a greenhouse help the crew?",
    "Чому вимкнення світла в теплиці може допомогти екіпажу?"
  ],
  "reflectionAnswer": [
    "Grow lights and life support share the same power supply. Dimming the lights can preserve battery charge for the crew, but keeping them off for too long can delay the harvest until the food supply runs out.",
    "Освітлення теплиці й системи життєзабезпечення живляться з одного джерела. Приглушене світло допомагає зберегти заряд, але без світла врожай може дозріти вже після того, як закінчаться пайки."
  ],
  "project": [
    "Independent NASA Space Apps Challenge 2026 project",
    "Незалежний проєкт для NASA Space Apps Challenge 2026"
  ],
  "challenge": [
    "Challenge brief",
    "Умови завдання"
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
    "Opportunity had 21 Wh available on sol 5111. Five approximate readings of the descending energy curve plus the published endpoint set the six solar budgets (10, 10, 7, 6, 2, 1). The turns sample different sols and compress time.",
    "На 5111-й сол марсохід Opportunity мав 21 Вт·год доступної енергії. П’ять приблизних значень з графіка та опубліковане кінцеве вимірювання визначають виробіток панелей у шести ходах (10, 10, 7, 6, 2, 1). Ходи відповідають вибраним марсіанським добам і стискають перебіг подій."
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
    "NASA reported a dose of 8,100 μGy for the May 20 event at Curiosity's location. This observation inspires the final shelter decision. The game assigns 1 or 5 exposure points for teaching purposes.",
    "Під час події 20 травня NASA зафіксувало дозу 8100 мкГр у місці перебування Curiosity. Це спостереження лягло в основу фінального рішення про укриття. Опромінення у грі оцінюється в 1 або 5 навчальних балів."
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
  "panoramaIntro": [
    "Outpost backdrop:",
    "Фон бази —"
  ],
  "panoramaLink": [
    "Perseverance’s Arbot panorama ↗",
    "панорама місцевості Арбот від Perseverance ↗"
  ],
  "panoramaCredit": [
    ", cropped. Credit NASA/JPL-Caltech/ASU/MSSS.",
    ", обрізана. Авторство NASA/JPL-Caltech/ASU/MSSS."
  ],
  "language": [
    "Language",
    "Мова"
  ],
  "brand": [
    "Sol 5111 home",
    "На початок Sol 5111"
  ],
  "nav": [
    "Project",
    "Проєкт"
  ],
  "timeline": [
    "Mission timeline",
    "Перебіг місії"
  ],
  "brief": [
    "Mission briefing and log",
    "Зведення й журнал місії"
  ],
  "close": [
    "Close science notes",
    "Закрити наукові джерела"
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
    title: "Sol 5111 — Mars Mission Trainer",
    cellBudget: (units) => ` + ${units} from the spare battery`,
    cellLabel: (units) => `Draw from spare battery (${units} units left)`,
    field: {
      approaching: "Approach a module to inspect it.",
      nearby: "Nearby",
      interact: "Inspect module",
      pick: "Pick up spare battery",
      install: "Connect spare battery",
      carrying: "Carrying a charged battery. Take it to the solar array.",
      installed: "Battery connected. Its 5 energy units are now available in mission controls.",
      walking: "Walking to the selected point…",
      remote: { greenhouse: "Set greenhouse lights", habitat: "Toggle air scrubber", shelter: "Send crew to shelter" },
      settings: "Current plan",
      notes: {
        solar: "In 2018, dust blocked sunlight. On sol 5111, Opportunity had just 21 Wh available. The mission uses a scaled version of NASA’s energy curve.",
        greenhouse: "NASA’s Veggie experiment used LEDs and water to grow lettuce. A harvest took 33 days. The simulation compresses growth across several turns.",
        habitat: "The ISS life support system cleans cabin air and recycles water. Both functions depend on equipment that needs electrical energy.",
        shelter: "Curiosity detected a solar particle surge in May 2024. Physical material blocks some particles. In the game the extra power is for ventilation.",
        storage: "A battery can cover a temporary drop in solar generation. This spare pack holds 5 teaching units and cannot be recharged during the scenario."
      },
      links: { solar: "NASA Opportunity chart", greenhouse: "NASA Veggie experiments", habitat: "NASA life support", shelter: "NASA Curiosity observations" }
    },
    defaultCallSign: "Cadet",
    reserves: ["Battery", "Air", "Water", "Food", "Crop", "Exposure"],
    phases: [
      ["Clear", "Clear horizon", "Your solar panels are at full output. Build a battery reserve before the dust arrives."],
      ["Watch", "Dust on the horizon", "A dust front is approaching. Charge the battery or use the surplus to push the crop closer to harvest."],
      ["Dust", "The sky darkens", "Dust is blocking sunlight. Consider dimming the greenhouse to save power for another turn."],
      ["Reserves", "Running on reserves", "The solar array cannot run every system. Check how much charge your plan leaves for the last two turns."],
      ["Alert", "Solar particle alert", "A separate solar storm is forecast for the next turn. Save power to ventilate the shielded shelter."],
      ["Shelter", "Shelter window", "Solar particles are arriving. Move the crew to the shielded shelter and power its ventilation. The dust is still limiting solar output."]
    ],
    statuses: { NORMAL: "NORMAL", WATCH: "WATCH", DUST: "DUST", ALERT: "ALERT", STORM: "STORM" },
    turn: (turn) => `TURN ${turn}`,
    sol: (sol) => `Sol ${sol}`,
    turnInfo: (turn, total, sol) => `TURN ${turn} OF ${total} · SOL ${sol}`,
    budget: (solar, battery, cap) => `${solar} from solar + ${battery} from battery · battery holds up to ${cap}`,
    shelter: "Move the crew inside and power ventilation.",
    standby: "Stand by. Available when solar particles arrive.",
    next: "Next turn",
    forecast: (units, shelter) => `${units} solar units${shelter ? " + shelter window" : ""}`,
    record: "Opportunity recorded 21 Wh on sol 5111",
    overBudget: (units) => `Over budget by ${units}. Switch off a system or dim the lights.`,
    plan: (draw, saved) => `Use ${draw} · save ${saved} in battery`,
    warnings: { air: "air runs out", water: "water runs out", food: "food runs out", radiation: "exposure limit exceeded" },
    warning: "Warning",
    on: "on",
    off: "off",
    lights: "Lights",
    shelterName: "Shelter",
    levels: { 0: "off", 2: "dim", 4: "full" },
    lastTurn: "Last turn",
    firstTurn: "Your choices and their effects will appear here after the first turn.",
    tryDifferent: "Try a different plan",
    previousPlan: "Previous plan",
    previousOutcome: "Previous outcome",
    same: "Same conditions, two outcomes",
    previous: "Previous",
    replay: "Replay",
    sameReserves: "Replay · same starting reserves",
    batteryLog: (battery, cap, draw) => `Battery charge ${battery}/${cap} after using ${draw} units.`,
    cropLog: (growth) => `Crop +${growth} growth. The crew used 1 ration.`,
    harvestLog: "Harvest brought in 3 food units. The crop tracker reset.",
    exposureLog: (points) => `Radiation exposure +${points}.`,
    success: "Crew safe. Harvest in.",
    interrupted: "Mission interrupted.",
    successBody: (harvests) => `You completed all six turns and brought in ${harvests} harvest${harvests === 1 ? "" : "s"}. Check how your plan affected the base.`,
    failures: {
      air: "The air reserve ran out. The crew needs a powered scrubber or enough reserve to bridge outages.",
      water: "The water reserve ran out. Power the recycler before the greenhouse and crew exhaust the supply.",
      food: "The last ration ran out before the crew had enough food. Start growing earlier to reach harvest on time.",
      radiation: "Exposure exceeded the training limit. Move the crew into the shielded shelter and budget 1 unit for ventilation."
    },
    noHarvest: "The crew finished the scenario without a greenhouse harvest. Grow earlier so the crop reaches 10 growth.",
    decision: (sol) => `Decision on sol ${sol}`,
    outcome: "Outcome of that turn"
  },
  uk: {
    title: "Sol 5111 — Тренажер марсіанської місії",
    cellBudget: (units) => ` + ${units} від запасної батареї`,
    cellLabel: (units) => `Використати запасну батарею (залишилося ${units} од.)`,
    field: {
      approaching: "Підійди до модуля, щоб оглянути його.",
      nearby: "Поруч",
      interact: "Оглянути модуль",
      pick: "Підняти запасну батарею",
      install: "Під’єднати запасну батарею",
      carrying: "Ти несеш заряджену батарею. Віднеси її до сонячних панелей.",
      installed: "Батарею під’єднано. У керуванні місією доступні 5 додаткових одиниць енергії.",
      walking: "Астронавт прямує до вибраного місця…",
      remote: { greenhouse: "Змінити освітлення", habitat: "Перемкнути очищувач", shelter: "Перевести екіпаж в укриття" },
      settings: "Поточний план",
      notes: {
        solar: "У 2018 році пил затулив сонце. На 5111-й сол Opportunity мав лише 21 Вт·год. Гра використовує масштабовану криву енергії з графіка NASA.",
        greenhouse: "У досліді NASA Veggie салат вирощували за допомогою світлодіодів і води. Урожай зібрали через 33 дні. У грі ріст рослин стисло до кількох ходів.",
        habitat: "Система життєзабезпечення МКС очищує повітря й переробляє воду. В обох випадках обладнанню потрібна електроенергія.",
        shelter: "У травні 2024 року Curiosity зафіксував сплеск потоку сонячних частинок. Матеріал укриття затримує частину частинок. У грі додаткова енергія потрібна для вентиляції.",
        storage: "Батарея покриває тимчасове падіння виробітку панелей. У цій запасній батареї 5 ігрових одиниць, і під час сценарію її заряд не поповнюється."
      },
      links: { solar: "Графік Opportunity від NASA", greenhouse: "Досліди NASA Veggie", habitat: "Життєзабезпечення NASA", shelter: "Спостереження Curiosity" }
    },
    defaultCallSign: "Кадет",
    reserves: ["Батарея", "Повітря", "Вода", "Їжа", "Ріст рослин", "Опромінення"],
    phases: [
      ["Ясно", "Чисте небо", "Сонячні панелі працюють на повну. Заряди батарею, поки пилова буря ще далеко."],
      ["Увага", "Пил на горизонті", "Наближається пилова буря. Заряди батарею або витрать надлишок енергії, щоб наблизити збір урожаю."],
      ["Пил", "Небо темніє", "Пил затуляє сонце. Можеш приглушити світло в теплиці, щоб зберегти енергію на наступний хід."],
      ["Запаси", "Працюємо від батареї", "Панелі не можуть живити всі системи. Перевір, скільки заряду залишиться на два останні ходи."],
      ["Тривога", "Попередження про сонячну бурю", "На наступному ході очікується окрема сонячна буря. Збережи заряд для вентиляції захищеного укриття."],
      ["Укриття", "Час перейти в укриття", "До Марса долітають частинки від сонячної бурі. Переведи екіпаж в укриття й увімкни вентиляцію. Пил досі зменшує виробіток панелей."]
    ],
    statuses: { NORMAL: "НОРМА", WATCH: "УВАГА", DUST: "ПИЛ", ALERT: "ТРИВОГА", STORM: "БУРЯ" },
    turn: (turn) => `ХІД ${turn}`,
    sol: (sol) => `Сол ${sol}`,
    turnInfo: (turn, total, sol) => `ХІД ${turn} ІЗ ${total} · СОЛ ${sol}`,
    budget: (solar, battery, cap) => `${solar} від панелей + ${battery} від батареї · місткість батареї ${cap}`,
    shelter: "Переведи екіпаж в укриття й увімкни вентиляцію.",
    standby: "Укриття стане доступним під час сонячної бурі.",
    next: "Наступний хід",
    forecast: (units, shelter) => `${units} од. від панелей${shelter ? " + час перейти в укриття" : ""}`,
    record: "На 5111-й сол Opportunity мав 21 Вт·год",
    overBudget: (units) => `Бракує ${units} од. енергії. Вимкни одну із систем або приглуши світло.`,
    plan: (draw, saved) => `Витратиш ${draw} · у батареї залишиться ${saved}`,
    warnings: { air: "закінчиться запас повітря", water: "закінчиться вода", food: "закінчиться їжа", radiation: "перевищення межі опромінення" },
    warning: "Увага",
    on: "увімк.",
    off: "вимк.",
    lights: "Світло",
    shelterName: "Укриття",
    levels: { 0: "вимк.", 2: "приглушене", 4: "повне" },
    lastTurn: "Останній хід",
    firstTurn: "Після першого ходу тут з’являться твої рішення та їхні наслідки.",
    tryDifferent: "Спробуй інший план",
    previousPlan: "Попередній план",
    previousOutcome: "Попередній результат",
    same: "Ті самі умови, два результати",
    previous: "Попередній хід",
    replay: "Повтор",
    sameReserves: "Повтор · ті самі початкові запаси",
    batteryLog: (battery, cap, draw) => `Заряд батареї ${battery}/${cap} після витрати ${draw} од.`,
    cropLog: (growth) => `Ріст рослин +${growth}. Екіпаж використав 1 пайок.`,
    harvestLog: "Урожай поповнив запаси їжі на 3 од. Лічильник росту скинуто.",
    exposureLog: (points) => `Опромінення +${points}.`,
    success: "Екіпаж у безпеці. Урожай зібрано.",
    interrupted: "Місію перервано.",
    successBody: (harvests) => `Ти завершив усі шість ходів. Кількість зібраних урожаїв — ${harvests}. Перевір, як твоє рішення вплинуло на базу.`,
    failures: {
      air: "Запас повітря вичерпався. Живи очищувач або накопич достатньо повітря, щоб пережити перебої.",
      water: "Запас води вичерпався. Увімкни переробку води, поки екіпаж і теплиця не витратили весь запас.",
      food: "Останній пайок закінчився. Почни вирощувати рослини раніше, щоб устигнути зібрати врожай.",
      radiation: "Перевищено ігрову межу опромінення. Переведи екіпаж у захищене укриття й виділи 1 од. енергії на вентиляцію."
    },
    noHarvest: "Екіпаж завершив місію без урожаю. Почни вирощувати рослини раніше, щоб набрати 10 балів росту.",
    decision: (sol) => `Рішення на ${sol}-й сол`,
    outcome: "Результат цього ходу"
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
