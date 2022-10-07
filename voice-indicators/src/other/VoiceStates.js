import { ChannelStore, GuildStore, UserStore, VoiceStateStore } from "./apis";
import { persist } from "@acord/pluginData";

/**
 * @typedef {{states:{deaf:boolean,mute:boolean,selfDeaf:boolean,selfMute:boolean,selfStream:boolean,selfVideo:boolean,suppress:boolean},isPrivate:boolean,user:{id:string,tag:string,avatar:string},channel:{id:string,name:string,icon:string,redacted:boolean},guild:{id:string,name:string,icon:string}}} VoiceStateShaped
 */

/**
 * @returns {{[id:string]: VoiceStateShaped}}
 */
export function getAllVoiceStatesShaped() {
  return Object.fromEntries(
    Object.values(VoiceStateStore.getAllVoiceStates())
      .map((i) => Object.values(i))
      .flat()
      .map((i) => [
        i.userId,
        makeShape(i)
      ]).filter(i=>i[1])
  );
}

/** @returns {{id: string, tag: string, avatar: string}[]} */
export function getVoiceChannelMembers(channelId) {
  let states = VoiceStateStore.getVoiceStatesForChannel(channelId);
  return states ? Object.keys(states).map(i => {
    let u = UserStore.getUser(i);
    return {
      id: u?.id,
      tag: u?.tag,
      avatar: u?.avatar,
      states: getUserVoiceStateShaped(u?.id)?.states
    }
  }).filter(i=>i?.id) : [];
}

/** @returns {VoiceStateShaped?} */
export function getUserVoiceStateShaped(userId) {
  let state = VoiceStateStore.getVoiceStateForUser(userId);
  return state ? makeShape(state) : null;
}

/** @returns {VoiceStateShaped} */
function makeShape(i) {
  let channelRedacted = persist.ghost.settings?.redacted ?? false;
  let channel = ChannelStore.getChannel(i.channelId);
  let guild = GuildStore.getGuild(channel?.guild_id);
  let user = UserStore.getUser(i.userId);
  return {
    states: {
      deaf: i.deaf,
      mute: i.mute,
      selfDeaf: i.selfDeaf,
      selfMute: i.selfMute,
      selfStream: i.selfStream,
      selfVideo: i.selfVideo,
      suppress: i.suppress
    },
    isPrivate: !guild,
    user: {
      id: i.userId,
      tag: user.tag,
      avatar: user?.avatar
    },
    channel: channel ? {
      id: channel.id,
      name: channelRedacted ? "Unknown" : (channel.name || [...new Map([...channel.recipients.map(i => [i, UserStore.getUser(i)]), [UserStore.getCurrentUser().id, UserStore.getCurrentUser()]]).values()].filter(i=>i).map(i => i.username).sort((a, b) => a > b).join(", ") || "Unknown"),
      icon: channelRedacted ? undefined : channel?.icon,
      redacted: channelRedacted
    } : undefined,
    guild: guild ? {
      id: guild.id,
      name: guild.name,
      vanity: guild?.vanityURLCode,
      icon: guild?.icon
    } : undefined
  }
}