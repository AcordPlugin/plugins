import patchContainer from "../other/patchContainer.js";

export function patchBulkUpdater() {
    patchContainer.add(
        (()=>{
            let STOP = 0;

            async function loop() {

                
                loop();
            }

            return ()=>{
                STOP = 1;
            }
        })()
    );
}