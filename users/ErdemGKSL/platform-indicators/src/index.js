import patchContainer from "./other/patchContainer"
import { patchDOM } from "./patches/dom";
import { patchUpdater } from "./patches/updater";
import injectStyle from "./styles/style.scss"

export default {
  load() {
    patchDOM();
    patchUpdater();
    patchContainer.add(injectStyle());
  },
  unload() {
    patchContainer.removeAll();
  },
  settings: {
    data: [
      {
        type: "checkbox",
        name: "Ignore Bots",
        description: "Doesn't show platforms of the bots. (if ur interested they generaly are web tho)",
        property: "ignoreBots",
        value: true,
      }
    ]
  }
}