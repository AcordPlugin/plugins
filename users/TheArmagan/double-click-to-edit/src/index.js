import utils from "@acord/utils";
import { subscriptions } from "@acord/extension";
import { MessageActions } from "@acord/modules/common";

export default {
    load() {
        subscriptions.push(
            utils.interval(() => {
                const elms = document.querySelectorAll(`[id*="message-content-"]`);
                elms.forEach((elm) => {
                    if (elm.classList.contains("dctd--patched")) return;
                    elm.classList.add("dctd--patched");

                    elm.ondblclick = () => {
                        let message = utils.react.getProps(elm, i => i?.message)?.message;
                        if (!message) return;
                        MessageActions.startEditMessage(message.channel_id, message.id, message.content);
                    }
                });
            }, 100)
        )
    },
    unload() { }
}

