
import { escapeHTML } from "@acord/dom";
import { persist } from "@acord/extension"
import { FluxDispatcher } from "@acord/modules/common";
import { transitionTo } from "@acord/modules/common/Router";
import { getUser } from "@acord/modules/common/UserStore";
import { notifications } from "@acord/ui";
let wordArr = [];
let messageIds = new Set();
let cInterval;
let onMessage = ({ message }) => {
  const word = wordArr.find(w => message.content.toLowerCase().includes(w.toLowerCase()))
  if (word) {
    if (messageIds.has(message.nonce || message.id)) return;
    messageIds.add(message.nonce || message.id);
    const wordIndex = message.content.indexOf(word);
    const endIndex = wordIndex + word.length + 15;

    const showContent = ((wordIndex -15 > 0 ? "…" : "")
      + escapeHTML(message.content.slice(Math.max(0,wordIndex - 15), endIndex))
      + (message.content.length > endIndex ? "…" : "")).replaceAll(word, `<strong>${word}</strong>`);

    notifications.show(`<strong>${escapeHTML(getUser(message.author.id).tag)}:</strong> ${showContent}`, {
      onClick: () => {
        transitionTo(`/channels/${message.guild_id || "@me"}/${message.channel_id}/${message.id}`);
      }
    });
  }
}
export default {
  load() {
    FluxDispatcher.subscribe("MESSAGE_CREATE", onMessage);
    wordArr = persist.ghost.settings?.words.split(", ");

    cInterval = setInterval(() => {
      messageIds.clear();
    }, 1000 * 60 * 5);
  },
  unload() {
    FluxDispatcher.unsubscribe("MESSAGE_CREATE", onMessage);
    cInterval ? clearInterval(cInterval) : null;
  },
  settings: {
    data: [
      {
        type: "textarea",
        name: "Notify words",
        rows: 6,
        property: "words",
        description: "The words that you want to be get notified when a message contains it.",
        placeholder: "hi, how are you?",
        value: ""
      }
    ],
    update(key, value) {
      if (key == "words") formatWordSettings(value);
    }
  }
}

const formatWordSettings = _.debounce((function (value) {
  persist.store.settings.words = (persist.ghost.settings?.words || value)?.split(/ *(\n|,) */g).join(", ");
  wordArr = persist.ghost.settings?.words.split(", ")
}), 5000);