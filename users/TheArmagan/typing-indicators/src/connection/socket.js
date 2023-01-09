import io from "socket.io-client";
import { UserStore } from "../other/apis.js";

export const socket = io("https://ccwss.armagan.rest/typing-indicators", {
  transports: ["websocket"]
});

socket.on("connect", () => {
  socket.emit(":setUser", {
    userId: UserStore.getCurrentUser().id
  });
});

socket.on(":kill", ()=>{
  socket.disconnect();
});

export function awaitResponse(eventName, data, timeout = Infinity) {
  return new Promise((resolve) => {
    let done = false;
    socket.emit(eventName, data, (r) => {
      if (done) return;
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



