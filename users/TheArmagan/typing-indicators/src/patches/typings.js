import { socket } from "../connection/socket.js";
import { TypingStore } from "../other/apis.js";
import { localCache } from "../other/cache.js";
import patchContainer from "../other/patchContainer.js";

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
        }
    })());
}