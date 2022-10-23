import patchContainer from "../other/patchContainer.js";
import dom from "@acord/dom";
import utils from "@acord/utils";
import events from "@acord/events";
import { fetchIsUserTyping } from "../other/api.js";

export function patchDOM() {
    patchContainer.add(
        dom.patch(
            `[class*="layout-"] [class*="avatar-"] [class*="wrapper-"], [class*="userInfo-"] [class*="avatar-"] [class*="wrapper-"]`,
            /** @param {Element} elm */ (elm)=>{
                let user = utils.react.getProps(elm, i=>i?.user)?.user;
                if (!user) return;

                let boundingRect = elm.getBoundingClientRect();

                let container = dom.parseHTML(`
                    <div class="ti--container" style="width: ${boundingRect.width}px; height: ${boundingRect.height}px">
                        <img src="https://i.imgur.com/khSp0aH.gif" width="${boundingRect.width / 1.5}"></img>
                    </div>
                `);

                elm.appendChild(container);
                
                let lastState = null;

                async function render() {
                    let isTyping = await fetchIsUserTyping(user.id);
                    if (lastState === isTyping) return;

                    container.classList[isTyping ? "add" : "remove"]("visible");

                    lastState = isTyping;
                }

                return events.on("TypingIndicators:1s", render);
            }
        )
    )
}