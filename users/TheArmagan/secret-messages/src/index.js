import patchContainer from "./other/patchContainer.js";
import patcher from "@acord/patcher";
import utils from "@acord/utils";
import dom from "@acord/dom";
import { persist } from "@acord/extension";
import { MessageActions } from "@acord/modules/common";
import { awaitResponse } from "./connection/socket.js";

const noSpaceWhitespace = '\u200B';

const debouncedCb = _.debounce((cb)=>{cb()}, 1500);
const KEY_REGEX = /[^a-zA-Z0-9_-]/g;

export default {
    load() {
        patchContainer.add(
            dom.patch(
                '[id*="message-content-"]',
                async (elm)=>{
                    let message = utils.react.getProps(elm, i=>i?.message)?.message;
                    if (!message) return;
                    if (!message.content.startsWith(noSpaceWhitespace)) return;
                    let newContent = await awaitResponse("get", { id: message.id, keys: [persist.ghost.settings.myKey, ...persist.ghost.settings.friendKeys.split("\n")] });
                    elm.innerHTML = dom.formatContent(newContent);
                }
            )
        );

        patchContainer.add(
            
        )
    },
    unload() {
        patchContainer.removeAll();
    },
    settings: {
        data: [
            {
                "type": "input",
                "property": "myKey",
                "value": "defaultKey",
                "name": "My Key",
                "maxLength": "32",
                "description": "That's your key! Share that key with your friends for seeing your secret messages!",
                "size": "large"
            },
            {
                "type": "textarea",
                "property": "friendKeys",
                "value": "",
                "placeholder": "coolKey128\nBeaterKey",
                "name": "Friend Keys",
                "description": "Every newline is a different friend key.",
                "rows": 9
            }
        ],
        update(key, value) {
            switch (key) {
                case "myKey": {
                    persist.store.settings.myKey = value.replaceAll(KEY_REGEX, "");
                    debouncedCb(()=>{
                        if (!persist.ghost.settings.myKey.trim()) {
                            persist.store.settings.myKey = "default";
                        }
                    });
                    break;
                }
                case "friendKeys": {
                    persist.store.settings.friendKeys = value.split("\n").map(i=>i.trim().slice(0, 32).replaceAll(KEY_REGEX, "")).join("\n");
                    break;
                }
            }
        }
    }
}
