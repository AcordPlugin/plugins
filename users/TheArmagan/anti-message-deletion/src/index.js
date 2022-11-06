import patchContainer from "./other/patchContainer.js"
import { FluxDispatcher } from "@acord/modules/common";
import dom from "@acord/dom";

import patchSCSS from "./styles.scss";

export default {
    load() {
        patchContainer.add(patchSCSS());
        let deletedMessages = [];

        patchContainer.add((()=>{
            let ogHandler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(i=>i.name == "MessageStore");

            let originalActionHandler = ogHandler.actionHandler;
            let storeDidChange = ogHandler.storeDidChange;

            ogHandler.actionHandler = (msg)=>{
                if (!msg?.id) return;

                let elm = document.querySelector(`#chat-messages-${msg?.id}`);
                if (!elm || elm.classList.contains(`amd--deleted-message`)) return;

                elm.classList.add("amd--deleted-message");
                deletedMessages.push(msg.id);
            }

            // NOOP
            ogHandler.storeDidChange = ()=>{};

            return ()=>{
                deletedMessages = [];
                let handler = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_DELETE.find(i=>i.name == "MessageStore");
                handler.actionHandler = originalActionHandler;
                handler.storeDidChange = storeDidChange;
            };
        })());

        patchContainer.add(dom.patch(
            `[id*="chat-messages-"]`,
            (elm)=>{
                let msgId = elm.id.split("-").pop();

                if (deletedMessages.includes(msgId))
                    elm.classList.add("amd--deleted-message");
            }
        ))
        
    },
    unload() {
        patchContainer.removeAll();
    }
}