(function(f,g,m,a,n){"use strict";function i(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var l=i(f),c=i(g),b=()=>m.injectCSS(".ra--button{background-color:#36393f;color:#f5f5f5;font-size:12px;padding:8px;border-radius:4px;cursor:pointer;transition:.1s ease-in-out filter;max-width:45px;text-align:center;line-height:14px}.ra--button:hover{filter:brightness(1.1)}.ra--button[style*=--progress]{background-image:linear-gradient(to right,#5865f2 var(--progress),#36393f var(--progress),#36393f)}.ra--button.in-progress{cursor:wait}");const d=c.default.findByProps("listItemWidth","listItem","unavailableBadge"),h=c.default.find(e=>e?.guildSeparator&&Object.keys(e).length===1);var v={load(){a.subscriptions.push(b()),a.subscriptions.push((()=>{const e=document.querySelector('[class*="scroller-"][class*="scrollerBase-"] [class*="guildSeparator-"]').parentElement,s=l.default.parseHTML(`
                    <div class="${d.listItem}">
                        <div class="ra--button" style="--progress: 0%;">
                            ${a.i18n.format("READ_ALL")}
                        </div>
                    </div>
                `),t=s.querySelector(".ra--button");t.onclick=async()=>{if(t.classList.contains("in-progress"))return;t.classList.add("in-progress");const p=Object.values(n.ChannelStore.__getLocalVars().guildChannels).flat().filter(r=>!r.isCategory()).map(r=>r.id),y=p.length;let o=0;for(;;){let r=p.pop();if(!r)break;n.AckActions.ack(r),o+=1,t.setAttribute("style",`--progress: ${(o/y*100).toFixed(4)}%;`),await new Promise(S=>setTimeout(S,1))}o=0,t.classList.remove("in-progress"),setTimeout(()=>{t.setAttribute("style","--progress: 0%;")},1e3)},e.insertAdjacentElement("afterend",s);const u=l.default.parseHTML(`
                    <div class="${d.listItem}">
                        <div class="${h.guildSeparator}"></div>
                    </div>
                `);return s.insertAdjacentElement("afterend",u),()=>{s.remove(),u.remove()}})())},unload(){}};return v})(acord.dom,acord.modules.webpack,acord.patcher,acord.extension,acord.modules.common);
