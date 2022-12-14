import dom from "@acord/dom";
import utils from "@acord/utils";
import { contextMenus } from "@acord/ui";
import patchSCSS from "./styles.scss";
import { subscriptions, persist, i18n } from "@acord/extension";
import { Router, ChannelStore, UserStore, GuildStore, modals, React, ReadStateStore, FluxDispatcher, WindowStore } from "@acord/modules/common";
import { DOMCloseIcon } from "./components/DOMCloseIcon.js";
import { TextInput } from "./components/TextInput.jsx";


export default {
    load() {
        subscriptions.push(patchSCSS());

        subscriptions.push((() => {

            /** @type {Element} */
            const tabsContainer = dom.parseHTML(`
                <div class="tabs--container">
                    <div class="tab-items w-scroll"></div>
                    <div class="bookmarks w-scroll"></div>
                </div>
            `);

            const tabItemsEl = tabsContainer.querySelector(".tab-items");
            const bookmarksEl = tabsContainer.querySelector(".bookmarks");

            tabsContainer.querySelectorAll(".w-scroll").forEach(/** @param {HTMLDivElement} item */(item) => {
                item.onwheel = (e) => {
                    item.scrollBy({
                        left: e.deltaY,
                        behavior: "smooth"
                    });
                }
            })

            const closedTabs = [];

            utils.ifExists(document.querySelector('div[class*="bg-"]'), (e) => e.remove());
            document.querySelector('[class*="appDevToolsWrapper-"]').insertAdjacentElement("beforebegin", tabsContainer);

            function updateBookmarks() {
                bookmarksEl.classList[bookmarksEl.childElementCount === 0 ? "add" : "remove"]("hidden");

                document.querySelectorAll(".bookmark-item").forEach(e => e.classList.remove("selected"));
                utils.ifExists(document.querySelector(`.bookmark-item[data-pathname="${location.pathname}"]`), (e) => {
                    e.classList.add("selected");
                });
            }

            let newTabElm = dom.parseHTML(`
                <div class="new-tab">
                    ${DOMCloseIcon()}
                </div>
            `);

            newTabElm.onclick = async () => {
                addTabItem(i18n.format("LOADING"), "/channels/@me", null, true);
                await new Promise(r => setTimeout(r, 1));
                tabItemsEl.scrollTo({
                    left: tabItemsEl.scrollWidth,
                    behavior: "smooth"
                });
            }

            tabItemsEl.appendChild(newTabElm);

            function addBookmarkItem(title, path, iconStyleStr) {
                let itemId = Math.random().toString(36).slice(2);
                /** @type {Element} */
                let item = dom.parseHTML(`
                    <div class="bookmark-item">
                        <span class="info">
                            <span class="icon" style="${iconStyleStr || `background-color: #5865f2;`}"></span>
                            <span class="title">${dom.escapeHTML(title)}</span>
                        </span>
                        <span class="unread hidden">0</span>
                    </div>
                `);

                item.setAttribute("data-id", itemId);
                item.setAttribute("data-pathname", path);

                async function select() {
                    await new Promise(r => setTimeout(r, 1));
                    let tabItemEl = document.querySelector(`.tab-item[data-pathname="${path}"]`);
                    if (tabItemEl) {
                        tabItemEl.select()
                    } else {
                        let e = addTabItem(i18n.format("LOADING"), path, null);
                        await new Promise(r => setTimeout(r, 1));
                        e.select();
                        await new Promise(r => setTimeout(r, 1));
                        updateItemAsSelected(e);
                    }
                    saveBookmarks();
                }
                function close() {
                    item.remove();
                    saveBookmarks();
                }
                item.select = select;
                item.close = close;
                item.onclick = async () => {
                    if (location.pathname !== item.getAttribute("data-pathname")) {
                        select();
                    }
                }
                item.oncontextmenu = (e) => {
                    contextMenus.open(e, contextMenus.build.menu([
                        {
                            type: "text",
                            label: i18n.format("DELETE"),
                            action() { close() }
                        },
                        {
                            type: "text",
                            label: i18n.format("RENAME"),
                            action() {
                                let titleElm = item.querySelector(".title");
                                let ogVal = titleElm.textContent;
                                let val = "";
                                modals.actions.show((e) => {
                                    return <modals.ModalRoot transitionState={e.transitionState} className="tabs--rename-modal">
                                        <TextInput
                                            onChange={(ev) => { val = ev.target.value.trim() || ogVal; }}
                                            placeholder={`${i18n.format("RENAME")}: ${titleElm.textContent}`}
                                            onKeyUp={(ev) => {
                                                if (ev.code === "Enter") {
                                                    e.onClose();
                                                    titleElm.textContent = val;
                                                    saveBookmarks();
                                                };
                                            }}
                                        />
                                    </modals.ModalRoot>
                                })
                            }
                        },
                    ]));
                }

                bookmarksEl.appendChild(item);
                return item;
            }

            // addBookmarkItem("Friends Bookmark", "/channels/@me");

            function addTabItem(title, startPath, iconStyleStr, selectedByDefault) {
                let itemId = Math.random().toString(36).slice(2);
                /** @type {Element} */
                let item = dom.parseHTML(`
                    <div class="tab-item">
                        <span class="info">
                            <span class="icon" style="${iconStyleStr || `background-color: #5865f2;`}"></span>
                            <span class="title">${dom.escapeHTML(title)}</span>
                        </span>
                        <span class="close">
                            ${DOMCloseIcon()}
                        </span>
                        <span class="unread hidden">0</span>
                    </div>
                `);

                item.setAttribute("data-id", itemId);
                item.setAttribute("data-pathname", startPath);

                async function select() {
                    await new Promise(r => setTimeout(r, 1));
                    Router.transitionTo(item.getAttribute("data-pathname"));
                    document.querySelectorAll(".selected").forEach(e => e.classList.remove("selected"));
                    item.classList.add("selected");
                    tabItemsEl.scrollTo({
                        behavior: "smooth",
                        left: item.getBoundingClientRect().left
                    });
                    document.querySelectorAll(".close.hidden").forEach(e => e.classList.remove("hidden"));
                    if (document.querySelectorAll(".tab-item").length === 1) {
                        document.querySelector(".close").classList.add("hidden");
                    }
                    saveTabs();
                }
                function close() {
                    let d = getTabItemData(item);
                    if (d.pathname === closedTabs?.[0]?.pathname) closedTabs.unshift(d);
                    item.remove();
                    if (item.classList.contains("selected")) {
                        document.querySelector(".tab-item").select();
                    }
                    if (document.querySelectorAll(".tab-item").length === 1) {
                        document.querySelector(".close").classList.add("hidden");
                    }
                    if (closedTabs.length > 16) closedTabs.length = 16;
                    saveTabs();
                }
                item.select = select;
                item.close = close;
                item.onclick = async (e) => {
                    if (e.target.classList.contains("close")) return;

                    if (location.pathname !== item.getAttribute("data-pathname")) {
                        select();
                    }
                }
                item.oncontextmenu = (e) => {
                    let tabs = [...document.querySelectorAll(".tab-item")];
                    let myIndex = tabs.findIndex(i => i.getAttribute("data-id") === itemId);
                    let tabsAfterMe = tabs.filter((_, idx) => idx > myIndex);
                    contextMenus.open(e, contextMenus.build.menu([
                        {
                            type: "text",
                            label: i18n.format("CLOSE"),
                            disabled: !!item.querySelector(".close.hidden"),
                            action() {
                                close();
                            }
                        },
                        {
                            type: "text",
                            label: i18n.format("CLOSE_TABS_TO_RIGHT"),
                            disabled: !tabsAfterMe.length,
                            action() {
                                tabs.filter((_, idx) => idx != myIndex).forEach(i => i.close());
                            }
                        },
                        {
                            type: "separator"
                        },
                        {
                            type: "text",
                            label: i18n.format("MOVE_TAB_TO_LEFT"),
                            disabled: !myIndex,
                            action() {
                                let cache = [...tabs];
                                let [item] = cache.splice(myIndex, 1);
                                cache.splice(myIndex - 1, 0, item);
                                tabItemsEl.replaceChildren(...cache);
                                saveTabs();
                            }
                        },
                        {
                            type: "text",
                            label: i18n.format("MOVE_TAB_TO_RIGHT"),
                            disabled: myIndex === (tabs.length - 1),
                            action() {
                                let cache = [...tabs];
                                let [item] = cache.splice(myIndex, 1);
                                cache.splice(myIndex + 1, 0, item);
                                tabItemsEl.replaceChildren(...cache);
                                saveTabs();
                            }
                        },
                        {
                            type: "separator"
                        },
                        {
                            type: "text",
                            label: i18n.format("ADD_TO_BOOKMARKS"),
                            disabled: !!document.querySelector(`.bookmark-item[data-pathname="${item.getAttribute("data-pathname")}"]`),
                            action() {
                                addBookmarkItem(item.querySelector(".title").textContent, item.getAttribute("data-pathname"), item.querySelector(".icon").getAttribute("style"));
                                saveBookmarks();
                            }
                        },
                    ]))
                }
                item.querySelector(".close").onclick = () => {
                    if (document.querySelectorAll(".tab-item").length === 1) return;
                    close();
                }
                tabItemsEl.querySelector(".new-tab").insertAdjacentElement("beforebegin", item);
                if (selectedByDefault) {
                    updateItemAsSelected(item);
                    select();
                }
                return item;
            }

            function saveTabs() {
                let userId = UserStore.getCurrentUser().id;
                persist.store.userTabs[userId] = [...document.querySelectorAll(".tab-item")].map(getTabItemData);
            }

            function saveBookmarks() {
                let userId = UserStore.getCurrentUser().id;
                persist.store.userBookmarks[userId] = [...document.querySelectorAll(".bookmark-item")].map(i => ({
                    pathname: i.getAttribute("data-pathname"),
                    title: i.querySelector(".title").textContent,
                    icon: i.querySelector(".icon").getAttribute("style")
                }));
            }

            async function updateItemAsSelected(elm) {
                await new Promise(r => setTimeout(r, 1));
                let pathName = window.location.pathname;
                elm.setAttribute("data-pathname", pathName);
                elm.querySelector(".title").textContent = document.title;
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
                elm.querySelector(".icon").setAttribute("style", iconStr ? `background-image: ${iconStr};` : `background-color: #5865f2;`);
            }

            function updateItem(elm) {
                let unreadElm = elm.querySelector(".unread");
                let pathName = elm.getAttribute("data-pathname");
                let pathNameSplitted = pathName.split("/");
                if (pathNameSplitted[1] === "channels") {
                    if (unreadElm) {
                        let unreadCount = ReadStateStore.getUnreadCount(pathNameSplitted[3]);
                        unreadElm.classList[unreadCount ? "remove" : "add"]("hidden");
                        unreadElm.textContent = unreadCount;
                    }
                }
            }

            const translateYRegex = /translateY\(([^)]+)\)/;
            const mainIntervalClearer = utils.interval(() => {
                let selectedTabItemEl = document.querySelector(".tab-item.selected");
                if (selectedTabItemEl) {
                    if (selectedTabItemEl.querySelector(".title").textContent !== document.title) {
                        updateItemAsSelected(selectedTabItemEl);
                    }
                } else {
                    let item = [...document.querySelectorAll(".tab-item")].pop();
                    item ? item.select() : addTabItem(i18n.format("LOADING"), location.pathname, null, true);
                }

                document.querySelectorAll(".tab-item, .bookmark-item").forEach(updateItem);

                updateBookmarks();

                const pipWElm = document.querySelector(`[class*="pictureInPictureWindow-"]`);
                if (pipWElm) {

                    if (pipWElm?.children?.[0]?.getAttribute?.("style") && !WindowStore.isElementFullScreen()) {
                        let style = utils.react.getProps(pipWElm, i => i?.style)?.style;
                        if (style) {
                            let v = style.transform.find(i => i.translateY).translateY;
                            if (typeof v === "object") v = v._parent._value;
                            pipWElm.setAttribute("style", pipWElm.getAttribute("style").replace(translateYRegex, `translateY(${v - tabsContainer.getBoundingClientRect().height}px)`));
                        }
                    }
                }
            }, 100);

            {
                let userId = UserStore.getCurrentUser().id;
                ((persist.ghost.userTabs?.[userId] || []).length ? persist.ghost.userTabs?.[userId] : [{ title: i18n.format("LOADING"), pathname: "/channels/@me", selected: true }]).forEach((e) => {
                    addTabItem(e.title, e.pathname, e.icon, e.selected);
                });
                (persist.ghost.userBookmarks?.[userId] || []).forEach((e) => {
                    addBookmarkItem(e.title, e.pathname, e.icon);
                });
            }

            function getTabItemData(i) {
                return {
                    pathname: i.getAttribute("data-pathname"),
                    title: i.querySelector(".title").textContent,
                    icon: i.querySelector(".icon").getAttribute("style"),
                    selected: i.classList.contains("selected")
                }
            }

            /**
             * @param {KeyboardEvent} e 
             */
            async function handleKeyUp(e) {
                if (!(e.ctrlKey && e.shiftKey)) return;

                if (e.code === "KeyP") {
                    let i = closedTabs.shift();
                    if (i) {
                        let e = addTabItem(i18n.format("LOADING"), i.pathname, i.icon);
                        await new Promise(r => setTimeout(r, 1));
                        e.select();
                        await new Promise(r => setTimeout(r, 1));
                        saveTabs();
                    }
                } else if (e.code.startsWith("Digit")) {
                    let pageNumber = Math.max(Number(e.code.slice(5)) - 1, 0);
                    let tabs = [...document.querySelectorAll(".tab-item")];
                    if (
                        tabs[pageNumber]
                        && !tabs[pageNumber].classList.contains("selected")
                        && location.pathname !== tabs[pageNumber].getAttribute("data-pathname")
                    ) {
                        tabs[pageNumber].select();
                    };
                }
            }

            window.addEventListener("keyup", handleKeyUp);

            function onFullscreenChange(e) {
                if (e.windowId !== "window-1") return;

                if (e.isElementFullscreen) {
                    tabsContainer.classList.add("hidden");
                } else {
                    tabsContainer.classList.remove("hidden");
                    tabsContainer.remove();
                    document.querySelector('[class*="appDevToolsWrapper-"]').insertAdjacentElement("beforebegin", tabsContainer);
                }
            }

            FluxDispatcher.subscribe("WINDOW_FULLSCREEN_CHANGE", onFullscreenChange);



            return () => {
                closedTabs.length = 0;
                window.removeEventListener("keyup", handleKeyUp);
                mainIntervalClearer();
                tabsContainer.remove();
                FluxDispatcher.unsubscribe("WINDOW_FULLSCREEN_CHANGE", onFullscreenChange);
            }
        })())
    },
    unload() { }
}

