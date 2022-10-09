import swc from "@acord/modules/swc";
import dom from "@acord/dom";
import { DOMButton } from "./DOMButton.js";

const giftCodeClasses = swc.findByProps("giftCodeContainer");
const tileClasses = swc.findByProps("tile", "tileHorizontal");
const embedClasses = swc.findByProps("embedHorizontal", "embedVertical");

export function DOMGiftCard({ title, description="", image="", buttonContents, buttonClassName="", className="" }) {
  return `
    <div class="${giftCodeClasses.container}">
      <div class="${giftCodeClasses.giftCodeContainer} ${className}">
        <div class="${tileClasses.tile} ${tileClasses.tileHorizontal} ${embedClasses.embedHorizontal}">
          <div class="${tileClasses.media} ${tileClasses.mediaHorizontal} acord--gift-card-image" style="background-image: url('${dom.escapeHTML(image)}');"></div>
          <div class="${tileClasses.description}">
            <div class="${tileClasses.title}">${title}</div>
            <div class="${tileClasses.tagline}">${description}</div>
            <div class="${tileClasses.actions}">
              ${DOMButton({ contents: buttonContents, className: buttonClassName })}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}