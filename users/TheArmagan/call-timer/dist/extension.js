(function(u,f,h,p,T,m){"use strict";function o(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var v=o(u),s=o(f),E=o(h),S=o(T);class C{constructor(){this.patches=[]}add(...r){this.patches.push(...r)}remove(r){let[a]=this.patches.splice(this.patches.indexOf(e=>e==r),1);a()}removeAll(){let r=this.patches.splice(0,this.patches.length);for(let a=0;a<r.length;a++)r[a]()}}var c=new C;const{FluxDispatcher:l}=S.default;function N(t){isNaN(parseInt(t))&&(t=0),t=Math.floor(t);let r=Math.floor(t/60/60);return`${r>0?`${r.toString().padStart(2,"0")}:`:""}${Math.floor(t/60%60).toString().padStart(2,"0")}:${(t%60).toString().padStart(2,"0")}`}const i=acord.modules.webpack.findByProps("channel","voiceUsers","inner","beta"),d=acord.modules.webpack.find(t=>t?.subtext&&Object.keys(t).length==1);function _(){let t={startTime:Date.now(),render:!0};c.add((()=>{function a(e){e?.state==="RTC_CONNECTED"&&e?.context==="default"?(t.startTime=Date.now(),t.render=!0):e?.state=="RTC_DISCONNECTED"&&e?.context==="default"&&(t.startTime=Date.now(),t.render=!1)}return l.subscribe("RTC_CONNECTION_STATE",a),()=>l.unsubscribe("RTC_CONNECTION_STATE",a)})());function r(a){let e=s.default.parents(a,'[class*="inner-"] > div')?.[0];if(!e||e.querySelector("ct--patched"))return;e.classList.add("ct--patched");let n=s.default.parseHTML(`<div class="${d.subtext} ct--container ct--patched"></div>`);t.startTime=Date.now(),t.render=!0,n.render=()=>{if(!t.render){n.innerHTML="";return}n.innerHTML=p.i18n.format("TIME_ELAPSED",N((Date.now()-t.startTime)/1e3))};let y=E.default.interval(n.render,1e3);n.render(),n.unmount=()=>{y()},e.appendChild(n)}document.querySelectorAll(`.${i.channel}.${d.subtext}`).forEach(a=>{r(a)}),c.add(v.default.on("domMutation",a=>{a.addedNodes.forEach(e=>{e.nodeType!=Node.TEXT_NODE&&e.querySelectorAll(`.${i.channel}.${d.subtext}`).forEach(n=>{r(n)})}),a.removedNodes.forEach(e=>{e.nodeType!=Node.TEXT_NODE&&e.querySelectorAll(".ct--patched").forEach(n=>{n?.unmount?.()})})}))}var b=()=>m.injectCSS(".ct--container{margin-top:8px;font-weight:400;font-size:12px}");function x(){c.add(b())}var D={load(){x(),_()},unload(){c.removeAll()}};return D})(acord.events,acord.dom,acord.utils,acord.extension,acord.modules.common,acord.patcher);
