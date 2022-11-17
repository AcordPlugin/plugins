(function(h,m,o,y,n){"use strict";function u(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var k=u(h),a=u(m);class x{constructor(){this.patches=[]}add(...t){this.patches.push(...t)}remove(t){let[i]=this.patches.splice(this.patches.indexOf(p=>p==t),1);i()}removeAll(){let t=this.patches.splice(0,this.patches.length);for(let i=0;i<t.length;i++)t[i]()}}var d=new x,g=()=>y.injectCSS("#app-lock{width:100vw;height:100vh;backdrop-filter:blur(32px) brightness(.5);z-index:1000000;position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center;transition:opacity .1s ease-in-out}#app-lock.hidden{opacity:0}#app-lock .al--container{display:flex;flex-direction:column;gap:8px;width:300px}#app-lock .al--container .input-container{display:flex;align-items:center;justify-content:center;background-color:#ffffff0d;border-radius:4px;color:#f5f5f5bf;width:100%;height:50px;box-shadow:0 0 4px #ffffff80,0 0 4px #ffffff80 inset;transition:opacity .1s ease-in-out;opacity:.5}#app-lock .al--container .input-container:hover{opacity:.85}#app-lock .al--container .input-container:active,#app-lock .al--container .input-container.active{opacity:1}#app-lock .al--container .input-container .text{font-size:36px;font-weight:600;font-family:monospace}#app-lock .al--container .buttons{display:flex;flex-direction:column;gap:8px}#app-lock .al--container .buttons .line{display:flex;align-items:center;gap:8px}#app-lock .al--container .buttons .line .button{width:100%;text-align:center;height:50px;display:flex;align-items:center;justify-content:center;color:#fff;border-radius:4px;font-family:monospace;font-weight:500;cursor:pointer;font-size:24px;background-color:#ffffff06;box-shadow:0 0 4px #ffffffbf,0 0 4px #ffffffbf inset;opacity:.5;transition:opacity .1s ease-in-out}#app-lock .al--container .buttons .line .button:hover{opacity:.85}#app-lock .al--container .buttons .line .button:active{opacity:1}");let l="",s="";var w={load(){d.add(g()),(n.persist.ghost?.locked||n.persist.ghost?.settings?.autoLock)&&b(),d.add((()=>{function e(t){let i=f();i?(t.stopPropagation(),isNaN(t.key)?t.code=="Backspace"?r(c().slice(0,-1)):t.code=="Enter"&&v():r(c()+t.key)):!i&&t.ctrlKey&&t.code=="KeyL"&&(t.stopPropagation(),b())}return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}})())},unload(){d.removeAll(),l="",s=""},settings:{data:[{type:"input",altType:"text",property:"passCode",maxLength:8,name:"Passcode",size:"small",value:"1234",description:"Password for your Discord."},{type:"checkbox",name:"Auto Lock",description:"Automatically lock the app when starting up the Discord.",property:"autoLock",value:!1},{type:"checkbox",name:"Auto Disconnect",description:"Automatically disconnect from voice channel and reconnect on unlock.",property:"autoDisconnect",value:!1}],update(e,t){e=="passCode"&&(`${t||""}`.length<1||isNaN(t))&&(n.persist.store.settings.passCode="0")}}};function c(){return document.querySelector("#app-lock .text")?.textContent||""}function r(e){e=e.slice(0,8).trim(),a.default.ifExists(document.querySelector("#app-lock .text"),t=>{t.textContent=e}),a.default.ifExists(document.querySelector("#app-lock .input-container"),t=>{t.classList[e?"add":"remove"]("active")})}function f(){return!!document.querySelector("#app-lock")}function b(){if(f())return;const e=document.querySelector("#app-mount");let t=k.default.parseHTML(`
        <div id="app-lock" class="hidden">
            <div class="al--container">
                <div class="input-container">
                    <div class="text"></div>
                </div>
                <div class="buttons">
                    <div class="line">
                        <div class="button number" data-number="1">1</div>
                        <div class="button number" data-number="2">2</div>
                        <div class="button number" data-number="3">3</div>
                    </div>
                    <div class="line">
                        <div class="button number" data-number="4">4</div>
                        <div class="button number" data-number="5">5</div>
                        <div class="button number" data-number="6">6</div>
                    </div>
                    <div class="line">
                        <div class="button number" data-number="7">7</div>
                        <div class="button number" data-number="8">8</div>
                        <div class="button number" data-number="9">9</div>
                    </div>
                    <div class="line">
                        <div class="button backspace">&lt;</div>
                        <div class="button number" data-number="0">0</div>
                        <div class="button submit">OK</div>
                    </div>
                </div>
            </div>
        </div>
    `);t.querySelectorAll(".button.number").forEach(i=>{let p=Number(i.getAttribute("data-number"));i.onclick=()=>{r(c()+p)}}),a.default.ifExists(t.querySelector(".button.backspace"),i=>{i.onclick=()=>{r(c().slice(0,-1))}}),a.default.ifExists(t.querySelector(".button.submit"),i=>{i.onclick=()=>{v()}}),e.appendChild(t),requestAnimationFrame(()=>{t.classList.remove("hidden")}),n.persist.store.locked=!0,l=window.location.pathname,o.Router.transitionTo("/"),s=o.VoiceStateStore.getVoiceStateForUser(o.UserStore.getCurrentUser().id)?.channelId,n.persist.ghost?.settings?.autoDisconnect&&o.VoiceActions.disconnect()}function v(){c()==n.persist.ghost?.settings?.passCode?S():r("")}function S(){n.persist.store.locked=!1,a.default.ifExists(document.querySelector("#app-lock"),e=>{requestAnimationFrame(()=>{e.classList.add("hidden"),setTimeout(()=>{e.remove()},150)})}),o.Router.transitionTo(l),l="",s&&n.persist.ghost?.settings?.autoDisconnect&&o.VoiceActions.selectVoiceChannel(s),s=""}return w})(acord.dom,acord.utils,acord.modules.common,acord.patcher,acord.extension);
