import { loadNotes } from "./other/loadNotes.js";
import patchContainer from "./other/patchContainer.js"
import { patchDOM } from "./patches/dom.js";
import { patchStyles } from "./patches/styles.js";

export default {
  load() {
    patchDOM();
    patchStyles();
    loadNotes();
  },
  unload() {
    patchContainer.removeAll();
  }
}