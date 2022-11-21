import patchContainer from "./other/patchContainer.js"
import utils from "@acord/utils";
import dom from "@acord/dom";
import { GuildMemberStore, SelectedGuildStore } from "@acord/modules/common";
import color from "color";



export default {
    load() {
        patchContainer.add(
            dom.patch(
                '[class*="voiceUser-"] > [class*="content-"]',
                (elm)=>{
                    let props = utils.react.getProps(elm, i => i?.guildId);
                    if (!props?.guildId || !props?.user) return;
                    let member = GuildMemberStore.getMember(props.guildId, props.user.id);;
                    if (!member?.colorString) return;
                    elm.style.backgroundColor = color(member.colorString).alpha(0.15).hexa();
                }
            )
        );

        patchContainer.add(
            dom.patch(
                '[id*="message-content-"]',
                async (elm)=>{
                    let props = utils.react.getProps(elm, i => i?.message);
                    if (!props?.message) return;
                    let member = GuildMemberStore.getMember(SelectedGuildStore.getGuildId(), props.message.author.id);
                    if (!member) return;
                    elm.style.color = color([color(member.colorString).hue(), 20, 255], "hsv").hexa();
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}