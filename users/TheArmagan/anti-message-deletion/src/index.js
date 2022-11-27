import patchContainer from "./other/patchContainer.js"
import { FluxDispatcher, MessageStore, UserStore } from "@acord/modules/common";
import dom from "@acord/dom";
import utils from "@acord/utils";
import { persist } from "@acord/extension";

import patchSCSS from "./styles.scss";

export default {
    async load() {
        let modifiedMessages = [];
        patchContainer.add(patchSCSS());

        function getRawMessage(chId, msgId) {
            return MessageStore.__getLocalVars().rawMessages?.[chId]?.[msgId];
        }

        function getModifiedData(msgId, append=true) {
            let m = modifiedMessages.find(i=>i.messageId==msgId);
            if (!m) {
                m = { deleted: false, messageId: msgId, edits: [] };
                if (append) modifiedMessages.push(m);
            }
            return m;
        }

        /** @param {Element} elm */
        function patchMsgElement(elm) {
            if (!elm?.id?.startsWith("chat-messages-") || elm.antiMessageDeletionUpdate) return;
            let msgId = elm?.id?.split("-")?.pop();
            if (!msgId) return;

            elm.antiMessageDeletionUpdate = ()=>{
                let d = getModifiedData(msgId, false);

                if (d.deleted) elm.classList.add("amd--deleted-message");

                if (d.content) {
                    elm.classList.add("amd--edited-message");
                    utils.ifExists(
                        elm.querySelector(`#message-content-${msgId}`),
                        (contentElm)=>{
                            contentElm.innerHTML = `${dom.formatContent(`${d.content} *(original)*`)}<br/>${d.edits.map(i=>dom.formatContent(`${i} *(edited)*`)).join("")}`;
                        }
                    )
                }
            }

            elm.antiMessageDeletionUpdate();
        }

        patchContainer.add(dom.patch(
            `[id*="chat-messages-"]`,
            patchMsgElement
        ))

        while (true) {
            if (FluxDispatcher?._actionHandlers?._orderedActionHandlers?.MESSAGE_DELETE?.find?.(i=>i?.name == "MessageStore")) break;
            await new utils.sleep(50);
        }

        patchContainer.add((()=>{
            let ogHandler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(i=>i.name == "MessageStore");

            let originalActionHandler = ogHandler.actionHandler;
            let storeDidChange = ogHandler.storeDidChange;

            ogHandler.actionHandler = (arg)=>{
                if (!persist.ghost.settings.antiDelete) return originalActionHandler.call(this, arg);
                if (!arg?.id || UserStore.getUser(getRawMessage(arg.channelId, arg.id)?.author?.id)?.bot) return;
                
                getModifiedData(arg.id, true).deleted = true;

                setTimeout(()=>{
                    utils.ifExists(
                        document.querySelector(`#chat-messages-${arg?.id}`),
                        patchMsgElement
                    );
                }, 100);
            }

            // NOOP
            ogHandler.storeDidChange = ()=>{};

            return ()=>{
                modifiedMessages = [];
                let handler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(i=>i.name == "MessageStore");
                handler.actionHandler = originalActionHandler;
                handler.storeDidChange = storeDidChange;
            };
        })());

        while (true) {
            if (FluxDispatcher?._actionHandlers?._orderedActionHandlers?.MESSAGE_UPDATE?.find?.(i=>i?.name == "MessageStore")) break;
            await new utils.sleep(50);
        }

        patchContainer.add((()=>{
            let ogHandler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_UPDATE.find(i=>i.name == "MessageStore");

            let originalActionHandler = ogHandler.actionHandler;
            let storeDidChange = ogHandler.storeDidChange;

            ogHandler.actionHandler = function (arg) {
                if (!persist.ghost.settings.antiEdit) return originalActionHandler.call(this, arg);
                if (!arg?.message?.id || !arg?.message?.author?.id || UserStore.getUser(arg?.message?.author?.id)?.bot) return;

                if (arg.message.content) {
                    let oldMsg = getRawMessage(arg.message.channel_id, arg.message.id);
                    if (oldMsg) {
                        let d = getModifiedData(oldMsg.id, true);
                        if (!d.edits.length) d.content = oldMsg.content;
                        if (d.content != arg.message.content) {
                            d.edits.push(arg.message.content);
                        }
                    }
                }

                let res = originalActionHandler.call(this, arg);

                setTimeout(()=>{
                    utils.ifExists(
                        document.querySelector(`#chat-messages-${arg.message.id}`),
                        patchMsgElement
                    );
                }, 100)
                
                return res;
            }

            return ()=>{
                let handler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(i=>i.name == "MessageStore");
                handler.actionHandler = originalActionHandler;
                handler.storeDidChange = storeDidChange;
            };
        })());
    },
    unload() {
        patchContainer.removeAll();
    },
    settings: {
        data: [
            {
                type: "checkbox",
                name: "Anti-Delete",
                property: "antiDelete",
                value: true
            },
            {
                type: "checkbox",
                name: "Anti-Edit",
                property: "antiEdit",
                value: false
            },
        ]
    }
}