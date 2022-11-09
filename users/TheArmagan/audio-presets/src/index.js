import patchContainer from "./other/patchContainer.js"
import { persist } from "@acord/extension";
import patcher from "@acord/patcher";
import webpack from "@acord/modules/webpack"
import { logger } from "@acord/utils";
import { toasts } from "@acord/ui";


export default {
    load() {
        const WebSound = webpack.find(i=> i?.prototype?._ensureAudio, true);

        patchContainer.add(
            patcher.instead("_ensureAudio", WebSound.prototype, async function(args, instead) {
                let map = Object.fromEntries(persist.ghost.settings.preset.split(/;|\n/).map(i=>i.trim().split("=")));

                if (persist.ghost.settings.logAudioNames) {
                    logger.log(`[Sound Presets] Sound Name: ${this.name}`);
                    toasts.show.info(`[Sound Presets] Sound Name: ${this.name}`);
                }

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
                "type": "header",
                "name": "Configuration"
            },
            {
                "type": "textarea",
                "property": "preset",
                "value": "message1=message2\ncall_ringing=call_ringing_beat",
                "placeholder": "message1=message2\ncall_ringing=https://discordcdnlink",
                "name": "Audio Preset",
                "description": "Your audio preset configuration.. Supports swapping sounds and also custom sounds from discord cdn(uploads) too.",
                "cols": 6
            },
            {
                "type": "header",
                "name": "Debugging"
            },
            {
                "type": "checkbox",
                "name": "Log Audio Names",
                "description": "Helpful when trying to identify which sound is which.",
                "property": "logAudioNames",
                "value": false
            },
        ]
    }
}