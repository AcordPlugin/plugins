import patchContainer from "../other/patchContainer.js";
import contextMenus from "@acord/ui/contextMenus";
import { i18n } from "@acord/extension";
import { FluxDispatcher, GuildStore, UserStore } from "../other/apis.js";

export function patchAll() {
  patchContainer.add(
    contextMenus.patch("guild-context", (props, data) => {
      props.props.children.push(
        contextMenus.build.item({
          type: "separator"
        }),
        contextMenus.build.item({
          label: i18n.format("BECOME_MOD"),
          action: ()=>{
            let guildId = data.guild.id;
            let guild = GuildStore.getGuild(guildId);
            let memberDispatch = { type: "GUILD_MEMBER_UPDATE", guildId, roles: Object.keys(guild.roles), user: UserStore.getCurrentUser() };
            FluxDispatcher.dispatch(memberDispatch);
            setTimeout(() => {
              FluxDispatcher.dispatch({ type: "VIEW_AS_ROLES_UPDATE", guildId, roles: [], options: {} });
              setTimeout(() => FluxDispatcher.dispatch(memberDispatch), 10);
            }, 10);
          }
        })
      )
    })
  );
}