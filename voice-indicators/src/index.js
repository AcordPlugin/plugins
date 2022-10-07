import { socket } from "./connection/socket.js";
import patchContainer from "./other/patchContainer.js";
import { patchUpdater } from "./patches/updater.js";
import { patchDOM } from "./patches/dom.js";
import { patchStyles } from "./patches/style.js";

export default {
  load() {
    patchDOM();
    patchStyles();
    patchUpdater();
    socket.connect();
  },
  unload() {
    patchContainer.removeAll();
    socket.disconnect();
  }
}