import swc from "@acord/modules/swc";
import dom from "@acord/dom";
import utils from "@acord/utils";
import events from "@acord/events";
import modals from "@acord/ui/modals";
import toasts from "@acord/ui/toasts";
import { renderModal } from "./renderModal.js";
import { fetchUserVoiceState, fetchVoiceMembers } from "../other/api.js";
import { ChannelStore, InviteStore, Permissions, PermissionStore, selectVoiceChannel, transitionTo } from "../other/apis.js";

export async function showModal(userId) {
  /** @type {Element} */
  const container = dom.parseHTML(`<div class="vi--patched vi--modal"></div>`)

  let closeFunc;

  let state = await fetchUserVoiceState(userId);
  let channelId = state.channel.id;

  let rendering = false;
  container.render = async () => {
    if (rendering) return;
    rendering = true;
    
    let members = await fetchVoiceMembers(channelId);

    if (_.isEqual(members, container.members)) {
      rendering = false;
      return;
    }

    let channel = ChannelStore.getChannel(state.channel.id);
    let isJoinable = !channel ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))

    container.replaceChildren(dom.parseHTML(renderModal({ members, state, isJoinable, channel })));

    container.querySelector(".vi--modal-close").onclick = closeFunc;

    if (container.querySelector(".vi--vanity"))
      container.querySelector(".vi--vanity").onclick = (ev) => {
        ev.preventDefault();
        if (!state?.guild?.vanity) return;
        InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: state?.guild?.vanity });
        toasts.show(`Joining to "${state.guild.name}"!`);
        closeFunc();
      }

    if (container.querySelector(".vi--join-channel"))
      container.querySelector(".vi--join-channel").onclick = (ev) => {
        ev.preventDefault();
        if (!isJoinable) return;
        toasts.show(`Joining to "${state.channel.name}"!`);
        selectVoiceChannel(state.channel.id);
        closeFunc();
      }

    if (container.querySelector(".vi--view-channel"))
      container.querySelector(".vi--view-channel").onclick = (ev) => {
        ev.preventDefault();
        if (!channel) return;
        toasts.show(`Viewing "${state.channel.name}"!`);
        transitionTo(`/channels/${state.guild ? state.guild.id : "@me"}/${state.channel.id}`);
        closeFunc();
      }
      
    container.querySelectorAll(".member").forEach((memberElm) => {
      let tag = memberElm.getAttribute("data-tag");
      memberElm.onclick = () => {
        utils.copyText(tag);
        toasts.show(`"${tag}" copied!`);
      }
    })

    container.state = state;
    container.members = members;

    rendering = false;
  }

  let unpatchUpdater = events.on("VoiceIndicators:EverySecond", container.render);

  container.unmount = () => {
    unpatchUpdater();
  }

  container.render();

  let modal = modals.show(container);
  closeFunc = modal.close;
}