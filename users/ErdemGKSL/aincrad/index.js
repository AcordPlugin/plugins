import { dom } from "@acord";
import { webpack } from "@acord/modules";
import { FluxDispatcher } from "@acord/modules/common";
import { getCurrentUser } from "@acord/modules/common/UserStore";
import injectCSS from "./styles.scss";
import { react } from "@acord/utils";

const botId = "574606689920352256";

// const messageClasses = webpack.findByProperties("messageListItem", "message", "highlightContainer", "burstHighlightGradient");
const warningStore = webpack.findByProperties("close", "getErrorMessageForCommandResult","show");
let patchContainer = [];

export default {
  load() {

    patchContainer.push(
      dom.patch(`[id*="message-accessories-"]`, (elm) => {
        let message = react.getProps(elm, (a) => a?.message?.author?.id)?.message;
        if (!message) return;
        if (message.author.id !== botId) return;
        if (elm.classList.contains("aincrad--patched")) return;
        elm.classList.add("aincrad--patched");
      })
    );
    
    const f = ({ message }) => {
      if (message?.author?.id !== botId) return;
      if (message.embeds[0]?.title !== "Seviye atladın!") return;
      const userId = message?.mentions?.[0]?.id;
      if (userId !== getCurrentUser().id) return;
      warningStore.show({ title: message.embeds[0]?.author?.name || "Tebrikler", body: message.embeds[0]?.footer?.text || "Seviye Atladın!" });
    }

    FluxDispatcher.subscribe("MESSAGE_UPDATE", f);
    patchContainer.push(() => FluxDispatcher.unsubscribe("MESSAGE_UPDATE", f));

    FluxDispatcher.subscribe("MESSAGE_CREATE", f);
    patchContainer.push(() => FluxDispatcher.unsubscribe("MESSAGE_CREATE", f));

    patchContainer.push(injectCSS());
  },
  unload() {
    patchContainer.forEach((p) => p());
    patchContainer.length = 0;
  }
}