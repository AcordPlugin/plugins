import { Button, ModalRoot } from "../other/apis.js";
import { COLORS } from "../other/constants.js";
import { CloseIcon } from "./CloseIcon.jsx";
import webpack from "@acord/modules/webpack";
import { useNest } from "nests/react";
import { persist } from "@acord/extension";

const scrollClasses = webpack.findByProps("thin", "scrollerBase");

export function Modal({ e }) {
  useNest(persist);

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
      
        <section>
          <div className="section-title">
            <h1 class="header">Unfriends</h1>
            <Button 
              size={Button.Sizes.TINY} 
              color={Button.Colors.TRANSPARENT}
              onClick={()=>{
                persist.store.unfriends = [];
              }}
            >Clear</Button>
          </div>
        </section>
        <section>
          <div className="section-title">
            <h1 class="header">Guild Leaves</h1>
            <Button 
              size={Button.Sizes.TINY} 
              color={Button.Colors.TRANSPARENT}
              onClick={()=>{
                persist.store.guildLeaves = [];
              }}
            >Clear</Button>
          </div>
        </section>
      </div>
    </ModalRoot>
  )
}