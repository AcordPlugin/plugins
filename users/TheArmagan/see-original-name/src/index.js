import patchContainer from "./other/patchContainer.js"
import utils from "@acord/utils";
import dom from "@acord/dom";


export default {
    load() {
        patchContainer.add(
            dom.patch(
                '[id*="message-username-"] > [class*="username-"]',
                /** @param {Element} elm */ (elm)=>{
                    let message = utils.react.getProps(elm, i=>i?.message)?.message;
                    if (!message) return;
                    let nick = elm.textContent.trim();

                    if (nick == message.author.username) return;
                    
                    elm.textContent = `${nick} (${message.author.username})`;
                }
            )
        )
    },
    unload() {
        patchContainer.removeAll();
    }
}