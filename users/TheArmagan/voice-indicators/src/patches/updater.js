import patchContainer from "../other/patchContainer.js";
import events from "@acord/events";


export function patchUpdater() {

  patchContainer.add((() => {

    let interval = setInterval(() => {
      events.emit("VoiceIndicators:Render");
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  })())
}