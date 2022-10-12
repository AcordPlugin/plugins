import webpack from "@acord/modules/webpack";
import dom from "@acord/dom";
import utils from "@acord/utils";
import events from "@acord/events";
import { persist } from "@acord/extension";
import patchContainer from "../other/patchContainer.js";
import { renderIcon } from "../lib/renderIcon.js";
import { fetchUserVoiceState } from "../other/api.js";
import { ChannelStore } from "../other/apis.js";
import { showModal } from "../lib/showModal.jsx";

const indicatorClasses = [webpack.findByProps("bot", "nameTag").nameTag, webpack.findByProps("wrappedName", "nameAndDecorators").nameAndDecorators, webpack.findByProps("wrappedName", "nameAndDecorators", "selected").nameAndDecorators];

/** @param {HTMLElement} elm */
async function patchIndicators(user, elm) {

  if (!await fetchUserVoiceState(user.id)) return;

  /** @type {Element} */
  let indicatorContainer = dom.parseHTML(`<span class="vi--patched vi--icon-container"></span>`);

  indicatorContainer.render = async () => {
    let state = await fetchUserVoiceState(user.id);
    if (!state) {
      indicatorContainer.innerHTML = "";
      indicatorContainer.state = null;
      return
    }

    if (_.isEqual(state, indicatorContainer.state)) return;

    let channel = ChannelStore.getChannel(state?.channel?.id);

    indicatorContainer.classList[!channel ? "add" : "remove"]("vi--cant-join");

    let tooltipText = `${channel ? "✅" : "❌"} ${state.guild ? (state.guild?.name || "Unknown Guild") : "Private Call"} > ${state.channel?.name || "Plugin Deprecated"}`;

    indicatorContainer.setAttribute("acord--tooltip-content", tooltipText);
    indicatorContainer.replaceChildren(dom.parseHTML(renderIcon(state)));
    indicatorContainer.state = state;
  }

  let unpatchUpdater = events.on("VoiceIndicators:EverySecond", indicatorContainer.render);

  indicatorContainer.unmount = () => {
    unpatchUpdater();
  }

  indicatorContainer.render();

  indicatorContainer.addEventListener("click", /** @param {Event} e */(e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!!persist.ghost.settings?.redacted) return;

    // transitionTo(`/channels/${state.guild ? state.guild.id : "@me"}/${state.channel.id}`);
    showModal(indicatorContainer.state);
  });

  elm.appendChild(indicatorContainer);
}

let syncCache = {};

const fixDuplicate = (user, elm) => {
  if (!((Date.now() - (syncCache[user.id] || 0)) > 100)) return;
  syncCache[user.id] = Date.now();
  patchIndicators(user, elm);
};

export function patchDOM() {

  patchContainer.add((() => {
    let interval = setInterval(() => {
      for (const key in syncCache) {
        if (Date.now() - syncCache[key] > 1000) {
          delete syncCache[key];
        }
      }
    }, 10000);
    return () => {
      syncCache = {};
      clearInterval(interval);
    }
  })());
  
  patchContainer.add(
    events.on("domMutation", /** @param {MutationRecord} mut */ (mut) => {   
      mut.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(indicatorClasses.map(i => `.${i}`).join(", ")).forEach(async (elm) => {
          if (elm.querySelector(".vi--patched")) return;
          let user = utils.react.getProps(elm, i => !!i?.user)?.user;
          if (!user) return;
          fixDuplicate(user, elm);
        });
      });

      mut.removedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) return;

        let elms = node.querySelectorAll(".vi--patched");
        elms.forEach(/** @param {HTMLElement} elm */ async (elm) => {
          if (typeof elm.unmount != "function") return;
          elm.unmount();
        });

      })

    })
  )
}

