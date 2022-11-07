import { Button, ModalRoot } from "../other/apis.js";
import { COLORS } from "../other/constants.js";
import { CloseIcon } from "./CloseIcon.jsx";
import webpack from "@acord/modules/webpack";
import { useNest } from "nests/react";
import { persist } from "@acord/extension";

const scrollClasses = webpack.findByProps("thin", "scrollerBase");

export function Modal({ e }) {
  useNest(persist);

  if (!Array.isArray(persist.ghost.unfriends)) persist.store.unfriends = [];
  if (!Array.isArray(persist.ghost.leavedGuilds)) persist.store.leavedGuilds = [];

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
                      persist.store.unfriends.splice(persist.store.unfriends.findIndex(j=>j._id == i._id), 1);
                      persist.store.unfriends = persist.store.unfriends;
                    }}>
                      <CloseIcon color={COLORS.SECONDARY} />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      {i.id}
                    </div>
                    <div className="right">
                      {new Date(i.at).toLocaleDateString()} {new Date(i.at).toLocaleTimeString()}
                    </div>
                  </div>
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
                      persist.store.leavedGuilds.splice(persist.store.leavedGuilds.findIndex(j=>j._id == i._id), 1);
                      persist.store.leavedGuilds = persist.store.leavedGuilds;
                    }}>
                      <CloseIcon color={COLORS.SECONDARY} />
                    </div>
                  </div>
                  <div className="bottom">
                    <div className="left">
                      {i.id}
                    </div>
                    <div className="right">
                      {new Date(i.at).toLocaleDateString()} {new Date(i.at).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </ModalRoot>
  )
}