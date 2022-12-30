import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { GatewayConnectionStore, MediaEngineActions, NotificationSettingsStore } from "@acord/modules/common";
import { contextMenus } from "@acord/ui";
import { i18n } from "@acord/extension";
import utils from "@acord/utils";

let updating = false;

async function update() {
    if (updating) return setTimeout(update, 125);
    updating = true;
    let state = NotificationSettingsStore.getState();
    let toDisable = [];
    if (!state.disabledSounds.includes("mute")) toDisable.push("mute");
    if (!state.disabledSounds.includes("unmute")) toDisable.push("unmute");

    state.disabledSounds.push(...toDisable);
    await MediaEngineActions.toggleSelfMute();
    await utils.sleep(100);
    await MediaEngineActions.toggleSelfMute();
    state.disabledSounds = state.disabledSounds.filter(i => !toDisable.includes(i));
    updating = false;
}

export default {
    load() {
        let socket = GatewayConnectionStore.getSocket();

        let fakeStates = {
            _selfMute: false,
            _selfDeaf: false,
            _selfVideo: false,
            get selfMute() {
                return this._selfDeaf || this._selfMute;
            },
            set selfMute(val) {
                this._selfMute = val;
            },
            get selfDeaf() {
                return this._selfDeaf;
            },
            set selfDeaf(val) {
                this._selfDeaf = val;
            },
            get selfVideo() {
                return this._selfVideo;
            },
            set selfVideo(val) {
                this._selfVideo = val;
            }
        }

        let stateKeys = Object.keys(fakeStates);

        patchContainer.add(
            patcher.before(
                "voiceStateUpdate",
                socket,
                (args) => {
                    for (let i = 0; i < stateKeys.length; i++) {
                        const stateKey = stateKeys[i];
                        args[0][stateKey] = fakeStates[stateKey] || args[0][stateKey];
                    }
                    return args;
                }
            )
        );


        patchContainer.add(
            contextMenus.patch(
                "audio-device-context",
                (comp, props) => {
                    let arr = comp?.props?.children?.props?.children;
                    if (!Array.isArray(arr)) return;

                    arr.push(
                        contextMenus.build.item(
                            { type: "separator" }
                        )
                    );

                    if (props.renderInputDevices) {
                        arr.push(
                            contextMenus.build.item(
                                {
                                    type: "toggle",
                                    label: i18n.format("FAKE_MUTE"),
                                    checked: fakeStates.selfMute,
                                    async action() {
                                        fakeStates.selfMute = !fakeStates.selfMute;
                                        update();
                                    }
                                }
                            ),
                        )
                    } else {
                        arr.push(
                            contextMenus.build.item(
                                {
                                    type: "toggle",
                                    label: i18n.format("FAKE_DEAF"),
                                    checked: fakeStates.selfDeaf,
                                    async action() {
                                        fakeStates.selfDeaf = !fakeStates.selfDeaf;
                                        update();
                                    }
                                }
                            ),
                            contextMenus.build.item(
                                {
                                    type: "toggle",
                                    label: i18n.format("FAKE_CAMERA"),
                                    checked: fakeStates.selfVideo,
                                    async action() {
                                        fakeStates.selfVideo = !fakeStates.selfVideo;
                                        update();
                                    }
                                }
                            ),
                        )
                    }
                }
            )
        )
    },
    unload() {
        patchContainer.removeAll();
        update();
    },
}