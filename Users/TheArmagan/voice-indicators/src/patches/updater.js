import { renderIcon } from "../lib/renderIcon.js";
import { fetchUserVoiceState } from "../other/api.js";
import patchContainer from "../other/patchContainer.js";
import events from "@acord/events";


export function patchUpdater() {

  patchContainer.add((() => {

    let interval = setInterval(() => {
      events.emit("VoiceIndicators:EverySecond");
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })())
}