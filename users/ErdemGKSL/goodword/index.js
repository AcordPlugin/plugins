import { common } from "@acord/modules";
import { persist } from "@acord/extension"
import { patcher } from "@acord";

const noCharChar = '󠇰' || '\u200B';

let unloader;
export default {
  load() {
    // patcher is spitroast
    unloader = patcher.instead('sendMessage', common.MessageActions, (args, original) => {

      const [channelId, message, _] = args;

      const words = persist.ghost?.settings?.words?.split(`\n`);

      if (!words?.length) return original(...args);

      let content = message.content.split(' ');

      if (message.content && message.content.length < 1000) {
        words.forEach(word => {
          if (message.content.length < 2000) {
            content = content.map(part => part.toLowerCase() === word.toLowerCase() ? part.split('').join(noCharChar) : part);
          }
        });
      }

      message.content = content.join(' ');
      args[1] = message;

      return original(...args);
    });
  },
  unload() {
    unloader?.();
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