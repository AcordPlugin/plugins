(function(f,b,v,n){"use strict";function r(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var m=r(f),s=r(b);class h{constructor(){this.patches=[]}add(...t){this.patches.push(...t)}remove(t){let[i]=this.patches.splice(this.patches.indexOf(l=>l==t),1);i()}removeAll(){let t=this.patches.splice(0,this.patches.length);for(let i=0;i<t.length;i++)t[i]()}}var c=new h,x=()=>v.injectCSS("#app-lock{width:100vw;height:100vh;backdrop-filter:blur(16px) brightness(.5);z-index:1000000;position:absolute;top:0;left:0;display:flex;align-items:center;justify-content:center}#app-lock .al--container{display:flex;flex-direction:column;gap:8px;width:300px}#app-lock .al--container .input-container{display:flex;align-items:center;justify-content:center;background-color:#ffffff0d;border-radius:4px;color:#f5f5f5bf;width:100%;height:50px;box-shadow:0 0 4px #ffffff80,0 0 4px #ffffff80 inset}#app-lock .al--container .input-container .text{font-size:36px;font-weight:600;font-family:monospace}#app-lock .al--container .buttons{display:flex;flex-direction:column;gap:8px}#app-lock .al--container .buttons .line{display:flex;align-items:center;gap:8px}#app-lock .al--container .buttons .line .button{width:100%;text-align:center;height:50px;display:flex;align-items:center;justify-content:center;color:#fff;border-radius:4px;font-family:monospace;font-weight:500;cursor:pointer;font-size:24px;background-color:#ffffff03;box-shadow:0 0 4px #ffffff80,0 0 4px #ffffff80 inset}"),k={load(){c.add(x()),n.persist.ghost?.locked&&u(),c.add((()=>{function e(t){let i=d();i?(t.stopPropagation(),isNaN(t.key)?t.code=="Backspace"?o(a().slice(0,-1)):t.code=="Enter"&&p():o(a()+t.key)):!i&&t.ctrlKey&&t.code=="KeyL"&&(t.stopPropagation(),u())}return window.addEventListener("keydown",e),()=>{window.removeEventListener("keydown",e)}})())},unload(){c.removeAll()},settings:{data:[{type:"input",altType:"text",property:"passCode",maxLength:8,name:"Pass Code",size:"small",value:"1234"}],update(e,t){e=="passCode"&&`${t||""}`.length<1&&(n.persist.store.settings.passCode="0")}}};function a(){return document.querySelector("#app-lock .text")?.textContent||""}function o(e){s.default.ifExists(document.querySelector("#app-lock .text"),t=>{t.textContent=e.slice(0,8)})}function d(){return!!document.querySelector("#app-lock")}function u(){if(d())return;const e=document.querySelector("#app-mount");let t=m.default.parseHTML(`
        <div id="app-lock">
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
    `);t.querySelectorAll(".button.number").forEach(i=>{let l=Number(i.getAttribute("data-number"));i.onclick=()=>{o(a()+l)}}),s.default.ifExists(t.querySelector(".button.backspace"),i=>{i.onclick=()=>{o(a().slice(0,-1))}}),s.default.ifExists(t.querySelector(".button.submit"),i=>{i.onclick=()=>{p()}}),e.appendChild(t),n.persist.store.locked=!0}function p(){a()==n.persist.ghost?.settings?.passCode?y():o("")}function y(){n.persist.store.locked=!1,s.default.ifExists(document.querySelector("#app-lock"),e=>{e.remove()})}return k})(acord.dom,acord.utils,acord.patcher,acord.extension);
