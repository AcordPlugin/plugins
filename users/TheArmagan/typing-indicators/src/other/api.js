import { localCache } from "./cache.js";

export async function fetchIsUserTyping(id) {
  let state = localCache.typingUsers.includes(id);
  if (!state) {
    let cached = localCache.responseCache.get(`Users:${id}`);
    if (cached) return cached.state;

    // state = !!(await awaitResponse("typing", { id }))?.data;
    state = await new Promise(resolve => { localCache.requestCache.push([id, resolve]); });
    localCache.responseCache.set(`Users:${id}`, { at: Date.now(), state, ttl: 1000 });
  }
  return state;
}