(function(o,p,d,u,c){"use strict";function n(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var h=n(p),m=n(d);class g{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(i=>i==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}}var r=new g,f={load(){const s=m.default.find(e=>e?.prototype?._ensureAudio,!0);r.add(h.default.instead("_ensureAudio",s.prototype,async function(e,t){let i=Object.fromEntries(o.persist.ghost.settings.preset.split(/;|\n/).map(a=>a.trim().split("=")));if(o.persist.ghost.settings.logAudioNames&&(u.logger.log(`[Sound Presets] Sound Name: ${this.name}`),c.toasts.show.info(`[Sound Presets] Sound Name: ${this.name}`)),i[this.name]){let a=i[this.name];if(a.startsWith("https://")){let l=await t.apply(this,e);return l.src=a,l}else return this.name=a,t.apply(this,e)}else return t.apply(this,e)}))},unload(){r.removeAll()},settings:{data:[{type:"header",name:"Configuration"},{type:"textarea",property:"preset",value:`message1=message2
call_ringing=call_ringing_beat`,placeholder:`message1=message2
call_ringing=https://discordcdnlink`,name:"Audio Preset",description:"Your audio preset configuration.. Supports swapping sounds and also custom sounds from discord cdn(uploads) too.",rows:6},{type:"header",name:"Debug"},{type:"checkbox",name:"Log Audio Names",description:"Helpful when trying to identify which sound is which.",property:"logAudioNames",value:!1}]}};return f})(acord.extension,acord.patcher,acord.modules.webpack,acord.utils,acord.ui);
