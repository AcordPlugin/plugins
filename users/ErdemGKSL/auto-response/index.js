import { utils } from "@acord";
import { persist } from "@acord/extension"
import { webpack } from "@acord/modules";
import { FluxDispatcher, UserStore } from "@acord/modules/common";
const transformatorRegex = /([GAD])\: ?["]((?:(?=(\\?))\3.)*?)["](i)? ?\=> ?["]((?:(?=(\\?))\6.)*?)["] ?(?:\(([^)]+)\))?/gi;
const SendMessageStore = webpack.findByProps("sendMessage", "truncateMessages", "patchMessageAttachments");
const ref = { responses: [] };

function handleMessageCreate({ message: msg, channelId } = {}) {
  
  if (!msg?.author) return;
  if (msg.author.id == UserStore.getCurrentUser().id) return;

  const response = ref.responses.find(x => (x.type == "A" || (x.type == "G" && msg.guild_id) || (x.type == "D" && !msg.guild_id)) && x.matcher.test(msg.content));
  if (!response) return;
  if (response.rateLimit > Date.now()) return;
  response.rateLimit = Date.now() + response.debounceLimit;
  setTimeout(()=>{
    try {
      let c = response.getResponse(response.matcher.exec(msg.content) || []);
      SendMessageStore.sendMessage(channelId, { content: c, tts: false, invalidEmojis: [], validNonShortcutEmojis: [] }, undefined, reply ? { allowedMentions: undefined, messageReference: { guild_id: msg.guild_id, channel_id: msg.channel_id, message_id: msg.id } } : {});
    } catch (e) {
      utils.logger.error(e);
    };
  }, response.delay)
}

function loadResponses(val) {
  /** @type {string} */
  const responseStr = val || persist.ghost?.settings?.responses;
  if (responseStr) ref.responses = [...(responseStr.matchAll(transformatorRegex) || [])].map(
    (...arr) => {
      const [match, type, finderRegex, _, ignoreCase, responseStr, __, opts] = arr?.[0] || arr || [];
      if (!type || !finderRegex || !responseStr?.trim()) return null;
      let [debounce, delay, reply] = opts?.split?.(",") || [];
      reply = reply == "true" ? true : false;
      return ({
        type: type.toLocaleUpperCase(),
        matcher: new RegExp(finderRegex, ignoreCase || ""),
        debounceLimit: Number(debounce) || 1000,
        delay: Number(delay) || 0,
        getResponse($) { return eval(`\`${responseStr.replaceAll("\\\"", "\"")}\``) },
        rateLimit: 0,
        reply
      })
    }
  ).filter(x => x);
}

let debouncedLoadResponses = _.debounce(loadResponses, 3000);

export default {
  load() {
    try {
      loadResponses();
      FluxDispatcher.subscribe("MESSAGE_CREATE", handleMessageCreate);
    } catch (e) {
      console.error("[AR Error]",e)
    }
  },
  unload() {
    ref.responses = [];
    FluxDispatcher.unsubscribe("MESSAGE_CREATE", handleMessageCreate);
  },
  settings: {
    data: [
      {
        type: "textarea",
        name: "Auto Responses",
        rows: 6,
        property: "responses",
        description: "Format is: [type]: \"Trigger as regex\" => \"Response as string\" (rate limit as milliseconds), type stands for guild(G), dm(D) or all(A).",
        placeholder: "G: \"acord\" => \"wow\"\nD: \"foo\" => \"bar\"\nA: \"Hello\" => \"world.\" (5000)",
        value: ""
      }
    ],
    update(key, value) {
      switch (key) {
        case "responses": {
          debouncedLoadResponses(value);
          break;
        }
      }
    }
  }
}