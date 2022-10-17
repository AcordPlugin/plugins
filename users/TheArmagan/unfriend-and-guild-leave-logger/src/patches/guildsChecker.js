import chillout from "chillout";
import { GuildStore } from "../other/apis.js";
import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { sleep } from "@acord/utils";
import { toasts } from "@acord/ui";


export function patchGuildsChecker() {
  if (!Array.isArray(persist.ghost.leavedGuilds))
    persist.store.leavedGuilds = [];

  patchContainer.add((() => {
    let STOP = 0;
    let guildCache = GuildStore.getGuilds();

    async function check() {
      if (STOP) return;

      let newGuilds = GuildStore.getGuilds();

      await chillout.forEach(Object.keys(guildCache), (guildId) => {
        if (newGuilds[guildId]) return;
        let guild = guildCache[guildId];
        persist.store.leavedGuilds.push({
          at: Date.now(),
          name: guild.name,
          id: guild.id,
          icon: guild.icon
        });
        toasts.show.info(`You are laved from "${guild.name}"!`);
      });

      guildCache = newGuilds;

      await sleep(10000);
      check();
    }
    check();

    return () => {
      STOP = 1;
    }
  })())
}