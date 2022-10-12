import webpack from "@acord/modules/webpack";
import dom from "@acord/dom";
import { DOMButton } from "./DOMButton.js";

const giftCodeClasses = webpack.findByProps("giftCodeContainer");
const tileClasses = webpack.findByProps("tile", "tileHorizontal");
const embedClasses = webpack.findByProps("embedHorizontal", "embedVertical");

export function DOMGiftCard({ title, description="", image="", buttons=[], className="" }) {
  return `
    <div class="${giftCodeClasses.container}">
      <div class="${giftCodeClasses.giftCodeContainer} ${className}">
        <div class="${tileClasses.tile} ${tileClasses.tileHorizontal} ${embedClasses.embedHorizontal}">
          <div class="${tileClasses.media} ${tileClasses.mediaHorizontal} acord--gift-card--image" style="background-image: url('${dom.escapeHTML(image)}');"></div>
          <div class="${tileClasses.description}">
            <div class="${tileClasses.title}">${title}</div>
            <div class="${tileClasses.tagline}">${description}</div>
            <div class="${tileClasses.actions} acord--gift-card--actions">
              ${buttons.map(i => DOMButton(i)).join("\n")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}