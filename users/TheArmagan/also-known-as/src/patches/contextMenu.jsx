import patchContainer from "../other/patchContainer";
import contextMenus from "@acord/ui/contextMenus";
import { fetchNames } from "../other/api";
import { i18n } from "@acord/extension"
import { openModal } from "../other/apis.js";
import { Modal } from "../components/Modal.jsx";


export function patchContextMenu() {
  patchContainer.add(
    contextMenus.patch(
      "user-context",
      (component, props)=>{
        component.props.children.push(
          contextMenus.build.item({ type: "separator" }),
          contextMenus.build.item({ 
            type: "text", 
            label: i18n.format("SEE_ALIASES"),
            action() {
              openModal((e) => {
                return <Modal e={e} id={props.user.id} />
              })
            }
          }),
        )
      }
    )
  )
}