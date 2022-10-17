import patchContainer from "../other/patchContainer";
import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";

const toolbarClasses = webpack.findByProps("toolbar", "transparent", "hamburger")

export function patchDOM() {
    patchContainer.add(
        dom.patch(
            `section .${toolbarClasses.toolbar}`,
            /** @param {Element} elm */
            (elm)=>{
                if (elm.childElementCount != 3) return;

                // TODO: do the injection
            }
        )
    )
}