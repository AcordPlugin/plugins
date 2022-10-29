import patchContainer from "./other/patchContainer.js"
import { persist } from "@acord/extension";
import patcher from "@acord/patcher";
import webpack from "@acord/modules/webpack"
import { MediaEngineStore } from "@acord/modules/common";

export default {
    load() {
        const WebSound = webpack.find(i=> i?.prototype?._ensureAudio, true);

        patchContainer.add(
            patcher.instead("_ensureAudio", WebSound.prototype, function(args, instead) {
                let t = this;
                let map = Object.fromEntries(persist.ghost.settings.preset.split(";").map(i=>i.split("=")));

                if (map[this.name]) {
                    let val = map[this.name];
                    if (!val.startsWith("https://")) {
                        this.name = val;
                        return instead.apply(this, args);
                    } else {
                        return new Promise((resolve, reject) => {
                            let o = new Audio();
                            o.onloadeddata = function() {
                                o.volume = Math.min(MediaEngineStore.getOutputVolume() / 100 * t._volume, 1);
                                resolve(o);
                            }
                            o.onerror = function() {
                                return reject(new Error("could not play audio"))
                            }
                            o.onended = function() {
                                return t._destroyAudio()
                            }
                            o.load();
                            o.src = val;
                        });
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