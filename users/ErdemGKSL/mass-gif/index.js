import { dom } from "@acord";
import { SelectedChannelStore } from "@acord/modules/common";
import { findByProperties } from "@acord/modules/webpack";
import { react } from "@acord/utils";

const GifClasses = findByProperties("desiredItemWidth", "result", "results", "emptyHintFavorite");
const GifCategory = findByProperties("categoryFade", "categoryFadeBlurple", "categoryIcon", "formatSelectors");
const SendMessageStore = findByProperties("clearChannel", "crosspostMessage", "sendBotMessage", "sendMessage", "updateEditMessage");
const ref = { unpatchers: [] };


export default {
  load() {
    ref.unpatchers.push(
      dom.patch(`.${GifClasses.result}`, /** @param {Element} elm*/(elm) => {
        if (elm.querySelector(`.${GifCategory.categoryFade}, .${GifCategory.categoryFadeBlurple}`)) return;
        if (elm.classList.contains("acord--mass-dm")) return;
        elm.classList.add("acord--mass-dm");
        console.log(1)
        const rProps = react.getProps(elm);
        console.log(2)
        if (!rProps) return;
        console.log(3)
        const oClick = rProps?.children?.props?.onClick;
        console.log(4)
        if (!oClick) return;
        console.log(31)
        console.log(rProps);
        window.rProps = rProps;
        rProps.children.props.onClick = function (...args) {
          console.log(...args);
          return oClick.call(this, ...args);
        }
        return;
        let arr = rProps.children?.props?.children;
        if (!Array.isArray(arr)) arr = [rProps.children?.props?.children];
        let found = (arr.find(x => x?.props?.url))?.props?.url;
        if (found) anyImage = found;


        elm.oncontextmenu = () => {
          console.log(0)
          const imageElm = (elm.querySelector("img") || elm.querySelector("video"));
          console.log(1)
          let anyImage = imageElm?.getAttribute("src");
          console.log(2)
          if (anyImage) {
            console.log(3)

            if (!anyImage.startsWith("https:")) anyImage = "https:" + anyImage;
            console.log(4)

            if (anyImage.includes("tenor.co")) {
              if (rProps) {

              }
            }

            SendMessageStore.sendMessage(SelectedChannelStore.getChannelId(), { content: anyImage });

          }

        };
        return;
      })
    );
  },
  unload() {
    for (let i = 0; i < ref.unpatchers.length; i++) {
      ref.unpatchers[i]?.();
    }
    ref.unpatchers = [];
  }
}