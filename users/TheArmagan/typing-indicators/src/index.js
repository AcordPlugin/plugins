import { socket } from "./connection/socket.js"
import patchContainer from "./other/patchContainer.js";
import { patchDOM } from "./patches/dom.js";
import { patchStyles } from "./patches/style.js";
import { patchTypings } from "./patches/typings.js";
import { patchUpdater } from "./patches/updater.js";

export default {
    load() {
        patchDOM();
        patchStyles();
        patchTypings();
        patchUpdater();
        socket.connect();
    },
    unload() {
        patchContainer.removeAll();
        socket.disconnect();
    }
}