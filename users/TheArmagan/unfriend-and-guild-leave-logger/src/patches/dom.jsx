import patchContainer from "../other/patchContainer";
import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";
import { DOMDislikeIcon } from "../components/dom/DOMDislikeIcon.js";
import { showModal } from "../other/apis.js";
import { Modal } from "../components/Modal.jsx";
import { i18n } from "@acord/extension";

const toolbarClasses = webpack.findByProps("toolbar", "transparent", "hamburger")

export function patchDOM() {
    patchContainer.add(
        dom.patch(
            `section .${toolbarClasses.toolbar}`,
            /** @param {Element} elm */
            (elm) => {
                if (elm.childElementCount != 3) return;

                let container = dom.parseHTML(`
                    <div class="${toolbarClasses.iconWrapper} ${toolbarClasses.clickable}" acord--tooltip-content="${i18n.format("TITLE")}" acord--tooltip-side="left">
                        ${DOMDislikeIcon({ className: toolbarClasses.icon })}
                    </div>
                `);

                container.onclick = () => {
                    showModal((e) => {
                        return <Modal e={e} />
                    });
                }

                elm.insertBefore(container, elm.lastElementChild);
            }
        )
    )
}