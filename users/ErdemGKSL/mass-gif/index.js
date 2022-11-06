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
        setTimeout(() => {
          if (elm.querySelector(`.${GifCategory.categoryFade}, .${GifCategory.categoryFadeBlurple}`)) return;
          if (elm.classList.contains("acord--mass-dm")) return;
          elm.classList.add("acord--mass-dm");
          const imageElm = (elm.querySelector("img") || elm.querySelector("video"));
          let anyImage = imageElm?.getAttribute("src");
          const rProps = react.getProps(elm);
          if (anyImage) {
            
            if (!anyImage.startsWith("https:")) anyImage = "https:" + anyImage;
            
            if (anyImage.includes("tenor.co")) {
              if (rProps) {
                let arr = rProps.children?.props?.children;
                if (!Array.isArray(arr)) arr = [rProps.children?.props?.children];
                let found = (arr.find(x => x?.props?.url))?.props?.url;
                if (found) anyImage = found;
              }
            }
            
            elm.oncontextmenu = () => {
              SendMessageStore.sendMessage(SelectedChannelStore.getChannelId(), { content: anyImage });
            };

          }
        }, 250);
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