import webpack  from "@acord/modules/webpack"
import { GuildStore } from "@acord/modules/common"
const getAllChannelsFromGuild = webpack.findByProperties("getTextChannelNameDisambiguations", "getChannels")?.getChannels;

/**
 * 
 * @returns {{}[]}
 */
export function getAllChannels() {
  const channels = [];
  for (let guildId in GuildStore.getGuilds()) {
    const channelsMap = getAllChannelsFromGuild(guildId);
    for (let channelType in channelsMap) {
      if (Array.isArray(channelsMap[channelType])) channelsMap[channelType].forEach(channelOuterData => {
        if (!channelOuterData.channel) return;
        if (channelOuterData.channel.type == 4) return;
        if (channels.some(x => x.id == channelOuterData.channel.id)) return;
        channels.push(channelOuterData.channel)
      })
    }
  };
  return channels;
}
// "getTextChannelNameDisambiguations", "getChannels"