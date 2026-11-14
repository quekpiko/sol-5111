"use strict";

const staticText = {
  radio: ["MISSION CONTROL · RADIO", "ЦЕНТР КЕРУВАННЯ · РАЦІЯ"],
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
    start: "Start mission", pause: "Pause", resume: "Resume", guide: "Walk there", enter: "Enter",
    inspect: "Inspect", pick: "Pick up battery", connect: "Connect battery", collect: "Collect sample",
    standby: "Approach a marked location", outcome: "Review outcome",
    phases: { ready: "STANDBY", prepare: "PREPARATION", dust: "DUST STORM", warning: "PARTICLE ALERT", shelter: "RADIATION STORM", recover: "RECOVERY", complete: "DEBRIEF" },
    brief: {
      ready: ["Dust on the horizon", "Keep the crew alive until the storm clears and grow enough food for a harvest. Start at the greenhouse. Pause whenever you need time to decide."],
      prepare: ["Set the grow lights", "Full light grows food sooner. Dim light saves power for the storm. The greenhouse console estimates both outcomes."],
      running: ["Watch the power balance", "Keep the greenhouse growing. Find the spare battery in storage and bring it to the solar array if you need backup."],
    dust: ["Solar output is falling", "Dust is blocking sunlight. Dim the greenhouse, or switch its lights off if you already harvested. Connect the spare battery for backup."],
      warning: ["Solar particles inbound", "A separate solar particle event is coming. Walk to the shelter and switch on ventilation before it arrives."],
      shelter: ["Solar particle storm", "Keep the crew in the shielded shelter with ventilation running. Sampling is suspended."],
      protected: ["Shelter is operating", "Stay sheltered until the particle alert clears. Watch the battery and air supply."],
      recover: ["The sky is clearing", "Wait for solar power to recover before turning the lights back up. If you collected samples, analyze them in the habitat."],
      complete: ["Mission complete", "The crew made it through both events and harvested food."],
      partial: ["Crew safe, harvest missed", "The crew survived on stored rations. Replay and start the greenhouse earlier."],
      failed: ["Mission interrupted", "Open the debrief to see how the outpost failed."]
    },
    instruments: { battery: "Battery", air: "Air", water: "Water", food: "Food", crop: "Crop", radiation: "Exposure" },
    charge: "charging", discharge: "discharging", balanced: "steady",
    projected: "At peak dust with current loads", noHarvest: "Growth stopped", continuous: "Charge holds", harvest: "harvest in", lasts: "battery lasts", second: "s",
    used: "Selected", drain: "Battery draw", generation: "Solar output", loss: "Power deficit", buffer: "Reserve",
    lights: {off:"Off",dim:"Dim",full:"Full"}, live: (kind, amount) => `${kind} ${amount} u/s`,
    power: (solar, load, reserve) => `Solar ${solar} u/s · Load ${load} u/s · Spare battery ${reserve} u`,
    lab: "Analyze next sample", air: "Air scrubber", water: "Water recycler", ventilation: "Shelter crew and ventilate",
    shelterReady: "The crew is behind shielding. Keep the ventilation powered.",
    room: {
      greenhouse: "Choose a light level. The forecast uses the lowest solar output expected during the dust storm.",
      habitat: "Air and water treatment both consume energy. The analyzer can work while the crew attends to other equipment.",
      shelter: "The walls provide shielding. Switch on ventilation when the crew takes shelter.",
      solar: "Opportunity measured a sharp energy drop in the 2018 dust storm. The forecast uses a normalized version of this curve.",
      storage: "Carry the spare battery to the solar array. It supplies 24 energy units after the main battery runs out.",
      ridge: "Catalogue the rock for comparison in the habitat lab.",
      basin: "Catalogue loose regolith to compare with the rock sample."
    },
    feedback: { pick:"Battery collected. Bring it to the solar array.", connect:"Reserve connected. It supplies the outpost automatically if the main battery empties.", collect:"Sample catalogued. Take it to the habitat for analysis.", on:"On", off:"Off", queued:"Analysis running", sampleDone:"Analysis complete", paused:"Simulation paused. You can still move and set equipment." },
    failures: { air:"The air reserve ran out when the scrubber lost power or was switched off.", water:"The water reserve ran out.", food:"Stored food ran out. Earlier or brighter greenhouse lighting could bring the harvest forward.", radiation:"The crew received too much simulated radiation exposure. Shelter earlier and keep ventilation powered." },
    sampleResult: {ridge:"Rock sample · coarse, interlocking grains, consistent with slow cooling.",basin:"Regolith · mixed dust and rock fragments. Mineral analysis would help identify their origin."},
    harvests: "Harvests", samples: "Samples analyzed", totalTime: "Time survived", settings: "Equipment status"
  },
  uk: {
    title: "Sol 5111 — Тренажер марсіанської місії", defaultCallSign: "Кадет",
    start: "Почати місію", pause: "Пауза", resume: "Продовжити", guide: "Іти до цілі", enter: "Увійти",
    inspect: "Оглянути", pick: "Підняти батарею", connect: "Під’єднати батарею", collect: "Відібрати зразок",
    standby: "Підійди до позначеного місця", outcome: "Переглянути підсумки",
    phases: { ready: "ОЧІКУВАННЯ", prepare: "ПІДГОТОВКА", dust: "ПИЛОВА БУРЯ", warning: "СОНЯЧНА ТРИВОГА", shelter: "РАДІАЦІЙНА БУРЯ", recover: "ВІДНОВЛЕННЯ", complete: "ПІДСУМКИ" },
    brief: {
      ready: ["Пил на горизонті", "Збережи екіпаж до завершення бурі та збери врожай. Почни з теплиці. Став симуляцію на паузу, коли потрібен час на рішення."],
      prepare: ["Увімкни світло в теплиці", "Повне світло прискорює врожай. Приглушене береже заряд. На пульті видно прогноз для обох варіантів."],
      running: ["Стеж за балансом енергії", "Підтримуй ріст рослин. Запасну батарею можна взяти на складі й під’єднати біля сонячних панелей."],
      dust: ["Виробіток панелей падає", "Пил затуляє Сонце. Приглуши світло або вимкни його, якщо вже є врожай. Під’єднай запасну батарею для резерву."],
      warning: ["Наближаються сонячні частинки", "Очікуємо окрему радіаційну подію. Вирушай до укриття й увімкни вентиляцію заздалегідь."],
      shelter: ["Буря сонячних частинок", "Переведи екіпаж в укриття й увімкни вентиляцію. Відбір зразків призупинено."],
      protected: ["Укриття працює", "Залишай екіпаж в укритті до завершення тривоги. Стеж за батареєю й запасом повітря."],
      recover: ["Небо прояснюється", "Дочекайся відновлення сонячної енергії, перш ніж посилювати освітлення. Якщо маєш зразки, проаналізуй їх у житловому модулі."],
      complete: ["Місію виконано", "Екіпаж пережив обидві події та зібрав врожай."],
      partial: ["Екіпаж у безпеці, врожаю бракує", "Екіпаж протримався на запасах. У повторі запусти теплицю раніше."],
      failed: ["Місію перервано", "У підсумках видно, чому база зупинилася."]
    },
    instruments: { battery: "Батарея", air: "Повітря", water: "Вода", food: "Їжа", crop: "Ріст", radiation: "Опромінення" },
    charge: "заряджається", discharge: "розряджається", balanced: "без змін",
    projected: "На піку пилової бурі за поточних витрат", noHarvest: "Ріст зупинено", continuous: "Заряд тримається", harvest: "врожай за", lasts: "заряду на", second: "с",
    used: "Вибрано", drain: "Розряд батареї", generation: "Виробіток панелей", loss: "Дефіцит енергії", buffer: "Резерв",
    lights: {off:"Вимкнено",dim:"Приглушене",full:"Повне"}, live: (kind, amount) => `${kind} ${amount} од./с`,
    power: (solar, load, reserve) => `Панелі ${solar} од./с · Витрати ${load} од./с · Резервна батарея ${reserve} од.`,
    lab: "Аналізувати наступний зразок", air: "Очищення повітря", water: "Переробка води", ventilation: "Укрити екіпаж і ввімкнути вентиляцію",
    shelterReady: "Екіпаж за захисними стінами. Стеж за живленням вентиляції.",
    room: {
      greenhouse: "Вибери рівень освітлення. Прогноз враховує найнижчий очікуваний виробіток панелей під час пилової бурі.",
      habitat: "Очищення повітря й переробка води споживають енергію. Аналізатор може працювати, поки ти займаєшся іншим обладнанням.",
      shelter: "Стіни захищають від частинок. Увімкни вентиляцію, коли екіпаж зайде всередину.",
      solar: "Opportunity зафіксував різке падіння енергії під час пилової бурі 2018 року. Симуляція використовує нормалізовану криву.",
      storage: "Запасна батарея дасть 24 одиниці енергії, коли основна розрядиться. Віднеси її до панелей.",
      ridge: "Зареєструй зразок породи для порівняння в лабораторії.",
      basin: "Зареєструй пухкий реголіт для порівняння з породою."
    },
    feedback: { pick:"Батарею підібрано. Віднеси її до панелей.", connect:"Резерв під’єднано. Він увімкнеться автоматично, якщо основна батарея розрядиться.", collect:"Зразок зареєстровано. Віднеси його до житлового модуля.", on:"Увімкнено", off:"Вимкнено", queued:"Триває аналіз", sampleDone:"Аналіз завершено", paused:"Симуляція на паузі. Можна рухатися й налаштовувати обладнання." },
    failures: { air:"Закінчився запас повітря. Очищувач було вимкнено або йому забракло енергії.", water:"Закінчилася вода.", food:"Закінчилася їжа. Раніше ввімкни освітлення або збільш його потужність, щоб наблизити врожай.", radiation:"Екіпаж отримав забагато умовних балів опромінення. Зайди в укриття раніше й підтримуй вентиляцію." },
    sampleResult: {ridge:"Порода · великі зчеплені зерна, сумісні з повільним охолодженням.",basin:"Реголіт · пил і уламки порід. Щоб встановити походження, варто визначити мінеральний склад."},
    harvests: "Урожаї", samples: "Проаналізовані зразки", totalTime: "Тривалість місії", settings: "Стан обладнання"
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
