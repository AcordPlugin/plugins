import patchContainer from "./other/patchContainer.js";
import { patchAll } from "./patches/all.js";
import { patchStyles } from "./patches/styles.js";

export default {
  load() {
    patchStyles();
    patchAll();
  },
  unload() {
    patchContainer.removeAll();
  }
}