import patchContainer from "../other/patchContainer.js";
import { persist } from "@acord/extension";
import { localCache } from "../other/cache.js";
import { getAllVoiceStatesEntries, makeRawArray } from "../other/VoiceStates.js";
import { FluxDispatcher, VoiceStateStore, UserStore, ChannelStore } from "../other/apis.js";
import chillout from "chillout";
import { socket } from "../connection/socket.js";
import utils from "@acord/utils"

export function patchBulkUpdater() {
    function handleVoiceUpdate(d) {
        socket.emit("voiceStateUpdate", [
            d.oldState ? makeRawArray(d.oldState) : null,
            d.newState ? makeRawArray(d.newState) : null,
            d.type
        ]);
    }

    patchContainer.add((() => {

        let unPatch1 = () => null;

        let stopSearching = false;

        (async () => {
            while (true) {
                if (stopSearching) break;
                if (FluxDispatcher?._actionHandlers?._orderedActionHandlers?.VOICE_STATE_UPDATES?.length) {
                    let voiceStateUpdatesHandlers = FluxDispatcher._actionHandlers._orderedActionHandlers.VOICE_STATE_UPDATES;
                    voiceStateUpdatesHandlers.unshift({
                        name: "Acord:VoiceIndicators",
                        actionHandler(e) {
                            e.voiceStates.forEach((newState) => {
                                let _oldState = VoiceStateStore.__getLocalVars().users?.[newState.userId]?.[newState.sessionId];
                                let oldState = _oldState ? { ...(_oldState || {}) } : null;
                                setTimeout(() => {
                                    let _isNewestStateExists = !!VoiceStateStore.__getLocalVars().users?.[newState.userId]?.[newState.sessionId];
                                    handleVoiceUpdate({ oldState, newState, type: _isNewestStateExists && !_oldState ? "join" : _isNewestStateExists && _oldState ? (newState.channelId !== oldState.channelId ? "move" : "staying") : "leave" })
                                }, 1);
                            })
                        },
                        storeDidChange() { }
                    });

                    unPatch1 = () => {
                        let index = voiceStateUpdatesHandlers.findIndex(i => i.name === "Acord:VoiceIndicators");
                        if (index === -1) return;
                        voiceStateUpdatesHandlers.splice(index, 1);
                    }

                    break;
                }
            }
        })();

        return () => {
            stopSearching = true;
            unPatch1();
        }
    })())
}