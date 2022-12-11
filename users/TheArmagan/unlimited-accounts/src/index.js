import patchContainer from "./other/patchContainer.js"
import webpack from "@acord/modules/webpack";

export default {
    load() {
        patchContainer.add(
            (() => {
                const webpackModule = webpack.findByStringValues("switch-accounts-modal", "multiaccount_cta_tooltip_seen");
                const propToModify = Object.entries(webpackModule).find(i => typeof i[1] == "number")[0];

                Object.defineProperty(webpackModule, propToModify, { value: Infinity, configurable: true });

                return () => {
                    Object.defineProperty(webpackModule, propToModify, { value: 5, configurable: true });
                }
            })()
        );
    },
    unload() {
        patchContainer.removeAll();
    }
}