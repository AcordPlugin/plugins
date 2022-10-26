import io from "socket.io-client";
import { UserStore } from "../other/apis";

export const socket = io("https://ccwss.armagan.rest/also-known-as", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  socket.emit(":setUser", {
    userId: UserStore.getCurrentUser().id
  });
});

export function awaitResponse(eventName, data, timeout = Infinity) {
  return new Promise((resolve) => {
    let done = false;
    socket.emit(eventName, data, (r) => {
      if (done) return;
      if (!r.ok) console.log(`[AC:AKA]`, r);
      resolve(r);
    });
    if (timeout != Infinity) {
      setTimeout(() => {
        done = true;
        resolve({ ok: false, error: "Timeout" });
      }, timeout);
    }
  })
}



