import { GuildStore } from "@acord/modules/common";
import { persist } from "@acord/extension";
import { webpack } from "@acord/modules";
const GuildNotifyStore = webpack.findByProperties("updateGuildNotificationSettings", "updateGuildAndChannelNotificationSettings");
export const currentGuildIds = new Set();

export const listener = () => {
  const guildAddListener = async () => {
    const nIds = new Set();
    await wait(10);
    for (let id in GuildStore.getGuilds()) nIds.add(id);
    const guildIds = [...nIds].filter(id => !currentGuildIds.has(id));
    if (!guildIds?.length) {
      if (nIds.size != currentGuildIds.size) {
        currentGuildIds.clear();
        nIds.forEach((value) => currentGuildIds.add(value));
      }
      return;
    }
    const data = { /* suppress_everyone: true, suppress_roles: true, */ muted: true };
    for (let key in persist.ghost.settings) if (persist.ghost.settings[key]) data[key] = persist.ghost.settings[key];
    guildIds.forEach((id) => {
      GuildNotifyStore.updateGuildNotificationSettings(id, data);
    });
    currentGuildIds.clear();
    nIds.forEach((value) => currentGuildIds.add(value));
  };
  GuildStore.addReactChangeListener(guildAddListener);
  return () => GuildStore.removeReactChangeListener(guildAddListener);
};

let wait = (s) => new Promise((resolve => setTimeout(() => resolve(true), s)));