(function(n,c,d){"use strict";function o(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var a=o(n),i={load(){c.subscriptions.push(a.default.interval(()=>{document.querySelectorAll('[id*="message-content-"]').forEach(e=>{e.classList.contains("dctd--patched")||(e.classList.add("dctd--patched"),e.ondblclick=()=>{let s=a.default.react.getProps(e,r=>r?.message)?.message;!s||d.MessageActions.startEditMessage(s.channel_id,s.id,s.content)})})},100))},unload(){}};return i})(acord.utils,acord.extension,acord.modules.common);
