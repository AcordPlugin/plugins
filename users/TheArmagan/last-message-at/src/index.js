import { socket } from "./connection/socket.js"
import patchContainer from "./other/patchContainer.js";
import { patchDOM } from "./patches/dom.js";
import { patchMessages } from "./patches/messages.js";

export default {
    load() {
        patchDOM();
        patchMessages();
        socket.connect();
    },
    unload() {
        patchContainer.removeAll();
        socket.disconnect();
    }
}