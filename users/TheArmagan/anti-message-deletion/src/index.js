import patchContainer from "./other/patchContainer.js"
import { FluxDispatcher, MessageStore, SimpleMarkdown } from "@acord/modules/common";
import dom from "@acord/dom";
import utils from "@acord/utils";

import patchSCSS from "./styles.scss";


export default {
    load() {
        patchContainer.add(patchSCSS());
        let modifiedMessages = [];

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
            let msgId = elm.id.split("-").pop();

            elm.antiMessageDeletionUpdate = ()=>{
                let d = getModifiedData(msgId, false);

                if (d.deleted) elm.classList.add("amd--deleted-message");

                if (d.content) {
                    elm.classList.add("amd--edited-message");
                    utils.ifExists(
                        elm.querySelector(`#message-content-${msgId}`),
                        (contentElm)=>{
                            contentElm.innerHTML = `${d.edits.map(i=>SimpleMarkdown.markdownToHtml(`${i} *(edited)*`)).join("")}${SimpleMarkdown.markdownToHtml(`${d.content} *(original)*`)}`;
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


        patchContainer.add((()=>{
            let ogHandler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(i=>i.name == "MessageStore");

            let originalActionHandler = ogHandler.actionHandler;
            let storeDidChange = ogHandler.storeDidChange;

            ogHandler.actionHandler = (msg)=>{
                if (!msg?.id || msg.author.bot) return;
                
                getModifiedData(msg.id, true).deleted = true;

                utils.ifExists(
                    document.querySelector(`#chat-messages-${msg?.id}`),
                    patchMsgElement
                );
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

        patchContainer.add((()=>{
            let ogHandler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_UPDATE.find(i=>i.name == "MessageStore");

            let originalActionHandler = ogHandler.actionHandler;
            let storeDidChange = ogHandler.storeDidChange;

            ogHandler.actionHandler = function (arg) {
                if (!arg?.message?.id ||arg?.message?.author?.bot) return;

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

                utils.ifExists(
                    document.querySelector(`#chat-messages-${arg.message.id}`),
                    patchMsgElement
                );
                
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
    }
}