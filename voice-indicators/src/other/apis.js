import swc from "@acord/modules/swc";
import common from "@acord/modules/common";

export const transitionTo = swc.find((_, __, i) => i == "655695");
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
      openModal
    },
    ModalRoot
  }
} = common;
export const { Permissions } = common.constants;
export const { selectVoiceChannel } = swc.findByProps(
  "selectVoiceChannel",
  "disconnect"
);
