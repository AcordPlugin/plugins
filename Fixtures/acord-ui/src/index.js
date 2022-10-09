import patchContainer from "./other/patchContainer.js";
import { patchDOM } from "./patches/dom.jsx";
import { patchStyles } from "./patches/style.js";

export default {
  load() {
    patchDOM();
    patchStyles();
  },
  unload() {
    patchContainer.removeAll();
  }
}