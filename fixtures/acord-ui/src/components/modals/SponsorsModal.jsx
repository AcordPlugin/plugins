import { ModalRoot } from "../../other/apis.js";
import { CloseIcon } from "../icons/CloseIcon.jsx";

export function SponsorsModal({ e } = {}) {

    return (
        <ModalRoot
            transitionState={e.transitionState}
            size="large"
            className="acord--sponsors-root"
        >
            <div className="container">
                <div className="top">
                    <div></div>
                    <div className="close-container" onClick={e.onClose}>
                        <div className="close">
                            <CloseIcon />
                        </div>
                        <div className="text">ESC</div>
                    </div>
                </div>
            </div>
        </ModalRoot>
    )
}