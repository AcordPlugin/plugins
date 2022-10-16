import {GuildStore, SelectedGuildStore} from '@acord/modules/common';
import {contextMenus} from "@acord/ui";
import {copyText} from "@acord/utils";
import {i18n} from "@acord/extension";

let patches = [];

export default {
    load() {
        patches.push(
            contextMenus.patch(
                "dev-context",
                (comp, props) => {
                    if (!Array.isArray(comp.props.children)) comp.props.children = [comp.props.children];

                    const roles = GuildStore.getGuild(SelectedGuildStore.getGuildId()).roles;
                    const label = i18n.format("COPY_ROLE_COLOR")

                    const menu = contextMenus.build.item({
                        label,
                        action: () => {
                            const role = roles[props.id];
                            copyText(role.colorString || "#fff");
                        },

                    })

                    comp.props.children = [...comp.props.children, menu];
                }
            )
        )
    },
    unload() {
        patches.forEach(f => f());
    }
}