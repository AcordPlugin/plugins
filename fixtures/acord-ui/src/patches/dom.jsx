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
import { DOMSidebarItem } from "../components/dom/DOMSidebarItem.js";
import { SponsorsModal } from "../components/modals/SponsorsModal.jsx";

const optionsClasses = webpack.findByProps("item", "selected", "separator");
const anchorClasses = webpack.findByProps("anchor", "anchorUnderlineOnHover");
const messageClasses = webpack.findByProps("message", "cozyMessage", "mentioned");
const buttonClasses = webpack.findByProps("button", "lookFilled", "colorBrand");

const extensionsRegex = /^https?:\/\/acord\.app\/(plugin|theme)s?\/(.*)$/;

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
        
      });
    })
  )

  patchContainer.add(
    dom.patch(
      `.${anchorClasses.anchor}.${anchorClasses.anchorUnderlineOnHover}`,
      async (elm) => {
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

        /** @type {Element} */
        let messageElm = dom.parents(elm, `.${messageClasses.message}`)?.[0];
        if (!messageElm) {
          elm.addEventListener("click", async (e) => {
            e.preventDefault();
            toggleExtension(true);
          });
          return;
        }

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
              }
            ],
            image: manifest?.about?.preview ?? `https://github.com/AcordPlugin/assets/raw/main/${extensionType}s.png`
          })
        );

        cardElm.setAttribute("acord-href", href);

        async function toggleButton(ask=false) {
          utils.ifExists(cardElm.querySelector(".toggle-extension"), /** @param {Element} item */async (item) => {
            item.disabled = true;
            await toggleExtension(ask);
            item.disabled = false;
            item.classList.remove(buttonClasses.colorBrand, buttonClasses.colorRed);
            item.classList.add(!extensions.nests.loaded.ghost[href] ? buttonClasses.colorBrand : buttonClasses.colorRed);
            item.firstElementChild.textContent = !extensions.nests.loaded.ghost[href] ? i18n.format(`IMPORT_${extensionTypeUpper}`) : i18n.format(`REMOVE_${extensionTypeUpper}`);
          });
        }

        elm.addEventListener("click", async (e) => {
          e.preventDefault();
          toggleButton(true);
        });

        utils.ifExists(cardElm.querySelector(".toggle-extension"), /** @param {Element} item */(item) => {
          // item.disabled = !!extensions.nests.loaded.ghost[href];
          item.onclick = async () => {
            toggleButton();
          }
        });

        messageElm.appendChild(
          cardElm
        );
      }
    )
  )

  patchContainer.add(
    dom.patch(`[class*="profileBadges-"], [class*="badgeList-"], [class*="userInfo-"] > div > [class*="container-"]`, /** @param {Element} elm */ async (elm)=>{

      let user = utils.react.getProps(elm, i=>i?.user)?.user;
      if (!user) return;

      // let sizes = ["profileBadges-", "container-1gYwHN"].some(i=>elm.className.includes(i)) ? [22, 14] : [24, 16];ü
      let sizes = [22, 14];

      // (async () => {

      //   if (!internal.other?.isActiveAcordUser) return;

      //   const lastLogin = await internal.other.isActiveAcordUser(user.id);

      //   if (!lastLogin) return;

      //   if (Date.now() - lastLogin > 1000 * 60 * 60 * 24) return;
        
      //   let badge = createBadge("https://raw.githubusercontent.com/AcordPlugin/assets/main/AcordMember.svg", sizes);
      //   badge.setAttribute("acord--tooltip-content", i18n.format("ACTIVE_USER"));

      //   elm.appendChild(badge);
      // })();

      (async ()=>{
        if (!internal.other?.getUserBadges) return;
        let badges = await internal.other.getUserBadges(user.id);

        badges.forEach(badge=>{
          let badgeElm = createBadge(badge[1], sizes);
          let tooltip = (()=>{
            if (badge[2]?.$i18n) return i18n.format(badge[2]?.$i18n, ...(badge[2]?.$params || []));
            if (badge[2]?.$text) return badge[2]?.$text;
            return null;
          })();
          if (tooltip) badgeElm.setAttribute("acord--tooltip-content", tooltip);
          
          elm.appendChild(badgeElm);
        })
        
      })();
    })
  )

  const interactiveClasses = webpack.findByProps("interactiveSelected", "interactive");
  const containerClasses = webpack.find(i=>i?.container && Object.keys(i).length === 1);
  patchContainer.add(
    dom.patch(
      `[class*="sidebar-"] [class*="privateChannels-"] [class*="scrollerBase-"] [class*="privateChannelsHeaderContainer-"]`,
      /** @param {Element} elm */ (elm)=>{

        // TODO: REMOVE
        return;

        let parent = elm.parentElement;

        let item = dom.parseHTML(
          `
            <li class="${interactiveClasses.channel} ${containerClasses.container}">
              ${
                DOMSidebarItem({
                  icon: `
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="currentColor" d="M17 15.245v6.872a.5.5 0 0 1-.757.429L12 20l-4.243 2.546a.5.5 0 0 1-.757-.43v-6.87a8 8 0 1 1 10 0zm-8 1.173v3.05l3-1.8 3 1.8v-3.05A7.978 7.978 0 0 1 12 17a7.978 7.978 0 0 1-3-.582zM12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"/>
                    </svg>
                  `,
                  name: i18n.format("SPONSORED")
                })
              }
            </li>
          `
        );

        item.onclick = () => {
          showModal((e) => {
            return <SponsorsModal e={e} />
          });
        }

        parent.insertBefore(item, elm);
      }
    )
  )
}

