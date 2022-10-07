import swc from "@acord/modules/swc";
import dom from "@acord/dom";
import utils from "@acord/utils";
import events from "@acord/events";
import patchContainer from "../other/patchContainer.js";
import { renderIcon } from "../lib/renderIcon.js";
import { fetchUserVoiceState } from "../other/api.js";
import { ChannelStore, transitionTo } from "../other/apis.js";
import { showModal } from "../lib/showModal.js";

const indicatorClasses = [swc.findByProps("bot", "nameTag").nameTag, swc.findByProps("wrappedName", "nameAndDecorators").nameAndDecorators, swc.findByProps("wrappedName", "nameAndDecorators", "selected").nameAndDecorators];

export function patchDOM() {
  patchContainer.add(
    events.on("domMutation", /** @param {MutationRecord} mut */ (mut) => {   
      mut.addedNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) return;

        node.querySelectorAll(indicatorClasses.map(i => `.${i}`).join(", ")).forEach(async (elm) => {
          if (elm.querySelector(".vi--patched")) return;
          patchIndicators(elm);
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

/** @param {HTMLElement} elm */ 
async function patchIndicators(elm) {
  let user = utils.getReactProps(elm, i => !!i?.user)?.user;
  if (!user) return;

  if (!await fetchUserVoiceState(user.id)) return;

  let container = dom.parseHTML(`<span class="vi--patched vi--icon-container"></span>`);

  container.render = async () => {
    let state = await fetchUserVoiceState(user.id);
    if (!state)
      return container.remove();

    if (_.isEqual(state, container.state)) return;

    let channel = ChannelStore.getChannel(state?.channel?.id);

    let tooltipText = `${channel ? "✅" : "❌"} ${state.guild ? (state.guild?.name || "Unknown Guild") : "Private Call"} > ${state.channel?.name || "Plugin Deprecated"}`;
    // if (!container.tooltip)
    //   container.tooltip = tooltips.create(container, tooltipText);

    container.setAttribute("acord-tooltip-content", tooltipText);
    container.replaceChildren(dom.parseHTML(renderIcon(state)));
    // container.tooltip.label = tooltipText;
    container.state = state;
  }

  let unpatchUpdater = events.on("VoiceIndicators:EverySecond", container.render);

  container.unmount = () => {
    unpatchUpdater();
  }

  container.render();

  container.addEventListener("click", /** @param {Event} e */(e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // transitionTo(`/channels/${state.guild ? state.guild.id : "@me"}/${state.channel.id}`);
    showModal(user.id);
  });

  elm.appendChild(container);
}