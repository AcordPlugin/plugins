import io from "socket.io-client";
import { UserStore } from "../other/apis";
import { getUserVoiceStateShaped, getVoiceChannelMembers } from "../other/VoiceStates";

export const socket = io("https://ccwss.armagan.rest/voice-indicators", {
  transports: ["websocket"],
  extraHeaders: {
    "x-type": "Acord"
  }
});

socket.on("connect", () => {
  socket.emit(":setUser", {
    userId: UserStore.getCurrentUser().id
  });
});

socket.on("state", ({ userId }, cb) => {
  cb({ ok: true, data: getUserVoiceStateShaped(userId) });
});

socket.on("members", ({ channelId }, cb) => {
  cb({ ok: true, data: getVoiceChannelMembers(channelId) });
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



