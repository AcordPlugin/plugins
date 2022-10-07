import { awaitResponse } from "../connection/socket";
import { getUserVoiceStateShaped, getVoiceChannelMembers } from "./VoiceStates";

const cache = new Map();

setInterval(() => {
  cache.forEach((item, key) => {
    if (Date.now() - item.at > item.ttl) {
      cache.delete(key);
    }
  });
}, 1000);

/** @returns {import("./VoiceStates.js").VoiceStateShaped?} */
export async function fetchUserVoiceState(userId) {
  let state = getUserVoiceStateShaped(userId);
  if (!state) {
    let cached = cache.get(`Users:${userId}`);
    if (cached && !(Date.now() - cached.at > 1000)) return cached.state;

    state = (await awaitResponse("state", { userId }))?.data;
    cache.set(`Users:${userId}`, { at: Date.now(), state, ttl: 1000 });
  }
  return state;
}

export async function fetchVoiceMembers(channelId) {
  let members = getVoiceChannelMembers(channelId);
  if (!members.length) {
    let cached = cache.get(`VoiceMembers:${channelId}`);
    if (cached && !(Date.now() - cached.at > 10000)) return cached.members;

    members = (await awaitResponse("members", { channelId }))?.data || [];
    cache.set(`VoiceMembers:${channelId}`, { at: Date.now(), members, ttl: 10000 });
  }
  return members;
}
