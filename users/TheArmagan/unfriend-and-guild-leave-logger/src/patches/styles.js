import patchContainer from "../other/patchContainer";
import patchSCSS from "../styles/styles.scss";

export function patchStyles() {
    patchContainer.add(patchSCSS());
}