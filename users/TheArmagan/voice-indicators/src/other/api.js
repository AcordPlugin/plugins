import { awaitResponse } from "../connection/socket";
import { getVoiceChannelMembers, rawToParsed } from "./VoiceStates";
import { localCache } from "./cache.js";


/** @returns {import("./VoiceStates.js").VoiceStateRaw?} */
export async function fetchUserVoiceStates(userId) {
  let cached = localCache.responseCache.get(`Users:${userId}`);
  if (cached) return cached.states;

  let states = await new Promise(r=>localCache.stateRequestCache.push([userId, r]));
  localCache.responseCache.set(`Users:${userId}`, { at: Date.now(), states, ttl: 1000 });
  return states;
}

export async function fetchVoiceMembers(id) {
  let members = getVoiceChannelMembers(id);
  if (!members.length) {
    let cached = localCache.responseCache.get(`VoiceMembers:${id}`);
    if (cached) return cached.members;

    members = ((await awaitResponse("members", { id }))?.data || []).map(rawToParsed);
    localCache.responseCache.set(`VoiceMembers:${id}`, { at: Date.now(), members, ttl: 1000 });
  }
  return members;
}


