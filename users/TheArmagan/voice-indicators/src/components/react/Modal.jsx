import webpack from "@acord/modules/webpack";
import utils from "@acord/utils";
import toasts from "@acord/ui/toasts";
import { fetchVoiceMembers } from "../../other/api";
import { InviteStore, ModalRoot, selectVoiceChannel, React, transitionTo } from "../../other/apis";
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

export function Modal({ e, data }) {
  let [members, setMembers] = React.useState([]);
  let fetching = false;

  async function onChange() {
    if (fetching) return;
    fetching = true;
    let d = await fetchVoiceMembers(data.state.channel.id);
    fetching = false;
    setMembers(d || []);
  }

  React.useEffect(() => {
    return events.on("VoiceIndicators:EverySecond", onChange);
  }, []);

  return (
    <ModalRoot
      transitionState={e.transitionState}
      size="large"
      className="vi--modal-root">
      <div className="vi--modal-header" >
        <div className="title-container">
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
        </div>
        
        <div onClick={e.onClose} className="vi--modal-close" >
          <CloseIcon color={COLORS.SECONDARY} />
        </div>
      </div>
      <div className="vi--modal-content">
        <div className="channel">
          <div className="name-container">
            <div className="name">
              <VoiceIcon />
              {data.state.channelName || "Unknown"}
            </div>
            <div className="controls">
              <div
                className={`control ${!data.isJoinable ? "vi--cant-click vi--cant-join" : ""}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!data.isJoinable) return;
                  toasts.show(`Joining to "${data.state.channelName}"!`);
                  selectVoiceChannel(data.state.channelId)
                  e.onClose();
                }}
              >
                <div acord--tooltip-content={`${!data.isJoinable ? "Can't " : ""} Connect`}>
                  <JoinCallIcon color={COLORS.SECONDARY} />
                </div>
              </div>
              <div
                className={`control ${!data.inMyChannels ? "vi--cant-click" : ""}`}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (!data.inMyChannels) return;
                  toasts.show(`Viewing "${data.state.channelName}"!`);
                  transitionTo(`/channels/${data.state.guildId || "@me"}/${data.state.channelId}`);
                  e.onClose();
                }}
              >
                <div acord--tooltip-content={`${!data.inMyChannels ? "Can't " : ""} Show Channel`}>
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
                    {member?.states ? 
                      <div className="state vi--icon-container">
                        {
                          (member.states.selfDeaf || member.states.deaf)
                            ? <DeafIcon color={COLORS[member.states.deaf ? "DANGER" : "SECONDARY"]} />
                            : (member.states.selfMute || member.states.mute || member.states.suppress)
                              ? <MuteIcon color={COLORS[member.states.mute ? "DANGER" : "SECONDARY"]} />
                              : member.states.selfVideo
                                ? <VideoIcon color={COLORS.SECONDARY} />
                                : member.states.selfStream
                                  ? <div className="v--icon vi--red-dot" />
                                  : <VoiceIcon color={COLORS.SECONDARY} />
                        }
                      </div> 
                      : null
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ModalRoot>
  );
}