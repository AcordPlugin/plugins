import { currentGuildIds, listener } from "./guildListener"
import { GuildStore } from "@acord/modules/common";

let unloadListener;

export default {
  load() {
    for (let id in GuildStore.getGuilds()) currentGuildIds.add(id);
    unloadListener = listener();
  },
  unload() {
    unloadListener();
    currentGuildIds.clear();
  },
  settings: {
    data: [
      {
        type: "checkbox",
        name: "Suppres Everyone",
        description: "Suppresses everyone mentions when joining a guild.",
        property: "suppress_everyone",
        value: false,
      },
      {
        type: "checkbox",
        name: "Suppres Roles",
        description: "Suppresses role mentions when joining a guild.",
        property: "suppress_roles",
        value: false,
      },
      {
        type: "checkbox",
        name: "Suppres Scheduled Events",
        description: "Suppresses scheduled events when joining a guild.",
        property: "mute_scheduled_events",
        value: false,
      }
    ]
  }
}