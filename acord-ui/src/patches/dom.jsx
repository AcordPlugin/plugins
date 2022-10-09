import swc from "@acord/modules/swc";
import discordI18N from "@acord/modules/common/i18n";
import i18n from "@acord/i18n";
import dom from "@acord/dom";
import modals from "@acord/ui/modals";
import toasts from "@acord/ui/toasts";
import events from "@acord/events";
import extensions from "@acord/extensions";
import patchContainer from "../other/patchContainer.js";
import { showModal } from "../other/apis.js";
import { ModalBase } from "../components/modals/ModalBase.jsx";
import { PluginsModal } from "../components/modals/Plugins.jsx";

let optionsClasses = swc.findByProps("item", "selected", "separator");
let anchorClasses = swc.findByProps("anchor", "anchorUnderlineOnHover");

let extensionsRegex = /^https\:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(?:plugins|themes)\/main\/([^\/]+).*\/dist\/$/;

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

        node.querySelectorAll(`.${anchorClasses.anchor}.${anchorClasses.anchorUnderlineOnHover}`).forEach(async (elm) => {
          if (elm.querySelector(".acord--patched")) return;
          elm.classList.add("acord--patched");

          /** @type {string} */
          let href = elm.href;

          console.log(href);

          if (!extensionsRegex.test(href)) return;

          let extensionName = [...(href.match(extensionsRegex) || [])]?.[1];

          elm.addEventListener("click", async (e) => {
            e.preventDefault();
            e.stopPropagation();

            let accepted = await modals.show.confirmation(
              i18n.fmt("IMPORT_EXTENSION"),
              i18n.fmt("IMPORT_EXTENSION_DESCRIPTION", extensionName)
            )
            if (!accepted) return;
            
            try {
              await extensions.load(elm.href);
            } catch (err) {
              if (`${err}`.includes("EXTENSION_ENABLED")) {
                toasts.error(i18n.fmt("EXTENSION_ALREADY_ENABLED", extensionName));
              } else {
                toasts.error(`${err}`);
              }
            }
          })
        });
      });

    })
  )
}

