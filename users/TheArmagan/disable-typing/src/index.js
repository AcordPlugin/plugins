import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { TypingActions } from "@acord/modules/common";


export default {
    load() {
        patchContainer.add(
            patcher.instead(
                "sendTyping",
                TypingActions,
                ()=>{}
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    },
}