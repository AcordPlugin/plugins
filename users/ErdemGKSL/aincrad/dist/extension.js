(function(o,n,a,c,d,u){"use strict";var l=()=>d.injectCSS(".aincrad--patched [class*=embed-]{background-size:cover!important;background-repeat:no-repeat!important;background-position:center!important;background-color:#0003!important}.aincrad--patched [class*=embedAuthorName-]{position:relative;display:inline-block;color:#fff;text-transform:uppercase;animation:flip 2s infinite;animation-delay:calc(.2s * var(--i))}@keyframes flip{0%,80%{transform:rotateY(360deg)}}");const s="574606689920352256",p=n.webpack.findByProperties("close","getErrorMessageForCommandResult","show");let r=[];var h={load(){r.push(o.dom.patch('[id*="message-accessories-"]',e=>{let i=u.react.getProps(e,b=>b?.message?.author?.id)?.message;!i||i.author.id===s&&(e.classList.contains("aincrad--patched")||e.classList.add("aincrad--patched"))}));const t=({message:e})=>{e?.author?.id!==s||e.embeds[0]?.title!=="Seviye atlad\u0131n!"||e?.mentions?.[0]?.id!==c.getCurrentUser().id||p.show({title:e.embeds[0]?.author?.name||"Tebrikler",body:e.embeds[0]?.footer?.text||"Seviye Atlad\u0131n!"})};a.FluxDispatcher.subscribe("MESSAGE_UPDATE",t),r.push(()=>a.FluxDispatcher.unsubscribe("MESSAGE_UPDATE",t)),a.FluxDispatcher.subscribe("MESSAGE_CREATE",t),r.push(()=>a.FluxDispatcher.unsubscribe("MESSAGE_CREATE",t)),r.push(l())},unload(){r.forEach(t=>t()),r.length=0}};return h})(acord,acord.modules,acord.modules.common,acord.modules.common.UserStore,acord.patcher,acord.utils);
