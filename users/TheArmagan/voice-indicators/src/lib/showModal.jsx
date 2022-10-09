import { fetchUserVoiceState } from "../other/api.js";
import { ChannelStore, Permissions, PermissionStore, openModal } from "../other/apis.js";
import { Modal } from "../components/react/Modal.jsx";

export async function showModal(stateOrUserId) {
  let state = typeof stateOrUserId == "string" ? await fetchUserVoiceState(stateOrUserId) : stateOrUserId;

  let channel = ChannelStore.getChannel(state.channel.id);
  let inMyChannels = !!channel;
  let isJoinable = !inMyChannels ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))

  openModal((e) => {
    return <Modal e={e} data={{state, inMyChannels, isJoinable}} />
  })
}