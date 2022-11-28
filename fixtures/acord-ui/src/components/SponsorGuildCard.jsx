import { Button, React } from "../other/apis.js";
import i18n from "@acord/i18n";

export function SponsorGuildCard({ guild }) {
    return <div
        className={`acord--sponsor-guild-card`}
        style={{ "--banner": `url('https://cdn.discordapp.com/banners/${guild.id}/${guild.banner}.png?size=1024')`, "--icon": `url('https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=1024')` }}
    >
        <div className="banner">
            <div className="icon-wrapper">
                <div className="icon"></div>
            </div>
        </div>

        <div className="content">
            <div className="info-wrapper">
                <div className="about">
                    <div className="title">{guild.name}</div>
                    <div className="description">{guild.description}</div>
                </div>
                <div className="stats">
                    <div className="stat">
                        <div className="icon" style={{ "--color": "#5662f6" }}></div>
                        <div className="text">{guild.votes.toLocaleString()} votes</div>
                    </div>
                    <div className="stat">
                        <div className="icon" style={{ "--color": "#9a9da1" }}></div>
                        <div className="text">{guild.members.toLocaleString()} members</div>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <Button color={Button.Colors.BRAND} size={Button.Sizes.SMALL} className="button">Vote</Button>
                <Button color={Button.Colors.GREEN} size={Button.Sizes.SMALL} className="button">Join</Button>
            </div>
        </div>
    </div>
}