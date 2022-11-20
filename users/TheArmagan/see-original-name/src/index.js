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

                    if (elm.textContent.trim() == message.author.username) return;

                    elm.textContent = `${elm.textContent} (${message.author.username})`;
                }
            )
        )
    },
    unload() {
        patchContainer.removeAll();
    }
}