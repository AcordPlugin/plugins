import { GuildStore } from "@acord/modules/common";
import { persist } from "@acord/extension";
export const currentGuildIds = new Set();

export const listener = () => {

  const guildAddListener = () => {
    const nIds = new Set();
    for (let id in GuildStore.getGuilds()) nIds.add(id);
    const guildIds = [...nIds].filter(id => !currentGuildIds.has(id));
    if (!guildIds?.length) return;
    const data = { /* suppress_everyone: true, suppress_roles: true, */ muted: true };
    for (let key in persist.ghost.settings) if (persist.ghost.settings[key]) data[key] = persist.ghost.settings[key];
    guildIds.forEach((id) => {
      GuildStore.updateGuildNotificationSettings(id, data);
    });
    currentGuildIds.clear();
    nIds.forEach((value) => currentGuildIds.add(value));
  };
  GuildStore.addReactChangeListener(guildAddListener);
  return () => GuildStore.removeReactChangeListener(guildAddListener);
}