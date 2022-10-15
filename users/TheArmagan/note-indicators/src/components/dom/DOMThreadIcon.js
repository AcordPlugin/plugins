import { toHTMLProps } from "@acord/dom";
export function DOMThreadIcon(props = {}) {
  return `
    <svg
      width="50"
      height="51"
      viewBox="0 0 50 51"
      fill="none"
      className="ni--icon ni--thread-icon"
      ${toHTMLProps({ style: { color: props.color } })}
    >
      <path d="M5 0.268311C2.24 0.268311 0 2.50581 0 5.26831V35.2683C0 38.0283 2.24 40.2683 5 40.2683H12.5V50.2683L22.4999 40.2683H44.9999C47.7624 40.2683 49.9999 38.0283 49.9999 35.2683V5.26831C49.9999 2.50581 47.7624 0.268311 44.9999 0.268311H5Z" fill="currentColor" />
    </svg>
  `
}