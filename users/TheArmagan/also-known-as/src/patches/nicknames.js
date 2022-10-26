import { getMemberNicks } from "../methods/getMemberNicks";
import { updateNames } from "../other/api";
import { getLastSelectedGuildId, GuildStore } from "../other/apis";
import patchContainer from "../other/patchContainer";

let lastGuildId = null;

export function patchNicknames() {
  let patch = (() => {

    function updateAll() {
      let guildIds = Object.keys(GuildStore.getGuilds());
      let names = [];
      for (let gIdx = 0; gIdx < guildIds.length; gIdx++) {
        let guildId = guildIds[gIdx];
        names.push(...getMemberNicks(guildId));
      }
      updateNames(names);
    }

    let updateInterval1 = setInterval(updateAll, 60000 * 6);
    setTimeout(updateAll, 1000);

    let updateInterval2 = setInterval(() => {
      let id = getLastSelectedGuildId();
      if (lastGuildId != id) {
        updateNames(getMemberNicks(id));
      }
    }, 60000);

    return () => {
      clearInterval(updateInterval1);
      clearInterval(updateInterval2);
    }
  })();


  patchContainer.add(patch);
}