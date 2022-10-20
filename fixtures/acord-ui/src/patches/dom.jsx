import webpack from "@acord/modules/webpack";
import discordI18N from "@acord/modules/common/i18n";
import { InviteStore } from "@acord/modules/common";
import i18n from "@acord/i18n";
import dom from "@acord/dom";
import utils from "@acord/utils";
import modals from "@acord/ui/modals";
import toasts from "@acord/ui/toasts";
import events from "@acord/events";
import extensions from "@acord/extensions";
import internal from "@acord/internal";
import patchContainer from "../other/patchContainer.js";
import { showModal } from "../other/apis.js";
import { ModalBase } from "../components/modals/ModalBase.jsx";
import { ExtensionsModal } from "../components/modals/ExtensionsModal.jsx";
import { DOMGiftCard } from "../components/dom/DOMGiftCard.js";
import { DOMCopyIcon } from "../components/dom/DOMCopyIcon.js";

const optionsClasses = webpack.findByProps("item", "selected", "separator");
const anchorClasses = webpack.findByProps("anchor", "anchorUnderlineOnHover");
const messageClasses = webpack.findByProps("message", "cozyMessage", "mentioned");
const buttonClasses = webpack.findByProps("button", "lookFilled", "colorBrand");

const badgeClasses1 = webpack.findByProps("badgeList", "details");
const badgeClasses2 = webpack.findByProps("profileBadges", "avatarPositionPanel");

const extensionsRegex = /^https?:\/\/acord\.app\/(plugin|theme)s?\/(.*)$/;

const ACORD_ADMINS = ["707309693449535599", "319862027571036161"];

function createBadge(src, sizes) {
  const badge = dom.parseHTML(`
    <div style="display: flex; align-items: center; justify-content: center; width: ${sizes[0]}px; height: ${sizes[0]}px; cursor: pointer;">
      <img alt=" " src="${src}" style="height: ${sizes[1]}px"></img>
    </div>
  `);
  badge.onclick = ()=>{
    InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: "acord" });
  }
  return badge;
}

