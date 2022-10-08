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
  modalContainer.render = async (ignoreMembers) => {
    if (rendering) return;
    rendering = true;

    let members = ignoreMembers ? [] : await fetchVoiceMembers(channelId);

    if (JSON.stringify(members) == JSON.stringify(modalContainer.members)) {
      rendering = false;
      return;
    }

    let channel = ChannelStore.getChannel(state.channel.id);
    let isJoinable = !channel ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))

    modalContainer.replaceChildren(dom.parseHTML(renderModal({ members, state, isJoinable, channel })));

    modalContainer.querySelector(".vi--modal-close").onclick = closeFunc;

    utils.ifExists(modalContainer.querySelector(".vi--vanity"), (item) => {
      item.onclick = (ev) => {
        ev.preventDefault();
        if (!state?.guild?.vanity) return;
        InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: state?.guild?.vanity });
        toasts.show(`Joining to "${state.guild.name}"!`);
        closeFunc();
      }
    })

    utils.ifExists(modalContainer.querySelector(".vi--join-channel"), (item) => {
      item.onclick = (ev) => {
        ev.preventDefault();
        if (!isJoinable) return;
        toasts.show(`Joining to "${state.channel.name}"!`);
        selectVoiceChannel(state.channel.id);
        closeFunc();
      }
    });

    utils.ifExists(modalContainer.querySelector(".vi--view-channel"), (item) => {
      item.onclick = (ev) => {
        ev.preventDefault();
        if (!channel) return;
        toasts.show(`Viewing "${state.channel.name}"!`);
        transitionTo(`/channels/${state.guild ? state.guild.id : "@me"}/${state.channel.id}`);
        closeFunc();
      }
    });

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

  let unpatchUpdater = events.on("VoiceIndicators:EverySecond", () => modalContainer.render(false));

  modalContainer.unmount = () => {
    unpatchUpdater();
  }

  modalContainer.render(true);

  let modal = modals.show(modalContainer, { size: "large" });
  closeFunc = modal.close;
}