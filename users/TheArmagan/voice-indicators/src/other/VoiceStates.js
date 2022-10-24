import { ChannelStore, GuildStore, UserStore, VoiceStateStore } from "./apis";
import { persist } from "@acord/extension";

/**
 * @typedef {["guildDeaf"|"deaf"|"guildMute"|"mute"|"video"|"stream"|"normal", string, string, string?, string?, string?, string?, string?, string?, string?, string?, string?]} VoiceStateRawArray
 * @typedef {string} VoiceStateRawString
 * @typedef {{state: string, userId: string, userTag: string, userAvatar?: string, channelId?: string, channelName?: string, channelIcon?: string, channelRedacted?: string, guildId?: string, guildName?: string, guildVanity?: string, guildIcon?: string }} VoiceStateParsed
 */

/**
 * @returns {{[id:string]: VoiceStateRawArray[]}}
 */
export function getAllVoiceStates(rawString) {

  return Object.fromEntries(getAllVoiceStatesEntries(rawString));
}

/**
 * @returns {[string, VoiceStateRawArray[]][]}
 */
export function getAllVoiceStatesEntries(rawString) {
  return Object.values(VoiceStateStore.getAllVoiceStates())
  .map((i) => Object.values(i))
  .flat()
  .map((i) => [
    i.userId,
    getUserVoiceStates(i.userId, rawString)
  ]).filter(i=>i[1]?.length)
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
      states: getUserVoiceStates(u?.id)
    }
  }).filter(i=>i?.id) : [];
}

/** @returns {VoiceStateRawArray?} */
export function getUserVoiceStates(userId, rawString) {
  return Object.values(VoiceStateStore.__getLocalVars().users[userId] || {}).map(i=> rawString ? makeRawArray(i).join(";") : makeRawArray(i));
}

/** @returns {VoiceStateRawArray} */
function makeRawArray(i) {
  let channelRedacted = persist.ghost.settings?.redacted ?? false;
  let channel = ChannelStore.getChannel(i.channelId);
  let guild = GuildStore.getGuild(channel?.guild_id);
  let user = UserStore.getUser(i.userId);
  return [
    (i.selfDeaf || i.deaf)
    ? `${i.deaf ? "guildDeaf" : "deaf"}`
    : (i.selfMute || i.mute || i.suppress)
    ? `${i.mute ? "guildMute" : "mute"}`
    : i.selfVideo
    ? "video"
    : i.selfStream
    ? "stream"
    : "normal",
    user.id,
    user.tag,
    user?.avatar || "",
    !channel ? "" : channel.id,
    !channel ? "" : (channelRedacted ? "Unknown" : (channel.name || [...new Map([...channel.recipients.map(i => [i, UserStore.getUser(i)]), [UserStore.getCurrentUser().id, UserStore.getCurrentUser()]]).values()].filter(i=>i).map(i => i.username).sort((a, b) => a > b).join(", ") || "Unknown")),
    !channel ? "" : (channelRedacted ? "" : (channel?.icon || "")),
    !channel ? "" : (channelRedacted || ""),
    !guild ? "" : guild.id,
    !guild ? "" : guild.name,
    !guild ? "" : (guild?.vanityURLCode || ""),
    !guild ? "" : (guild?.icon || "")
  ].map(i=>`${i}`.replaceAll(";", ""));
}

/**
 * @param {VoiceStateRawArray} raw 
 * @returns 
 */
export function rawToParsed(raw) {
  if (typeof raw == "string") raw = raw.split(";");
  return {
    state: raw[0],
    userId: raw[1],
    userTag: raw[2],
    userAvatar: raw[3],
    channelId: raw[4],
    channelName: raw[5],
    channelIcon: raw[6],
    channelRedacted: raw[7] == "true",
    guildId: raw[8],
    guildName: raw[9],
    guildVanity: raw[10],
    guildIcon: raw[11],
  }
}