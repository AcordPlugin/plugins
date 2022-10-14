import patchContainer from "../other/patchContainer.js";
import events from "@acord/events";
import dom from "@acord/dom";
import utils from "@acord/utils";
import { i18n } from "@acord/extension";
import { FluxDispatcher } from "../other/apis.js";
import { formatSeconds } from "../utils/formatSeconds.js";

const channelClasses = acord.modules.webpack.findByProps("channel", "voiceUsers", "inner", "beta");
const subtextClasses = acord.modules.webpack.find(i => i?.subtext && Object.keys(i).length == 1)

export function patchAll() {

  let state = {
    startTime: Date.now(),
    render: true
  };

  patchContainer.add((() => {
    function onRTCUpdate(e) {
      if (e?.state === "RTC_CONNECTED" && e?.context === "default") {
        state.startTime = Date.now();
        state.render = true;
      } else if (e?.state == "RTC_DISCONNECTED" && e?.context === "default") {
        state.startTime = Date.now();
        state.render = false;
      }
    }

    FluxDispatcher.subscribe("RTC_CONNECTION_STATE", onRTCUpdate);

    return () => FluxDispatcher.unsubscribe("RTC_CONNECTION_STATE", onRTCUpdate);
  })());

  function tryPatch(elm) {
    if (elm.querySelector("ct--patched")) return;
    elm.classList.add("ct--patched");

    let div = dom.parents(elm, `[class*="inner-"] > div`)?.[0];

    let container = dom.parseHTML(`<div class="${subtextClasses.subtext} ct--container"></div>`)

    state.startTime = Date.now();
    state.render = true;
    container.render = () => {
      if (!state.render) {
        container.innerHTML = "";
        return;
      }

      container.innerHTML = i18n.format("TIME_ELAPSED", formatSeconds((Date.now() - state.startTime) / 1000));
    }

    let unpatchInterval = utils.interval(container.render, 1000);
    container.render();

    let unmountCall = () => container.unmount();

    container.unmount = () => {
      patchContainer.remove(unmountCall);
      container.remove();
      unpatchInterval();
    }

    patchContainer.add(unmountCall);

    div.appendChild(container);
  }

  document.querySelectorAll(`.${channelClasses.channel}.${subtextClasses.subtext}`).forEach(/** @param {Element} elm */(elm) => {
    tryPatch(elm);
  });

  patchContainer.add(
    events.on("domMutation", /** @param {MutationRecord} mut */(mut) => {
      mut.addedNodes.forEach((node) => {
        if (node.nodeType == Node.TEXT_NODE) return;

        node.querySelectorAll(`.${channelClasses.channel}.${subtextClasses.subtext}`).forEach(/** @param {Element} elm */(elm) => {
          tryPatch(elm);
        });
      });

      mut.removedNodes.forEach((node) => {
        if (node.nodeType == Node.TEXT_NODE) return;

        node.querySelectorAll(`.ct--patched`).forEach(/** @param {Element} elm */(elm) => {
          elm?.unmount?.();
        });
      });
    })
  )
}