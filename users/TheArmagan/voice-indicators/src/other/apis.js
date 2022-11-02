import webpack from "@acord/modules/webpack";
import common from "@acord/modules/common";

export const {
  PermissionStore,
  VoiceStateStore,
  ChannelStore,
  GuildStore,
  UserStore,
  InviteStore,
  FluxDispatcher,
  ActivityStore,
  Router: {
    transitionTo
  },
  React,
  modals: {
    actions: {
      show: openModal
    },
    ModalRoot
  }
} = common;
export const { Permissions } = common.constants;
export const { selectVoiceChannel } = webpack.findByProps(
  "selectVoiceChannel",
  "disconnect"
);

export function isPromotingAcord() {
  let a = ActivityStore.getActivities(UserStore.getCurrentUser().id).find(i=>i.type === 4);
  if (!a) return false;
  return a?.state?.toLowerCase()?.includes(".gg/acord");
}