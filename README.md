# Sol 5111

Sol 5111 is a browser game for [Build a Junior Astronaut Mission Trainer](https://www.spaceappschallenge.org/2026/challenges/junior-astronaut-mission-trainer/), NASA Space Apps Challenge 2026. It targets roughly ages 10–14, an assumption for the prototype.

Open `dist/index.html` directly in a desktop browser to play offline. To host the game, serve the entire `dist/` folder. Use the language menu to switch between English and Ukrainian during a mission. The game remembers that preference when browser storage is available. HTML, CSS and JavaScript are bundled locally, including both images. External links to references require internet access.

## Explore the outpost

Customize the commander’s call sign, helmet, suit color and patch. The game saves the appearance in browser storage when available. Hold WASD or the arrow keys when the map is focused for continuous movement. Click or tap the terrain to walk to that point, or use the module selector. The visible astronaut turns and animates while walking. Inspect each module for a short explanation of the real system or NASA observation behind it.

Use the field controls to adjust the greenhouse lights, switch the air scrubber, or send the crew to shelter during the solar particle event. To connect the spare battery, collect it at Storage and carry it to the Solar array. Select it in the mission controls. It contributes only the energy the primary supply cannot cover, up to five units over the whole mission. Replaying a turn restores the battery and its location to their state at the start of that turn.

## Publish with GitHub Pages

The portable ZIP puts the full website at the top level. Extract it and upload the contents, including the assets folder, to the root of a GitHub repository. In **Settings → Pages**, choose **Deploy from a branch**, choose **main** and **/(root)**, then save. Submit the repository URL as the code link and the Pages URL as the game link. This project uses relative asset paths and has no build step. When using the workspace checkout instead of the portable ZIP, upload the contents of `dist/` at the repository root.

[GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## Example mission route

This route uses the primary battery only.

1. Run turns 1 and 2 with air, water and **Full** lights. Start turn 3 with 7 crop growth.
2. Run turn 3 with **Full** lights. The harvest leaves **7 battery** and **6 food**. Replay the turn with **Dim** lights. Doing that leaves **9 battery**, **3 food** and a crop at **9/10** growth.
3. On the Dim branch, use **Full** lights on turn 4 to harvest. Leave lights **Off** on turns 5 and 6. On turn 6, four units are available. Switch off the water recycler and keep the scrubber and shelter ventilation on. Stored water lets the crew complete the mission.
4. To demonstrate a loss, follow steps 1–3 but leave the shelter off on the final turn. The debrief reports an exposure failure. Choosing **Replay a decision** restores its starting reserves so it can be corrected.

## How the numbers work

- The solar sequence is **10, 10, 7, 6, 2, 1**. For sols 5098, 5103, 5105, 5106 and 5108, approximate chart readings were taken at the chosen sol along the yellow energy trace and scaled relative to the pre-storm level. At the supplied chart resolution, the baseline is about 155 px and the axis runs at about 627 px. The first five game values round the height above the axis to tenths of the baseline height. For sol 5111 the published **21 Wh** endpoint is assigned a minimum of 1 playable unit. The game counts six turns, skipping other sols. The values are a teaching proxy for relative generation.
- The May 20, 2024 solar particle event was observed separately by Curiosity’s RAD instrument. It supplies the context for the last turn. Shielding changes the game exposure score, which is not an absorbed dose or a human exposure standard.
- Air, water and food are bounded game reserves. A powered greenhouse needs water and adds crop growth. Harvests deliver supplemental food, and the starting reserve represents stored rations. Crew success requires a harvest by the end and usable reserves throughout. The model uses a pre-existing crop and compresses growth into six turns. Power assigned to shelter represents powered ventilation, while shielding is physical.
- The background panorama is a different Mars location from Opportunity's dust storm recording. It gives visual context for the fictional outpost.

## Sources and asset credits

- [NASA Science, On Mars, Light Is Energy](https://science.nasa.gov/resource/on-mars-light-is-energy/). Chart in `dist/assets/opportunity.jpg`, credited to NASA/JPL-Caltech/New Mexico Museum of Natural History.
- [NASA, NASA Watches Mars Light Up During Epic Solar Storm](https://www.nasa.gov/solar-system/planets/mars/nasa-watches-mars-light-up-during-epic-solar-storm/). May 2024 solar particle event.
- [NASA, Environmental Control and Life Support Systems](https://www.nasa.gov/reference/environmental-control-and-life-support-systems-eclss/). Air and water functions.
- [NASA, Veggie Fact Sheet](https://www.nasa.gov/wp-content/uploads/2023/03/veggie-fact-sheet-508.pdf). LED lighting, watering and crop growth.
- [NASA, Design for Ionizing Radiation Protection](https://www.nasa.gov/wp-content/uploads/2023/03/radiation-protection-technical-brief-ochmo.pdf). Storm shelter and shielding concepts.
- [NASA Science, NASA’s Perseverance Captures Panorama at “Arbot”](https://science.nasa.gov/photojournal/nasas-perseverance-captures-panorama-at-arbot/). Cropped in `dist/assets/mars.jpg`, credited to NASA/JPL-Caltech/ASU/MSSS.
- OpenAI ChatGPT/Codex assisted with concept development, research synthesis, code, UI, and localization.
