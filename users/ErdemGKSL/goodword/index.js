import { common } from "@acord/modules";
import { persist } from "@acord/extension"

const noCharChar = '󠇰󠇰󠇰' || '\u200B';

let ref = { enabled: true };

export default {
  load() {
    ref.enabled = true;
    let sendMessage = common.MessageActions.sendMessage;

    common.MessageActions.sendMessage = function (...args) {
      const goodWords = persist.ghost?.settings?.words?.split("\n");
      if (!goodWords?.length) return sendMessage.call(this, ...args);
      const [channelId, message, _] = args;
      if (message.content) goodWords.forEach(word => {
        if (message.content.length < 2000) message.content = message.content.replaceAll(word, word.split("").join(noCharChar));
      });
      sendMessage.call(this, channelId, message, _);
    }
  },
  unload() {
    ref.enabled = false;
  },
  settings: {
    data: [
      {
        type: "textarea",
        name: "Good words",
        rows: 6,
        property: "words",
        description: "The words you want to say in chat without blocking by the bot.",
        placeholder: "shit\nbitch",
        value: ""
      }
    ]
  }
}