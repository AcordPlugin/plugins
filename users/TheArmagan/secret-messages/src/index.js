import patchContainer from "./other/patchContainer.js";
import patcher from "@acord/patcher";
import utils from "@acord/utils";
import dom from "@acord/dom";
import { persist } from "@acord/extension";
import { MessageActions } from "@acord/modules/common";
import { awaitResponse, socket } from "./connection/socket.js";
import i18n from "@acord/i18n";
import data from "./data.json";

const noSpaceWhitespace = '󠇰';

const debouncedCb = _.debounce((cb)=>{cb()}, 1500);
const KEY_REGEX = /[^a-zA-Z0-9_-]/g;
const HIDE_REGEX = /(\|)\|\?((?:(?=(\\?))\2.)*?)\|\|/g;

const oneTimeCache = new Map();

export default {
    load() {
        patchContainer.add(
            dom.patch(
                '[id*="message-content-"]',
                async (elm)=>{
                    let message = utils.react.getProps(elm, i=>i?.message)?.message;
                    if (!message) return;
                    if (!message.content.startsWith(noSpaceWhitespace)) return;
                    let newContent;
                    if (oneTimeCache.has(message.id)) {
                        newContent = oneTimeCache.get(message.id);
                        oneTimeCache.delete(message.id);
                    } else {
                        elm.innerHTML = `${elm.innerHTML} 🔏`;
                        newContent = (await awaitResponse("get", { id: message.id, keys: [persist.ghost.settings.myKey, ...persist.ghost.settings.friendKeys.split("\n").filter(i=>i)] }))?.data;
                    }
                    if (!newContent) return;
                    elm.innerHTML = dom.formatContent(newContent);
                }
            )
        );

        patchContainer.add(
            patcher.instead(
                "sendMessage",
                MessageActions,
                async function (args, original) {
                    if (args[1]?.content && HIDE_REGEX.test(args[1]?.content)) {
                        let originalContent = args[1].content.replace(HIDE_REGEX, "$2");
                        args[1].content = `${noSpaceWhitespace}${args[1].content.length > 2000 ? args[1].content.slice(0, -2) : args[1].content}`;
                        let map = data[i18n.locale] || data.default;
                        let mapLength = map.length;
                        args[1].content = args[1].content.replace(HIDE_REGEX, (_)=>{
                            return map[Math.floor(Math.random() * mapLength)];
                        });
                        let called = false;
                        try {
                            let res = await original.call(this, ...args);
                            oneTimeCache.set(res.body.id, originalContent);
                            called = true;
                            await awaitResponse("set", { id: res.body.id, key: persist.ghost.settings.myKey, content: originalContent }, 5000);
                            return res;
                        } catch (err){
                            console.error(err);
                            args[1].content = originalContent;
                            if (!called) return original.call(this, ...args);
                        }
                    } else {
                        return original.call(this, ...args);
                    }
                }
            )
        )
    },
    unload() {
        patchContainer.removeAll();
        socket.disconnect();
        oneTimeCache.clear();
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
                    persist.store.settings.friendKeys = value.split("\n").map(i=>i.trim().slice(0, 32).replaceAll(KEY_REGEX, "")).filter(i=>i).join("\n");
                    break;
                }
            }
        }
    }
}