export function patchDOM() {

  patchContainer.add(
    events.on("domMutation", /** @param {MutationRecord} mut */(mut) => {
      mut.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(`[aria-label="${discordI18N.Messages.USER_SETTINGS}"].${optionsClasses.side}`).forEach(async (elm) => {
          if (elm.querySelector(".acord--patched")) return;
          elm.classList.add("acord--patched");

          let toAdd = [
            dom.parseHTML(`<div class="${optionsClasses.header}">Acord</div>`),
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.format("PLUGINS")}</div>`),
              () => {
                showModal((e) => {
                  return <ModalBase e={e} name={i18n.format("PLUGINS")} body={<ExtensionsModal extensionsType="plugin" />} bodyId="extensions" />
                });
              }
            ],
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.format("THEMES")}</div>`),
              () => {
                showModal((e) => {
                  return <ModalBase e={e} name={i18n.format("THEMES")} body={<ExtensionsModal extensionsType="theme" />} bodyId="extensions" />
                });
              }
            ],
            [
              dom.parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n.format("HELP_SERVER")}</div>`),
              () => {
                document.querySelector(`.${webpack.findByProps("closeButton", "closeButtonBold", "container").closeButton}`)?.click?.();
                InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: "acord" });
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

          let [, extensionType, extensionPath] = originalHref.match(extensionsRegex);
          if (extensionType.endsWith("s")) extensionType = extensionType.slice(0, -1);
          let extensionTypeUpper = extensionType.toUpperCase();
          let href = `https://raw.githubusercontent.com/AcordPlugin/${extensionType}s/main/users/${extensionPath.endsWith("/") ? extensionPath.slice(0, -1) : extensionPath}/dist/`;

          let manifest;

          try {
            manifest = await (await fetch(`${href}extension.json`, { cache: "no-store" })).json();
          } catch { };

          if (!manifest) return;

          async function toggleExtension(ask = false) {
            if (ask) {
              let accepted = await modals.show.confirmation(
                manifest.about.name,
                i18n.format(`IMPORT_${extensionTypeUpper}_DESCRIPTION`, manifest.about.name)
              )
              if (!accepted) return false;
            }

            try {
              !extensions.nests.loaded.ghost[href] ? await extensions.load(href) : await extensions.remove(href);
            } catch (err) {
              let errStr = `${err}`;
              toasts.show.error(errStr);
            }
            return true;
          }

          elm.addEventListener("click", (e) => {
            e.preventDefault();
            toggleExtension(true);
          });

          /** @type {Element} */
          let messageElm = dom.parents(elm, `.${messageClasses.message}`)?.[0];
          if (!messageElm) return;

          if (messageElm.querySelector(`[acord-href="${href}"]`)) return;

          /** @type {Element} */
          let cardElm = dom.parseHTML(
            DOMGiftCard({
              title: manifest.about.name,
              description: manifest.about.description ? `${manifest.about.description}<br/>(v${manifest.about.version}, ${i18n.format("X_MADE_BY", manifest.about.authors.join(", "))})` : i18n.format(`IMPORT_${extensionTypeUpper}_DESCRIPTION`),
              buttons: [
                {
                  contents: !extensions.nests.loaded.ghost[href] ? i18n.format(`IMPORT_${extensionTypeUpper}`) : i18n.format(`REMOVE_${extensionTypeUpper}`),
                  className: "toggle-extension",
                  color: !extensions.nests.loaded.ghost[href] ? "colorBrand" : "colorRed"
                },
                {
                  contents: DOMCopyIcon(),
                  className: "copy-extension-link",
                  color: "colorTransparent"
                }
              ],
              image: manifest?.about?.preview ?? `https://github.com/AcordPlugin/assets/raw/main/${extensionType}s.png`
            })
          );

          cardElm.setAttribute("acord-href", href);

          utils.ifExists(cardElm.querySelector(".toggle-extension"), /** @param {Element} item */(item) => {
            // item.disabled = !!extensions.nests.loaded.ghost[href];
            item.onclick = async () => {
              item.disabled = true;
              await toggleExtension(false);
              item.disabled = false;
              item.classList.remove(buttonClasses.colorBrand, buttonClasses.colorRed);
              item.classList.add(!extensions.nests.loaded.ghost[href] ? buttonClasses.colorBrand : buttonClasses.colorRed);
              item.firstElementChild.textContent = !extensions.nests.loaded.ghost[href] ? i18n.format(`IMPORT_${extensionTypeUpper}`) : i18n.format(`REMOVE_${extensionTypeUpper}`);
            }
          });

          utils.ifExists(cardElm.querySelector(".copy-extension-link"), (item) => {
            item.onclick = () => {
              utils.copyText(originalHref);
              toasts.show(i18n.format("X_COPIED", originalHref));
            }
          });

          messageElm.appendChild(
            cardElm
          );
        });
      });
    })
  )

  patchContainer.add(
    dom.patch(`[class*="profileBadges-"], [class*="badgeList-"]`, /** @param {Element} elm */ async (elm)=>{

      let user = utils.react.getProps(elm, i=>i?.user)?.user;
      if (!user) return;

      let sizes = elm.classList.contains(badgeClasses2.profileBadges) ? [22, 14] : [24, 16];

      (async ()=>{
        if (
          internal.other?.isActiveAcordUser 
          && await internal.other.isActiveAcordUser(user.id)
        ) return;
        
        let badge = createBadge("https://raw.githubusercontent.com/AcordPlugin/assets/main/Acord.svg", sizes);
        badge.setAttribute("acord--tooltip-content", i18n.format("ACTIVE_USER"));

        elm.appendChild(badge);
      })();

      (async ()=>{
        if (!ACORD_ADMINS.includes(user.id)) return;
        
        let badge = createBadge("https://raw.githubusercontent.com/AcordPlugin/assets/main/AcordAdmin.svg", sizes);
        badge.setAttribute("acord--tooltip-content", i18n.format("ACORD_ADMIN"));
        
        elm.appendChild(badge);
      })();

    })
  )
}

