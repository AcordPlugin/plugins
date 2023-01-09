(function(Ee,ke,_e,Ae,z,Ce){"use strict";function E(s){return s&&typeof s=="object"&&"default"in s?s:{default:s}}var Re=E(Ee),d=E(ke),k=E(_e),M=E(Ae),Te=E(Ce);const u=Object.create(null);u.open="0",u.close="1",u.ping="2",u.pong="3",u.message="4",u.upgrade="5",u.noop="6";const S=Object.create(null);Object.keys(u).forEach(s=>{S[u[s]]=s});const Se={type:"error",data:"parser error"},Oe=typeof Blob=="function"||typeof Blob<"u"&&Object.prototype.toString.call(Blob)==="[object BlobConstructor]",Be=typeof ArrayBuffer=="function",xe=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s&&s.buffer instanceof ArrayBuffer,W=({type:s,data:e},t,n)=>Oe&&e instanceof Blob?t?n(e):J(e,n):Be&&(e instanceof ArrayBuffer||xe(e))?t?n(e):J(new Blob([e]),n):n(u[s]+(e||"")),J=(s,e)=>{const t=new FileReader;return t.onload=function(){const n=t.result.split(",")[1];e("b"+n)},t.readAsDataURL(s)},X="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_=typeof Uint8Array>"u"?[]:new Uint8Array(256);for(let s=0;s<X.length;s++)_[X.charCodeAt(s)]=s;const Ne=s=>{let e=s.length*.75,t=s.length,n,i=0,r,o,h,p;s[s.length-1]==="="&&(e--,s[s.length-2]==="="&&e--);const R=new ArrayBuffer(e),w=new Uint8Array(R);for(n=0;n<t;n+=4)r=_[s.charCodeAt(n)],o=_[s.charCodeAt(n+1)],h=_[s.charCodeAt(n+2)],p=_[s.charCodeAt(n+3)],w[i++]=r<<2|o>>4,w[i++]=(o&15)<<4|h>>2,w[i++]=(h&3)<<6|p&63;return R},Le=typeof ArrayBuffer=="function",G=(s,e)=>{if(typeof s!="string")return{type:"message",data:Q(s,e)};const t=s.charAt(0);return t==="b"?{type:"message",data:Pe(s.substring(1),e)}:S[t]?s.length>1?{type:S[t],data:s.substring(1)}:{type:S[t]}:Se},Pe=(s,e)=>{if(Le){const t=Ne(s);return Q(t,e)}else return{base64:!0,data:s}},Q=(s,e)=>{switch(e){case"blob":return s instanceof ArrayBuffer?new Blob([s]):s;case"arraybuffer":default:return s}},Z=String.fromCharCode(30),Ie=(s,e)=>{const t=s.length,n=new Array(t);let i=0;s.forEach((r,o)=>{W(r,!1,h=>{n[o]=h,++i===t&&e(n.join(Z))})})},De=(s,e)=>{const t=s.split(Z),n=[];for(let i=0;i<t.length;i++){const r=G(t[i],e);if(n.push(r),r.type==="error")break}return n},j=4;function c(s){if(s)return qe(s)}function qe(s){for(var e in c.prototype)s[e]=c.prototype[e];return s}c.prototype.on=c.prototype.addEventListener=function(s,e){return this._callbacks=this._callbacks||{},(this._callbacks["$"+s]=this._callbacks["$"+s]||[]).push(e),this},c.prototype.once=function(s,e){function t(){this.off(s,t),e.apply(this,arguments)}return t.fn=e,this.on(s,t),this},c.prototype.off=c.prototype.removeListener=c.prototype.removeAllListeners=c.prototype.removeEventListener=function(s,e){if(this._callbacks=this._callbacks||{},arguments.length==0)return this._callbacks={},this;var t=this._callbacks["$"+s];if(!t)return this;if(arguments.length==1)return delete this._callbacks["$"+s],this;for(var n,i=0;i<t.length;i++)if(n=t[i],n===e||n.fn===e){t.splice(i,1);break}return t.length===0&&delete this._callbacks["$"+s],this},c.prototype.emit=function(s){this._callbacks=this._callbacks||{};for(var e=new Array(arguments.length-1),t=this._callbacks["$"+s],n=1;n<arguments.length;n++)e[n-1]=arguments[n];if(t){t=t.slice(0);for(var n=0,i=t.length;n<i;++n)t[n].apply(this,e)}return this},c.prototype.emitReserved=c.prototype.emit,c.prototype.listeners=function(s){return this._callbacks=this._callbacks||{},this._callbacks["$"+s]||[]},c.prototype.hasListeners=function(s){return!!this.listeners(s).length};const y=(()=>typeof self<"u"?self:typeof window<"u"?window:Function("return this")())();function ee(s,...e){return e.reduce((t,n)=>(s.hasOwnProperty(n)&&(t[n]=s[n]),t),{})}const Me=setTimeout,$e=clearTimeout;function O(s,e){e.useNativeTimers?(s.setTimeoutFn=Me.bind(y),s.clearTimeoutFn=$e.bind(y)):(s.setTimeoutFn=setTimeout.bind(y),s.clearTimeoutFn=clearTimeout.bind(y))}const Fe=1.33;function Ue(s){return typeof s=="string"?Ve(s):Math.ceil((s.byteLength||s.size)*Fe)}function Ve(s){let e=0,t=0;for(let n=0,i=s.length;n<i;n++)e=s.charCodeAt(n),e<128?t+=1:e<2048?t+=2:e<55296||e>=57344?t+=3:(n++,t+=4);return t}class He extends Error{constructor(e,t,n){super(e),this.description=t,this.context=n,this.type="TransportError"}}class te extends c{constructor(e){super(),this.writable=!1,O(this,e),this.opts=e,this.query=e.query,this.readyState="",this.socket=e.socket}onError(e,t,n){return super.emitReserved("error",new He(e,t,n)),this}open(){return(this.readyState==="closed"||this.readyState==="")&&(this.readyState="opening",this.doOpen()),this}close(){return(this.readyState==="opening"||this.readyState==="open")&&(this.doClose(),this.onClose()),this}send(e){this.readyState==="open"&&this.write(e)}onOpen(){this.readyState="open",this.writable=!0,super.emitReserved("open")}onData(e){const t=G(e,this.socket.binaryType);this.onPacket(t)}onPacket(e){super.emitReserved("packet",e)}onClose(e){this.readyState="closed",super.emitReserved("close",e)}}const se="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""),$=64,Ke={};let ne=0,B=0,ie;function re(s){let e="";do e=se[s%$]+e,s=Math.floor(s/$);while(s>0);return e}function oe(){const s=re(+new Date);return s!==ie?(ne=0,ie=s):s+"."+re(ne++)}for(;B<$;B++)Ke[se[B]]=B;function ae(s){let e="";for(let t in s)s.hasOwnProperty(t)&&(e.length&&(e+="&"),e+=encodeURIComponent(t)+"="+encodeURIComponent(s[t]));return e}function Ye(s){let e={},t=s.split("&");for(let n=0,i=t.length;n<i;n++){let r=t[n].split("=");e[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return e}let ce=!1;try{ce=typeof XMLHttpRequest<"u"&&"withCredentials"in new XMLHttpRequest}catch{}const ze=ce;function he(s){const e=s.xdomain;try{if(typeof XMLHttpRequest<"u"&&(!e||ze))return new XMLHttpRequest}catch{}if(!e)try{return new y[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP")}catch{}}function We(){}const Je=function(){return new he({xdomain:!1}).responseType!=null}();class Xe extends te{constructor(e){if(super(e),this.polling=!1,typeof location<"u"){const n=location.protocol==="https:";let i=location.port;i||(i=n?"443":"80"),this.xd=typeof location<"u"&&e.hostname!==location.hostname||i!==e.port,this.xs=e.secure!==n}const t=e&&e.forceBase64;this.supportsBinary=Je&&!t}get name(){return"polling"}doOpen(){this.poll()}pause(e){this.readyState="pausing";const t=()=>{this.readyState="paused",e()};if(this.polling||!this.writable){let n=0;this.polling&&(n++,this.once("pollComplete",function(){--n||t()})),this.writable||(n++,this.once("drain",function(){--n||t()}))}else t()}poll(){this.polling=!0,this.doPoll(),this.emitReserved("poll")}onData(e){const t=n=>{if(this.readyState==="opening"&&n.type==="open"&&this.onOpen(),n.type==="close")return this.onClose({description:"transport closed by the server"}),!1;this.onPacket(n)};De(e,this.socket.binaryType).forEach(t),this.readyState!=="closed"&&(this.polling=!1,this.emitReserved("pollComplete"),this.readyState==="open"&&this.poll())}doClose(){const e=()=>{this.write([{type:"close"}])};this.readyState==="open"?e():this.once("open",e)}write(e){this.writable=!1,Ie(e,t=>{this.doWrite(t,()=>{this.writable=!0,this.emitReserved("drain")})})}uri(){let e=this.query||{};const t=this.opts.secure?"https":"http";let n="";this.opts.timestampRequests!==!1&&(e[this.opts.timestampParam]=oe()),!this.supportsBinary&&!e.sid&&(e.b64=1),this.opts.port&&(t==="https"&&Number(this.opts.port)!==443||t==="http"&&Number(this.opts.port)!==80)&&(n=":"+this.opts.port);const i=ae(e),r=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(r?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(i.length?"?"+i:"")}request(e={}){return Object.assign(e,{xd:this.xd,xs:this.xs},this.opts),new f(this.uri(),e)}doWrite(e,t){const n=this.request({method:"POST",data:e});n.on("success",t),n.on("error",(i,r)=>{this.onError("xhr post error",i,r)})}doPoll(){const e=this.request();e.on("data",this.onData.bind(this)),e.on("error",(t,n)=>{this.onError("xhr poll error",t,n)}),this.pollXhr=e}}class f extends c{constructor(e,t){super(),O(this,t),this.opts=t,this.method=t.method||"GET",this.uri=e,this.async=t.async!==!1,this.data=t.data!==void 0?t.data:null,this.create()}create(){const e=ee(this.opts,"agent","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","autoUnref");e.xdomain=!!this.opts.xd,e.xscheme=!!this.opts.xs;const t=this.xhr=new he(e);try{t.open(this.method,this.uri,this.async);try{if(this.opts.extraHeaders){t.setDisableHeaderCheck&&t.setDisableHeaderCheck(!0);for(let n in this.opts.extraHeaders)this.opts.extraHeaders.hasOwnProperty(n)&&t.setRequestHeader(n,this.opts.extraHeaders[n])}}catch{}if(this.method==="POST")try{t.setRequestHeader("Content-type","text/plain;charset=UTF-8")}catch{}try{t.setRequestHeader("Accept","*/*")}catch{}"withCredentials"in t&&(t.withCredentials=this.opts.withCredentials),this.opts.requestTimeout&&(t.timeout=this.opts.requestTimeout),t.onreadystatechange=()=>{t.readyState===4&&(t.status===200||t.status===1223?this.onLoad():this.setTimeoutFn(()=>{this.onError(typeof t.status=="number"?t.status:0)},0))},t.send(this.data)}catch(n){this.setTimeoutFn(()=>{this.onError(n)},0);return}typeof document<"u"&&(this.index=f.requestsCount++,f.requests[this.index]=this)}onError(e){this.emitReserved("error",e,this.xhr),this.cleanup(!0)}cleanup(e){if(!(typeof this.xhr>"u"||this.xhr===null)){if(this.xhr.onreadystatechange=We,e)try{this.xhr.abort()}catch{}typeof document<"u"&&delete f.requests[this.index],this.xhr=null}}onLoad(){const e=this.xhr.responseText;e!==null&&(this.emitReserved("data",e),this.emitReserved("success"),this.cleanup())}abort(){this.cleanup()}}if(f.requestsCount=0,f.requests={},typeof document<"u"){if(typeof attachEvent=="function")attachEvent("onunload",le);else if(typeof addEventListener=="function"){const s="onpagehide"in y?"pagehide":"unload";addEventListener(s,le,!1)}}function le(){for(let s in f.requests)f.requests.hasOwnProperty(s)&&f.requests[s].abort()}const ue=(()=>typeof Promise=="function"&&typeof Promise.resolve=="function"?e=>Promise.resolve().then(e):(e,t)=>t(e,0))(),x=y.WebSocket||y.MozWebSocket,fe=!0,Ge="arraybuffer",pe=typeof navigator<"u"&&typeof navigator.product=="string"&&navigator.product.toLowerCase()==="reactnative";class Qe extends te{constructor(e){super(e),this.supportsBinary=!e.forceBase64}get name(){return"websocket"}doOpen(){if(!this.check())return;const e=this.uri(),t=this.opts.protocols,n=pe?{}:ee(this.opts,"agent","perMessageDeflate","pfx","key","passphrase","cert","ca","ciphers","rejectUnauthorized","localAddress","protocolVersion","origin","maxPayload","family","checkServerIdentity");this.opts.extraHeaders&&(n.headers=this.opts.extraHeaders);try{this.ws=fe&&!pe?t?new x(e,t):new x(e):new x(e,t,n)}catch(i){return this.emitReserved("error",i)}this.ws.binaryType=this.socket.binaryType||Ge,this.addEventListeners()}addEventListeners(){this.ws.onopen=()=>{this.opts.autoUnref&&this.ws._socket.unref(),this.onOpen()},this.ws.onclose=e=>this.onClose({description:"websocket connection closed",context:e}),this.ws.onmessage=e=>this.onData(e.data),this.ws.onerror=e=>this.onError("websocket error",e)}write(e){this.writable=!1;for(let t=0;t<e.length;t++){const n=e[t],i=t===e.length-1;W(n,this.supportsBinary,r=>{const o={};try{fe&&this.ws.send(r)}catch{}i&&ue(()=>{this.writable=!0,this.emitReserved("drain")},this.setTimeoutFn)})}}doClose(){typeof this.ws<"u"&&(this.ws.close(),this.ws=null)}uri(){let e=this.query||{};const t=this.opts.secure?"wss":"ws";let n="";this.opts.port&&(t==="wss"&&Number(this.opts.port)!==443||t==="ws"&&Number(this.opts.port)!==80)&&(n=":"+this.opts.port),this.opts.timestampRequests&&(e[this.opts.timestampParam]=oe()),this.supportsBinary||(e.b64=1);const i=ae(e),r=this.opts.hostname.indexOf(":")!==-1;return t+"://"+(r?"["+this.opts.hostname+"]":this.opts.hostname)+n+this.opts.path+(i.length?"?"+i:"")}check(){return!!x}}const Ze={websocket:Qe,polling:Xe},je=/^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,et=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];function F(s){const e=s,t=s.indexOf("["),n=s.indexOf("]");t!=-1&&n!=-1&&(s=s.substring(0,t)+s.substring(t,n).replace(/:/g,";")+s.substring(n,s.length));let i=je.exec(s||""),r={},o=14;for(;o--;)r[et[o]]=i[o]||"";return t!=-1&&n!=-1&&(r.source=e,r.host=r.host.substring(1,r.host.length-1).replace(/;/g,":"),r.authority=r.authority.replace("[","").replace("]","").replace(/;/g,":"),r.ipv6uri=!0),r.pathNames=tt(r,r.path),r.queryKey=st(r,r.query),r}function tt(s,e){const t=/\/{2,9}/g,n=e.replace(t,"/").split("/");return(e.slice(0,1)=="/"||e.length===0)&&n.splice(0,1),e.slice(-1)=="/"&&n.splice(n.length-1,1),n}function st(s,e){const t={};return e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(n,i,r){i&&(t[i]=r)}),t}class m extends c{constructor(e,t={}){super(),e&&typeof e=="object"&&(t=e,e=null),e?(e=F(e),t.hostname=e.host,t.secure=e.protocol==="https"||e.protocol==="wss",t.port=e.port,e.query&&(t.query=e.query)):t.host&&(t.hostname=F(t.host).host),O(this,t),this.secure=t.secure!=null?t.secure:typeof location<"u"&&location.protocol==="https:",t.hostname&&!t.port&&(t.port=this.secure?"443":"80"),this.hostname=t.hostname||(typeof location<"u"?location.hostname:"localhost"),this.port=t.port||(typeof location<"u"&&location.port?location.port:this.secure?"443":"80"),this.transports=t.transports||["polling","websocket"],this.readyState="",this.writeBuffer=[],this.prevBufferLen=0,this.opts=Object.assign({path:"/engine.io",agent:!1,withCredentials:!1,upgrade:!0,timestampParam:"t",rememberUpgrade:!1,rejectUnauthorized:!0,perMessageDeflate:{threshold:1024},transportOptions:{},closeOnBeforeunload:!0},t),this.opts.path=this.opts.path.replace(/\/$/,"")+"/",typeof this.opts.query=="string"&&(this.opts.query=Ye(this.opts.query)),this.id=null,this.upgrades=null,this.pingInterval=null,this.pingTimeout=null,this.pingTimeoutTimer=null,typeof addEventListener=="function"&&(this.opts.closeOnBeforeunload&&(this.beforeunloadEventListener=()=>{this.transport&&(this.transport.removeAllListeners(),this.transport.close())},addEventListener("beforeunload",this.beforeunloadEventListener,!1)),this.hostname!=="localhost"&&(this.offlineEventListener=()=>{this.onClose("transport close",{description:"network connection lost"})},addEventListener("offline",this.offlineEventListener,!1))),this.open()}createTransport(e){const t=Object.assign({},this.opts.query);t.EIO=j,t.transport=e,this.id&&(t.sid=this.id);const n=Object.assign({},this.opts.transportOptions[e],this.opts,{query:t,socket:this,hostname:this.hostname,secure:this.secure,port:this.port});return new Ze[e](n)}open(){let e;if(this.opts.rememberUpgrade&&m.priorWebsocketSuccess&&this.transports.indexOf("websocket")!==-1)e="websocket";else if(this.transports.length===0){this.setTimeoutFn(()=>{this.emitReserved("error","No transports available")},0);return}else e=this.transports[0];this.readyState="opening";try{e=this.createTransport(e)}catch{this.transports.shift(),this.open();return}e.open(),this.setTransport(e)}setTransport(e){this.transport&&this.transport.removeAllListeners(),this.transport=e,e.on("drain",this.onDrain.bind(this)).on("packet",this.onPacket.bind(this)).on("error",this.onError.bind(this)).on("close",t=>this.onClose("transport close",t))}probe(e){let t=this.createTransport(e),n=!1;m.priorWebsocketSuccess=!1;const i=()=>{n||(t.send([{type:"ping",data:"probe"}]),t.once("packet",v=>{if(!n)if(v.type==="pong"&&v.data==="probe"){if(this.upgrading=!0,this.emitReserved("upgrading",t),!t)return;m.priorWebsocketSuccess=t.name==="websocket",this.transport.pause(()=>{n||this.readyState!=="closed"&&(w(),this.setTransport(t),t.send([{type:"upgrade"}]),this.emitReserved("upgrade",t),t=null,this.upgrading=!1,this.flush())})}else{const T=new Error("probe error");T.transport=t.name,this.emitReserved("upgradeError",T)}}))};function r(){n||(n=!0,w(),t.close(),t=null)}const o=v=>{const T=new Error("probe error: "+v);T.transport=t.name,r(),this.emitReserved("upgradeError",T)};function h(){o("transport closed")}function p(){o("socket closed")}function R(v){t&&v.name!==t.name&&r()}const w=()=>{t.removeListener("open",i),t.removeListener("error",o),t.removeListener("close",h),this.off("close",p),this.off("upgrading",R)};t.once("open",i),t.once("error",o),t.once("close",h),this.once("close",p),this.once("upgrading",R),t.open()}onOpen(){if(this.readyState="open",m.priorWebsocketSuccess=this.transport.name==="websocket",this.emitReserved("open"),this.flush(),this.readyState==="open"&&this.opts.upgrade&&this.transport.pause){let e=0;const t=this.upgrades.length;for(;e<t;e++)this.probe(this.upgrades[e])}}onPacket(e){if(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")switch(this.emitReserved("packet",e),this.emitReserved("heartbeat"),e.type){case"open":this.onHandshake(JSON.parse(e.data));break;case"ping":this.resetPingTimeout(),this.sendPacket("pong"),this.emitReserved("ping"),this.emitReserved("pong");break;case"error":const t=new Error("server error");t.code=e.data,this.onError(t);break;case"message":this.emitReserved("data",e.data),this.emitReserved("message",e.data);break}}onHandshake(e){this.emitReserved("handshake",e),this.id=e.sid,this.transport.query.sid=e.sid,this.upgrades=this.filterUpgrades(e.upgrades),this.pingInterval=e.pingInterval,this.pingTimeout=e.pingTimeout,this.maxPayload=e.maxPayload,this.onOpen(),this.readyState!=="closed"&&this.resetPingTimeout()}resetPingTimeout(){this.clearTimeoutFn(this.pingTimeoutTimer),this.pingTimeoutTimer=this.setTimeoutFn(()=>{this.onClose("ping timeout")},this.pingInterval+this.pingTimeout),this.opts.autoUnref&&this.pingTimeoutTimer.unref()}onDrain(){this.writeBuffer.splice(0,this.prevBufferLen),this.prevBufferLen=0,this.writeBuffer.length===0?this.emitReserved("drain"):this.flush()}flush(){if(this.readyState!=="closed"&&this.transport.writable&&!this.upgrading&&this.writeBuffer.length){const e=this.getWritablePackets();this.transport.send(e),this.prevBufferLen=e.length,this.emitReserved("flush")}}getWritablePackets(){if(!(this.maxPayload&&this.transport.name==="polling"&&this.writeBuffer.length>1))return this.writeBuffer;let t=1;for(let n=0;n<this.writeBuffer.length;n++){const i=this.writeBuffer[n].data;if(i&&(t+=Ue(i)),n>0&&t>this.maxPayload)return this.writeBuffer.slice(0,n);t+=2}return this.writeBuffer}write(e,t,n){return this.sendPacket("message",e,t,n),this}send(e,t,n){return this.sendPacket("message",e,t,n),this}sendPacket(e,t,n,i){if(typeof t=="function"&&(i=t,t=void 0),typeof n=="function"&&(i=n,n=null),this.readyState==="closing"||this.readyState==="closed")return;n=n||{},n.compress=n.compress!==!1;const r={type:e,data:t,options:n};this.emitReserved("packetCreate",r),this.writeBuffer.push(r),i&&this.once("flush",i),this.flush()}close(){const e=()=>{this.onClose("forced close"),this.transport.close()},t=()=>{this.off("upgrade",t),this.off("upgradeError",t),e()},n=()=>{this.once("upgrade",t),this.once("upgradeError",t)};return(this.readyState==="opening"||this.readyState==="open")&&(this.readyState="closing",this.writeBuffer.length?this.once("drain",()=>{this.upgrading?n():e()}):this.upgrading?n():e()),this}onError(e){m.priorWebsocketSuccess=!1,this.emitReserved("error",e),this.onClose("transport error",e)}onClose(e,t){(this.readyState==="opening"||this.readyState==="open"||this.readyState==="closing")&&(this.clearTimeoutFn(this.pingTimeoutTimer),this.transport.removeAllListeners("close"),this.transport.close(),this.transport.removeAllListeners(),typeof removeEventListener=="function"&&(removeEventListener("beforeunload",this.beforeunloadEventListener,!1),removeEventListener("offline",this.offlineEventListener,!1)),this.readyState="closed",this.id=null,this.emitReserved("close",e,t),this.writeBuffer=[],this.prevBufferLen=0)}filterUpgrades(e){const t=[];let n=0;const i=e.length;for(;n<i;n++)~this.transports.indexOf(e[n])&&t.push(e[n]);return t}}m.protocol=j;function nt(s,e="",t){let n=s;t=t||typeof location<"u"&&location,s==null&&(s=t.protocol+"//"+t.host),typeof s=="string"&&(s.charAt(0)==="/"&&(s.charAt(1)==="/"?s=t.protocol+s:s=t.host+s),/^(https?|wss?):\/\//.test(s)||(typeof t<"u"?s=t.protocol+"//"+s:s="https://"+s),n=F(s)),n.port||(/^(http|ws)$/.test(n.protocol)?n.port="80":/^(http|ws)s$/.test(n.protocol)&&(n.port="443")),n.path=n.path||"/";const r=n.host.indexOf(":")!==-1?"["+n.host+"]":n.host;return n.id=n.protocol+"://"+r+":"+n.port+e,n.href=n.protocol+"://"+r+(t&&t.port===n.port?"":":"+n.port),n}const it=typeof ArrayBuffer=="function",rt=s=>typeof ArrayBuffer.isView=="function"?ArrayBuffer.isView(s):s.buffer instanceof ArrayBuffer,de=Object.prototype.toString,ot=typeof Blob=="function"||typeof Blob<"u"&&de.call(Blob)==="[object BlobConstructor]",at=typeof File=="function"||typeof File<"u"&&de.call(File)==="[object FileConstructor]";function U(s){return it&&(s instanceof ArrayBuffer||rt(s))||ot&&s instanceof Blob||at&&s instanceof File}function N(s,e){if(!s||typeof s!="object")return!1;if(Array.isArray(s)){for(let t=0,n=s.length;t<n;t++)if(N(s[t]))return!0;return!1}if(U(s))return!0;if(s.toJSON&&typeof s.toJSON=="function"&&arguments.length===1)return N(s.toJSON(),!0);for(const t in s)if(Object.prototype.hasOwnProperty.call(s,t)&&N(s[t]))return!0;return!1}function ct(s){const e=[],t=s.data,n=s;return n.data=V(t,e),n.attachments=e.length,{packet:n,buffers:e}}function V(s,e){if(!s)return s;if(U(s)){const t={_placeholder:!0,num:e.length};return e.push(s),t}else if(Array.isArray(s)){const t=new Array(s.length);for(let n=0;n<s.length;n++)t[n]=V(s[n],e);return t}else if(typeof s=="object"&&!(s instanceof Date)){const t={};for(const n in s)Object.prototype.hasOwnProperty.call(s,n)&&(t[n]=V(s[n],e));return t}return s}function ht(s,e){return s.data=H(s.data,e),s.attachments=void 0,s}function H(s,e){if(!s)return s;if(s&&s._placeholder===!0){if(typeof s.num=="number"&&s.num>=0&&s.num<e.length)return e[s.num];throw new Error("illegal attachments")}else if(Array.isArray(s))for(let t=0;t<s.length;t++)s[t]=H(s[t],e);else if(typeof s=="object")for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&(s[t]=H(s[t],e));return s}const lt=5;var a;(function(s){s[s.CONNECT=0]="CONNECT",s[s.DISCONNECT=1]="DISCONNECT",s[s.EVENT=2]="EVENT",s[s.ACK=3]="ACK",s[s.CONNECT_ERROR=4]="CONNECT_ERROR",s[s.BINARY_EVENT=5]="BINARY_EVENT",s[s.BINARY_ACK=6]="BINARY_ACK"})(a||(a={}));class ut{constructor(e){this.replacer=e}encode(e){return(e.type===a.EVENT||e.type===a.ACK)&&N(e)?(e.type=e.type===a.EVENT?a.BINARY_EVENT:a.BINARY_ACK,this.encodeAsBinary(e)):[this.encodeAsString(e)]}encodeAsString(e){let t=""+e.type;return(e.type===a.BINARY_EVENT||e.type===a.BINARY_ACK)&&(t+=e.attachments+"-"),e.nsp&&e.nsp!=="/"&&(t+=e.nsp+","),e.id!=null&&(t+=e.id),e.data!=null&&(t+=JSON.stringify(e.data,this.replacer)),t}encodeAsBinary(e){const t=ct(e),n=this.encodeAsString(t.packet),i=t.buffers;return i.unshift(n),i}}class K extends c{constructor(e){super(),this.reviver=e}add(e){let t;if(typeof e=="string"){if(this.reconstructor)throw new Error("got plaintext data when reconstructing a packet");t=this.decodeString(e),t.type===a.BINARY_EVENT||t.type===a.BINARY_ACK?(this.reconstructor=new ft(t),t.attachments===0&&super.emitReserved("decoded",t)):super.emitReserved("decoded",t)}else if(U(e)||e.base64)if(this.reconstructor)t=this.reconstructor.takeBinaryData(e),t&&(this.reconstructor=null,super.emitReserved("decoded",t));else throw new Error("got binary data when not reconstructing a packet");else throw new Error("Unknown type: "+e)}decodeString(e){let t=0;const n={type:Number(e.charAt(0))};if(a[n.type]===void 0)throw new Error("unknown packet type "+n.type);if(n.type===a.BINARY_EVENT||n.type===a.BINARY_ACK){const r=t+1;for(;e.charAt(++t)!=="-"&&t!=e.length;);const o=e.substring(r,t);if(o!=Number(o)||e.charAt(t)!=="-")throw new Error("Illegal attachments");n.attachments=Number(o)}if(e.charAt(t+1)==="/"){const r=t+1;for(;++t&&!(e.charAt(t)===","||t===e.length););n.nsp=e.substring(r,t)}else n.nsp="/";const i=e.charAt(t+1);if(i!==""&&Number(i)==i){const r=t+1;for(;++t;){const o=e.charAt(t);if(o==null||Number(o)!=o){--t;break}if(t===e.length)break}n.id=Number(e.substring(r,t+1))}if(e.charAt(++t)){const r=this.tryParse(e.substr(t));if(K.isPayloadValid(n.type,r))n.data=r;else throw new Error("invalid payload")}return n}tryParse(e){try{return JSON.parse(e,this.reviver)}catch{return!1}}static isPayloadValid(e,t){switch(e){case a.CONNECT:return typeof t=="object";case a.DISCONNECT:return t===void 0;case a.CONNECT_ERROR:return typeof t=="string"||typeof t=="object";case a.EVENT:case a.BINARY_EVENT:return Array.isArray(t)&&t.length>0;case a.ACK:case a.BINARY_ACK:return Array.isArray(t)}}destroy(){this.reconstructor&&this.reconstructor.finishedReconstruction()}}class ft{constructor(e){this.packet=e,this.buffers=[],this.reconPack=e}takeBinaryData(e){if(this.buffers.push(e),this.buffers.length===this.reconPack.attachments){const t=ht(this.reconPack,this.buffers);return this.finishedReconstruction(),t}return null}finishedReconstruction(){this.reconPack=null,this.buffers=[]}}var pt=Object.freeze({__proto__:null,protocol:lt,get PacketType(){return a},Encoder:ut,Decoder:K});function l(s,e,t){return s.on(e,t),function(){s.off(e,t)}}const dt=Object.freeze({connect:1,connect_error:1,disconnect:1,disconnecting:1,newListener:1,removeListener:1});class ye extends c{constructor(e,t,n){super(),this.connected=!1,this.receiveBuffer=[],this.sendBuffer=[],this.ids=0,this.acks={},this.flags={},this.io=e,this.nsp=t,n&&n.auth&&(this.auth=n.auth),this.io._autoConnect&&this.open()}get disconnected(){return!this.connected}subEvents(){if(this.subs)return;const e=this.io;this.subs=[l(e,"open",this.onopen.bind(this)),l(e,"packet",this.onpacket.bind(this)),l(e,"error",this.onerror.bind(this)),l(e,"close",this.onclose.bind(this))]}get active(){return!!this.subs}connect(){return this.connected?this:(this.subEvents(),this.io._reconnecting||this.io.open(),this.io._readyState==="open"&&this.onopen(),this)}open(){return this.connect()}send(...e){return e.unshift("message"),this.emit.apply(this,e),this}emit(e,...t){if(dt.hasOwnProperty(e))throw new Error('"'+e.toString()+'" is a reserved event name');t.unshift(e);const n={type:a.EVENT,data:t};if(n.options={},n.options.compress=this.flags.compress!==!1,typeof t[t.length-1]=="function"){const o=this.ids++,h=t.pop();this._registerAckCallback(o,h),n.id=o}const i=this.io.engine&&this.io.engine.transport&&this.io.engine.transport.writable;return this.flags.volatile&&(!i||!this.connected)||(this.connected?(this.notifyOutgoingListeners(n),this.packet(n)):this.sendBuffer.push(n)),this.flags={},this}_registerAckCallback(e,t){const n=this.flags.timeout;if(n===void 0){this.acks[e]=t;return}const i=this.io.setTimeoutFn(()=>{delete this.acks[e];for(let r=0;r<this.sendBuffer.length;r++)this.sendBuffer[r].id===e&&this.sendBuffer.splice(r,1);t.call(this,new Error("operation has timed out"))},n);this.acks[e]=(...r)=>{this.io.clearTimeoutFn(i),t.apply(this,[null,...r])}}packet(e){e.nsp=this.nsp,this.io._packet(e)}onopen(){typeof this.auth=="function"?this.auth(e=>{this.packet({type:a.CONNECT,data:e})}):this.packet({type:a.CONNECT,data:this.auth})}onerror(e){this.connected||this.emitReserved("connect_error",e)}onclose(e,t){this.connected=!1,delete this.id,this.emitReserved("disconnect",e,t)}onpacket(e){if(e.nsp===this.nsp)switch(e.type){case a.CONNECT:if(e.data&&e.data.sid){const i=e.data.sid;this.onconnect(i)}else this.emitReserved("connect_error",new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));break;case a.EVENT:case a.BINARY_EVENT:this.onevent(e);break;case a.ACK:case a.BINARY_ACK:this.onack(e);break;case a.DISCONNECT:this.ondisconnect();break;case a.CONNECT_ERROR:this.destroy();const n=new Error(e.data.message);n.data=e.data.data,this.emitReserved("connect_error",n);break}}onevent(e){const t=e.data||[];e.id!=null&&t.push(this.ack(e.id)),this.connected?this.emitEvent(t):this.receiveBuffer.push(Object.freeze(t))}emitEvent(e){if(this._anyListeners&&this._anyListeners.length){const t=this._anyListeners.slice();for(const n of t)n.apply(this,e)}super.emit.apply(this,e)}ack(e){const t=this;let n=!1;return function(...i){n||(n=!0,t.packet({type:a.ACK,id:e,data:i}))}}onack(e){const t=this.acks[e.id];typeof t=="function"&&(t.apply(this,e.data),delete this.acks[e.id])}onconnect(e){this.id=e,this.connected=!0,this.emitBuffered(),this.emitReserved("connect")}emitBuffered(){this.receiveBuffer.forEach(e=>this.emitEvent(e)),this.receiveBuffer=[],this.sendBuffer.forEach(e=>{this.notifyOutgoingListeners(e),this.packet(e)}),this.sendBuffer=[]}ondisconnect(){this.destroy(),this.onclose("io server disconnect")}destroy(){this.subs&&(this.subs.forEach(e=>e()),this.subs=void 0),this.io._destroy(this)}disconnect(){return this.connected&&this.packet({type:a.DISCONNECT}),this.destroy(),this.connected&&this.onclose("io client disconnect"),this}close(){return this.disconnect()}compress(e){return this.flags.compress=e,this}get volatile(){return this.flags.volatile=!0,this}timeout(e){return this.flags.timeout=e,this}onAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.push(e),this}prependAny(e){return this._anyListeners=this._anyListeners||[],this._anyListeners.unshift(e),this}offAny(e){if(!this._anyListeners)return this;if(e){const t=this._anyListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyListeners=[];return this}listenersAny(){return this._anyListeners||[]}onAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.push(e),this}prependAnyOutgoing(e){return this._anyOutgoingListeners=this._anyOutgoingListeners||[],this._anyOutgoingListeners.unshift(e),this}offAnyOutgoing(e){if(!this._anyOutgoingListeners)return this;if(e){const t=this._anyOutgoingListeners;for(let n=0;n<t.length;n++)if(e===t[n])return t.splice(n,1),this}else this._anyOutgoingListeners=[];return this}listenersAnyOutgoing(){return this._anyOutgoingListeners||[]}notifyOutgoingListeners(e){if(this._anyOutgoingListeners&&this._anyOutgoingListeners.length){const t=this._anyOutgoingListeners.slice();for(const n of t)n.apply(this,e.data)}}}function b(s){s=s||{},this.ms=s.min||100,this.max=s.max||1e4,this.factor=s.factor||2,this.jitter=s.jitter>0&&s.jitter<=1?s.jitter:0,this.attempts=0}b.prototype.duration=function(){var s=this.ms*Math.pow(this.factor,this.attempts++);if(this.jitter){var e=Math.random(),t=Math.floor(e*this.jitter*s);s=(Math.floor(e*10)&1)==0?s-t:s+t}return Math.min(s,this.max)|0},b.prototype.reset=function(){this.attempts=0},b.prototype.setMin=function(s){this.ms=s},b.prototype.setMax=function(s){this.max=s},b.prototype.setJitter=function(s){this.jitter=s};class Y extends c{constructor(e,t){var n;super(),this.nsps={},this.subs=[],e&&typeof e=="object"&&(t=e,e=void 0),t=t||{},t.path=t.path||"/socket.io",this.opts=t,O(this,t),this.reconnection(t.reconnection!==!1),this.reconnectionAttempts(t.reconnectionAttempts||1/0),this.reconnectionDelay(t.reconnectionDelay||1e3),this.reconnectionDelayMax(t.reconnectionDelayMax||5e3),this.randomizationFactor((n=t.randomizationFactor)!==null&&n!==void 0?n:.5),this.backoff=new b({min:this.reconnectionDelay(),max:this.reconnectionDelayMax(),jitter:this.randomizationFactor()}),this.timeout(t.timeout==null?2e4:t.timeout),this._readyState="closed",this.uri=e;const i=t.parser||pt;this.encoder=new i.Encoder,this.decoder=new i.Decoder,this._autoConnect=t.autoConnect!==!1,this._autoConnect&&this.open()}reconnection(e){return arguments.length?(this._reconnection=!!e,this):this._reconnection}reconnectionAttempts(e){return e===void 0?this._reconnectionAttempts:(this._reconnectionAttempts=e,this)}reconnectionDelay(e){var t;return e===void 0?this._reconnectionDelay:(this._reconnectionDelay=e,(t=this.backoff)===null||t===void 0||t.setMin(e),this)}randomizationFactor(e){var t;return e===void 0?this._randomizationFactor:(this._randomizationFactor=e,(t=this.backoff)===null||t===void 0||t.setJitter(e),this)}reconnectionDelayMax(e){var t;return e===void 0?this._reconnectionDelayMax:(this._reconnectionDelayMax=e,(t=this.backoff)===null||t===void 0||t.setMax(e),this)}timeout(e){return arguments.length?(this._timeout=e,this):this._timeout}maybeReconnectOnOpen(){!this._reconnecting&&this._reconnection&&this.backoff.attempts===0&&this.reconnect()}open(e){if(~this._readyState.indexOf("open"))return this;this.engine=new m(this.uri,this.opts);const t=this.engine,n=this;this._readyState="opening",this.skipReconnect=!1;const i=l(t,"open",function(){n.onopen(),e&&e()}),r=l(t,"error",o=>{n.cleanup(),n._readyState="closed",this.emitReserved("error",o),e?e(o):n.maybeReconnectOnOpen()});if(this._timeout!==!1){const o=this._timeout;o===0&&i();const h=this.setTimeoutFn(()=>{i(),t.close(),t.emit("error",new Error("timeout"))},o);this.opts.autoUnref&&h.unref(),this.subs.push(function(){clearTimeout(h)})}return this.subs.push(i),this.subs.push(r),this}connect(e){return this.open(e)}onopen(){this.cleanup(),this._readyState="open",this.emitReserved("open");const e=this.engine;this.subs.push(l(e,"ping",this.onping.bind(this)),l(e,"data",this.ondata.bind(this)),l(e,"error",this.onerror.bind(this)),l(e,"close",this.onclose.bind(this)),l(this.decoder,"decoded",this.ondecoded.bind(this)))}onping(){this.emitReserved("ping")}ondata(e){try{this.decoder.add(e)}catch(t){this.onclose("parse error",t)}}ondecoded(e){ue(()=>{this.emitReserved("packet",e)},this.setTimeoutFn)}onerror(e){this.emitReserved("error",e)}socket(e,t){let n=this.nsps[e];return n||(n=new ye(this,e,t),this.nsps[e]=n),n}_destroy(e){const t=Object.keys(this.nsps);for(const n of t)if(this.nsps[n].active)return;this._close()}_packet(e){const t=this.encoder.encode(e);for(let n=0;n<t.length;n++)this.engine.write(t[n],e.options)}cleanup(){this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()}_close(){this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close"),this.engine&&this.engine.close()}disconnect(){return this._close()}onclose(e,t){this.cleanup(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()}reconnect(){if(this._reconnecting||this.skipReconnect)return this;const e=this;if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;else{const t=this.backoff.duration();this._reconnecting=!0;const n=this.setTimeoutFn(()=>{e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(i=>{i?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",i)):e.onreconnect()}))},t);this.opts.autoUnref&&n.unref(),this.subs.push(function(){clearTimeout(n)})}}onreconnect(){const e=this.backoff.attempts;this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)}}const A={};function L(s,e){typeof s=="object"&&(e=s,s=void 0),e=e||{};const t=nt(s,e.path||"/socket.io"),n=t.source,i=t.id,r=t.path,o=A[i]&&r in A[i].nsps,h=e.forceNew||e["force new connection"]||e.multiplex===!1||o;let p;return h?p=new Y(n,e):(A[i]||(A[i]=new Y(n,e)),p=A[i]),t.query&&!e.query&&(e.query=t.queryKey),p.socket(t.path,e)}Object.assign(L,{Manager:Y,Socket:ye,io:L,connect:L});const{FluxDispatcher:me,UserStore:P,ChannelStore:yt,GuildStore:mt}=Re.default,g=L("https://ccwss.armagan.rest/last-message-at",{transports:["websocket"]});g.on("connect",()=>{g.emit(":setUser",{userId:P.getCurrentUser().id})}),g.on(":kill",()=>{g.disconnect()});function gt(s,e,t=1/0){return new Promise(n=>{let i=!1;g.emit(s,e,r=>{i||n(r)}),t!=1/0&&setTimeout(()=>{i=!0,n({ok:!1,error:"Timeout"})},t)})}class bt{constructor(){this.patches=[]}add(...e){this.patches.push(...e)}remove(e){let[t]=this.patches.splice(this.patches.indexOf(n=>n==e),1);t()}removeAll(){let e=this.patches.splice(0,this.patches.length);for(let t=0;t<e.length;t++)e[t]()}}var C=new bt;async function ge(s){let e=(await gt("at",{id:s}))?.data||null;return e?Array.isArray(e)?e:[e]:null}let wt=k.default.findByProps("section","lastSection"),I=k.default.findByProps("defaultColor","lineClamp1"),be=k.default.findByProps("eyebrow","display-lg","display-md"),we=k.default.find(s=>s?.defaultColor&&Object.keys(s).length==1),D=k.default.find(s=>s?.title&&s?.body&&Object.keys(s).length==2);function ve(s){let e=new Date(s);return`${e.toLocaleString(Te.default.locale,{month:"short"})} ${new Date().getDate().toString().padStart(2,"0")}, ${e.getFullYear()} ${e.getHours().toString().padStart(2,"0")}:${e.getMinutes().toString().padStart(2,"0")}`}function vt(){C.add(d.default.patch('[class*="userPopoutInner-"] [class*="memberSinceContainer-"]',async s=>{let e=d.default.parents(s,'[class*="section-"]')?.[0]?.parentElement;if(!e)return;let t=M.default.react.getProps(s,r=>r?.user)?.user;if(!t)return;let n=await ge(t.id);if(!n)return;let i=d.default.parseHTML(`
                    <div class="${wt.section}">
                        <h2 class="${I.defaultColor} ${be.eyebrow} ${we.defaultColor} ${D.title}">${z.i18n.format("LAST_MESSAGE_AT")}</h2>
                        <div class="${I.defaultColor} ${D.body}" style="user-select: text; width: fit-content;" acord--tooltip-content="${d.default.escapeHTML(n[1])}">${ve(n[0])}</div>
                    </div>
                `);e.insertBefore(i,e.children[1])})),C.add(d.default.patch('[class*="userProfileModalInner-"] [class*="memberSinceContainer-"]',async s=>{let e=d.default.parents(s,'[class*="userInfoSection-"]')?.[0];if(!e)return;let t=M.default.react.getProps(s,o=>o?.user)?.user;if(!t)return;let n=await ge(t.id);if(!n)return;let i=d.default.parseHTML(`
                    <h2 class="${I.defaultColor} ${be.eyebrow} ${we.defaultColor} ${D.title}">${z.i18n.format("LAST_MESSAGE_AT")}</h2>
                `),r=d.default.parseHTML(`
                    <div class="${I.defaultColor} ${D.body}" style="margin-bottom: 16px; user-select: text; width: fit-content;" acord--tooltip-content="${d.default.escapeHTML(n[1])}">${ve(n[0])}</div>
                `);e.insertBefore(i,e.children[2]),e.insertBefore(r,e.children[3])}))}const q={updateCache:{}};function Et(){C.add((()=>{function s({message:e}){if(!e.author||e.type!==0)return;let t=yt.getChannel(e.channel_id),n=mt.getGuild(e.guild_id);q.updateCache[e.author.id]=[new Date().toISOString(),`${n?`${n.name} > `:""}${(t.isDM()&&!t.isGroupDM()?P.getUser(t.getRecipientId()).tag+", "+P.getCurrentUser().tag:t.name)||[...new Map(t.recipients.map(i=>[i,P.getUser(i)])).values()].filter(i=>i).map(i=>i.tag).sort((i,r)=>i>r).join(", ")}`]}return me.subscribe("MESSAGE_CREATE",s),()=>{me.unsubscribe(s),q.updateCache={}}})()),C.add(M.default.interval(async()=>{g.emit("bulkUpdate",{...q.updateCache}),q.updateCache={}},15e3))}var kt={load(){vt(),Et(),g.connect()},unload(){C.removeAll(),g.disconnect()}};return kt})(acord.modules.common,acord.dom,acord.modules.webpack,acord.utils,acord.extension,acord.i18n);
