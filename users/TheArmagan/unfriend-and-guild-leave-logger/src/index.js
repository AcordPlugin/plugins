import patchContainer from "./other/patchContainer.js"
import { patchFriendsChecker } from "./patches/friendsChecker.js";
import { patchGuildsChecker } from "./patches/guildsChecker.js";

export default {
  load() {
    patchFriendsChecker();
    patchGuildsChecker();
  },
  unload() {
    patchContainer.removeAll();
  }
}