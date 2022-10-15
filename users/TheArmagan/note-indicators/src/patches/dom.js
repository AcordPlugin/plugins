import patchContainer from "../other/patchContainer.js";
import dom from "@acord/dom";
import utils from "@acord/utils";
import webpack from "@acord/modules/webpack";
import { DOMThreadIcon } from "../components/dom/DOMThreadIcon.js";
import { COLORS } from "../other/constants.js";
import { NoteStore } from "../other/apis.js";

const voiceUserClasses = webpack.findByProps("voiceUser", "clickable", "userSmall");

const indicatorClasses = [
  webpack.findByProps("bot", "nameTag").nameTag,
  webpack.findByProps("wrappedName", "nameAndDecorators").nameAndDecorators,
  webpack.findByProps("wrappedName", "nameAndDecorators", "selected").nameAndDecorators,
  `${voiceUserClasses.voiceUser}.${voiceUserClasses.clickable}.${voiceUserClasses.userSmall}`
];



export function patchDOM() {
  patchContainer.add(
    dom.patch(
      indicatorClasses.map(i => `.${i}`).join(", "),
      (elm) => {
        let user = utils.react.getProps(elm, i => i?.user)?.user;
        if (!user) return;
        
        elm.classList.add("ni--voiceUser");
        let container = dom.parseHTML(`<div class="ni--container ${elm.className.includes(voiceUserClasses.voiceUser) ? `ni--container--voiceUser` : "ni--container--tag"}"></div>`);
        let lastNote;

        function render() {
          let note = NoteStore.getNote(user.id)?.note;
          if (!note) {
            container.innerHTML = "";
            return;
          }

          if (note == lastNote) return;
          lastNote = note;

          container.setAttribute("acord--tooltip-content", note);

          if (!container.querySelector("svg")) {
            container.appendChild(dom.parseHTML(DOMThreadIcon({ color: COLORS.SECONDARY })));
          }
        }

        render();
        let unpatchRenderer = utils.interval(render, 1000);

        elm.appendChild(container);

        return () => {
          unpatchRenderer();
        }
      }
    )
  );
}