import { Button, React } from "../other/apis.js";
import i18n from "@acord/i18n";

export function SponsorGuildCard({ guild, selected = false }) {

    

    return <div 
        className={`acord--sponsor-guild-card ${selected ? "selected" : ""}`} 
        style={{"--banner": `url('https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png?size=1024')`, "--icon": `url('https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=1024')`}}
    >
        <div className="background-container">
            <div className="icon-container">
                <div className="icon"></div>
            </div>
            <div className="content">
                <div className="info">
                    <div className="top">
                        <div className="name">{guild.name}</div>
                        <div className="description">{guild.description}</div>
                    </div>
                    <div className="bottom">
                        <div className="numbers">
                            <div className="number votes">
                                <div className="icon" style={{"--color": "#1ed760"}}></div>
                                <div className="text">{guild.votes.toLocaleString()} votes</div>
                            </div>
                            <div className="number members">
                                <div className="icon" style={{"--color": "#22a6f2"}}></div>
                                <div className="text">{guild.size.toLocaleString()} members</div>
                            </div>
                        </div>
                        <div className="buttons">
                            <button>{i18n.format("VOTE")}</button>
                            <button>{i18n.format("JOIN")}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}