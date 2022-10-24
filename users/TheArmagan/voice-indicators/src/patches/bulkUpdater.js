import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { localCache } from "../other/cache.js";
import { getAllVoiceStatesEntries } from "../other/VoiceStates.js";
import chillout from "chillout";
import { socket } from "../connection/socket.js";

export function patchBulkUpdater() {
    patchContainer.add(
        (()=>{
            let STOP = 0;
            localCache.lastVoiceStates = getAllVoiceStatesEntries();

            async function loop() {
                if (STOP) return;

                let currentStates = getAllVoiceStatesEntries();

                let updates = [];
                let removes = [];

                await chillout.forEach(currentStates, (cs)=>{
                    let found = localCache.lastVoiceStates.find(i=>i[0] === cs[0]);
                    if (
                        !found
                        || !_.isEqual(found[1], found[1])
                    ) {
                        updates.push(cs);
                    }
                });
                
                await chillout.forEach(localCache.lastVoiceStates, (ls)=>{
                    if (
                        currentStates.findIndex(i=>i[0] === ls[0]) === -1
                    ) {
                        removes.push(ls[0]);
                    }
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
}