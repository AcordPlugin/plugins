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
import events from "@acord/events";

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
  const [selectedState, setSelectedState] = React.useState(states[0]);
  const [currentData, setCurrentData] = React.useState({inMyChannels: false, isJoinable:false});
  const [members, setMembers] = React.useState([]);

  async function onChange(channelId) {
    let channel = ChannelStore.getChannel(channelId);
    let inMyChannels = !!channel;
    let isJoinable = !inMyChannels ? false : (channel.type == 3 ? true : (PermissionStore.can(Permissions.CONNECT, channel) && PermissionStore.can(Permissions.VIEW_CHANNEL, channel)))
    setCurrentData({inMyChannels, isJoinable});

    setMembers([]);
    await new Promise(r=>setTimeout(r, 100));
    setMembers(await fetchVoiceMembers(channelId));
  }

  React.useEffect(() => {
    onChange(selectedState.channelId);
  }, []);

  return (
    <ModalRoot
      transitionState={e.transitionState}
      size="large"
      className="vi--modal-root">
      <div className="vi--modal-header" >
        {/* <div className="title-container">
          <div className="icon" style={{ backgroundImage: data.state.guildId ? `url('https://cdn.discordapp.com/icons/${data.state.guildId}/${data.state.guildIcon}.png?size=128')` : (data.state.channelId ? `url('https://cdn.discordapp.com/channel-icons/${data.state.channelId}/${data.state.channelIcon}.png?size=128')` : null) }}></div>
          <div className="title">
            <div className="guild">
              {!data.state.guildId ? "Private Call" : data.state.guildName}
            </div>
            {
              !data.state.guildVanity || data.inMyChannels ? null : <div
                className="vanity"
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!data.state.guildVanity) return;
                  InviteStore.acceptInviteAndTransitionToInviteChannel({ inviteKey: data.state.guildVanity });
                  e.onClose();
                }}
              >
                <div acord--tooltip-content="Join Guild">
                  <ArrowIcon color={COLORS.PRIMARY} />
                </div>
              </div>
            }
          </div>
        </div> */}
        <div className="title">
          Voice States
        </div>
        
        <div onClick={e.onClose} className="vi--modal-close" >
          <CloseIcon color={COLORS.SECONDARY} />
        </div>
      </div>
      <div className="vi--modal-content">

        <div className="tabs">
          {
            states.map(state=>(
              <div className={`item ${state.channelId === selectedState.channelId ? "active" : ""}`} onClick={()=>{ setSelectedState(state); onChange(selectedState.channelId); }}>
                <div className="icon-and-name">
                  <div className="icon" style={{ backgroundImage: state.guildId ? `url('https://cdn.discordapp.com/icons/${state.guildId}/${state.guildIcon}.png?size=128')` : (state.channelId ? `url('https://cdn.discordapp.com/channel-icons/${state.channelId}/${state.channelIcon}.png?size=128')` : null) }}></div>
                  <div className="name">{!state.guildId ? "Private Call" : state.guildName}</div>
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
              {selectedState.channelName || "Unknown"}
            </div>
            <div className="controls">
              <div
                className={`control ${!currentData.isJoinable ? "vi--cant-click vi--cant-join" : ""}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!currentData.isJoinable) return;
                  toasts.show(`Joining to "${data.state.channelName}"!`);
                  selectVoiceChannel(data.state.channelId)
                  e.onClose();
                }}
              >
                <div acord--tooltip-content={`${!currentData.isJoinable ? "Can't " : ""} Connect`}>
                  <JoinCallIcon color={COLORS.SECONDARY} />
                </div>
              </div>
              <div
                className={`control ${!currentData.inMyChannels ? "vi--cant-click" : ""}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!currentData.inMyChannels) return;
                  toasts.show(`Viewing "${data.state.channelName}"!`);
                  transitionTo(`/channels/${data.state.guildId || "@me"}/${data.state.channelId}`);
                  e.onClose();
                }}
              >
                <div acord--tooltip-content={`${!currentData.inMyChannels ? "Can't " : ""} Show Channel`}>
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
                    utils.copyText(member.tag);
                    toasts.show(`"${member.tag}" copied!`);
                  }}
                >
                  <div className="avatar" style={{ backgroundImage: `url("${member.avatar ? `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=128` : `https://cdn.discordapp.com/embed/avatars/${Number(member.tag.split("#")[1]) % 5}.png`}")` }}></div>
                  <div className="about">
                    <div className="name-container">
                      <div className="name">{member.tag.split("#")[0]}</div>
                      <div className="discriminator">#{member.tag.split("#")[1]}</div>
                    </div>
                    {member?.states ? indicatorMap[member?.states] : null}
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