import { awaitResponse, socket } from "../connection/socket.js";
import { TypingStore } from "../other/apis.js";
import { localCache } from "../other/cache.js";
import patchContainer from "../other/patchContainer.js";
import utils from "@acord/utils";

export function patchTypings() {
    patchContainer.add((()=>{

        function onTypings() {
            let typingUserIds = Object.keys(Object.values(TypingStore.__getLocalVars().typingUsersByChannel).reduce((all, current)=> { Object.entries(current).forEach(i=>{ all[i[0]] = i[1] }); return all; }, {}));
            socket.emit("typings", { ok: true, data: typingUserIds });
            localCache.typingUsers = typingUserIds;
        }

        TypingStore.addChangeListener(onTypings);

        return ()=>{
            TypingStore.removeChangeListener(onTypings);
            localCache.typingUsers = [];
            localCache.responseCache.clear();
        }
    })());

    patchContainer.add(utils.interval(async ()=>{
        if (localCache.requestCache[0]) {
            let d = [...localCache.requestCache];
            localCache.requestCache = [];
            let res = (await awaitResponse("bulkTyping", d.map(i=>i[0])))?.data || [];

            res.forEach((r)=>{
                let results = d.filter(i=>i[0] === r[0]);
                results.forEach(v=>{
                    v[1](r[1] || false);
                })
            });
        }
    }, 100));

    patchContainer.add(utils.interval(() => {
        localCache.responseCache.forEach((item, key) => {
            if (Date.now() - item.at > item.ttl) {
                localCache.responseCache.delete(key);
            }
        });
    }, 1000));
}