# Sol 5111

Sol 5111 is a browser game for [Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/), NASA Space Apps Challenge 2026. It targets roughly ages 10–14, an assumption for the prototype.

Open `dist/index.html` directly in a desktop browser to play offline. To host the game, serve the entire `dist/` folder. Use the language menu to switch between English and Ukrainian during a mission. The game remembers that preference when browser storage is available. HTML, CSS and JavaScript are bundled locally, including both images. External links to references require internet access.

## Explore the outpost

Click a location to walk there and open its controls, or move with WASD and press E nearby. In setup, set a light level in at least one greenhouse tray. You can carry the sensor and spare battery from Storage to the solar array before launching. The setup checklist links directly to the modules. Start the mission when you are ready. Open **Hint** on the map or inside a module to see context-specific help.

Press Space or use the pause button to freeze time while planning. The pause controls let you restart the current mission after confirmation. Opening NASA data or the astronaut editor pauses the clock. The simulation also pauses when the tab becomes hidden.

## Publish with GitHub Pages

The portable ZIP puts the full website at the top level. Extract it and upload the contents, including the assets folder, to the root of a GitHub repository. In **Settings → Pages**, choose **Deploy from a branch**, choose **main** and **/(root)**, then save. Submit the repository URL as the code link and the Pages URL as the game link. This project uses relative asset paths and has no build step. When using the workspace checkout instead of the portable ZIP, upload the contents of `dist/` at the repository root.

[GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Scientific basis

- **Measured:** NASA reports Opportunity had 21 Wh available on sol 5111 during the 2018 dust storm. The energy capacities shown in the game are normalized: six chart anchors contribute budgets of 10, 10, 7, 6, 2 and 1. Intermediate values and the post-storm recovery are illustrative estimates, not recovered Opportunity telemetry. See NASA's [Mars Surface Power Generation](https://ntrs.nasa.gov/citations/20230015763) and [Opportunity chart](https://science.nasa.gov/resource/on-mars-light-is-energy/).
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
- The outpost and room illustrations in `assets/outpost.jpg` and `assets/interiors.jpg` were created with ImageGen. OpenAI ChatGPT/Codex assisted with concept development, research synthesis, code, UI, and localization.

## Design decision

Mission 1 lasts five minutes after untimed setup. Keep the crew safe and harvest at least one tray to unlock Mission 2, a six-minute run on the same map with less food and a longer dust storm. Mission 2 compares its results with the last successful training run. Unlocks and the training result are saved in this browser.

The greenhouse trays share water and start with the same crop and growth. The light settings trade harvest time for power and each tray reports its energy use and time without growth. The sensor plots a normalized solar output series and an illustrative opacity index derived from it. Curves, event timings and resource rates are game parameters. The sources panel explains the real observations that inspired the model.
