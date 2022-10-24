import { fetchUserVoiceStates } from "../other/api.js";
import { ChannelStore, Permissions, PermissionStore, openModal } from "../other/apis.js";
import { Modal } from "../components/react/Modal.jsx";

export async function showModal(states) {
  // let channel = ChannelStore.getChannel(state.channelId);
  // let inMyChannels = !!channel;
  // let isJoinable = !inMyChannels ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))

  openModal((e) => {
    return <Modal e={e} states={states} />
  })
}