import chillout from "chillout";
import { RelationshipStore, UserStore } from "../other/apis.js";
import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { sleep } from "@acord/utils";
import { toasts } from "@acord/ui";

export function patchFriendsChecker() {
  if (!Array.isArray(persist.ghost.unfriends))
    persist.store.unfriends = [];

  patchContainer.add((() => {
    let STOP = 0;
    let friendIdCache = new Set(RelationshipStore.getFriendIDs());

    async function check() {
      if (STOP) return;

      let newFriendIds = new Set(RelationshipStore.getFriendIDs());

      await chillout.forEach([...friendIdCache.values()], (friendId) => {
        if (newFriendIds.has(friendId)) return;
        let user = UserStore.getUser(friendId);
        persist.store.unfriends.unshift({
          at: Date.now(),
          tag: user.tag,
          id: user.id,
          avatar: user.avatar
        });
        toasts.show.info(`You are no longer friends with "${user.tag}"!`);
      });

      friendIdCache = newFriendIds;

      await sleep(10000);
      check();
    }
    check();

    return () => {
      STOP = 1;
    }
  })())
}