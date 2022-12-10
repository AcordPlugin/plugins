import patchContainer from "./other/patchContainer.js"
import { patchDOM } from "./patches/dom.jsx";
import { patchFriendsChecker } from "./patches/friendsChecker.js";
import { patchGuildsChecker } from "./patches/guildsChecker.js";
import { patchStyles } from "./patches/styles.js";
import { persist } from "@acord/extension";

export default {
  load() {
    patchFriendsChecker();
    patchGuildsChecker();
    patchStyles();
    patchDOM();

    // Clear old data
    if (Array.isArray(persist.ghost.unfriends)) {
      delete persist.store.unfriends;
      delete persist.store.lastFriends;
      delete persist.ghost.lastGuilds;
      delete persist.ghost.leavedGuilds;
    }

  },
  unload() {
    patchContainer.removeAll();
  }
}