import { subscriptions } from "@acord/extension";
import patcher from "@acord/patcher";
import utils from "@acord/utils";
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

        subscriptions.push((() => {
            let unPatch1 = () => null;
            let unPatch2 = () => null;
            let unPatch3 = () => null;

            (async () => {
                while (true) {
                    let arr = FluxDispatcher?._actionHandlers?._orderedActionHandlers?.LOAD_MESSAGES_SUCCESS || [];
                    let found = arr.find(i => i.name === "MessageStore");
                    if (found) {
                        unPatch1 = patcher.instead(
                            "actionHandler",
                            found,
                            function (args, instead) {
                                if (args[0].messages.length) {
                                    for (let i = 0; i < args[0].messages.length; i++) {
                                        const message = args[0].messages[i];
                                        if (message.content) {
                                            message.content = message.content.replace(acordEmoteRegex, (match, animStr, emoteName, emoteId) => {
                                                return `<${animStr == "a" ? "a:" : ""}${emoteName}:${emoteId}>`;
                                            });
                                        }
                                    }
                                }

                                return instead.call(this, ...args);
                            }
                        );
                        console.log(`LOAD_MESSAGES_SUCCESS > MessageStore > actionHandler patched.`);
                        break;
                    }
                    await utils.sleep(100);
                }
            })();

            (async () => {
                while (true) {
                    let arr = FluxDispatcher?._actionHandlers?._orderedActionHandlers?.MESSAGE_CREATE || [];
                    let found = arr.find(i => i.name === "MessageStore");
                    if (found) {
                        unPatch2 = patcher.instead(
                            "actionHandler",
                            found,
                            function (args, instead) {
                                if (args[0].message.content) {
                                    args[0].message.content = args[0].message.content.replace(acordEmoteRegex, (match, animStr, emoteName, emoteId) => {
                                        return `<${animStr == "a" ? "a:" : ""}${emoteName}:${emoteId}>`;
                                    });
                                }
                                return instead.call(this, ...args);
                            }
                        )
                        console.log(`MESSAGE_CREATE > MessageStore > actionHandler patched.`);
                        break;
                    }
                    await utils.sleep(100);
                }
            })();

            (async () => {
                while (true) {
                    let arr = FluxDispatcher?._actionHandlers?._orderedActionHandlers?.MESSAGE_UPDATE || [];
                    let found = arr.find(i => i.name === "MessageStore");
                    if (found) {
                        unPatch3 = patcher.instead(
                            "actionHandler",
                            found,
                            function (args, instead) {
                                if (args[0].message.content) {
                                    args[0].message.content = args[0].message.content.replace(acordEmoteRegex, (match, animStr, emoteName, emoteId) => {
                                        return `<${animStr == "a" ? "a:" : ""}${emoteName}:${emoteId}>`;
                                    });
                                }
                                return instead.call(this, ...args);
                            }
                        );
                        console.log(`MESSAGE_UPDATE > MessageStore > actionHandler patched.`);
                        break;
                    }
                    await utils.sleep(100);
                }
            })();


            return () => {
                unPatch1();
                unPatch2();
                unPatch3();
            }
        })());

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