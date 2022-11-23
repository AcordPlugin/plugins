import { common } from "@acord/modules";
import { persist } from "@acord/extension"

const noCharChar = '󠇰' || '󠇰󠇰󠇰' || '\u200B';

let ref = { enabled: true };

export default {
  load() {
    ref.enabled = true;
    let sendMessage = common.MessageActions.sendMessage;
    common.MessageActions.sendMessage = function (...args) {
      if (!ref.enabled) return sendMessage.call(this, ...args);
      const goodWords = persist.ghost?.settings?.words?.split("\n");
      if (!goodWords?.length) return sendMessage.call(this, ...args);
      const [channelId, message, _] = args;
      let contentArr = message.content.split(" ");
      if (message.content) goodWords.forEach(word => {
        if (message.content.length < 2000) {
          contentArr = contentArr.map(content => {
            if (content.toLowerCase() == (word.toLowerCase())) {
              return content.split("").join(noCharChar);
            }
            return content;
          });
          message.content = contentArr.join(" ");
        }
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