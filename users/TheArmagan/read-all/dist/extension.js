(function(f,m,b,a,l){"use strict";function i(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var c=i(f),d=i(m),h=()=>b.injectCSS(".ra--button{background-color:#36393f;color:#f5f5f5;font-size:12px;padding:8px;border-radius:4px;cursor:pointer;transition:.1s ease-in-out filter;max-width:45px;text-align:center;line-height:14px}.ra--button:hover{filter:brightness(1.1)}.ra--button[style*=--progress]{background-image:linear-gradient(to right,#5865f2 var(--progress),#36393f var(--progress),#36393f)}.ra--button.in-progress{cursor:wait}");const u=d.default.findByProps("listItemWidth","listItem","unavailableBadge"),v=d.default.find(e=>e?.guildSeparator&&Object.keys(e).length===1);var y={load(){a.subscriptions.push(h()),a.subscriptions.push((()=>{const e=document.querySelector('[class*="scroller-"][class*="scrollerBase-"] [class*="guildSeparator-"]').parentElement,r=c.default.parseHTML(`
                    <div class="${u.listItem}">
                        <div class="ra--button" style="--progress: 0%;">
                            ${a.i18n.format("READ_ALL")}
                        </div>
                    </div>
                `),s=r.querySelector(".ra--button");s.onclick=async()=>{if(s.classList.contains("in-progress"))return;s.classList.add("in-progress");const g=Object.values(l.ChannelStore.__getLocalVars().guildChannels).flat().filter(t=>!t.isCategory()).map(t=>t.id),S=g.length;let n=0;for(;;){let t=g.splice(0,50);if(!t.length)break;l.AckActions.bulkAck(t.map(o=>({channelId:o,readStateType:0}))),n+=t.length,s.setAttribute("style",`--progress: ${(n/S*100).toFixed(4)}%;`),await new Promise(o=>setTimeout(o,1))}n=0,s.classList.remove("in-progress"),setTimeout(()=>{s.setAttribute("style","--progress: 0%;")},1e3)},e.insertAdjacentElement("afterend",r);const p=c.default.parseHTML(`
                    <div class="${u.listItem}">
                        <div class="${v.guildSeparator}"></div>
                    </div>
                `);return r.insertAdjacentElement("afterend",p),()=>{r.remove(),p.remove()}})())},unload(){}};return y})(acord.dom,acord.modules.webpack,acord.patcher,acord.extension,acord.modules.common);
