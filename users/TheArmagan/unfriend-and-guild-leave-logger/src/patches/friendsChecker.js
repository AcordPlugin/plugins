import chillout from "chillout";
import { RelationshipStore, UserStore } from "../other/apis.js";
import patchContainer from "../other/patchContainer.js";
import { persist, i18n } from "@acord/extension";
import { sleep } from "@acord/utils";
import { notifications } from "@acord/ui";

let lastUserId = null;
export function patchFriendsChecker() {
  patchContainer.add((() => {
    let currentUserId = UserStore.getCurrentUser().id;
    let STOP = 0;
    let friendIdCache = [];

    async function check() {
      currentUserId = UserStore.getCurrentUser().id;
      if (!persist.ghost.users?.[currentUserId]?.lastFriends) {
        persist.store.users[currentUserId].lastFriends = [];
        persist.store.users[currentUserId].unfriends = [];
      }
      if (lastUserId != currentUserId) {
        friendIdCache = new Set(persist.ghost.users?.[currentUserId]?.lastFriends?.length ? persist.ghost.users[currentUserId].lastFriends : RelationshipStore.getFriendIDs())
      }
      lastUserId = currentUserId;
      if (STOP) return;
      let newFriendIds = new Set(RelationshipStore.getFriendIDs());

      await chillout.forEach([...friendIdCache.values()], (friendId) => {
        if (newFriendIds.has(friendId)) return;
        let user = UserStore.getUser(friendId);
        if (!user) return;
        persist.store.users[currentUserId].unfriends.unshift({
          at: Date.now(),
          tag: user.tag,
          id: user.id,
          avatar: user.avatar,
          _id: Math.random().toString(36).replace(".", "")
        });
        notifications.show(i18n.format("UNFRIEND", user.tag));
      });

      friendIdCache = newFriendIds;
      persist.store.users[currentUserId].lastFriends = [...newFriendIds.values()];

      await sleep(10000);
      check();
    }
    check();

    return () => {
      STOP = 1;
    }
  })())
}