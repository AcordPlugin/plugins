import { ModalRoot } from "../../other/apis.js";
import { COLORS } from "../../other/constants.js";
import { CloseIcon } from "../icons/CloseIcon.jsx";

export function ModalBase({ e, body, name, bodyId }) {

  return (
    <ModalRoot
      transitionState={e.transitionState}
      size="large"
      className="acord--modal-root"
    >
      <div className="acord--modal-header">
        <h1 className="acord--modal-title">{name}</h1>
        <div onClick={e.onClose} className="acord--modal-close" >
          <CloseIcon color={COLORS.SECONDARY} />
        </div>
      </div>
      <div className={`acord--modal-body acord--modal-body--${bodyId}`}>
        {body}
      </div>
    </ModalRoot>
  );
}