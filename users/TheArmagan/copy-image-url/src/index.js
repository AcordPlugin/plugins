import { i18n } from "@acord/extension";
import { contextMenus } from "@acord/ui";
import utils from "@acord/utils";

let patches = [];

export default {
  load() {
    patches.push(
      contextMenus.patch(
        "user-profile-actions",
        (comp, props) => {
          let items = [];
          utils.ifExists(
            document.querySelector(`[class*="profileColors-"] [class*="avatarStack-"] img`),
            (elm) => {
              items.push(
                contextMenus.build.item({
                  label: i18n.format("COPY_AVATAR_URL"),
                  action() {
                    utils.copyText(`${elm.src.split("?")[0]}?size=4096`);
                  }
                })
              );
            }
          );
          
          utils.ifExists(
            document.querySelector(`[class*="profileColors-"] [class*="profileBannerPremium-"]`),
            (elm) => {
              items.push(
                contextMenus.build.item({
                  label: i18n.format("COPY_BANNER_URL"),
                  action() {
                    utils.copyText(`${elm.style.backgroundImage.slice(5, -2).split("?")[0]}?size=4096`);
                  }
                })
              );
            }
          );

          if (items.length) items.unshift(contextMenus.build.item({
            type: "separator"
          }));

          comp.props.children.push(...items);
        }
      )
    )
  },
  unload() {
    patches.forEach(f => f());
  }
}