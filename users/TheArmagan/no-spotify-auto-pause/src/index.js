import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { logger } from "@acord/utils";

export default {
    load() {
        patchContainer.add(
            patcher.instead(
                "open",
                XMLHttpRequest.prototype,
                async function(args, instead) {
                    if (args[0] == "PUT" && args[1] == "https://api.spotify.com/v1/me/player/pause") {
                        logger.log(`[No Spotify Auto Pause] Spotify pause blocked.`);
                        args[1] = "https://discord.com/"; // basically noop the request
                    }
                    return instead.call(this, ...args);
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}