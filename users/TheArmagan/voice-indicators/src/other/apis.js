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
