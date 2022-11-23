import patchContainer from "./other/patchContainer.js"
import patcher from "@acord/patcher";
import { persist } from "@acord/extension";

let lastCSSPatch;
function loadCustomCSS(css) {
    if (lastCSSPatch) lastCSSPatch();
    if (!css?.trim?.()) return;
    cssPatches = patcher.injectCSS(css);
}

const debouncedLoad = _.debouncedLoad(lastCSSPatch, 3500);

export default {
    load() {
        loadCustomCSS(persist.ghost.settings.css);
    },
    unload() {
        patchContainer.removeAll();
        if (lastCSSPatch) lastCSSPatch();
    },
    settings: {
        data: [
            {
                "type": "textarea",
                "property": "css",
                "value": "",
                "name": "Custom CSS",
                "rows": 9
            }
        ],
        update(key, value) {
            switch (key) {
                case "css": {
                    debouncedLoad(value);
                    break;
                }
            }
        }
    }
}