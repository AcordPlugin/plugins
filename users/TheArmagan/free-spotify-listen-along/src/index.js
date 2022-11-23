import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { SpotifyStore } from "@acord/modules/common";

export default {
    load() {
        patchContainer.add(
            patcher.after(
                "getActiveSocketAndDevice",
                SpotifyStore,
                async function(args, response) {
                    if (response?.socket) return Object.assign(response, {
                        socket: Object.assign({}, response.socket, { isPremium: true })
                    });
                    return response;
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}