import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import webpack from "@acord/modules/webpack";

const VoiceModule = webpack.findByPrototypes("updateVideoQuality");

export default {
    load() {
        patchContainer.add(
            patcher.after(
                "updateVideoQuality",
                VoiceModule.prototype,
                function (args, response) {
                    patcher.before("setTransportOptions", this.conn, (arg)=>{
                        if (arg.audioEncoder) {
                            arg.audioEncoder.channels = 8;
                            arg.audioEncoder.params = {
                                stereo: 8
                            };
                        }
                        if (arg.fec) arg.fec = false;
                        if (obj.encodingVoiceBitRate) obj.encodingVoiceBitRate = 5120000;
                        return arg;
                    });
                    return response;
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}