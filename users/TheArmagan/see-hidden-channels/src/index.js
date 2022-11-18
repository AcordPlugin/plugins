import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { PermissionStore, Router } from "@acord/modules/common";
import { contextMenus } from "@acord/ui";
import { i18n } from "@acord/extension";


const mem = {
    guildsToSee: new Set()
};

export default {
    load() {
        patchContainer.add(
            patcher.after(
                "can",
                PermissionStore,
                function (args, response) {
                    if (args[1] && args[1].guild_id && mem.guildsToSee.has(args[1].guild_id))
                        return true;
                }
            )
        );

        patchContainer.add(
            contextMenus.patch(
                "guild-context",
                (comp, props)=>{
                    console.log(comp, props);
                    comp.props.children.push(
                        contextMenus.build.item(
                            { type: "separator" }
                        ),
                        contextMenus.build.item(
                            {
                                type: "toggle",
                                label: i18n.format("SEE_HIDDEN_CHANNELS"),
                                checked: mem.guildsToSee.has(props.guild.id),
                                async action() {
                                    mem.guildsToSee[!mem.guildsToSee.has(props.guild.id) ? "add" : "delete"](props.guild.id);
                                    Router.transitionTo("/channels/@me");
                                    while (true) {
                                        await new Promise(r=>setTimeout(r, 50));
                                        if (document.querySelector('[class*="sidebar-"] [class*="privateChannels-"]')) break;
                                    }
                                    Router.transitionToGuild(props.guild.id);
                                }
                            }
                        ),
                    )
                }
            )
        )
    },
    unload() {
        patchContainer.removeAll();
        mem.guildsToSee.clear();
    },
}