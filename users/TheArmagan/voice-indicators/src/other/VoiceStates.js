import { ChannelStore, GuildStore, UserStore, VoiceStateStore } from "./apis";
import { persist } from "@acord/extension";

/**
 * @typedef {["guilddeaf"|"deaf"|"guildmute"|"mute"|"video"|"stream"|"voice", string?, string?, string?, string?, string?, string?, string?, string?, string?, string?, string?]} VoiceStateRaw
 */

/**
 * @returns {{[id:string]: VoiceStateRaw}}
 */
export function getAllVoiceStates() {
  return Object.fromEntries(
    Object.values(VoiceStateStore.getAllVoiceStates())
      .map((i) => Object.values(i))
      .flat()
      .map((i) => [
        i.userId,
        makeRaw(i)
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
      states: getUserVoiceState(u?.id)
    }
  }).filter(i=>i?.id) : [];
}

/** @returns {VoiceStateRaw?} */
export function getUserVoiceState(userId) {
  let state = VoiceStateStore.getVoiceStateForUser(userId);
  return state ? makeRaw(state) : null;
}

/** @returns {VoiceStateRaw} */
function makeRaw(i) {
  let channelRedacted = persist.ghost.settings?.redacted ?? false;
  let channel = ChannelStore.getChannel(i.channelId);
  let guild = GuildStore.getGuild(channel?.guild_id);
  let user = UserStore.getUser(i.userId);
  return [
    (i.selfDeaf || i.deaf)
    ? `${i.deaf ? "guild" : ""}deaf`
    : (i.selfMute || i.mute || i.suppress)
    ? `${i.mute ? "guild" : ""}mute`
    : i.selfVideo
    ? "video"
    : i.selfStream
    ? "stream"
    : "normal",
    user.id,
    user?.tag,
    user?.avatar || "",
    !channel ? "" : channel.id,
    !channel ? "" : (channelRedacted ? "Unknown" : (channel.name || [...new Map([...channel.recipients.map(i => [i, UserStore.getUser(i)]), [UserStore.getCurrentUser().id, UserStore.getCurrentUser()]]).values()].filter(i=>i).map(i => i.username).sort((a, b) => a > b).join(", ") || "Unknown")),
    !channel ? "" : (channelRedacted ? "" : channel?.icon),
    !channel ? "" : channelRedacted,
    !guild ? "" : guild.id,
    !guild ? "" : guild.name,
    !guild ? "" : (guild?.vanityURLCode || ""),
    !guild ? "" : (guild?.icon || "")
  ].map(i=>`${i}`.replaceAll(";", ""));
}