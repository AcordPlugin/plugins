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
  const modalContainer = dom.parseHTML(`<div class="vi--patched vi--modal"></div>`)

  let closeFunc;

  let state = await fetchUserVoiceState(userId);
  let channelId = state.channel.id;

  let rendering = false;
  modalContainer.render = async () => {
    if (rendering) return;
    rendering = true;

    console.log(1);

    let members = await fetchVoiceMembers(channelId);

    console.log(2);

    if (JSON.stringify(members) == JSON.stringify(modalContainer.members)) {
      rendering = false;
      return;
    }

    console.log(3);

    let channel = ChannelStore.getChannel(state.channel.id);

    console.log(3.5);
    let isJoinable = !channel ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))

    console.log(4);

    modalContainer.replaceChildren(dom.parseHTML(renderModal({ members, state, isJoinable, channel })));

    modalContainer.querySelector(".vi--modal-close").onclick = closeFunc;

    if (modalContainer.querySelector(".vi--vanity"))
      modalContainer.querySelector(".vi--vanity").onclick = (ev) => {
        ev.preventDefault();
        if (!state?.guild?.vanity) return;
        InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: state?.guild?.vanity });
        toasts.show(`Joining to "${state.guild.name}"!`);
        closeFunc();
      }

    if (modalContainer.querySelector(".vi--join-channel"))
      modalContainer.querySelector(".vi--join-channel").onclick = (ev) => {
        ev.preventDefault();
        if (!isJoinable) return;
        toasts.show(`Joining to "${state.channel.name}"!`);
        selectVoiceChannel(state.channel.id);
        closeFunc();
      }

    if (modalContainer.querySelector(".vi--view-channel"))
      modalContainer.querySelector(".vi--view-channel").onclick = (ev) => {
        ev.preventDefault();
        if (!channel) return;
        toasts.show(`Viewing "${state.channel.name}"!`);
        transitionTo(`/channels/${state.guild ? state.guild.id : "@me"}/${state.channel.id}`);
        closeFunc();
      }

    modalContainer.querySelectorAll(".member").forEach((memberElm) => {
      let tag = memberElm.getAttribute("data-tag");
      memberElm.onclick = () => {
        utils.copyText(tag);
        toasts.show(`"${tag}" copied!`);
      }
    })

    modalContainer.state = state;
    modalContainer.members = members;

    rendering = false;
  } 

  let unpatchUpdater = events.on("VoiceIndicators:EverySecond", modalContainer.render);

  modalContainer.unmount = () => {
    unpatchUpdater();
  }

  modalContainer.render();

  let modal = modals.show(modalContainer);
  closeFunc = modal.close;
}