import webpack from "@acord/modules/webpack"
import dom from "@acord/dom";
import { persist } from "@acord/extension";
import utils from "@acord/utils";
import patchContainer from "../other/patchContainer";
import events from "@acord/events";
import { ActivityStore } from "@acord/modules/common";
import i18n from "@acord/i18n";
import { Desktop } from "../icons/Desktop";
import { Mobile } from "../icons/Mobile";
import { Web } from "../icons/Web";
import { Embedded } from "../icons/Embedded";

const indicatorClasses = [
  webpack.findByProps("bot", "nameTag").nameTag,
  webpack.findByProps("wrappedName", "nameAndDecorators").nameAndDecorators,
  webpack.findByProps("wrappedName", "nameAndDecorators", "selected").nameAndDecorators
];

const colors = {
  online: "#3ba55d",
  dnd: "#ed4245",
  idle: "#faa81a"
};

const elements = {
  desktop: (state) => Desktop({ style: { color: colors[state] } }),
  mobile: (state) => Mobile({ style: { color: colors[state] } }),
  web: (state) => Web({ style: { color: colors[state] } }),
  embedded: (state) => Embedded({ style: { color: colors[state] } }),
}

/**
 * 
 * @param {any} user 
 * @param {Element} elm 
 */
async function patchIndicators(user, elm) {

  if (persist.ghost.settings.ignoreBots && user.bot) return;

  /** @type {Element} */
  let indicatorContainer = dom.parseHTML(`<span class="pi--patched pi--icon-container"></span>`);
  elm.appendChild(indicatorContainer);
  indicatorContainer.render = () => {
    /** @type {{desktop?: "online" | "dnd" | "idle", web?: "online" | "dnd" | "idle", mobile?: "online" | "dnd" | "idle"} as const} */
    const userActivity = ActivityStore?.getState()?.clientStatuses?.[user?.id];

    if (!userActivity) return;

    if (_.isEqual(userActivity, indicatorContainer.state)) return;

    indicatorContainer.state = userActivity;

    /** @type {Element[]} */
    const htmls = Object.entries(userActivity).map(x => {
      const indicator = dom.parseHTML(`<div class="pi--icon">${elements[x[0]](x[1])}</div>`);
      indicator.setAttribute(
        "acord-tooltip-content", 
        `${x[0][0].toUpperCase() + x[0].slice(1).toLowerCase()}: ${i18n.fmt(`STATUS_${x[1] == "embedded" ? "UNKNOWN" : x[1].toUpperCase()}`)}`
      );
      return indicator;
    });
    
    indicatorContainer.replaceChildren(...htmls);
  }

  const updateUnpatcher = events.on("PlatformIndicators:EverySecond", indicatorContainer.render);

  indicatorContainer.unmount = () => {
    updateUnpatcher();
  };

  indicatorContainer.render();

}

let syncCache = {};

const fixDuplicate = (user, elm) => {
  if (!((Date.now() - (syncCache[user.id] || 0)) > 100)) return;
  syncCache[user.id] = Date.now();
  patchIndicators(user, elm);
};

export function patchDOM() {


  patchContainer.add(


    events.on("domMutation", /** @param {MutationRecord} mut */ mut => {


      mut.addedNodes.forEach(node => {

        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(indicatorClasses.map(i => `.${i}`).join(", ")).forEach(/** @param {Element} elm */async (elm) => {
          if (elm.querySelector(".pi--patched")) return;
          const user = utils.react.getProps(elm, i => !!i?.user)?.user;
          if (!user) return;
          fixDuplicate(user, elm);
        })
      });

      mut.removedNodes.forEach(node => {

        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(".pi--patched").forEach(/** @param {Element} elm */async (elm) => {
          elm.unmount?.();
        });
      });

    })
  )
}