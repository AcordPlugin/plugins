import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { localCache } from "../other/cache.js";
import { getAllVoiceStatesEntries } from "../other/VoiceStates.js";
import chillout from "chillout";

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

                await chillout.forEach(currentStates, ()=>{
                    
                });
                
                await chillout.forEach(localCache.lastVoiceStates, ()=>{

                })

                await new Promise(r=>setTimeout(r, persist.ghost.settings.performanceMode ? 3e4 : 5e3));
                loop();
            }

            loop();

            return ()=>{
                STOP = 1;
            }
        })()
    );
}