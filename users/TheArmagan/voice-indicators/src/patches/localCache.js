import { localCache } from "../other/cache.js";
import patchContainer from "../other/patchContainer.js";
import utils from "@acord/utils";
import { persist } from "@acord/extension";
import { awaitResponse } from "../connection/socket.js";
import chillout from "chillout";

export function patchLocalCache() {
    patchContainer.add(()=>{
        localCache.lastVoiceStates = [];
        localCache.responseCache = new Map();
        localCache.stateRequestCache = [];
    });

    patchContainer.add(utils.interval(()=>{
        localCache.responseCache.forEach((v, k)=>{
            if (Date.now() - v.at > v.ttl) {
                cache.delete(k);
            }
        })
    }, 1000));

    patchContainer.add((()=>{
        let STOP = 0;

        async function loop() {
            if (STOP) return;

            if (localCache.stateRequestCache[0]) {
                (async ()=>{
                    let d = [...localCache.stateRequestCache];
                    localCache.stateRequestCache = [];
                    let res = await awaitResponse("bulkState", [...new Set(d.map(i=>i[0]))])?.data || [];
                    await chillout.forEach(res, (r)=>{
                        let results = d.filter(i=>i[0] === r[0]);
                        results.forEach(v=>{
                            v[1](r[1]);
                        })
                    });
                })();
            }

            await new Promise(r=>setTimeout(r, persist.ghost.settings.performanceMode ? 1e3 : 5e3));
            loop();
        }
        loop();

        return ()=>{
            STOP = 1;
        }
    })());
}