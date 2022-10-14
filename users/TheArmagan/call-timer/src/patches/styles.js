import patchContainer from "../other/patchContainer.js";
import patchCSS from "../styles/style.scss";

export function patchStyles() {
  patchContainer.add(patchCSS());
}