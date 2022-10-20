import chillout from "chillout";
import { RelationshipStore, UserStore } from "../other/apis.js";
import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { sleep } from "@acord/utils";
import { toasts } from "@acord/ui";

export function patchFriendsChecker() {
  if (!Array.isArray(persist.ghost.unfriends))
    persist.store.unfriends = [];

  if (!Array.isArray(persist.ghost.lastFriends))
    persist.store.lastFriends = [];

  patchContainer.add((() => {
    let STOP = 0;
    let friendIdCache = new Set(persist.store.lastFriends.length ? persist.store.lastFriends : RelationshipStore.getFriendIDs());

    async function check() {
      if (STOP) return;

      let newFriendIds = new Set(RelationshipStore.getFriendIDs());

      await chillout.forEach([...friendIdCache.values()], (friendId) => {
        if (newFriendIds.has(friendId)) return;
        let user = UserStore.getUser(friendId);
        if (!user) return;
        persist.store.unfriends.unshift({
          at: Date.now(),
          tag: user.tag,
          id: user.id,
          avatar: user.avatar,
          _id: Math.random().toString(36).replace(".", "")
        });
        toasts.show.info(`You are no longer friends with "${user.tag}"!`);
      });

      friendIdCache = newFriendIds;
      persist.store.lastFriends = [...newFriendIds.values()];

      await sleep(10000);
      check();
    }
    check();

    return () => {
      STOP = 1;
    }
  })())
}