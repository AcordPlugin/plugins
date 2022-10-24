import { awaitResponse } from "../connection/socket";
import { getVoiceChannelMembers } from "./VoiceStates";
import { localCache } from "./cache.js";


/** @returns {import("./VoiceStates.js").VoiceStateRaw?} */
export async function fetchUserVoiceStates(userId) {
  let states = localCache.lastVoiceStates.find(i=>i[0]===userId)?.[1] || [];
  if (!states.length) {
    let cached = localCache.responseCache.get(`Users:${userId}`);
    if (cached) return cached.states;

    states = await new Promise(r=>localCache.stateRequestCache.push([userId, r]));
    localCache.responseCache.set(`Users:${userId}`, { at: Date.now(), states, ttl: 1000 });
  }
  return states;
}

export async function fetchVoiceMembers(channelId) {
  let members = getVoiceChannelMembers(channelId);
  if (!members.length) {
    let cached = localCache.responseCache.get(`VoiceMembers:${channelId}`);
    if (cached) return cached.members;

    members = (await awaitResponse("members", { channelId }))?.data || [];
    localCache.responseCache.set(`VoiceMembers:${channelId}`, { at: Date.now(), members, ttl: 10000 });
  }
  return members;
}
