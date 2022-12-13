import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { GatewayConnectionStore, MediaEngineActions } from "@acord/modules/common";
import { contextMenus } from "@acord/ui";
import { i18n } from "@acord/extension";
import utils from "@acord/utils";


async function update() {
    await MediaEngineActions.toggleSelfMute();
    await utils.sleep(100);
    await MediaEngineActions.toggleSelfMute();
}

export default {
    load() {
        let socket = GatewayConnectionStore.getSocket();

        let fakeStates = {
            selfMute: false,
            selfDeaf: false,
            selfVideo: false
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
    },
}