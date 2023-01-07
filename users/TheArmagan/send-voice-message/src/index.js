import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";
import patchSCSS from "./styles.scss";
import { subscriptions, i18n } from "@acord/extension";
import { ChannelStore, AckActions } from "@acord/modules/common";

export default {
    load() {
        subscriptions.push(patchSCSS());

    },
    unload() { }
}

