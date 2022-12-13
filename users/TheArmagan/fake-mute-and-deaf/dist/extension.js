(function(u,n,c,o,p){"use strict";function d(t){return t&&typeof t=="object"&&"default"in t?t:{default:t}}var h=d(u),y=d(p);class g{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[a]=this.patches.splice(this.patches.indexOf(s=>s==e),1);a()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let a=0;a<e.length;a++)e[a]()}}var r=new g;async function f(){await n.MediaEngineActions.toggleSelfMute(),await y.default.sleep(100),await n.MediaEngineActions.toggleSelfMute()}var M={load(){let t=n.GatewayConnectionStore.getSocket(),e={selfMute:!1,selfDeaf:!1,selfVideo:!1},a=Object.keys(e);r.add(h.default.before("voiceStateUpdate",t,s=>{for(let i=0;i<a.length;i++){const l=a[i];s[0][l]=e[l]||s[0][l]}return s})),r.add(c.contextMenus.patch("audio-device-context",(s,i)=>{let l=s?.props?.children?.props?.children;!Array.isArray(l)||(l.push(c.contextMenus.build.item({type:"separator"})),i.renderInputDevices?l.push(c.contextMenus.build.item({type:"toggle",label:o.i18n.format("FAKE_MUTE"),checked:e.selfMute,async action(){e.selfMute=!e.selfMute,f()}})):l.push(c.contextMenus.build.item({type:"toggle",label:o.i18n.format("FAKE_DEAF"),checked:e.selfDeaf,async action(){e.selfDeaf=!e.selfDeaf,f()}}),c.contextMenus.build.item({type:"toggle",label:o.i18n.format("FAKE_CAMERA"),checked:e.selfVideo,async action(){e.selfVideo=!e.selfVideo,f()}})))}))},unload(){r.removeAll()}};return M})(acord.patcher,acord.modules.common,acord.ui,acord.extension,acord.utils);
