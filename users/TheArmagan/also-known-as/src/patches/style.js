import patchContainer from "../other/patchContainer.js";
import styles from "../styles/styles.scss";

export function patchStyles() {
  patchContainer.add(styles());
}