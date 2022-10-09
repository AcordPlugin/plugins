import swc from "@acord/modules/swc";
import i18n from "@acord/modules/common/i18n";
import dom from "@acord/dom";
import events from "@acord/events";
import patchContainer from "../other/patchContainer.js";
import { openModal } from "../other/apis.js";

let optionsClasses = swc.findByProps("item", "selected", "separator");
let buttonClasses = swc.findByProps("button", "colorBrand", "lookFilled");

export function patchDOM() {

  patchContainer.add(
    events.on("domMutation", /** @param {MutationRecord} mut */ (mut) => {   
      mut.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(`[aria-label="${i18n.Messages.USER_SETTINGS}"].${optionsClasses.side}`).forEach(async (elm) => {
          if (elm.querySelector(".acord--patched")) return;
          elm.classList.add("acord--patched");

          let toAdd = [
            dom.parseHTML(`<div class="${optionsClasses.header}">Acord</div>`),
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">Plugins</div>`),
              () => { 
                
              }
            ],
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">Themes</div>`),
              () => { }
            ],
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">About</div>`),
              () => { }
            ],
            dom.parseHTML(`<div class="${optionsClasses.separator}"></div>`),
          ];

          toAdd.forEach((i) => {
            if (!Array.isArray(i)) {
              elm.insertBefore(i, elm.children[elm.children.length - 7]);
              return;
            } 

            elm.insertBefore(i[0], elm.children[elm.children.length - 7]);
            i[0].onclick = i[1];
          });
        });
      });

    })
  )
}

