import webpack from "@acord/modules/webpack";
import utils from "@acord/utils";
import toasts from "@acord/ui/toasts";
import { fetchVoiceMembers } from "../../other/api";
import { InviteStore, ModalRoot, selectVoiceChannel, React, transitionTo, PermissionStore, Permissions, ChannelStore } from "../../other/apis";
import { COLORS } from "../../other/constants";
import { ArrowIcon } from "./ArrowIcon";
import { CloseIcon } from "./CloseIcon";
import { DeafIcon } from "./DeafIcon";
import { JoinCallIcon } from "./JoinCallIcon";
import { MuteIcon } from "./MuteIcon";
import { VideoIcon } from "./VideoIcon";
import { VoiceIcon } from "./VoiceIcon";
import { i18n } from "@acord/extension";

const scrollClasses = webpack.findByProps("thin", "scrollerBase");

const indicatorMap = {
  guildDeaf: DeafIcon({ color: COLORS.DANGER }),
  deaf: DeafIcon({ color: COLORS.SECONDARY }),
  guildMute: MuteIcon({ color: COLORS.DANGER }),
  mute: MuteIcon({ color: COLORS.SECONDARY }),
  video: VideoIcon({ color: COLORS.SECONDARY }),
  stream: <div class="v--icon vi--red-dot" ></div>,
  normal: VoiceIcon({ color: COLORS.SECONDARY })
}

export function Modal({ e, states }) {
  const [currentData, setCurrentData] = React.useState({inMyChannels: false, isJoinable:false, state: states[0]});
  const [members, setMembers] = React.useState([]);

  async function onChange(state) {
    let channel = ChannelStore.getChannel(state.channelId);
    let inMyChannels = !!channel;
    let isJoinable = !inMyChannels ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))
    setCurrentData({inMyChannels, isJoinable, state});

    setMembers(await fetchVoiceMembers(state.channelId));
  }

  React.useEffect(() => {
    onChange(states[0]);
  }, []);

  return (
    <ModalRoot
      transitionState={e.transitionState}
      size="large"
      className="vi--modal-root">
      <div className="vi--modal-header">
        <div className="title">
          {i18n.format("VOICE_STATES")}
        </div>
        
        <div onClick={e.onClose} className="vi--modal-close" >
          <CloseIcon color={COLORS.SECONDARY} />
        </div>
      </div>
      <div className="vi--modal-content">

        <div className={`tabs ${scrollClasses.thin}`}>
          {
            states.map(state=>(
              <div className={`item ${state.channelId === currentData.state.channelId ? "active" : ""}`} onClick={()=>{ onChange(state); }}>
                <div className="content">
                  <div className="icon" style={{ backgroundImage: state.guildId ? `url('https://cdn.discordapp.com/icons/${state.guildId}/${state.guildIcon}.png?size=128')` : (state.channelId ? `url('https://cdn.discordapp.com/channel-icons/${state.channelId}/${state.channelIcon}.png?size=128')` : null) }}></div>
                  <div className="name" acord--tooltip-content={state.guildName || i18n.format("PRIVATE_CALL")}>{!state.guildId ? i18n.format("PRIVATE_CALL") : state.guildName}</div>
                  {
                    !state.guildVanity ? null : <div
                      className="vanity"
                      onClick={(ev) => {
                        ev.preventDefault();
                        if (!state.guildVanity) return;
                        InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: state.guildVanity });
                        e.onClose();
                      }}
                    >
                      <div acord--tooltip-content={i18n.format("JOIN_GUILD")}>
                        <ArrowIcon color={COLORS.PRIMARY} />
                      </div>
                    </div>
                  }
                </div>
              </div>
            ))
          }
        </div>

        <div className="content">
          <div className="channel">
          <div className="name-container">
            <div className="name">
              <VoiceIcon />
              {currentData.state.channelName || i18n.format("UNKNOWN")}
            </div>
            <div className="controls">
              <div
                className={`control ${!currentData.isJoinable ? "vi--cant-click vi--cant-join" : ""}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!currentData.isJoinable) return;
                  toasts.show(i18n.format("X_JOIN_CHANNEL", currentData.state.channelName));
                  selectVoiceChannel(currentData.state.channelId)
                  e.onClose();
                }}
              >
                <div acord--tooltip-content={i18n.format(`${!currentData.isJoinable ? "CANT_" : ""}JOIN`)}>
                  <JoinCallIcon color={COLORS.SECONDARY} />
                </div>
              </div>
              <div
                className={`control ${!currentData.inMyChannels ? "vi--cant-click" : ""}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!currentData.inMyChannels) return;
                  toasts.show(i18n.format("X_VIEW_CHANNEL", currentData.state.channelName));
                  transitionTo(`/channels/${currentData.state.guildId || "@me"}/${currentData.state.channelId}`);
                  e.onClose();
                }}
              >
                <div acord--tooltip-content={i18n.format(`${!currentData.inMyChannels ? "CANT_" : ""}SHOW`)}>
                  <ArrowIcon color={COLORS.SECONDARY} />
                </div>
              </div>
            </div>
          </div>
          <div className="members-container">
            <div className={`members ${scrollClasses.thin}`}>
              {members.map(member => (
                <div
                  className="member"
                  onClick={async (ev) => {
                    ev.preventDefault();
                    utils.copyText(member.userTag);
                    toasts.show(i18n.format("X_COPIED", member.userTag));
                  }}
                >
                  <div className="avatar" style={{ backgroundImage: `url("${member.userAvatar ? `https://cdn.discordapp.com/avatars/${member.userId}/${member.userAvatar}.png?size=128` : `https://cdn.discordapp.com/embed/avatars/${Number(member.userTag.split("#")[1]) % 5}.png`}")` }}></div>
                  <div className="about">
                    <div className="name-container">
                      <div className="name">{member.userTag.split("#")[0]}</div>
                      <div className="discriminator">#{member.userTag.split("#")[1]}</div>
                    </div>
                    <div className="state">
                      {indicatorMap[member?.state] || null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>        
      </div>
    </ModalRoot>
  );
}