import patchContainer from "./other/patchContainer.js"

export default {
    load() {
        
    },
    unload() {
        patchContainer.removeAll();
    },
}