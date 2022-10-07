import swc from "@acord/modules/swc";
import common from "@acord/modules/common";

export const GuildStore = swc.findByProps("getGuild", "getGuildCount");
export const ChannelStore = swc.findByProps("getDMFromUserId", "getDMUserIds", "getChannel");
export const VoiceStateStore = swc.findByProps("getVoiceState", "getUserVoiceChannelId");
export const transitionTo = swc.find((_, __, i) => i == "655695");
export const UserStore = swc.findByProps("getUser", "getCurrentUser");
export const PermissionStore = swc.findByProps("getChannelPermissions");
export const { Permissions } = common.constants;
export const { selectVoiceChannel } = swc.findByProps("selectVoiceChannel", "disconnect");
export const InviteStore = swc.findByProps("acceptInvite", "acceptInviteAndTransitionToInviteChannel");
export const FluxDispatcher = swc.findByProps("isDispatching", "dispatch");