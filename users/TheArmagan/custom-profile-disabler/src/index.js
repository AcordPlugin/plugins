import patchContainer from "./other/patchContainer.js"
import dom from "@acord/dom";

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
                            <div style="border-radius: 50%; width: 14px; height: 14px; background-color: ${color1}; border: 1px solid ${isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'};"></div>
                            <div style="border-radius: 50%; width: 14px; height: 14px; background-color: ${color2}; border: 1px solid ${isLight ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'};"></div>
                        </div>
                    `);

                    container.prepend(toAppend);
                }    
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}