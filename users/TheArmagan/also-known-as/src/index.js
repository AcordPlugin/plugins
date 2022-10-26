import { socket } from "./connection/socket";
import patchContainer from "./other/patchContainer";


import { patchContextMenu } from "./patches/contextMenu";
import { patchNicknames } from "./patches/nicknames";
import { patchRelationships } from "./patches/relationships";
import { patchStyles } from "./patches/style.js";

export default {
  load() {
    patchRelationships();
    patchNicknames();
    patchContextMenu();
    patchStyles();
  },
  unload() {
    patchContainer.removeAll();
    socket.disconnect();
  }
}
