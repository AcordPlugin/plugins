import patchContainer from "./other/patchContainer.js";
import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";

export default {
  load() {
    let buttonClasses = webpack.findByProps("winButton", "withFrame");
    let currentState = false;

    patchContainer.add(
      (() => {
        const elm = document.querySelector('[class*="titleBar-"]');

        let button = dom.parseHTML(`
            <div class="${buttonClasses.winButton} ${buttonClasses.winButtonMinMax}" style="display: flex; align-items: center; justify-content: center;"></div>
        `);

        function update() {
          let elm = currentState
            ? dom.parseHTML(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                    <path fill="currentColor" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3z"/>
                </svg>
            `)
            : dom.parseHTML(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                    <path fill="currentColor" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3h12zM9 5v6.606L7.404 14h9.192L15 11.606V5H9z"/>
                </svg>
            `);
          button.replaceChildren(elm);
        }
        update();

        button.onclick = () => {
          currentState = !currentState;
          DiscordNative.window.setAlwaysOnTop(0, currentState);
          update();
        };

        elm.appendChild(button);

        return () => {
          elm.removeChild(button);
        };
      })()
    );
  },
  unload() {
    patchContainer.removeAll();
    DiscordNative.window.setAlwaysOnTop(0, false);
  },
};
