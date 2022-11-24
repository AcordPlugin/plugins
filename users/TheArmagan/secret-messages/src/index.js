import patchContainer from "./other/patchContainer.js";
import patcher from "@acord/patcher";
import { MessageActions } from "@acord/modules/common";
import { awaitResponse } from "./connection/socket.js";

const noSpaceWhitespace = '\u200B';

export default {
    load() {
        patchContainer.add(
            patcher.before(
                "receiveMessage",
                MessageActions,
                async (args)=>{
                    if (args[1]?.content?.startsWith?.(noSpaceWhitespace)) {
                        let await awaitResponse("message", { id: args[1].id }, 10000);
                    }
                    return args;
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    },
}