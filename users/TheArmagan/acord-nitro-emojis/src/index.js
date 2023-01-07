import { subscriptions } from "@acord/extension";
import patcher from "@acord/patcher";
import { MessageActions, PremiumActions, EmojiStore, SelectedGuildStore, FluxDispatcher } from "@acord/modules/common";

const acordEmoteRegex = /<(a)?;?([^:]{2,})+;(\d+)>/g;
const customEmoteRegex = /<(a)?:?([^:]{2,})+:(\d+)>/g;

export default {
    load() {

        // subscriptions.push(
        //     patcher.instead(
        //         "dispatch",
        //         FluxDispatcher,
        //         function (args, instead) {
        //             try {
        //                 switch (args[0].type) {
        //                     case "MESSAGE_CREATE":
        //                     case "MESSAGE_UPDATE": {
        //                         if (args[0].message.content) {
        //                             args[0].message.content = args[0].message.content.replace(acordEmoteRegex, (match, animStr, emoteName, emoteId) => {
        //                                 return `<${animStr == "a" ? "a:" : ""}${emoteName}:${emoteId}>`;
        //                             });
        //                         }
        //                         break;
        //                     }
        //                     case "LOAD_MESSAGES_SUCCESS": {
        //                         if (args[0].messages.length) {
        //                             for (let i = 0; i < args[0].messages.length; i++) {
        //                                 const message = args[0].messages[i];
        //                                 if (message.content) {
        //                                     message.content = message.content.replace(acordEmoteRegex, (match, animStr, emoteName, emoteId) => {
        //                                         return `<${animStr == "a" ? "a:" : ""}${emoteName}:${emoteId}>`;
        //                                     });
        //                                 }
        //                             }
        //                         }
        //                         break;
        //                     }
        //                 }
        //             } catch { };
        //             return instead.call(this, ...args);
        //         }
        //     )
        // );

        subscriptions.push(
            patcher.instead(
                "sendMessage",
                MessageActions,
                async function (args, instead) {
                    let selectedGuildId = SelectedGuildStore.getGuildId();
                    if (args[1] && args[1].content) {
                        args[1].invalidEmojis = [];
                        args[1].validNonShortcutEmojis = args[1].validNonShortcutEmojis.filter(i => !i.available);
                        args[1].content = args[1].content.replace(
                            customEmoteRegex,
                            (match, animStr, emoteName, emoteId) => {
                                if (!emoteName.trim()) return match;
                                let emoji = EmojiStore.getCustomEmojiById(emoteId);
                                if (emoji && !emoji.animated && selectedGuildId && emoji.guildId == selectedGuildId) return match;
                                return `<${animStr == "a" ? "a;" : ""}${emoteName};${emoteId}>`;
                            }
                        ).trim();
                    }

                    return instead.call(this, ...args);
                }
            )
        );

        subscriptions.push(
            patcher.instead(
                "canUseEmojisEverywhere",
                PremiumActions,
                async function (args, instead) {
                    return true;
                }
            )
        );

        subscriptions.push(
            patcher.instead(
                "canUseAnimatedEmojis",
                PremiumActions,
                async function (args, instead) {
                    return true;
                }
            )
        );
    },
    unload() { }
}