import patchContainer from "./other/patchContainer.js"
import { persist } from "@acord/extension";
import patcher from "@acord/patcher";
import webpack from "@acord/modules/webpack"
import { MediaEngineStore } from "@acord/modules/common";

export default {
    load() {
        const WebSound = webpack.find(i=> i?.prototype?._ensureAudio, true);

        patchContainer.add(
            patcher.instead("_ensureAudio", WebSound.prototype, async function(args, instead) {
                let t = this;
                let map = Object.fromEntries(persist.ghost.settings.preset.split(";").map(i=>i.split("=")));

                if (map[this.name]) {
                    let val = map[this.name];
                    if (!val.startsWith("https://")) {
                        this.name = val;
                        return instead.apply(this, args);
                    } else {
                        let a = await instead.apply(this, args);
                        a.src = val;
                        return a;
                    }
                } else {
                    return instead.apply(this, args);
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