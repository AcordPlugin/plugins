(function(D,j,v,z,r,d,B,R){"use strict";function E(o){return o&&typeof o=="object"&&"default"in o?o:{default:o}}function P(o){if(o&&o.__esModule)return o;var u=Object.create(null);return o&&Object.keys(o).forEach(function(h){if(h!=="default"){var f=Object.getOwnPropertyDescriptor(o,h);Object.defineProperty(u,h,f.get?f:{enumerable:!0,get:function(){return o[h]}})}}),u.default=o,Object.freeze(u)}var x=E(D),q=E(j),T=P(B),L=E(R),U=()=>z.injectCSS(".tabs--container{box-sizing:border-box;display:flex;flex-direction:column;width:100vw;-webkit-app-region:drag}.tabs--container ::-webkit-scrollbar{width:0px;height:0px}.tabs--container>.tab-items,.tabs--container>.bookmarks{box-sizing:border-box;display:flex;align-items:center;width:100vw;max-width:100vw;--item-h: 30px;height:var(--item-h);min-height:var(--item-h);gap:4px;padding:8px 4px 0;transition:.1s ease-in-out opacity;-webkit-app-region:drag;overflow-x:auto;overflow-y:hidden}.tabs--container>.bookmarks{height:var(--item-h);min-height:var(--item-h);background-color:#0000001a;-webkit-app-region:no-drag;padding-top:4px;padding-bottom:4px}.tabs--container>.bookmarks.hidden{display:none}.tabs--container .new-tab{color:#fff;width:12px;height:12px;min-width:12px;min-height:12px;transform:rotate(45deg);cursor:pointer;margin:0 4px;-webkit-app-region:no-drag}.tabs--container .bookmark-item{box-sizing:border-box;-webkit-app-region:no-drag;background-color:#00000040;border-radius:4px;display:flex;align-items:center;justify-content:center;padding:6px;cursor:pointer;opacity:.5;transition:.1s ease-in-out opacity;position:relative}.tabs--container .bookmark-item:hover,.tabs--container .bookmark-item.selected{opacity:1}.tabs--container .bookmark-item .unread{position:absolute;right:-3px;top:-3px;border-radius:50%;background-color:#ed4245;width:12px;height:12px;font-size:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:400}.tabs--container .bookmark-item .unread.plus{font-size:8px}.tabs--container .bookmark-item .unread.hidden{display:none}.tabs--container .bookmark-item .info{display:flex;align-items:center;justify-content:flex-start;gap:4px}.tabs--container .bookmark-item .icon{border-radius:2px;width:8px;height:8px;background-size:cover;background-position:center;background-repeat:no-repeat}.tabs--container .bookmark-item .title{font-size:12px;color:#fff;text-overflow:ellipsis;word-break:keep-all;overflow:hidden;white-space:nowrap;max-width:150px}.tabs--container .tab-item{-webkit-app-region:no-drag;color:#fff;background-color:#00000040;box-sizing:border-box;width:fit-content;height:var(--item-h);display:flex;align-items:center;justify-content:space-between;padding:0 8px;gap:8px;border-top-left-radius:8px;border-top-right-radius:8px;cursor:pointer;opacity:.5;position:relative}.tabs--container .tab-item .unread{position:absolute;right:-4px;top:-4px;border-radius:50%;background-color:#ed4245;width:14px;height:14px;font-size:10px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:400}.tabs--container .tab-item .unread.plus{font-size:8px}.tabs--container .tab-item .unread.hidden{display:none}.tabs--container .tab-item .info{display:flex;align-items:center;justify-content:flex-start;flex:2;gap:8px}.tabs--container .tab-item .icon{border-radius:4px;width:14px;height:14px;background-size:cover;background-position:center;background-repeat:no-repeat}.tabs--container .tab-item .title{font-size:14px;text-overflow:ellipsis;word-break:keep-all;overflow:hidden;white-space:nowrap;min-width:150px;max-width:250px;flex:1}.tabs--container .tab-item .close{color:#ffffff80;width:12px;height:12px;cursor:pointer;transition:.1s ease-in-out opacity;border-radius:50%;padding:4px;display:flex;align-items:center;justify-content:center}.tabs--container .tab-item .close:hover{background-color:#ffffff1a}.tabs--container .tab-item .close.hidden{opacity:0;pointer-events:none}.tabs--container .tab-item.disabled{opacity:.5;pointer-events:none}.tabs--container .tab-item:hover,.tabs--container .tab-item.selected{opacity:1}[class*=small-].tabs--rename-modal{height:40px!important;min-height:40px!important;min-width:400px!important}");function I(){return`
  <svg viewBox="0 0 12 12">
    <polygon fill="currentColor" fill-rule="evenodd" points="11 1.576 6.583 6 11 10.424 10.424 11 6 6.583 1.576 11 1 10.424 5.417 6 1 1.576 1.576 1 6 5.417 10.424 1"></polygon>
  </svg>
  `}let _=L.default.findByProps("inputDefault","copyInput"),G=L.default.findByProps("input","editable","disabled","inputWrapper");function H(o={}){return T.createElement("div",{className:`${G?.input}`},T.createElement("div",{className:`${_?.inputWrapper}`},T.createElement("input",{type:"text",className:`${_?.inputDefault}`,...o})))}var K={load(){r.subscriptions.push(U()),r.subscriptions.push((()=>{const o=x.default.parseHTML(`
                <div class="tabs--container">
                    <div class="tab-items w-scroll"></div>
                    <div class="bookmarks w-scroll"></div>
                </div>
            `),u=o.querySelector(".tab-items"),h=o.querySelector(".bookmarks");o.querySelectorAll(".w-scroll").forEach(e=>{e.onwheel=t=>{e.scrollBy({left:t.deltaY,behavior:"smooth"})}});const f=[];q.default.ifExists(document.querySelector('div[class*="bg-"]'),e=>e.remove()),document.querySelector('[class*="appDevToolsWrapper-"]').insertAdjacentElement("beforebegin",o);function W(){h.classList[h.childElementCount===0?"add":"remove"]("hidden"),document.querySelectorAll(".bookmark-item").forEach(e=>e.classList.remove("selected")),q.default.ifExists(document.querySelector(`.bookmark-item[data-pathname="${location.pathname}"]`),e=>{e.classList.add("selected")})}let M=x.default.parseHTML(`
                <div class="new-tab">
                    ${I()}
                </div>
            `);M.onclick=async()=>{k(r.i18n.format("LOADING"),"/channels/@me",null,!0),await new Promise(e=>setTimeout(e,1)),u.scrollTo({left:u.scrollWidth,behavior:"smooth"})},u.appendChild(M);function O(e,t,c){let l=Math.random().toString(36).slice(2),a=x.default.parseHTML(`
                    <div class="bookmark-item">
                        <span class="info">
                            <span class="icon" style="${c||"background-color: #5865f2;"}"></span>
                            <span class="title">${x.default.escapeHTML(e)}</span>
                        </span>
                        <span class="unread hidden">0</span>
                    </div>
                `);a.setAttribute("data-id",l),a.setAttribute("data-pathname",t);async function i(){await new Promise(n=>setTimeout(n,1));let g=document.querySelector(`.tab-item[data-pathname="${t}"]`);if(g)g.select();else{let n=k(r.i18n.format("LOADING"),t,null);await new Promise(p=>setTimeout(p,1)),n.select(),await new Promise(p=>setTimeout(p,1)),C(n)}S()}function b(){a.remove(),S()}return a.select=i,a.close=b,a.onclick=async()=>{location.pathname!==a.getAttribute("data-pathname")&&i()},a.oncontextmenu=g=>{v.contextMenus.open(g,v.contextMenus.build.menu([{type:"text",label:r.i18n.format("DELETE"),action(){b()}},{type:"text",label:r.i18n.format("RENAME"),action(){let n=a.querySelector(".title"),p=n.textContent,m="";d.modals.actions.show(A=>d.React.createElement(d.modals.ModalRoot,{transitionState:A.transitionState,className:"tabs--rename-modal"},d.React.createElement(H,{onChange:s=>{m=s.target.value.trim()||p},placeholder:`${r.i18n.format("RENAME")}: ${n.textContent}`,onKeyUp:s=>{s.code==="Enter"&&(A.onClose(),n.textContent=m,S())}})))}}]))},h.appendChild(a),a}function k(e,t,c,l){let a=Math.random().toString(36).slice(2),i=x.default.parseHTML(`
                    <div class="tab-item">
                        <span class="info">
                            <span class="icon" style="${c||"background-color: #5865f2;"}"></span>
                            <span class="title">${x.default.escapeHTML(e)}</span>
                        </span>
                        <span class="close">
                            ${I()}
                        </span>
                        <span class="unread hidden">0</span>
                    </div>
                `);i.setAttribute("data-id",a),i.setAttribute("data-pathname",t);async function b(){await new Promise(n=>setTimeout(n,1)),d.Router.transitionTo(i.getAttribute("data-pathname")),document.querySelectorAll(".selected").forEach(n=>n.classList.remove("selected")),i.classList.add("selected"),u.scrollTo({behavior:"smooth",left:i.getBoundingClientRect().left}),document.querySelectorAll(".close.hidden").forEach(n=>n.classList.remove("hidden")),document.querySelectorAll(".tab-item").length===1&&document.querySelector(".close").classList.add("hidden"),w()}function g(){let n=$(i);n.pathname===f?.[0]?.pathname&&f.unshift(n),i.remove(),i.classList.contains("selected")&&document.querySelector(".tab-item").select(),document.querySelectorAll(".tab-item").length===1&&document.querySelector(".close").classList.add("hidden"),f.length>16&&(f.length=16),w()}return i.select=b,i.close=g,i.onclick=async n=>{n.target.classList.contains("close")||location.pathname!==i.getAttribute("data-pathname")&&b()},i.oncontextmenu=n=>{let p=[...document.querySelectorAll(".tab-item")],m=p.findIndex(s=>s.getAttribute("data-id")===a),A=p.filter((s,y)=>y>m);v.contextMenus.open(n,v.contextMenus.build.menu([{type:"text",label:r.i18n.format("CLOSE"),disabled:!!i.querySelector(".close.hidden"),action(){g()}},{type:"text",label:r.i18n.format("CLOSE_TABS_TO_RIGHT"),disabled:!A.length,action(){p.filter((s,y)=>y!=m).forEach(s=>s.close())}},{type:"separator"},{type:"text",label:r.i18n.format("MOVE_TAB_TO_LEFT"),disabled:!m,action(){let s=[...p],[y]=s.splice(m,1);s.splice(m-1,0,y),u.replaceChildren(...s),w()}},{type:"text",label:r.i18n.format("MOVE_TAB_TO_RIGHT"),disabled:m===p.length-1,action(){let s=[...p],[y]=s.splice(m,1);s.splice(m+1,0,y),u.replaceChildren(...s),w()}},{type:"separator"},{type:"text",label:r.i18n.format("ADD_TO_BOOKMARKS"),disabled:!!document.querySelector(`.bookmark-item[data-pathname="${i.getAttribute("data-pathname")}"]`),action(){O(i.querySelector(".title").textContent,i.getAttribute("data-pathname"),i.querySelector(".icon").getAttribute("style")),S()}}]))},i.querySelector(".close").onclick=()=>{document.querySelectorAll(".tab-item").length!==1&&g()},u.querySelector(".new-tab").insertAdjacentElement("beforebegin",i),l&&(C(i),b()),i}function w(){let e=d.UserStore.getCurrentUser().id;r.persist.store.userTabs[e]=[...document.querySelectorAll(".tab-item")].map($)}function S(){let e=d.UserStore.getCurrentUser().id;r.persist.store.userBookmarks[e]=[...document.querySelectorAll(".bookmark-item")].map(t=>({pathname:t.getAttribute("data-pathname"),title:t.querySelector(".title").textContent,icon:t.querySelector(".icon").getAttribute("style")}))}async function C(e){await new Promise(a=>setTimeout(a,1));let t=window.location.pathname;e.setAttribute("data-pathname",t),e.querySelector(".title").textContent=document.title;let c=t.split("/"),l="";if(c[1]==="channels")if(c[2]==="@me"){let a=d.ChannelStore.getChannel(c[3]);if(a){if(a.isGroupDM()&&a.icon)l=`url('https://cdn.discordapp.com/channel-icons/${a.id}/${a.icon}.webp?size=32')`;else if(a.isDM()){let i=a.getRecipientId(),b=d.UserStore.getUser(i);b?.avatar?l=`url('https://cdn.discordapp.com/avatars/${i}/${b.avatar}.webp?size=32')`:l=`url('https://cdn.discordapp.com/embed/avatars/${b.discriminator%5}.png')`}}}else{let a=d.GuildStore.getGuild(c[2]);a?.icon&&(l=`url('https://cdn.discordapp.com/icons/${a.id}/${a.icon}.webp?size=32')`)}e.querySelector(".icon").setAttribute("style",l?`background-image: ${l};`:"background-color: #5865f2;")}function V(e){let t=e.querySelector(".unread"),l=e.getAttribute("data-pathname").split("/");if(l[1]==="channels"&&t){let a=d.ReadStateStore.getUnreadCount(l[3]);t.classList[a?"remove":"add"]("hidden"),t.textContent=a}}const F=q.default.interval(()=>{let e=document.querySelector(".tab-item.selected");if(e)e.querySelector(".title").textContent!==document.title&&C(e);else{let t=[...document.querySelectorAll(".tab-item")].pop();t?t.select():k(r.i18n.format("LOADING"),location.pathname,null,!0)}document.querySelectorAll(".tab-item, .bookmark-item").forEach(V),W()},100);{let e=d.UserStore.getCurrentUser().id;(r.persist.ghost.userTabs?.[e]||[{title:r.i18n.format("LOADING"),pathname:"/channels/@me",selected:!0}]).forEach(t=>{k(t.title,t.pathname,t.icon,t.selected)}),(r.persist.ghost.userBookmarks?.[e]||[]).forEach(t=>{O(t.title,t.pathname,t.icon)})}function $(e){return{pathname:e.getAttribute("data-pathname"),title:e.querySelector(".title").textContent,icon:e.querySelector(".icon").getAttribute("style"),selected:e.classList.contains("selected")}}async function N(e){if(!!(e.ctrlKey&&e.shiftKey)){if(e.code==="KeyP"){let t=f.shift();if(t){let c=k(r.i18n.format("LOADING"),t.pathname,t.icon);await new Promise(l=>setTimeout(l,1)),c.select(),await new Promise(l=>setTimeout(l,1)),w()}}else if(e.code.startsWith("Digit")){let t=Math.max(Number(e.code.slice(5))-1,0),c=[...document.querySelectorAll(".tab-item")];c[t]&&!c[t].classList.contains("selected")&&location.pathname!==c[t].getAttribute("data-pathname")&&c[t].select()}}}return window.addEventListener("keyup",N),()=>{f.length=0,window.removeEventListener("keyup",N),F(),o.remove()}})())},unload(){}};return K})(acord.dom,acord.utils,acord.ui,acord.patcher,acord.extension,acord.modules.common,acord.modules.common.React,acord.modules.webpack);
