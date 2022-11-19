import { socket } from "../connection/socket.js";
import { FluxDispatcher } from "../other/apis.js";
import { localCache } from "../other/cache.js";
import patchContainer from "../other/patchContainer.js";
import utils from "@acord/utils";

export function patchMessages() {
    patchContainer.add((()=>{

        function onMessage({ message }) {
            if (!message.author) return;
            localCache.updateCache[message.author.id] = new Date().toISOString();
        }

        FluxDispatcher.subscribe("MESSAGE_CREATE", onMessage);

        return ()=>{
            FluxDispatcher.unsubscribe(onMessage);
            localCache.updateCache = {};
        }
    })());

    patchContainer.add(utils.interval(async ()=>{
        socket.emit("bulkUpdate", { ...localCache.updateCache });
        localCache.updateCache = {};
    }, 15000));
}