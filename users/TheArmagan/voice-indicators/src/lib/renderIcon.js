import { DeafIcon } from "../components/dom/DeafIcon.js";
import { MuteIcon } from "../components/dom/MuteIcon.js";
import { VideoIcon } from "../components/dom/VideoIcon.js";
import { VoiceIcon } from "../components/dom/VoiceIcon.js";
import { COLORS } from "../other/constants.js";

/**
 * 
 * @param {import("../other/VoiceStates.js").VoiceStateRaw} state 
 * @returns 
 */
export function renderIcon(state, direct = false) {
  let d = direct ? state : state.states;
  return (d.selfDeaf || d.deaf)
    ? DeafIcon({ color: COLORS[d.deaf ? "DANGER" : "SECONDARY"] })
    : (d.selfMute || d.mute || d.suppress)
      ? MuteIcon({ color: COLORS[d.mute ? "DANGER" : "SECONDARY"] })
      : d.selfVideo
        ? VideoIcon({ color: COLORS.SECONDARY })
        : d.selfStream
          ? '<div class="v--icon vi--red-dot" ></div>'
          : VoiceIcon({ color: COLORS.SECONDARY });
}