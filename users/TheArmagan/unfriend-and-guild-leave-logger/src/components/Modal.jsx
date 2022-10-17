import { Button, ModalRoot } from "../other/apis.js";
import { COLORS } from "../other/constants.js";
import { CloseIcon } from "./CloseIcon.jsx";
import webpack from "@acord/modules/webpack";

const scrollClasses = webpack.findByProps("thin", "scrollerBase");

export function Modal({ e }) {

  return (
    <ModalRoot
      transitionState={e.transitionState}
      size="large"
      className="uagll--modal-root"
    >
      <div className="uagll--modal-header">
        <h1 className="uagll--modal-title">Unfriend And Guild Leaves</h1>
        <div className="uagll--modal-close" >
          <CloseIcon color={COLORS.SECONDARY} />
        </div>
      </div>
      <div className={`uagll--modal-body ${scrollClasses.thin}`}>
        <Button color={Button.Colors.TRANSPARENT} borderColor={Button.BorderColors.RED} />
      </div>
    </ModalRoot>
  )
}