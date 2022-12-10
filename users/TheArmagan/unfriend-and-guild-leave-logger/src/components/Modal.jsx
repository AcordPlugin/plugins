import { Button, ModalRoot, UserStore } from "../other/apis.js";
import { COLORS } from "../other/constants.js";
import { CloseIcon } from "./CloseIcon.jsx";
import webpack from "@acord/modules/webpack";
import { useNest } from "nests/react";
import { persist, i18n } from "@acord/extension";

const scrollClasses = webpack.findByProps("thin", "scrollerBase");

export function Modal({ e }) {
  useNest(persist);

  let currentUserId = UserStore.getCurrentUser().id;

  if (!Array.isArray(persist.ghost.users?.[currentUserId]?.unfriends)) persist.ghost.users[currentUserId].unfriends = [];
  if (!Array.isArray(persist.ghost.users?.[currentUserId]?.leavedGuilds)) persist.ghost.users[currentUserId].leavedGuilds = [];

  return (
    <ModalRoot
      transitionState={e.transitionState}
      size="large"
      className="uagll--modal-root"
    >
      <div className="uagll--modal-header">
        <h1 className="uagll--modal-title">{i18n.format("TITLE")}</h1>
        <div className="uagll--modal-close" onClick={e.onClose}>
          <CloseIcon color={COLORS.SECONDARY} />
        </div>
      </div>
      <div className={`uagll--modal-body ${scrollClasses.thin}`}>

        <section>
          <div className="section-title">
            <h1 class="header">{i18n.format("UNFRIENDS")}</h1>
            <Button
              size={Button.Sizes.TINY}
              color={Button.Colors.TRANSPARENT}
              onClick={() => {
                persist.store.users[currentUserId].unfriends = [];
              }}
            >{i18n.format("CLEAR")}</Button>
          </div>
          <div className="section-content">
            {(persist.ghost.users?.[currentUserId]?.unfriends || []).map((i, index) => (
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
                      persist.store.users[currentUserId].unfriends.splice(persist.store.users[currentUserId].unfriends.findIndex(j => j._id == i._id), 1);
                      persist.store.users[currentUserId].unfriends = persist.store.users[currentUserId].unfriends;
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
            <h1 class="header">{i18n.format("GUILD_LEAVES")}</h1>
            <Button
              size={Button.Sizes.TINY}
              color={Button.Colors.TRANSPARENT}
              onClick={() => {
                persist.store.users[currentUserId].leavedGuilds = [];
              }}
            >{i18n.format("CLEAR")}</Button>
          </div>
          <div className="section-content">
            {(persist.ghost.users?.[currentUserId]?.leavedGuilds || []).map((i, index) => (
              <div className="item">
                <div className="left" style={{ backgroundImage: `url('https://cdn.discordapp.com/icons/${i.id}/${i.icon}.png?size=256')` }}></div>
                <div className="right">
                  <div className="top">
                    <div className="left">
                      {i.name}
                    </div>
                    <div className="right" onClick={() => {
                      persist.store.users[currentUserId].leavedGuilds.splice(persist.store.users[currentUserId].leavedGuilds.findIndex(j => j._id == i._id), 1);
                      persist.store.users[currentUserId].leavedGuilds = persist.store.users[currentUserId].leavedGuilds;
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