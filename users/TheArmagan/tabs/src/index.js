import dom from "@acord/dom";
import utils from "@acord/utils";
import patchSCSS from "./styles.scss";
import { subscriptions } from "@acord/extension";
import { Router, ChannelStore, UserStore, GuildStore } from "@acord/modules/common";
import { DOMCloseIcon } from "./components/DOMCloseIcon.js";


export default {
    load() {
        subscriptions.push(patchSCSS());

        subscriptions.push((() => {

            /** @type {Element} */
            const container = dom.parseHTML(`
                <div class="tabs--container"></div>
            `);

            utils.ifExists(document.querySelector('div[class*="bg-"]'), (e) => e.remove());
            document.querySelector('[class*="appDevToolsWrapper-"]').insertAdjacentElement("beforebegin", container);

            let newTabElm = dom.parseHTML(`
                <div class="tabs--new-tab">
                    ${DOMCloseIcon()}
                </div>
            `);

            newTabElm.onclick = () => {
                addTab("Loading..", "/channels/@me", true);
            }

            container.appendChild(newTabElm);

            function addTab(title, startPath, selectedByDefault) {
                /** @type {Element} */
                let item = dom.parseHTML(`
                    <div class="tabs--item">
                        <span class="tabs--item--info">
                            <span class="tabs--item--icon"></span>
                            <span class="tabs--item--title">${dom.escapeHTML(title)}</span>
                        </span>
                        <span class="tabs--item--close">
                            ${DOMCloseIcon()}
                        </span>
                    </div>
                `);

                item.setAttribute("data-pathname", startPath);
                async function select() {
                    await new Promise(r => setTimeout(r, 1));
                    Router.transitionTo(item.getAttribute("data-pathname"));
                    document.querySelectorAll(".tabs--item--selected").forEach(e => e.classList.remove("tabs--item--selected"));
                    item.classList.add("tabs--item--selected");
                }
                function close() {
                    document.querySelector(".tabs--item").onclick();
                    item.remove();
                }
                item.select = select;
                item.close = close;
                item.onclick = async () => {
                    if (location.pathname != item.getAttribute("data-pathname")) select()
                }
                item.querySelector(".tabs--item--close").onclick = () => {
                    if (document.querySelectorAll(".tabs--item").length == 1) return;
                    close();
                }
                container.querySelector(".tabs--new-tab").insertAdjacentElement("beforebegin", item);
                if (selectedByDefault) {
                    updateTabElmAsSelected(item);
                    select();
                }
            }

            addTab("Loading..", "/channels/@me", true);

            function updateTabElmAsSelected(elm) {
                let pathName = window.location.pathname;
                elm.setAttribute("data-pathname", pathName);
                elm.querySelector(".tabs--item--title").textContent = document.title;
                let pathNameSplitted = pathName.split("/");
                let iconStr = "";
                if (pathNameSplitted[1] === "channels") {
                    if (pathNameSplitted[2] === "@me") {
                        let channel = ChannelStore.getChannel(pathNameSplitted[3]);
                        if (channel) {
                            if (channel.isGroupDM() && channel.icon) {
                                iconStr = `url('https://cdn.discordapp.com/channel-icons/${channel.id}/${channel.icon}.webp?size=32')`;
                            } else if (channel.isDM()) {
                                let userId = channel.getRecipientId();
                                let user = UserStore.getUser(userId);
                                if (user?.avatar) {
                                    iconStr = `url('https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.webp?size=32')`;
                                } else {
                                    iconStr = `url('https://cdn.discordapp.com/embed/avatars/${user.discriminator % 5}.png')`;
                                }
                            }
                        }
                    } else {
                        let guild = GuildStore.getGuild(pathNameSplitted[2]);
                        if (guild?.icon) {
                            iconStr = `url('https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=32')`;
                        }
                    }
                }
                elm.querySelector(".tabs--item--icon").setAttribute("style", iconStr ? `background-image: ${iconStr};` : `background-color: #5865f2;`);
            }

            const mainIntervalClearer = utils.interval(() => {
                let tabElms = [...document.querySelectorAll(".tabs--item")];

                let selectedElm = tabElms.find(el => el.classList.contains("tabs--item--selected"));
                if (selectedElm) {
                    if (selectedElm.getAttribute("data-pathname") === window.location.pathname) return;
                    updateTabElmAsSelected(selectedElm);
                } else {
                    [...document.querySelectorAll(".tabs--item")].pop()?.select?.();
                }
            }, 100);

            return () => {
                mainIntervalClearer();
                container.remove();
            }
        })())
    },
    unload() { }
}