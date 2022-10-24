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
  },
  settings: {
    data: [
      {
        type: "header",
        name: "Privacy"
      },
      {
        type: "checkbox",
        name: "Do Not Share Private Data",
        description: "When this setting is on, your private information will not be shared with the other party. However, you will not be able to see other people's private information.",
        property: "redacted",
        value: false
      },
      {
        type: "header",
        name: "Other"
      },
      {
        type: "checkbox",
        name: "Ignore Bots",
        description: "Do not show voice indicators on bots.",
        property: "ignoreBots",
        value: true
      },
    ]
  }
}