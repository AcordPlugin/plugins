import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { localCache } from "../other/cache.js";
import { getAllVoiceStatesEntries } from "../other/VoiceStates.js";
import chillout from "chillout";
import { socket } from "../connection/socket.js";
import utils from "@acord/utils"

export function patchBulkUpdater() {
    patchContainer.add(
        (() => {
            let STOP = 0;
            localCache.lastVoiceStates = [];

            async function loop() {
                if (STOP) return;

                let currentStates = getAllVoiceStatesEntries();

                // let updates = [];

                // await chillout.forEach(currentStates, (cs)=>{
                //     let found = localCache.lastVoiceStates.find(i=>i[0] === cs[0]);
                //     if (
                //         !found
                //         || !_.isEqual(found[1], cs[1])
                //     ) {
                //         updates.push(cs);
                //     }
                // });

                socket.emit("bulkUpdate", currentStates);
                // localCache.lastVoiceStates = currentStates;

                await new Promise(r => setTimeout(r, persist.ghost.settings.performanceMode ? 10000 : 5000));
                loop();
            }

            loop();

            return () => {
                STOP = 1;
                localCache.lastVoiceStates = [];
            }
        })()
    );

    patchContainer.add(utils.interval(() => {
        localCache.lastVoiceStates = [];
    }, 60000 * 30));
}