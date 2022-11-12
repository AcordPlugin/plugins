import webpack from "@acord/modules/webpack";
import common from "@acord/modules/common";

export const {
    GuildStore,
    ChannelStore,
    UserStore,
    FluxDispatcher,
    RelationshipStore,
    GuildMemberStore,
    SelectedGuildStore: {
        getLastSelectedGuildId
    },
    modals: {
        actions: {
            show: openModal
        },
        ModalRoot
    },
    React
} = common;

