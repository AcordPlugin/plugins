import patchContainer from "../other/patchContainer";
import events from "@acord/events";
import utils from "@acord/utils";

export function patchUpdater() {
  patchContainer.add(utils.interval(() => events.emit("PlatformIndicators:EverySecond"), 1000))
}