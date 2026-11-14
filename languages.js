"use strict";

const staticText = {
  nextStep: ["NEXT STEP", "ЩО РОБИТИ ДАЛІ"],
  exitRoom: ["Exit to map", "Вийти на карту"],
  manualPlan: ["Adjust all systems", "Налаштувати всі системи"],
  lastTurnSummary: ["Last turn", "Минулий хід"],
  turnLoop: ["Choose what to power. Apply the plan to advance time and see its effects.", "Вибери, що живити. Застосуй план, щоб перейти до наступного ходу й побачити наслідки."],
  stationRidge: ["Rock outcrop", "Скельний вихід"],
  stationBasin: ["Regolith site", "Ділянка реголіту"],
  objectiveTitle: ["MISSION OBJECTIVES", "ЦІЛІ МІСІЇ"],
  analysis: ["Analyze a sample", "Проаналізувати зразок"],
  defenseSources: ["Technical sources for the simulation", "Технічні джерела симуляції"],
  paperPower: ["NASA NTRS · Mars Surface Power Generation", "NASA NTRS · Енергетика на поверхні Марса"],
  paperPowerUse: [" — dust opacity explains the drop in available solar energy.", " — пил знижує прозорість атмосфери й вихід сонячної енергії."],
  paperVeggie: ["NASA NTRS · Veggie technical paper", "NASA NTRS · Технічна доповідь Veggie"],
  paperVeggieUse: [" — light, water and delayed growth. The ISS lettuce experiment took 33 days.", " — світло, вода й тривалість росту. Експеримент із салатом на МКС тривав 33 дні."],
  paperSampling: ["NASA NTRS · Perseverance presentation", "NASA NTRS · Презентація Perseverance"],
  paperSamplingUse: [" — samples are collected from different targets with context. The lab and its results in this mission are fictional.", " — зразки беруть із різних ділянок і фіксують місце відбору. Лабораторія та її результати в місії змодельовані."],
  briefTitle: ["Mars outpost", "Марсіанська база"],
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
  surfaceHelp: ["Walk with WASD, arrow keys or a tap. Press E near a module to interact.", "Рухайся за допомогою WASD, стрілок або натискання на карту. Поруч із модулем натисни E."],
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
    "Plan this turn",
    "План поточного ходу"
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
    "Growing uses 1 water. Harvest at 8 growth.",
    "Ріст потребує 1 од. води. Урожай дозріває за 8 балів росту."
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
    "Apply plan & advance",
    "Застосувати план і продовжити"
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
    "Opportunity had 21 Wh available on sol 5111. Six points derived from the chart anchor the tightening of the power budget. Intermediate and recovery turns are modeled. Sol labels indicate selected dates in the scenario, and turns compress time.",
    "На 5111-й сол марсохід Opportunity мав 21 Вт·год доступної енергії. Шість точок із графіка задають падіння виробітку. Проміжні значення й відновлення змодельовано. Номери солів позначають вибрані дати сценарію, а час у грі стислий."
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
    guide: {
      first: ["Start the greenhouse", "A dust storm is coming. Your mission is to keep the crew alive for 18 turns, grow two harvests and analyze two samples. Start by turning on the grow lights."],
      prepare: ["Apply your first plan", "The lights are scheduled. Check the projected resources and apply the plan to grow the crop."],
      ridge: ["Collect a rock sample", "Go to the rock outcrop. Select its marker, then collect the sample when you arrive."],
      basin: ["Collect a regolith sample", "The loose soil gives you a second observation to compare with the rock."],
      lab: ["Analyze a sample in the habitat", "The analyzer uses 3 energy for one turn. Queue an analysis and check the forecast before applying the plan."],
      storage: ["Pick up the spare battery", "The warehouse holds five energy units for the darkest turns."],
      solar: ["Connect the spare battery", "Carry it to the solar array. Once connected, you can draw from it when the main supply runs short."],
      shelter: ["Take the crew into the shelter", "A solar particle storm is here. Enter the shelter and turn on ventilation before applying the plan."],
      safe: ["Apply the plan and ride out the storm", "The crew is in the shelter. Keep enough power for the air and water systems."],
      grow: ["Light the greenhouse", "The crew is drawing down stored food. Light the crop and check the food projection before applying the plan."],
      budget: ["Adjust the energy budget", "The planned systems need more energy than you have. Reduce greenhouse lighting, delay an analysis or draw from the connected spare battery."],
      danger: ["Protect the crew before advancing", "The projected plan runs out of a vital resource. Review the warning and change the plan."],
      proceed: ["Apply the plan", "Read the resource projection. The next turn may have a different solar budget."],
      complete: ["Read the mission debrief", "Review the crew’s outcome and what the sample analysis can tell you."]
    },
    go: "Walk there",
    enter: "Enter module",
    transit: "Walking…",
    reviewPlan: "Review plan",
    viewDebrief: "Read debrief",
    roomDescriptions: {
      greenhouse: "The LEDs and water support crop growth. Choose a light setting for the upcoming turn.",
      habitat: "Clean the cabin air, recycle water or schedule a sample analysis before advancing the turn.",
      shelter: "Shielding comes from the structure. Sheltering the crew uses one energy unit to run ventilation during the radiation storm."
    },
    lightOptions: ["Off · 0 energy", "Dim · 2 energy", "Full · 4 energy"],
    airControl: "Air scrubber",
    waterControl: "Water recycler",
    inShelter: "Crew is in shelter",
    sampleQueued: "Analysis queued",
    analysisInfo: (name) => `Next sample · ${name}`,
    roomPlanSaved: "This setting takes effect when you apply the plan.",
    turnPreview: (cost, battery, food, crop, air, water) =>
      `If applied · Uses ${cost} energy · Battery ${battery} · Food ${food} · Crop ${crop}/8 · Air ${air} · Water ${water}`,
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
        greenhouse: "NASA’s Veggie experiment used LEDs and water to grow lettuce. A harvest took 33 days. This simulation compresses crop growth and treats harvests as supplemental food.",
        habitat: "The ISS life support system cleans cabin air and recycles water. Both functions depend on equipment that needs electrical energy.",
        shelter: "Curiosity detected a solar particle surge in May 2024. Physical material blocks some particles. In the game the extra power is for ventilation.",
        storage: "A battery can cover a temporary drop in solar generation. This spare pack holds 5 teaching units and cannot be recharged during the scenario."
      },
      links: { solar: "NASA Opportunity chart", greenhouse: "NASA Veggie experiments", habitat: "NASA life support", shelter: "NASA Curiosity observations" }
    },
    defaultCallSign: "Cadet",
    campaign: ["Prepare", "Survive the storms", "Recover & report"],
    chapterBrief: [
      "Build battery reserves, start the greenhouse and collect samples from two sites.",
      "Dust weakens the solar array. Protect the food supply and move the crew to shelter when the particle storm arrives.",
      "Recovery is a modeled scenario. Restore supplies, finish the lab analyses and compare the evidence."
    ],
    modeled: "Scenario estimate",
    reviewLabel: "Choose a turn to replay",
    incomplete: "Mission objectives incomplete.",
    observed: "Anchored to NASA rover data",
    objectives: (played, total, harvests, collected, analyzed) => [
      [`Keep the crew safe · ${played}/${total} turns`, played === total],
      [`Supplement food · ${harvests}/2 harvests`, harvests >= 2],
      [`Collect ${collected}/2 samples · analyze ${analyzed}/2`, analyzed === 2]
    ],
    scienceCost: (sample) => `${sample} · 3 energy units · 1 turn`,
    noSample: "Collect a sample at the outcrop or regolith site first.",
    analysisLog: (sample) => `Lab complete · ${sample}`,
    sampling: "Collect and label sample",
    sampleClosed: "Field sampling is closed.",
    sampled: "Sample cataloged. Schedule the analysis after reaching the habitat.",
    unsafeSampling: "Sampling is suspended during the solar particle event.",
    openLab: "Queue sample analysis",
    labQueued: "Analysis queued. Run the turn to process the sample.",
    missingObjectives: "The crew survived. An objective remains incomplete. Replay a turn to change your plan.",
    scienceTitle: "Science report · simulated observations",
    scienceFindings: {
      ridge: "Rock outcrop · coarse, interlocking grains. This texture supports slow cooling. It does not establish the rock’s age.",
      basin: "Regolith site · mixed small fragments and fine dust. Transport or weathering can produce this mixture. Composition alone does not establish that water was present."
    },
    compareEvidence: "Compare both observations. Which claim needs another measurement?",
    scienceChoices: ["The samples have different textures.", "The samples prove liquid water was present."],
    scienceFeedback: ["Texture can be described directly from the observations. Try the other claim.", "Yes. Proving past liquid water needs more evidence, such as mineralogy and geological context."],
    reserves: ["Battery", "Air", "Water", "Food", "Crop", "Exposure"],
    phases: [
      ["NORMAL", "Clear skies", "Use the stronger solar output to grow food, charge the battery or run an analysis."],
      ["WATCH", "Dust watch", "Check the next turn’s solar forecast and save a buffer before production falls."],
      ["DUST", "Reduced sunlight", "Compare the solar forecast with your draw. Store power for critical systems and choose when the lab can run."],
      ["ALERT", "Solar particle alert", "A separate solar particle storm is approaching. Preserve power for shelter ventilation."],
      ["STORM", "Solar particle storm", "Move the crew into the shielded shelter and use 1 unit of energy for ventilation. Suspend field sampling."]
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
    harvestLog: "Harvest brought in 5 food units. The crop tracker reset.",
    exposureLog: (points) => `Radiation exposure +${points}.`,
    success: "Crew safe. Harvest in.",
    interrupted: "Mission interrupted.",
    successBody: (harvests) => `You completed the mission, analyzed both samples and brought in ${harvests} harvest${harvests === 1 ? "" : "s"}. Check how your plan affected the base.`,
    failures: {
      air: "The air reserve ran out. The crew needs a powered scrubber or enough reserve to bridge outages.",
      water: "The water reserve ran out. Power the recycler before the greenhouse and crew exhaust the supply.",
      food: "The last ration ran out before the crew had enough food. Start growing earlier to reach harvest on time.",
      radiation: "Exposure exceeded the training limit. Move the crew into the shielded shelter and budget 1 unit for ventilation."
    },
    decision: (sol) => `Decision on sol ${sol}`,
    outcome: "Outcome of that turn"
  },
  uk: {
    guide: {
      first: ["Запусти теплицю", "Наближається пилова буря. Твоя мета — зберегти екіпаж протягом 18 ходів, зібрати два врожаї та проаналізувати два зразки. Почни з освітлення теплиці."],
      prepare: ["Застосуй перший план", "Освітлення заплановано. Перевір прогноз запасів і застосуй план, щоб рослини почали рости."],
      ridge: ["Відбери зразок породи", "Натисни позначку скельного виходу на карті. Коли астронавт підійде, відбери зразок."],
      basin: ["Відбери зразок реголіту", "Порівняй цей пухкий ґрунт зі зразком породи після аналізу."],
      lab: ["Проаналізуй зразок у житловому модулі", "Аналізатор витрачає 3 одиниці енергії за один хід. Заплануй аналіз і перевір прогноз перед виконанням плану."],
      storage: ["Забери запасну батарею", "На складі є п’ять одиниць енергії на випадок, коли панелі даватимуть найменше."],
      solar: ["Під’єднай запасну батарею", "Віднеси її до сонячних панелей. Під’єднаний запас можна використати, коли основної енергії бракує."],
      shelter: ["Переведи екіпаж в укриття", "Почалася буря сонячних частинок. Зайди в укриття й увімкни вентиляцію, перш ніж застосувати план."],
      safe: ["Застосуй план, щоб пережити бурю", "Екіпаж в укритті. Залиш достатньо енергії на очищення повітря й переробку води."],
      grow: ["Увімкни освітлення теплиці", "Екіпаж витрачає запаси їжі. Увімкни світло й перевір прогноз запасів перед застосуванням плану."],
      budget: ["Скоригуй витрати енергії", "На заплановані системи бракує енергії. Приглуши світло, відклади аналіз або використай під’єднану запасну батарею."],
      danger: ["Убезпеч екіпаж перед наступним ходом", "За прогнозом вичерпається життєво важливий ресурс. Перевір попередження й зміни план."],
      proceed: ["Застосуй план", "Перевір прогноз запасів. На наступному ході виробіток сонячних панелей може змінитися."],
      complete: ["Переглянь підсумки місії", "Дізнайся, що сталося з екіпажем і які висновки можна зробити зі зразків."]
    },
    go: "Іти до цілі",
    enter: "Увійти до модуля",
    transit: "Астронавт іде…",
    reviewPlan: "Перевірити план",
    viewDebrief: "Переглянути підсумки",
    roomDescriptions: {
      greenhouse: "Світло й вода допомагають рослинам рости. Вибери освітлення на наступний хід.",
      habitat: "Тут можна очистити повітря, переробити воду або запланувати аналіз зразка.",
      shelter: "Екіпаж захищає конструкція укриття. Під час бурі одна одиниця енергії потрібна для вентиляції."
    },
    lightOptions: ["Вимкнено · 0 енергії", "Приглушене · 2 од.", "Повне · 4 од."],
    airControl: "Очищення повітря",
    waterControl: "Переробка води",
    inShelter: "Екіпаж в укритті",
    sampleQueued: "Аналіз заплановано",
    analysisInfo: (name) => `Наступний зразок · ${name}`,
    roomPlanSaved: "Налаштування спрацює, коли застосуєш план.",
    turnPreview: (cost, battery, food, crop, air, water) =>
      `Прогноз · Витрати ${cost} · Батарея ${battery} · Їжа ${food} · Ріст ${crop}/8 · Повітря ${air} · Вода ${water}`,
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
        greenhouse: "У досліді NASA Veggie салат вирощували за допомогою світлодіодів і води. Урожай зібрали через 33 дні. Гра стискає час росту, а врожай доповнює пайки.",
        habitat: "Система життєзабезпечення МКС очищує повітря й переробляє воду. В обох випадках обладнанню потрібна електроенергія.",
        shelter: "У травні 2024 року Curiosity зафіксував сплеск потоку сонячних частинок. Матеріал укриття затримує частину частинок. У грі додаткова енергія потрібна для вентиляції.",
        storage: "Батарея покриває тимчасове падіння виробітку панелей. У цій запасній батареї 5 ігрових одиниць, і під час сценарію її заряд не поповнюється."
      },
      links: { solar: "Графік Opportunity від NASA", greenhouse: "Досліди NASA Veggie", habitat: "Життєзабезпечення NASA", shelter: "Спостереження Curiosity" }
    },
    defaultCallSign: "Кадет",
    campaign: ["Підготовка", "Пережити бурі", "Відновлення й звіт"],
    chapterBrief: [
      "Накопич заряд, запусти теплицю та збери зразки з двох ділянок.",
      "Пил послаблює виробіток панелей. Збережи їжу й переведи екіпаж в укриття, коли долетять сонячні частинки.",
      "Відновлення змодельоване. Поповни запаси, заверш аналіз зразків і порівняй результати."
    ],
    modeled: "Розрахункове значення сценарію",
    reviewLabel: "Вибери хід для повтору",
    incomplete: "Цілі місії виконано частково.",
    observed: "Орієнтир із даних марсохода NASA",
    objectives: (played, total, harvests, collected, analyzed) => [
      [`Захист екіпажу · ${played}/${total} ходів`, played === total],
      [`Поповнення їжі · ${harvests}/2 урожаї`, harvests >= 2],
      [`Зразки ${collected}/2 · аналіз ${analyzed}/2`, analyzed === 2]
    ],
    scienceCost: (sample) => `${sample} · 3 од. енергії · 1 хід`,
    noSample: "Спочатку збери зразок на ділянці скельного виходу або реголіту.",
    analysisLog: (sample) => `Аналіз завершено · ${sample}`,
    sampling: "Відібрати й підписати зразок",
    sampleClosed: "Польовий відбір завершено.",
    sampled: "Зразок зареєстровано. Заплануй аналіз у житловому модулі.",
    unsafeSampling: "Під час сонячної бурі відбір зразків призупинено.",
    openLab: "Запланувати аналіз",
    labQueued: "Аналіз заплановано. Виконай хід, щоб обробити зразок.",
    missingObjectives: "Екіпаж вижив, але частина цілей лишилася невиконаною. Переграй один із ходів, щоб змінити план.",
    scienceTitle: "Науковий звіт · змодельовані спостереження",
    scienceFindings: {
      ridge: "Скельний вихід · грубі зчеплені зерна. Така текстура узгоджується з повільним охолодженням, але не визначає вік породи.",
      basin: "Ділянка реголіту · дрібні уламки й пил. Така суміш може утворитися під час перенесення або вивітрювання. Сам склад суміші не доводить, що тут була вода."
    },
    compareEvidence: "Порівняй спостереження. Для якого твердження потрібне додаткове вимірювання?",
    scienceChoices: ["Зразки мають різну текстуру.", "Зразки доводять, що тут була рідка вода."],
    scienceFeedback: ["Різницю текстур видно безпосередньо у зразках.", "Так. Для висновку про рідку воду потрібні додаткові дані, як-от мінеральний склад і геологічний контекст."],
    reserves: ["Батарея", "Повітря", "Вода", "Їжа", "Ріст рослин", "Опромінення"],
    phases: [
      ["NORMAL", "Ясне небо", "Використай вищий виробіток панелей, щоб виростити їжу, зарядити батарею або провести аналіз."],
      ["WATCH", "Пил на горизонті", "Перевір прогноз виробітку й накопич заряд до того, як панелі почнуть давати менше енергії."],
      ["DUST", "Слабке сонячне світло", "Порівняй виробіток зі споживанням. Збережи заряд для критичних систем і вибери час для роботи лабораторії."],
      ["ALERT", "Попередження про сонячну бурю", "Наближається окрема буря сонячних частинок. Збережи заряд для вентиляції укриття."],
      ["STORM", "Буря сонячних частинок", "Екіпажу потрібне захищене укриття й 1 одиниця енергії для вентиляції. Збір зразків призупинено."]
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
    harvestLog: "Урожай поповнив запаси їжі на 5 од. Лічильник росту скинуто.",
    exposureLog: (points) => `Опромінення +${points}.`,
    success: "Екіпаж у безпеці. Урожай зібрано.",
    interrupted: "Місію перервано.",
    successBody: (harvests) => `Ти завершив місію й проаналізував обидва зразки. Кількість зібраних урожаїв — ${harvests}. Перевір, як твоє рішення вплинуло на базу.`,
    failures: {
      air: "Запас повітря вичерпався. Живи очищувач або накопич достатньо повітря, щоб пережити перебої.",
      water: "Запас води вичерпався. Увімкни переробку води, поки екіпаж і теплиця не витратили весь запас.",
      food: "Останній пайок закінчився. Почни вирощувати рослини раніше, щоб устигнути зібрати врожай.",
      radiation: "Перевищено ігрову межу опромінення. Переведи екіпаж у захищене укриття й виділи 1 од. енергії на вентиляцію."
    },
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
