import { socket } from "../connection/socket.js";
import { FluxDispatcher, UserStore, ChannelStore, GuildStore } from "../other/apis.js";
import { localCache } from "../other/cache.js";
import patchContainer from "../other/patchContainer.js";
import utils from "@acord/utils";

export function patchMessages() {
    patchContainer.add((() => {

        function onMessage({ message }) {
            if (!message.author) return;
            if (message.type !== 0) return;
            let channel = ChannelStore.getChannel(message.channel_id);
            let guild = GuildStore.getGuild(message.guild_id);
            localCache.updateCache[message.author.id] = [
                new Date().toISOString(),
                `${guild ? `${guild.name} > ` : ""}${((channel.isDM() && !channel.isGroupDM()) ? 
                    (UserStore.getUser(channel.getRecipientId()).tag + ", " + UserStore.getCurrentUser().tag)
                    : channel.name) || [...new Map(channel.recipients.map(i => [i, UserStore.getUser(i)])).values()].filter(i => i).map(i => i.tag).sort((a, b) => a > b).join(", ")}`
            ];
        }

        FluxDispatcher.subscribe("MESSAGE_CREATE", onMessage);

        return () => {
            FluxDispatcher.unsubscribe(onMessage);
            localCache.updateCache = {};
        }
    })());

    patchContainer.add(utils.interval(async () => {
        socket.emit("bulkUpdate", { ...localCache.updateCache });
        localCache.updateCache = {};
    }, 15000));
}