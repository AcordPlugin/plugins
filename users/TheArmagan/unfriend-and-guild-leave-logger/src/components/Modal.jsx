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
        <div className="uagll--modal-close" onClick={e.onClose}>
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
              onClick={() => {
                persist.store.unfriends = [];
              }}
            >Clear</Button>
          </div>
          <div className="section-content">
            {(persist.ghost.unfriends || []).map((i, index) => (
              <div className="item">
                <div className="left" style={{ backgroundImage: `url('https://cdn.discordapp.com/avatars/${i.id}/${i.avatar}.png?size=256')` }}></div>
                <div className="right">
                  <div className="top">
                    <div className="left">
                      <span>
                        {i.tag.split("#")[0]}
                      </span>
                      <span className="discriminator">
                        #{i.tag.split("#")[1]}
                      </span>
                    </div>
                    <div className="right" onClick={() => {
                      persist.store.unfriends.splice(index, 1);
                    }}>
                      <CloseIcon color={COLORS.SECONDARY} />
                    </div>
                  </div>
                  <div className="bottom">{i.id}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className="section-title">
            <h1 class="header">Guild Leaves</h1>
            <Button
              size={Button.Sizes.TINY}
              color={Button.Colors.TRANSPARENT}
              onClick={() => {
                persist.store.leavedGuilds = [];
              }}
            >Clear</Button>
          </div>
          <div className="section-content">
            {(persist.ghost.leavedGuilds || []).map((i, index) => (
              <div className="item">
                <div className="left" style={{ backgroundImage: `url('https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=256')` }}></div>
                <div className="right">
                  <div className="top">
                    <div className="left">
                      {i.name}
                    </div>
                    <div className="right" onClick={() => {
                      persist.store.leavedGuilds.splice(index, 1);
                    }}>
                      <CloseIcon color={COLORS.SECONDARY} />
                    </div>
                  </div>
                  <div className="bottom">{i.id}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ModalRoot>
  )
}