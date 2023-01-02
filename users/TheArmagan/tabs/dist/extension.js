(function(_,O,k,D,i,l,j,N){"use strict";function w(o){return o&&typeof o=="object"&&"default"in o?o:{default:o}}function z(o){if(o&&o.__esModule)return o;var f=Object.create(null);return o&&Object.keys(o).forEach(function(d){if(d!=="default"){var x=Object.getOwnPropertyDescriptor(o,d);Object.defineProperty(f,d,x.get?x:{enumerable:!0,get:function(){return o[d]}})}}),f.default=o,Object.freeze(f)}var b=w(_),A=w(O),q=z(j),C=w(N),R=()=>D.injectCSS(".tabs--container{box-sizing:border-box;display:flex;flex-direction:column;width:100%;-webkit-app-region:drag}.tabs--container>.tab-items,.tabs--container>.bookmarks{box-sizing:border-box;display:flex;align-items:center;width:100%;height:30px;min-height:30px;gap:4px;padding:0 4px;transition:.1s ease-in-out opacity;-webkit-app-region:drag}.tabs--container>.bookmarks{height:30px;min-height:30px;background-color:#0000001a;-webkit-app-region:no-drag}.tabs--container>.bookmarks.hidden{display:none}.tabs--container .new-tab{color:#fff;width:12px;height:12px;transform:rotate(45deg);cursor:pointer;margin-left:4px;-webkit-app-region:no-drag}.tabs--container .bookmark-item{-webkit-app-region:no-drag;background-color:#00000040;border-radius:4px;display:flex;align-items:center;justify-content:center;padding:6px;cursor:pointer;opacity:.5;transition:.1s ease-in-out opacity}.tabs--container .bookmark-item:hover,.tabs--container .bookmark-item.selected{opacity:1}.tabs--container .bookmark-item .info{display:flex;align-items:center;justify-content:flex-start;gap:4px}.tabs--container .bookmark-item .icon{border-radius:2px;width:8px;height:8px;background-size:cover;background-position:center;background-repeat:no-repeat}.tabs--container .bookmark-item .title{font-size:12px;color:#fff;text-overflow:ellipsis;word-break:keep-all;overflow:hidden;white-space:nowrap;max-width:150px}.tabs--container .tab-item{-webkit-app-region:no-drag;color:#fff;background-color:#00000040;box-sizing:border-box;width:fit-content;height:30px;display:flex;align-items:center;justify-content:space-between;padding:0 8px;gap:8px;border-top-left-radius:8px;border-top-right-radius:8px;cursor:pointer;opacity:.5}.tabs--container .tab-item .info{display:flex;align-items:center;justify-content:flex-start;gap:8px}.tabs--container .tab-item .icon{border-radius:4px;width:14px;height:14px;background-size:cover;background-position:center;background-repeat:no-repeat}.tabs--container .tab-item .title{font-size:14px;text-overflow:ellipsis;word-break:keep-all;overflow:hidden;white-space:nowrap;min-width:150px;max-width:250px}.tabs--container .tab-item .close{color:#ffffff80;width:12px;height:12px;cursor:pointer;transition:.1s ease-in-out opacity}.tabs--container .tab-item .close.hidden{opacity:0;pointer-events:none}.tabs--container .tab-item.disabled{opacity:.5;pointer-events:none}.tabs--container .tab-item:hover,.tabs--container .tab-item.selected{opacity:1}[class*=small-].tabs--rename-modal{height:40px!important;min-height:40px!important;min-width:400px!important}");function T(){return`
  <svg viewBox="0 0 12 12">
    <polygon fill="currentColor" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
  </svg>
  `}let I=C.default.findByProps("inputDefault","copyInput"),B=C.default.findByProps("input","editable","disabled","inputWrapper");function P(o={}){return q.createElement("div",{className:`${B?.input}`},q.createElement("div",{className:`${I?.inputWrapper}`},q.createElement("input",{type:"text",className:`${I?.inputDefault}`,...o})))}var U={load(){i.subscriptions.push(R()),i.subscriptions.push((()=>{const o=b.default.parseHTML(`
                <div class="tabs--container">
                    <div class="tab-items"></div>
                    <div class="bookmarks"></div>
                </div>
            `),f=o.querySelector(".tab-items"),d=o.querySelector(".bookmarks");A.default.ifExists(document.querySelector('div[class*="bg-"]'),a=>a.remove()),document.querySelector('[class*="appDevToolsWrapper-"]').insertAdjacentElement("beforebegin",o);function x(){d.classList[d.childElementCount===0?"add":"remove"]("hidden"),document.querySelectorAll(".bookmark-item").forEach(a=>a.classList.remove("selected")),A.default.ifExists(document.querySelector(`.bookmark-item[data-pathname="${location.pathname}"]`),a=>{a.classList.add("selected")})}let $=b.default.parseHTML(`
                <div class="new-tab">
                    ${T()}
                </div>
            `);$.onclick=()=>{v(i.i18n.format("LOADING"),"/channels/@me",null,!0)},f.appendChild($);function L(a,t,h){let p=Math.random().toString(36).slice(2),n=b.default.parseHTML(`
                    <div class="bookmark-item" data-id="${p}">
                        <span class="info">
                            <span class="icon" style="${h||"background-color: #5865f2;"}"></span>
                            <span class="title">${b.default.escapeHTML(a)}</span>
                        </span>
                    </div>
                `);n.setAttribute("data-pathname",t);async function e(){await new Promise(r=>setTimeout(r,1));let s=document.querySelector(`.tab-item[data-pathname="${t}"]`);if(s)s.select();else{let r=v(i.i18n.format("LOADING"),t,null);await new Promise(u=>setTimeout(u,1)),r.select(),await new Promise(u=>setTimeout(u,1)),E(r)}g()}function c(){n.remove(),g()}return n.select=e,n.close=c,n.onclick=async()=>{location.pathname!==n.getAttribute("data-pathname")&&e()},n.oncontextmenu=s=>{k.contextMenus.open(s,k.contextMenus.build.menu([{type:"text",label:i.i18n.format("DELETE"),action(){c()}},{type:"text",label:i.i18n.format("RENAME"),action(){let r=n.querySelector(".title"),u=r.textContent,S="";l.modals.actions.show(y=>l.React.createElement(l.modals.ModalRoot,{transitionState:y.transitionState,className:"tabs--rename-modal"},l.React.createElement(P,{onChange:m=>{S=m.target.value.trim()||u},placeholder:`${i.i18n.format("RENAME")}: ${r.textContent}`,onKeyUp:m=>{m.code==="Enter"&&(y.onClose(),r.textContent=S,g())}})))}}]))},d.appendChild(n),n}function v(a,t,h,p){let n=Math.random().toString(36).slice(2),e=b.default.parseHTML(`
                    <div class="tab-item" data-id="${n}">
                        <span class="info">
                            <span class="icon" style="${h||"background-color: #5865f2;"}"></span>
                            <span class="title">${b.default.escapeHTML(a)}</span>
                        </span>
                        <span class="close">
                            ${T()}
                        </span>
                    </div>
                `);e.setAttribute("data-pathname",t);async function c(){await new Promise(r=>setTimeout(r,1)),l.Router.transitionTo(e.getAttribute("data-pathname")),document.querySelectorAll(".selected").forEach(r=>r.classList.remove("selected")),e.classList.add("selected"),document.querySelectorAll(".close.hidden").forEach(r=>r.classList.remove("hidden")),document.querySelectorAll(".tab-item").length===1&&document.querySelector(".close").classList.add("hidden"),M()}function s(){e.remove(),document.querySelector(".tab-item").select(),document.querySelectorAll(".tab-item").length===1&&document.querySelector(".close").classList.add("hidden"),M()}return e.select=c,e.close=s,e.onclick=async()=>{location.pathname!==e.getAttribute("data-pathname")&&c()},e.oncontextmenu=r=>{let u=[...document.querySelectorAll(".tab-item")],S=u.findIndex(m=>m.getAttribute("data-id")===n),y=u.filter((m,H)=>H>S);k.contextMenus.open(r,k.contextMenus.build.menu([{type:"text",label:i.i18n.format("CLOSE"),disabled:!!e.querySelector(".close.hidden"),action(){s(),g()}},{type:"text",label:i.i18n.format("CLOSE_TABS_TO_RIGHT"),disabled:!y.length,action(){y.forEach(m=>m.close())}},{type:"separator"},{type:"text",label:i.i18n.format("ADD_TO_BOOKMARKS"),disabled:!!document.querySelector(`.bookmark-item[data-pathname="${e.getAttribute("data-pathname")}"]`),action(){L(e.querySelector(".title").textContent,e.getAttribute("data-pathname"),e.querySelector(".icon").getAttribute("style")),g()}}]))},e.querySelector(".close").onclick=()=>{document.querySelectorAll(".tab-item").length!==1&&s()},f.querySelector(".new-tab").insertAdjacentElement("beforebegin",e),p&&(E(e),c()),e}function M(){let a=l.UserStore.getCurrentUser().id;i.persist.store.userTabs[a]=[...document.querySelectorAll(".tab-item")].map(t=>({pathname:t.getAttribute("data-pathname"),title:t.querySelector(".title").textContent,icon:t.querySelector(".icon").getAttribute("style"),selected:t.classList.contains("selected")}))}function g(){let a=l.UserStore.getCurrentUser().id;i.persist.store.userBookmarks[a]=[...document.querySelectorAll(".bookmark-item")].map(t=>({pathname:t.getAttribute("data-pathname"),title:t.querySelector(".title").textContent,icon:t.querySelector(".icon").getAttribute("style")}))}async function E(a,t){await new Promise(e=>setTimeout(e,1));let h=window.location.pathname;t||a.setAttribute("data-pathname",h),a.querySelector(".title").textContent=document.title;let p=h.split("/"),n="";if(p[1]==="channels")if(p[2]==="@me"){let e=l.ChannelStore.getChannel(p[3]);if(e){if(e.isGroupDM()&&e.icon)n=`url('https://cdn.discordapp.com/channel-icons/${e.id}/${e.icon}.webp?size=32')`;else if(e.isDM()){let c=e.getRecipientId(),s=l.UserStore.getUser(c);s?.avatar?n=`url('https://cdn.discordapp.com/avatars/${c}/${s.avatar}.webp?size=32')`:n=`url('https://cdn.discordapp.com/embed/avatars/${s.discriminator%5}.png')`}}}else{let e=l.GuildStore.getGuild(p[2]);e?.icon&&(n=`url('https://cdn.discordapp.com/icons/${e.id}/${e.icon}.webp?size=32')`)}a.querySelector(".icon").setAttribute("style",n?`background-image: ${n};`:"background-color: #5865f2;")}const G=A.default.interval(()=>{let a=document.querySelector(".tab-item.selected");if(a)a.querySelector(".title").textContent!==document.title&&E(a);else{let t=[...document.querySelectorAll(".tab-item")].pop();t?t.select():v(i.i18n.format("LOADING"),location.pathname,null,!0)}x()},100);{let a=l.UserStore.getCurrentUser().id;(i.persist.ghost.userTabs?.[a]||[{title:i.i18n.format("LOADING"),pathname:"/channels/@me",selected:!0}]).forEach(t=>{v(t.title,t.pathname,t.icon,t.selected)}),(i.persist.ghost.userBookmarks?.[a]||[]).forEach(t=>{L(t.title,t.pathname,t.icon)})}return()=>{G(),o.remove()}})())},unload(){}};return U})(acord.dom,acord.utils,acord.ui,acord.patcher,acord.extension,acord.modules.common,acord.modules.common.React,acord.modules.webpack);
