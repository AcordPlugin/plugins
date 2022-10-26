import { GuildMemberStore } from "../other/apis";

export function getMemberNicks(guildId) {
  let members = GuildMemberStore.getMembers(guildId)
  return members.filter(i => i.nick).map(i => ({ userId: i.userId, name: i.nick, from: "GUILD", fromId: guildId }));
}