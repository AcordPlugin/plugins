import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";

export function patchBulkUpdater() {
    patchContainer.add(
        (()=>{
            let STOP = 0;

            async function loop() {
                if (STOP) return;
                
                

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