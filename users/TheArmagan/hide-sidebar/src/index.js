import patchContainer from "./other/patchContainer.js"
import patchSCSS from "./style.scss";
import dom from "@acord/dom";
import { persist } from "@acord/extension";

export default {
    load() {
        if (typeof persist.ghost.showing != "boolean") 
            persist.store.showing = true;

        requestAnimationFrame(()=>{
            document.querySelector('[class*="content-"] [class*="sidebar-"]').style.width = !persist.ghost.showing ? "0px" : "";
        });

        patchContainer.add(patchSCSS());
        patchContainer.add(
            dom.patch(
                '[class*="chat-"] [class*="title-"][class*="container-"] [class*="children-"]',
                /** @param {Element} elm */
                (elm)=>{
                    /** @type {Element} */
                    let icon = dom.parseHTML(`<div class="hs--icon hs--${persist.ghost.showing ? "hide" : "show"}"></div>`);

                    icon.onclick = ()=>{
                        icon.classList.remove("hs--hide", "hs--show");
                        persist.store.showing = !persist.ghost.showing;
                        icon.classList.add(persist.ghost.showing ? "hs--hide" : "hs--show");
                        requestAnimationFrame(()=>{
                            document.querySelector('[class*="content-"] [class*="sidebar-"]').style.width = !persist.ghost.showing ? "0px" : "";
                        });
                    }

                    elm.prepend(icon);
                },
                true
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}