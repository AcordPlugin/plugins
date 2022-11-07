import { persist } from "@acord/extension"
import { webpack } from "@acord/modules";
import { FluxDispatcher, UserStore } from "@acord/modules/common";
const transformatorRegex = /([GAD])\: ?["]((?:(?=(\\?))\3.)*?)["] ?\=> ?["]((?:(?=(\\?))\5.)*?)["] ?(?:\((\d+)\))?/gi;
const SendMessageStore = webpack.findByProps("sendMessage", "truncateMessages", "patchMessageAttachments");
export const ref = { responses: [] };

function handleMessageCreate({ message: msg, channelId }) {

  if (msg.author.id == UserStore.getCurrentUser().id) return;

  const response = ref.responses.find(x => (x.type == "A" || (x.type == "G" && msg.guild_id) || (x.type == "D" && !msg.guild_id)) && x.matcher.test(msg.content));

  if (response.rateLimit > Date.now()) return;
  response.rateLimit = Date.now() + response.debounceLimit;
  SendMessageStore.sendMessage(channelId, { content: response.response });

}

function loadResponses(val) {
  /** @type {string} */
  const responseStr = val || persist.ghost?.settings?.responses;
  if (responseStr) ref.responses = [...responseStr.matchAll(transformatorRegex)].map(
    (match, type, finderRegex, _, responseStr, __, debounce) => ({
      type,
      matcher: new RegExp(finderRegex),
      debounceLimit: Number(debounce) || 1000,
      get response() { return eval(`\`${responseStr.replaceAll("\\\"", "\"").replaceAll("`", "\\`")}\``) },
      rateLimit: 0,
    })
  )
}

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
        rows: 9,
        property: "responses",
        description: "Format is: [type]: \"Trigger as regex\" => \"Response as string\" (rate limit as milliseconds), type stands for guild(G), dm(D) or all(A).",
        placeholder: "G: \"acord\" => \"wow\"\nD: \"foo\" => \"bar\"\nA: \"Hello\" => \"world.\" (5000)",
        value: ""
      }
    ],
    update(key, value) {
      switch (key) {
        case "responses": {
          loadResponses(value);
          break;
        }
      }
    }
  }
}