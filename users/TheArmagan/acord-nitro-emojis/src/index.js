import { subscriptions } from "@acord/extension";
import patcher from "@acord/patcher";
import { MessageActions, PremiumActions, EmojiStore, SelectedGuildStore, FluxDispatcher } from "@acord/modules/common";

const acordEmoteRegex = /<\$(a)?(\d+)>/g;
const customEmoteRegex = /<(a:)?([^:]{2,})+:(\d+)>/g;

export default {
    load() {
        subscriptions.push(
            patcher.before(
                "dispatch",
                FluxDispatcher,
                (args) => {
                    if (args[0].type === "MESSAGE_CREATE" && args[0]?.message?.content) {
                        args[0].message.content = args[0].message.content.replace(acordEmoteRegex, (match, animStr, emoteId) => {
                            console.log(match, `<${animStr == "a" ? "a:" : ""}_:${emoteId}>`);
                            return `<${animStr == "a" ? "a:" : ""}_:${emoteId}>`;
                        });
                    }
                    return args[0];
                }
            )
        )

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
                                console.log(`<$${animStr}${emoteId}>`);
                                return `<$${animStr}${emoteId}>`;
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
    }
}