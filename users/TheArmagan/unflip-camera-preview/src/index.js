import dom from "@acord/dom";
import utils from "@acord/utils";
import webpack from "@acord/modules/webpack";
import { subscriptions } from "@acord/extension";
import { UserStore, VideoStreamStore } from "@acord/modules/common";

const videoClasses = webpack.findByProps("videoContain", "video", "mirror");
const videoClasses2 = webpack.findByProps("media", "video", "mirror");

export default {
    load() {
        subscriptions.push(dom.patch(
            ".media-engine-video",
            /** @param {Element} elm */
            (elm) => {
                let streamId = utils.react.getProps(elm, i => i?.streamId)?.streamId;
                if (!streamId) return;
                let streamUserId = Object.entries(VideoStreamStore.__getLocalVars().userStreams || {}).find(i => i[1]?.default?.streamId === streamId)?.[0];
                if (streamUserId !== UserStore.getCurrentUser().id) return;

                let hadMirror = elm.classList.contains(videoClasses.mirror);
                if (hadMirror) {
                    elm.classList.remove(videoClasses.mirror);
                    return () => {
                        if (hadMirror) elm.classList.add(videoClasses.mirror)
                    }
                } else {
                    let videoElm = acord.dom.parents(elm, '[class*="video-"]')?.[0];
                    if (videoElm) {
                        let videoElmHadMirror = videoElm.classList.contains(videoClasses2.mirror);
                        videoElm.classList.remove(videoClasses2.mirror);
                        return () => {
                            if (videoElmHadMirror) videoElm.classList.add(videoClasses2.mirror);
                        }
                    }
                }
            },
            true
        ));
    },
    unload() { }
}