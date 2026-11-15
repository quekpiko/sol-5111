# Sol 5111

Sol 5111 is a browser game for [Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/), NASA Space Apps Challenge 2026. It targets roughly ages 10–14, an assumption for the prototype.

Open `dist/index.html` directly in a desktop browser to play offline. To host the game, serve the entire `dist/` folder. Use the language menu to switch between English and Ukrainian during a mission. The game remembers that preference when browser storage is available. HTML, CSS and JavaScript are bundled locally, including both images. External links to references require internet access.

## Explore the outpost

Read the briefing and follow the three training steps. Click a building to open its controls after arrival, or move with WASD or the arrow keys and press E nearby. In setup, set a light level in at least one greenhouse tray. You can carry the sensor and spare battery from Storage to the solar array before launching. The setup checklist links directly to the modules. You can also collect regolith and queue its analysis before the clock starts. Start the mission when you are ready. Open **Hint** on the map or inside a module to see context-specific help.

Press Space or use the pause button to freeze time while planning. The pause controls let you restart the current mission after confirmation. Opening NASA data or the astronaut editor pauses the clock. The simulation also pauses when the tab becomes hidden.

## Publish with GitHub Pages

The portable ZIP puts the full website at the top level. Extract it and upload the contents, including the assets folder, to the root of a GitHub repository. In **Settings → Pages**, choose **Deploy from a branch**, choose **main** and **/(root)**, then save. Submit the repository URL as the code link and the Pages URL as the game link. This project uses relative asset paths and has no build step. When using the workspace checkout instead of the portable ZIP, upload the contents of `dist/` at the repository root.

[GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Scientific basis

- **Measured:** NASA reports Opportunity had 21 Wh available on sol 5111 during the 2018 dust storm. The energy capacities shown in the game are normalized: six chart anchors contribute budgets of 10, 10, 7, 6, 2 and 1. Intermediate values and the post-storm recovery are illustrative estimates, not recovered Opportunity telemetry. See NASA's [Mars Surface Power Generation](https://ntrs.nasa.gov/citations/20230015763) and [Opportunity chart](https://science.nasa.gov/resource/on-mars-light-is-energy/).
- **Demonstrated:** NASA's [Veggie technical report](https://ntrs.nasa.gov/citations/20160004060) documents LED lighting, watering and 33 days of growth for an ISS lettuce crop. The simulator compresses growth and uses greenhouse harvests as supplements to stored crew food. The air and water system costs are pedagogical.
- **Measured and adapted:** NASA's [Curiosity RAD observation](https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/) describes a separate 2024 event. Simulated exposure points are not absorbed dose or crew limits. The shelter uses physical shielding, and its energy demand represents ventilation.
- **Field practice:** NASA’s [Perseverance presentation](https://ntrs.nasa.gov/citations/20220011452) and [sample catalog](https://science.nasa.gov/mission/mars-2020-perseverance/mars-rock-samples/) anchor the sample collection workflow. The two outpost sites, lab budget and observations are fictional. The scientific exercise distinguishes a direct observation from an inference that requires additional evidence.

- **Measured and adapted:** [Phoenix](https://science.nasa.gov/mission/mars-phoenix/) detected perchlorate salts in Martian soil. The contamination percentages, sealing and cleanup recipe are scenario rules. [NASA-sponsored regolith research](https://science.nasa.gov/biological-physical/investigations/efri-elis-kpmsg/) describes research into microbial perchlorate removal from simulants.
- **Observed:** [MRO's MARCI](https://science.nasa.gov/resource/mars-color-imager-marci-for-mars-reconnaissance-orbiter/) produces global observations used to track Martian weather and dust storms. The game's MRO reports, forecasts and rescue orders are simulated.

## Sources and asset credits

- [NASA Science, On Mars, Light Is Energy](https://science.nasa.gov/resource/on-mars-light-is-energy/). Chart in `dist/assets/opportunity.jpg`, credited to NASA/JPL-Caltech/New Mexico Museum of Natural History.
- [NASA, NASA Watches Mars Light Up During Epic Solar Storm](https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/). May 2024 solar particle event.
- [NASA, Environmental Control and Life Support Systems](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/). Air and water functions.
- [NASA, Veggie Fact Sheet](https://www.nasa.gov/wp-content/uploads/2023/03/veggie-fact-sheet-508.pdf). LED lighting, watering and crop growth.
- [NASA, Design for Ionizing Radiation Protection](https://www.nasa.gov/wp-content/uploads/2023/03/radiation-protection-technical-brief-ochmo.pdf). Storm shelter and shielding concepts.
- [NASA Science, NASA’s Perseverance Captures Panorama at “Arbot”](https://science.nasa.gov/photojournal/nasas-perseverance-captures-panorama-at-arbot/). Cropped in `dist/assets/mars.jpg`, credited to NASA/JPL-Caltech/ASU/MSSS.
- The outpost and room illustrations in `assets/outpost.jpg` and `assets/interiors.jpg` were created with ImageGen. OpenAI ChatGPT/Codex assisted with concept development, research synthesis, code, UI, and localization.

## Seven sols

Setup has no countdown. The training campaign lasts 5:15 after launch. A successful rescue unlocks the 5:50 extended campaign, with less stored food and a longer period of poor sunlight. The in-game MRO reports are written for the fictional mission and open one sol at a time. The browser stores the last successful training result.

Use Sol 1 to build reserves and analyze regolith. On Sols 3 and 4, seal the greenhouse breach and run the power-intensive cleanup. The regolith analysis unlocks cleanup. The optional rock analysis reduces the water recycler's simulated electrical load by 15%. During the Sol 5 particle event, sheltering blocks trips to other modules until the player leaves the bunker. On Sols 6 and 7, power the landing beacon and keep its signal locked through the end of the run. A rescue requires a clean greenhouse, at least one harvest and a powered beacon. The beacon takes 12 consecutive powered seconds to lock.

The debrief reports the first failure or a rescue and engineering rank, with outcomes from the player's analysis, greenhouse, shelter and power choices.

The greenhouse trays share water and start with the same crop and growth. The light settings trade harvest time for power and each tray reports its energy use and time without growth. The sensor plots a normalized solar output series and an illustrative opacity index derived from it. Curves, event timings and resource rates are game parameters. The sources panel explains the real observations that inspired the model.
