import { openModal } from "../other/apis.js";
import { Modal } from "../components/react/Modal.jsx";

export async function showModal(states) {
  openModal((e) => {
    return <Modal e={e} states={states} />
  })
}