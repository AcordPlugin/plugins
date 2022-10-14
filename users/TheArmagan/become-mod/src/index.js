import patchContainer from "./other/patchContainer.js";
import { patchAll } from "./patches/all.js";

export default {
  load() {
    patchAll();
  },
  unload() {
    patchContainer.removeAll();
  }
}