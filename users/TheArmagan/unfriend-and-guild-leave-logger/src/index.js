import patchContainer from "./other/patchContainer.js"
import { patchFriendsChecker } from "./patches/friendsChecker.js";
import { patchGuildsChecker } from "./patches/guildsChecker.js";
import { patchStyles } from "./patches/styles.js";

export default {
  load() {
    patchFriendsChecker();
    patchGuildsChecker();
    patchStyles();
  },
  unload() {
    patchContainer.removeAll();
  }
}