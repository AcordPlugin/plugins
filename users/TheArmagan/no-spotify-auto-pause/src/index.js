import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";

export default {
    load() {
        patchContainer.add(
            patcher.instead(
                "fetch",
                window,
                async function(args, instead) {
                    if (args[0] == "https://api.spotify.com/v1/me/player/pause") return;
                    return instead.call(this, ...args);
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}