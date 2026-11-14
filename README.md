# Sol 5111

Sol 5111 is a browser game for [Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/), NASA Space Apps Challenge 2026. It targets roughly ages 10–14, an assumption for the prototype.

Open `dist/index.html` directly in a desktop browser to play offline. To host the game, serve the entire `dist/` folder. Use the language menu to switch between English and Ukrainian during a mission. The game remembers that preference when browser storage is available. HTML, CSS and JavaScript are bundled locally, including both images. External links to references require internet access.

## Explore the outpost

Customize the commander’s call sign, helmet, suit color and patch. The game saves the appearance in browser storage when available. Hold WASD or the arrow keys when the map is focused for continuous movement. Click or tap the terrain to walk to that point, or use the module selector. The visible astronaut turns and animates while walking. Inspect each module for a short explanation of the real system or NASA observation behind it.

Use the field controls to adjust the greenhouse lights, switch the air scrubber, or send the crew to shelter during the solar particle event. To connect the spare battery, collect it at Storage and carry it to the Solar array. Select it in the mission controls. It contributes only the energy the primary supply cannot cover, up to five units over the whole mission. Replaying a turn restores the battery and its location to their state at the start of that turn.

## Publish with GitHub Pages

The portable ZIP puts the full website at the top level. Extract it and upload the contents, including the assets folder, to the root of a GitHub repository. In **Settings → Pages**, choose **Deploy from a branch**, choose **main** and **/(root)**, then save. Submit the repository URL as the code link and the Pages URL as the game link. This project uses relative asset paths and has no build step. When using the workspace checkout instead of the portable ZIP, upload the contents of `dist/` at the repository root.

[GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Mission

The 18-turn campaign covers preparation, storm response and recovery. Complete it with the crew safe, at least two harvests and two analyzed samples. Each turn is a planning step at a selected scenario sol. Hovering is unnecessary: the console labels chart anchors and modeled values alike.

1. Collect samples at the rock outcrop and the regolith site. In Habitat, queue an analysis, then execute the turn. Each analysis costs 3 energy and occupies one turn; the lab does not replace air or water systems.
2. Prepare for the storms with harvests and stored energy. Set the lights and check the next turn’s solar forecast. Use the reserve battery or temporarily rely on stored air or water if the budget tightens.
3. Shelter during the particle storm. When solar generation recovers, finish the second analysis. The debrief shows simulated observations and asks which geological claim needs more evidence.
4. Choose any completed turn from the debrief to replay it from its original starting reserves, sample inventory and battery status.

## Scientific basis

- **Measured:** NASA reports Opportunity had 21 Wh available on sol 5111 during the 2018 dust storm. The energy capacities shown in the game are normalized: six chart anchors contribute budgets of 10, 10, 7, 6, 2 and 1. Intervening turns and the post-storm recovery are illustrative estimates, not recovered Opportunity telemetry. See NASA's [Mars Surface Power Generation](https://ntrs.nasa.gov/citations/20230015763) and [Opportunity chart](https://science.nasa.gov/resource/on-mars-light-is-energy/).
- **Demonstrated:** NASA's [Veggie technical report](https://ntrs.nasa.gov/citations/20160004060) documents LED lighting, watering and 33 days of growth for an ISS lettuce crop. The simulator compresses growth and uses greenhouse harvests as supplements to stored crew food. The air and water system costs are pedagogical.
- **Measured and adapted:** NASA's [Curiosity RAD observation](https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/) describes a separate 2024 event. Simulated exposure points are not absorbed dose or crew limits. The shelter uses physical shielding, and its energy demand represents ventilation.
- **Field practice:** NASA’s [Perseverance presentation](https://ntrs.nasa.gov/citations/20220011452) and [sample catalog](https://science.nasa.gov/mission/mars-2020-perseverance/mars-rock-samples/) anchor the sample collection workflow. The two outpost sites, lab budget and observations are fictional. The scientific exercise distinguishes a direct observation from an inference that requires additional evidence.

## Sources and asset credits

- [NASA Science, On Mars, Light Is Energy](https://science.nasa.gov/resource/on-mars-light-is-energy/). Chart in `dist/assets/opportunity.jpg`, credited to NASA/JPL-Caltech/New Mexico Museum of Natural History.
- [NASA, NASA Watches Mars Light Up During Epic Solar Storm](https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/). May 2024 solar particle event.
- [NASA, Environmental Control and Life Support Systems](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/). Air and water functions.
- [NASA, Veggie Fact Sheet](https://www.nasa.gov/wp-content/uploads/2023/03/veggie-fact-sheet-508.pdf). LED lighting, watering and crop growth.
- [NASA, Design for Ionizing Radiation Protection](https://www.nasa.gov/wp-content/uploads/2023/03/radiation-protection-technical-brief-ochmo.pdf). Storm shelter and shielding concepts.
- [NASA Science, NASA’s Perseverance Captures Panorama at “Arbot”](https://science.nasa.gov/photojournal/nasas-perseverance-captures-panorama-at-arbot/). Cropped in `dist/assets/mars.jpg`, credited to NASA/JPL-Caltech/ASU/MSSS.
- The outpost scene in `assets/outpost.jpg` is a generated illustration created with ImageGen. OpenAI ChatGPT/Codex assisted with concept development, research synthesis, code, UI, and localization.
