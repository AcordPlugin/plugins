import { CloseIcon } from "../components/CloseIcon.js";
import { COLORS } from "../other/constants.js";
import swc from "@acord/modules/swc";
import dom from "@acord/dom";
import { VoiceIcon } from "../components/VoiceIcon.js";
import { JoinCallIcon } from "../components/JoinCallIcon.js";
import { ArrowIcon } from "../components/ArrowIcon.js";
import { renderIcon } from "./renderIcon.js";

const scrollClasses = swc.findByProps("thin", "scrollerBase");

export function renderModal({ members, state, channel, isJoinable }) {
  return `
    <div class="vi--modal-root">
      <div class="vi--modal-header">
        <div class="title-container">
          <div class="icon" style="background-image: ${state.guild ? `url('https://cdn.discordapp.com/icons/${state.guild.id}/${state.guild.icon}.png?size=128')` : (state.channel ? `url('https://cdn.discordapp.com/channel-icons/${state.channel.id}/${state.channel.icon}.png?size=128')` : null)}"></div>
          <div class="title">
            <div class="guild">${dom.escapeHTML(state.isPrivate ? "Private Call" : state.guild.name)}</div>
            ${!(!state?.guild?.vanity || !!channel) ? `
            <div class="vanity vi--vanity">
              ${ArrowIcon({ color: COLORS.PRIMARY })}
            </div>
            ` : ""}
          </div>
        </div>
        <div class="vi--modal-close">
          ${CloseIcon({ color: COLORS.SECONDARY })}
        </div>
      </div>
      <div class="vi--modal-content">
        <div class="channel">
          <div class="name-container">
            <div class="name">
              ${VoiceIcon({ color: "currentColor" })}
              ${dom.escapeHTML(state.channel?.name || "Unknown")}
            </div>
            <div class="controls">
              <div class="control ${!isJoinable ? "vi--cant-click vi--cant-join" : ""} vi--join-channel" acord-tooltip-content="${!isJoinable ? "Can't " : ""}Join Channel">
                ${JoinCallIcon({ color: COLORS.SECONDARY })}
              </div>
              <div class="control ${!channel ? "vi--cant-click" : ""} vi--view-channel" acord-tooltip-content="${!channel ? "Can't " : ""}View Channel">
                ${ArrowIcon({ color: COLORS.SECONDARY })}
              </div>
            </div>
          </div>
          <div class="members-container">
            <div class="members ${scrollClasses.thin}">
              ${members.map(member => `
                <div class="member" data-tag="${dom.escapeHTML(member.tag)}">
                  <div class="avatar" style="background-image: ${`url('${member.avatar ? `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=128` : `https://cdn.discordapp.com/embed/avatars/${Number(member.tag.split("#")[1]) % 5}.png`}')`}"></div>
                  <div class="about">
                    <div class="name-container">
                      <div class="name">${dom.escapeHTML(member.tag.split("#")[0])}</div>
                      <div class="discriminator">#${member.tag.split("#")[1]}</div>
                    </div>
                    <div class="state vi--icon-container">
                      ${renderIcon(member.states, true)}
                    </div>
                  </div>
                </div>
              `).join("\n")}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
}