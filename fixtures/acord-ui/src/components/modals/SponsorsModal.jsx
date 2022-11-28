import { ModalRoot } from "../../other/apis.js";
import { CloseIcon } from "../icons/CloseIcon.jsx";
import { TextInput } from "../TextInput.jsx";
import i18n from "@acord/i18n";
import { SponsorGuildCard } from "../SponsorGuildCard.jsx";
import { React } from "../../other/apis.js";

const exampleGuild = {
    icon: "a_4a2d4c71d0ec0c7f72792d7280a6529d",
    banner: "65705ce9dc7c01af5bc1770c887846e6",
    name: "Minecraft",
    description: "The official Minecraft Discord!",
    id: "302094807046684672",
    members: 865011,
    votes: 4614,
    invite: "minecraft"
}

export function SponsorsModal({ e, guildId = undefined } = {}) {
    const [selectedGuild, setSelectedGuild] = React.useState(null);

    return (
        <ModalRoot
            transitionState={e.transitionState}
            size="large"
            className="acord--sponsors-root"
        >
            <div className="container">
                <div className="title-bar">
                    <div className="title">{i18n.format("SPONSOR_GUILDS")}</div>
                    <div className="close-container" onClick={e.onClose}>
                        <div className="close">
                            <CloseIcon />
                        </div>
                        <div className="text">ESC</div>
                    </div>
                </div>
                <div className="content">
                    <div className="search-options">
                        <div className="search-container">
                            <TextInput placeholder={i18n.format("SEARCH")} />
                        </div>
                    </div>
                    <div className="guilds">
                        <SponsorGuildCard guild={exampleGuild} />
                        <SponsorGuildCard guild={exampleGuild} />
                        <SponsorGuildCard guild={exampleGuild} />
                    </div>
                </div>
            </div>
        </ModalRoot>
    )
}