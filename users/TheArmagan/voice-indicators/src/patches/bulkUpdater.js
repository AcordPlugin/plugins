import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { localCache } from "../other/cache.js";
import { getAllVoiceStatesEntries } from "../other/VoiceStates.js";
import chillout from "chillout";
import { socket } from "../connection/socket.js";
import utils from "@acord/utils"

export function patchBulkUpdater() {
    patchContainer.add(
        (()=>{
            let STOP = 0;
            localCache.lastVoiceStates = [];

            async function loop() {
                if (STOP) return;

                let currentStates = getAllVoiceStatesEntries();

                let updates = [];
                let removes = [];

                await chillout.forEach(currentStates, (cs)=>{
                    let found = localCache.lastVoiceStates.find(i=>i[0] === cs[0]);
                    if (
                        !found
                        || !_.isEqual(found[1], cs[1])
                    ) {
                        updates.push(cs);
                    }
                });
                
                await chillout.forEach(localCache.lastVoiceStates, (lss)=>{
                    lss[1].forEach(ls=>{
                        let css = currentStates.find(i=>i[0] === lss[0]);
                        if (!css) {
                            removes.push(ls[0]);
                        } else {
                            let cs = css[1].find(cs=>cs[8] === ls[8]);
                            if (!cs || cs[4] != ls[1][4]) {
                                removes.push([ls[0], ls[1][4]]);
                            }
                        }
                    }) 
                });

                localCache.lastVoiceStates = currentStates;

                socket.emit("bulkUpdate", [updates, removes]);

                await new Promise(r=>setTimeout(r, persist.ghost.settings.performanceMode ? 2e4 : 5e3));
                loop();
            }

            loop();

            return ()=>{
                STOP = 1;
            }
        })()
    );

    patchContainer.add(utils.interval(()=>{
        localCache.lastVoiceStates = [];
    }, 60000*30));
}