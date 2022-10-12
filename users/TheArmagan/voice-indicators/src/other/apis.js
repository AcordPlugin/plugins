import webpack from "@acord/modules/webpack";
import common from "@acord/modules/common";

export const transitionTo = webpack.find((_, __, i) => i == "655695");
export const {
  PermissionStore,
  VoiceStateStore,
  ChannelStore,
  GuildStore,
  UserStore,
  InviteStore,
  FluxDispatcher,
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
