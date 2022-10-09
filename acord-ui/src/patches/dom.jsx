import swc from "@acord/modules/swc";
import discordI18N from "@acord/modules/common/i18n";
import i18n from "@acord/i18n";
import dom from "@acord/dom";
import events from "@acord/events";
import patchContainer from "../other/patchContainer.js";
import { showModal } from "../other/apis.js";
import { ModalBase } from "../components/modals/ModalBase.jsx";
import { PluginsModal } from "../components/modals/Plugins.jsx";

let optionsClasses = swc.findByProps("item", "selected", "separator");

export function patchDOM() {

  patchContainer.add(
    events.on("domMutation", /** @param {MutationRecord} mut */ (mut) => {   
      mut.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(`[aria-label="${discordI18N.Messages.USER_SETTINGS}"].${optionsClasses.side}`).forEach(async (elm) => {
          if (elm.querySelector(".acord--patched")) return;
          elm.classList.add("acord--patched");

          let toAdd = [
            dom.parseHTML(`<div class="${optionsClasses.header}">Acord</div>`),
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.fmt("PLUGINS")}</div>`),
              () => { 
                showModal((e) => {
                  return <ModalBase e={e} name={i18n.fmt("PLUGINS")} body={<PluginsModal />} bodyId="plugins" />
                });
              }
            ],
            // [
            //   dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.fmt("THEMES")}</div>`),
            //   () => { }
            // ],
            // [
            //   dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.fmt("ABOUT")}</div>`),
            //   () => { }
            // ],
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

