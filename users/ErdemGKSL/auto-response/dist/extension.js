(function(_acord,extension,modules,common){"use strict";const transformatorRegex=/([GAD])\: ?["]((?:(?=(\\?))\3.)*?)["](i)? ?\=> ?["]((?:(?=(\\?))\6.)*?)["] ?(?:\(([^)]+)\))?/gi,SendMessageStore=modules.webpack.findByProps("sendMessage","truncateMessages","patchMessageAttachments"),ref={responses:[]};function handleMessageCreate({message:e,channelId:t}={}){if(!e?.author||e.author.id==common.UserStore.getCurrentUser().id)return;const r=ref.responses.find(s=>(s.type=="A"||s.type=="G"&&e.guild_id||s.type=="D"&&!e.guild_id)&&s.matcher.test(e.content));!r||r.rateLimit>Date.now()||(r.rateLimit=Date.now()+r.debounceLimit,setTimeout(()=>{try{let s=r.getResponse(r.matcher.exec(e.content)||[]);SendMessageStore.sendMessage(t,{content:s,tts:!1,invalidEmojis:[],validNonShortcutEmojis:[]},void 0,reply?{allowedMentions:void 0,messageReference:{guild_id:e.guild_id,channel_id:e.channel_id,message_id:e.id}}:{})}catch(s){_acord.utils.logger.error(s)}},r.delay))}function loadResponses(val){const responseStr=val||extension.persist.ghost?.settings?.responses;responseStr&&(ref.responses=[...responseStr.matchAll(transformatorRegex)||[]].map((...arr)=>{const[match,type,finderRegex,_,ignoreCase,responseStr,__,opts]=arr?.[0]||arr||[];if(!type||!finderRegex||!responseStr?.trim())return null;let[debounce,delay,reply]=opts?.split?.(",")||[];return reply=reply=="true",{type:type.toLocaleUpperCase(),matcher:new RegExp(finderRegex,ignoreCase||""),debounceLimit:Number(debounce)||1e3,delay:Number(delay)||0,getResponse($){return eval(`\`${responseStr.replaceAll('\\"','"')}\``)},rateLimit:0,reply}}).filter(e=>e))}let debouncedLoadResponses=_.debounce(loadResponses,3e3);var index={load(){try{loadResponses(),common.FluxDispatcher.subscribe("MESSAGE_CREATE",handleMessageCreate)}catch(e){console.error("[AR Error]",e)}},unload(){ref.responses=[],common.FluxDispatcher.unsubscribe("MESSAGE_CREATE",handleMessageCreate)},settings:{data:[{type:"textarea",name:"Auto Responses",rows:6,property:"responses",description:'Format is: [type]: "Trigger as regex" => "Response as string" (rate limit as milliseconds, delay, true if want the reply), type stands for guild(G), dm(D) or all(A).',placeholder:`G: "acord" => "wow"
D: "foo" => "bar"
A: "Hello" => "world." (5000)`,value:""}],update(e,t){switch(e){case"responses":{debouncedLoadResponses(t);break}}}}};return index})(acord,acord.extension,acord.modules,acord.modules.common);
