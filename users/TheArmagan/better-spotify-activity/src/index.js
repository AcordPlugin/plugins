import patchContainer from "./other/patchContainer.js";
import utils from "@acord/utils";
import dom from "@acord/dom";


export default {
    load() {
        patchContainer.add(
            dom.patch(
                `[data-list-item-id*="members-"] [class*="layout-"] [class*="content-"], [data-list-item-id*="private-channels-"] [class*="layout-"] [class*="content-"]`,
                /** @param {Element} container */ (container)=>{
                    let lastSyncId = "";
                    function patch() {
                        let activityElm = container.querySelector('[class*="subText-"] [class*="activity-"]');
                        if (!activityElm) return;

                        let activities = utils.react.getProps(activityElm, i=>i?.activities)?.activities;
                        if (!activities?.length) return;

                        let spotify = activities.find(i=>i?.party?.id?.startsWith?.("spotify:"));
                        if (!spotify || !activityElm.textContent.includes("Spotify")) return;
                        if (lastSyncId == spotify?.sync_id) return;

                        lastSyncId = spotify.sync_id;
                        let text = `${spotify.state.split("; ").join(", ")} - ${spotify.details}`;

                        activityElm.setAttribute("acord--tooltip-content", text);

                        utils.ifExists(
                            container.querySelector('[class*="activityText-"] strong'),
                            (item)=>{
                                item.textContent = text;
                            }
                        );
                    }
                    patch();
                    return utils.interval(patch, 100);
                }
            )
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}