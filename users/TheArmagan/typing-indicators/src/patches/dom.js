import patchContainer from "../other/patchContainer.js";
import dom from "@acord/dom";
import utils from "@acord/utils";
import events from "@acord/events";
import { fetchIsUserTyping } from "../other/api.js";

// [class*="layout-"] [class*="avatar-"] [class*="wrapper-"], [class*="userInfo-"] [class*="avatar-"] [class*="wrapper-"]

export function patchDOM() {
    patchContainer.add(
        dom.patch(
            `[class*="layout-"] [class*="avatar-"] [class*="wrapper-"], [class*="userInfo-"] [class*="avatar-"] [class*="wrapper-"]`,
            /** @param {Element} elm */ (avatarWrapper)=>{
                let elm = dom.parents(avatarWrapper, `[data-list-item-id]`)?.[0];
                if (!elm) return;
                let user = utils.react.getProps(elm, i=>i?.user)?.user;
                if (!user) return;

                elm.classList.add("ti--wrapper");

                let elmRect = elm.getBoundingClientRect();
                let avatarWrapperRect = avatarWrapper.getBoundingClientRect();

                let container = dom.parseHTML(`
                    <div class="ti--container" style="left: ${avatarWrapperRect.left - elmRect.left}px; top: ${avatarWrapperRect.top - elmRect.top}px; width: ${avatarWrapperRect.width}px; height: ${avatarWrapperRect.height}px;">
                        <img src="https://i.imgur.com/khSp0aH.gif"></img>
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