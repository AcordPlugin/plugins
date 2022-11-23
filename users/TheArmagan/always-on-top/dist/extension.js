(function(r,c){"use strict";function i(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var s=i(r),d=i(c);class h{constructor(){this.patches=[]}add(...t){this.patches.push(...t)}remove(t){let[l]=this.patches.splice(this.patches.indexOf(a=>a==t),1);l()}removeAll(){let t=this.patches.splice(0,this.patches.length);for(let l=0;l<t.length;l++)t[l]()}}var n=new h,v={load(){let e=d.default.findByProps("winButton","withFrame"),t=!1;n.add((()=>{const l=document.querySelector('[class*="titleBar-"]');let a=s.default.parseHTML(`
            <div class="${e.winButton} ${e.winButtonMinMax}" style="display: flex; align-items: center; justify-content: center;"></div>
        `);function o(){let u=t?s.default.parseHTML(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                    <path fill="currentColor" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3z"/>
                </svg>
            `):s.default.parseHTML(`
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="12" height="12">
                    <path fill="currentColor" d="M18 3v2h-1v6l2 3v2h-6v7h-2v-7H5v-2l2-3V5H6V3h12zM9 5v6.606L7.404 14h9.192L15 11.606V5H9z"/>
                </svg>
            `);a.replaceChildren(u)}return o(),a.onclick=()=>{t=!t,DiscordNative.window.setAlwaysOnTop(0,t),o()},l.appendChild(a),()=>{l.removeChild(a)}})())},unload(){n.removeAll(),DiscordNative.window.setAlwaysOnTop(0,!1)}};return v})(acord.dom,acord.modules.webpack);
