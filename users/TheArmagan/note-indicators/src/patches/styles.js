import patchContainer from "../other/patchContainer.js";
import patchSCSS from "../styles/style.scss";

export function patchStyles() {
  patchContainer.add(patchSCSS());
}