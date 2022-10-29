import patchContainer from "./other/patchContainer.js"
import { persist } from "@acord/extension";
import patcher from "@acord/patcher";
import webpack from "@acord/modules/webpack"

const WebSound = webpack.find(i=> i?.prototype?._ensureAudio, true);

export default {
    load() {
        patchContainer.add(
            patcher.before("_ensureAudio", WebSound.prototype, function() {
                let map = Object.fromEntries(persist.ghost.settings.preset.split(";").map(i=>i.split("=")));
                if (map[this.name]) {
                    this.name = map[this.name];
                }
            })
        )
    },
    unload() {
        patchContainer.removeAll();
    },
    settings: {
        data: [
            {
                "type": "input",
                "altType": "text",
                "property": "preset",
                "value": "message1=message2;call_ringing=call_ringing_beat",
                "placeholder": "message1=message2;call_ringing=call_ringing_beat",
                "name": "Audio Preset",
                "description": "Your audio preset configuration..",
                "size": "large"
            }
        ]
    }
}