import chillout from "chillout";
import { GuildStore, UserStore } from "../other/apis.js";
import patchContainer from "../other/patchContainer.js";
import { persist, i18n } from "@acord/extension";
import { sleep } from "@acord/utils";
import { notifications } from "@acord/ui";

let lastUserId = null;
export function patchGuildsChecker() {

  patchContainer.add((() => {
    let currentUserId = UserStore.getCurrentUser().id;
    let STOP = 0;
    let guildCache = {};

    async function check() {
      currentUserId = UserStore.getCurrentUser().id;
      if (!persist.ghost.users?.[currentUserId]?.lastGuilds) {
        persist.store.users[currentUserId].lastGuilds = {};
        persist.store.users[currentUserId].leavedGuilds = [];
      }
      if (lastUserId != currentUserId) {
        guildCache = persist.ghost.users?.[currentUserId]?.lastGuilds ? (persist.ghost.users[currentUserId].lastGuilds || {}) : GuildStore.getGuilds()
      }
      lastUserId = currentUserId;
      if (STOP) return;
      let newGuilds = GuildStore.getGuilds();

      await chillout.forEach(Object.keys(guildCache), (guildId) => {
        if (newGuilds[guildId]) return;
        let guild = guildCache[guildId];
        persist.store.users[currentUserId].leavedGuilds.unshift({
          at: Date.now(),
          name: guild.name,
          id: guild.id,
          icon: guild.icon,
          _id: Math.random().toString(36).replace(".", "")
        });
        notifications.show(i18n.format("GUILD_LEAVE", guild.name));
      });

      guildCache = newGuilds;
      persist.store.users[currentUserId].lastGuilds = Object.fromEntries(Object.entries(newGuilds).map(i => [i.id, { name: i.name, id: i.id, icon: i.icon }]).filter(i => i.id));

      await sleep(10000);
      check();
    }
    check();

    return () => {
      STOP = 1;
    }
  })())
}