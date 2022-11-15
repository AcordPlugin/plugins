import patchContainer from "./other/patchContainer.js"
import { contextMenus } from "@acord/ui";
import { copyText } from "@acord/utils";
import { i18n } from "@acord/extension";

export default {
    load() {
        patchContainer.add(
            contextMenus.patch(
                "message",
                (comp, props) => {
                    if (!props?.message?.content) return;
                    comp.props.children.push(
                        contextMenus.build.item({
                            type: "separator"
                        }),
                        contextMenus.build.item({
                            label: i18n.format("COPY_RAW_MESSAGE"),
                            action() {
                                copyText(props.message.content);
                            }
                        }),
                    )
                }
            )
        ); 
    },
    unload() {
        patchContainer.removeAll();
    },
}