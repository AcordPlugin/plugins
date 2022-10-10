import swc from "@acord/modules/swc";
import discordI18N from "@acord/modules/common/i18n";
import i18n from "@acord/i18n";
import dom from "@acord/dom";
import utils from "@acord/utils";
import modals from "@acord/ui/modals";
import toasts from "@acord/ui/toasts";
import events from "@acord/events";
import extensions from "@acord/extensions";
import patchContainer from "../other/patchContainer.js";
import { showModal } from "../other/apis.js";
import { ModalBase } from "../components/modals/ModalBase.jsx";
import { ExtensionsModal } from "../components/modals/ExtensionsModal.jsx";
import { DOMGiftCard } from "../components/dom/DOMGiftCard.js";
import { DOMCopyIcon } from "../components/dom/DOMCopyIcon.js";

let optionsClasses = swc.findByProps("item", "selected", "separator");
let anchorClasses = swc.findByProps("anchor", "anchorUnderlineOnHover");
let messageClasses = swc.findByProps("message", "cozyMessage", "mentioned");

let extensionsRegex = /^https?:\/\/acord\.app\/(plugin|theme)\/(.*)$/;

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
                  return <ModalBase e={e} name={i18n.fmt("PLUGINS")} body={<ExtensionsModal extensionsType="plugin" />} bodyId="extensions" />
                });
              }
            ],
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.fmt("THEMES")}</div>`),
              () => {
                showModal((e) => {
                  return <ModalBase e={e} name={i18n.fmt("THEMES")} body={<ExtensionsModal extensionsType="theme" />} bodyId="extensions" />
                });
              }
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

        node.querySelectorAll(`.${anchorClasses.anchor}.${anchorClasses.anchorUnderlineOnHover}`).forEach(async (elm) => {
          if (elm.querySelector(".acord--patched")) return;
          elm.classList.add("acord--patched");

          let originalHref = elm.href;
          if (!originalHref.endsWith("/")) originalHref += "/";
          if (!extensionsRegex.test(originalHref)) return;

          /** @type {Element} */
          let messageElm = dom.parents(elm, `.${messageClasses.message}`)?.[0];
          if (!messageElm) return;
          
          let [, extensionType, extensionPath] = originalHref.match(extensionsRegex);
          let extensionTypeUpper = extensionType.toUpperCase();
          let href = `https://raw.githubusercontent.com/AcordPlugin/${extensionType}s/main/users/${extensionPath.endsWith("/") ? extensionPath.slice(0, -1) : extensionPath}/dist/`;

          let manifest;

          try {
            manifest = await (await fetch(`${href}extension.json`)).json();
          } catch { };
          
          if (!manifest) return;
          elm.textContent = manifest.about.name;

          async function importExtension(ask=false) {
            if (ask) {
              let accepted = await modals.show.confirmation(
                manifest.about.name,
                i18n.fmt(`IMPORT_${extensionTypeUpper}_DESCRIPTION`, manifest.about.name)
              )
              if (!accepted) return;
            }

            try {
              await extensions.load(href);
            } catch (err) {
              let errStr = `${err}`;
              if (errStr.includes("EXTENSION_ALREADY_ENABLED")) {
                toasts.show.error(i18n.fmt("EXTENSION_ALREADY_ENABLED", extensionName));
                extensions.reload(href);
              } else {
                toasts.show.error(errStr);
              }
            }
          }

          elm.addEventListener("click", (e) => {
            e.preventDefault();
            importExtension(true);
          });

          /** @type {Element} */
          let cardElm = dom.parseHTML(
            DOMGiftCard({
              title: manifest.about.name,
              description: manifest.about.description ? `${manifest.about.description}<br/>(v${manifest.about.version}, ${i18n.fmt("X_MADE_BY", manifest.about.authors.join(", "))})` : i18n.fmt(`IMPORT_${extensionTypeUpper}_DESCRIPTION`),
              buttons: [
                {
                  contents: i18n.fmt(`IMPORT_${extensionTypeUpper}`),
                  className: "import-extension",
                  color: "colorBrand"
                },
                {
                  contents: DOMCopyIcon(),
                  className: "copy-extension-link",
                  color: "colorTransparent"
                }
              ],
              image: `https://github.com/AcordPlugin/assets/raw/main/${extensionType}s.png`
            })
          );

          utils.ifExists(cardElm.querySelector(".import-extension"), (item) => {
            item.disabled = !!extensions.nests.loaded.ghost[href];
            item.onclick = () => {
              importExtension(false);
            }
          });

          utils.ifExists(cardElm.querySelector(".copy-extension-link"), (item) => {
            item.onclick = () => {
              utils.copyText(originalHref);
              toasts.show(i18n.fmt("X_COPIED", originalHref));
            }
          });

          messageElm.appendChild(
            cardElm
          );
        });
      });

    })
  )
}

