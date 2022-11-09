import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { MessageActions, PremiumActions } from "@acord/modules/common";

const customEmoteRegex = /<(a)?:([^:]{2,})+:(\d+)>/g;

export default {
    load() {
        patchContainer.add(
            patcher.instead(
                "sendMessage",
                MessageActions,
                async function(args, instead) {
                    if (args[1] && args[1].content) {
                        args[1].invalidEmojis = [];
                        args[1].validNonShortcutEmojis = args[1].validNonShortcutEmojis.filter(i=>!i.available);
                        args[1].content = args[1].content.replace(
                            customEmoteRegex,
                            (match, animStr, emoteName, emoteId)=>{
                                return `https://cdn.discordapp.com/emojis/${emoteId}.${animStr == "a" ? "gif" : "png"}?size=32`
                            }
                        ).trim();
                    }

                    return instead.call(this, ...args);
                }
            )
        );

        patchContainer.add(
            patcher.instead(
                "canUseEmojisEverywhere",
                PremiumActions,
                async function(args, instead) {
                    return true;
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    },
    settings: {
        data: [
            {
                "type": "input",
                "altType": "number",
                "property": "size",
                "value": "48",
                "name": "Emote Size",
                "description": "Allowed sizes: 16, 32, 48, 64, 96, 128, 256, 512, 1024",
                "size": "small"
            }
        ]
    }
}