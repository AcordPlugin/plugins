import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";
import patchSCSS from "./styles.scss";
import { subscriptions, i18n } from "@acord/extension";
import { ChannelStore, AckActions } from "@acord/modules/common";

const listItemClasses = webpack.findByProps("listItemWidth", "listItem", "unavailableBadge");
const guildSeparatorClasses = webpack.find(i => i?.guildSeparator && Object.keys(i).length === 1);

export default {
    load() {
        subscriptions.push(patchSCSS());

        subscriptions.push(
            (() => {

                const elementToAddBefore = document.querySelector(`[class*="scroller-"][class*="scrollerBase-"] [class*="guildSeparator-"]`).parentElement;

                /** @type {Element} */
                const buttonContainer = dom.parseHTML(`
                    <div class="${listItemClasses.listItem}">
                        <div class="ra--button" style="--progress: 0%;">
                            ${i18n.format("READ_ALL")}
                        </div>
                    </div>
                `);

                const buttonElm = buttonContainer.querySelector(".ra--button");
                buttonElm.onclick = async () => {
                    if (buttonElm.classList.contains("in-progress")) return;
                    buttonElm.classList.add("in-progress");

                    const channelIds = Object.values(ChannelStore.__getLocalVars().guildChannels).flat().filter(i => !i.isCategory()).map(i => i.id);
                    const totalLength = channelIds.length;
                    let ackedChannels = 0;

                    while (true) {
                        let chId = channelIds.pop();
                        if (!chId) break;
                        AckActions.ack(chId);
                        ackedChannels += 1;
                        buttonElm.setAttribute("style", `--progress: ${((ackedChannels / totalLength) * 100).toFixed(4)}%;`);
                        await new Promise(r => setTimeout(r, 1));
                    }

                    ackedChannels = 0;

                    buttonElm.classList.remove("in-progress");
                    setTimeout(() => {
                        buttonElm.setAttribute("style", `--progress: 0%;`);
                    }, 1000);
                }

                elementToAddBefore.insertAdjacentElement("afterend", buttonContainer);

                const sepElm = dom.parseHTML(`
                    <div class="${listItemClasses.listItem}">
                        <div class="${guildSeparatorClasses.guildSeparator}"></div>
                    </div>
                `);

                buttonContainer.insertAdjacentElement(
                    "afterend",
                    sepElm
                );

                return () => {
                    buttonContainer.remove();
                    sepElm.remove();
                }
            })()
        )
    },
    unload() { }
}

