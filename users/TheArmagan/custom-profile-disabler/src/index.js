import patchContainer from "./other/patchContainer.js"
import dom from "@acord/dom";
import { i18n } from "@acord/extension";
import { copyText } from "@acord/utils";
import { toasts } from "@acord/ui";

export default {
    load() {
        patchContainer.add(
            dom.patch(
                `[class*="userPopoutOuter-"][class*="userProfileOuter-"][class*="userProfileOuterThemed-"][class*="profileColors-"], [class*="userProfileModalOuter-"][class*="userProfileOuter-"][class*="userProfileOuterThemed-"][class*="profileColors-"]`,
                /** @param {Element} elm */ (elm)=>{
                    let color1 = elm.style.getPropertyValue('--profile-gradient-primary-color');
                    let color2 = elm.style.getPropertyValue('--profile-gradient-secondary-color');
                    let isLight = elm.classList.contains("theme-light");
                    elm.removeAttribute("style");
                    elm.classList.remove("theme-dark", "theme-light");

                    let container = elm.querySelector('[class*="overlayBackground-"] [class*="scrollerBase-"]');

                    let toAppend = dom.parseHTML(`
                        <div style="${!elm.className.includes("userProfileModalOuter-") ? "padding-left: 12px; " : ""}padding-top: 12px; display: flex; align-items: center; gap: 4px;">
                            <div class="color" style="cursor: pointer; border-radius: 50%; width: 14px; height: 14px; background-color: ${color1}; border: 1px solid ${isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'};"></div>
                            <div class="color" style="cursor: pointer; border-radius: 50%; width: 14px; height: 14px; background-color: ${color2}; border: 1px solid ${isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'};"></div>
                        </div>
                    `);

                    toAppend.querySelectorAll(".color").forEach((elm)=>{
                        let color = `#${elm.style.backgroundColor.split("(")[1].split(")")[0].split(",").map(function(x){ x = parseInt(x).toString(16); return (x.length==1) ? "0"+x : x; }).join("")}`;
                        elm.onclick = ()=>{
                            toasts.show(i18n.format("X_COPIED", color));
                            copyText(color);
                        }
                    });

                    container.prepend(toAppend);
                }    
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}