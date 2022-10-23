import { awaitResponse } from "../connection/socket";
import { localCache } from "./cache.js";

const cache = new Map();

setInterval(() => {
  cache.forEach((item, key) => {
    if (Date.now() - item.at > item.ttl) {
      cache.delete(key);
    }
  });
}, 1000);

export async function fetchIsUserTyping(id) {
  let state = localCache.typingUsers.includes(id);
  if (!state) {
    let cached = cache.get(`Users:${id}`);
    if (cached) return cached.state;

    state = !!(await awaitResponse("typing", { id }))?.data;
    cache.set(`Users:${id}`, { at: Date.now(), state, ttl: 1000 });
  }
  return state;
}