
//#region @acord
declare module "@acord" { export = main } 

//#region dev
declare module "@acord/dev" { export = ____0p4l88e8l7i } 

function ____05688sg63bgc(...args: any[]): Promise<void>;
declare module "@acord/dev/unload" { export = ____05688sg63bgc; }

const ____0p4l88e8l7i = { unload: ____05688sg63bgc }
//#endregion

//#region dom
declare module "@acord/dom" { export = ____07v85jkb403l } 

function ____0lgnuioj9lu(...args: any[]): any;
declare module "@acord/dom/createElement" { export = ____0lgnuioj9lu; }

function ____04wwb0mf92ca(...args: any[]): any;
declare module "@acord/dom/parseHTML" { export = ____04wwb0mf92ca; }

function ____0sckv67eflhr(...args: any[]): any;
declare module "@acord/dom/parents" { export = ____0sckv67eflhr; }

function ____0jt462gr0vhu(...args: any[]): any;
declare module "@acord/dom/escapeHTML" { export = ____0jt462gr0vhu; }

function ____0drqgm8u42fi(...args: any[]): any;
declare module "@acord/dom/toCSSProp" { export = ____0drqgm8u42fi; }

function ____01mjt7utr52tn(...args: any[]): any;
declare module "@acord/dom/toHTMLProps" { export = ____01mjt7utr52tn; }

const ____07v85jkb403l = { createElement: ____0lgnuioj9lu, parseHTML: ____04wwb0mf92ca, parents: ____0sckv67eflhr, escapeHTML: ____0jt462gr0vhu, toCSSProp: ____0drqgm8u42fi, toHTMLProps: ____01mjt7utr52tn }
//#endregion

//#region events
declare module "@acord/events" { export = ____0w15lenprqpl } 

function ____0cff70wtnev(...args: any[]): any;
declare module "@acord/events/emit" { export = ____0cff70wtnev; }

function ____0jpikthnidg(...args: any[]): any;
declare module "@acord/events/off" { export = ____0jpikthnidg; }

function ____0v85jqkfurrk(...args: any[]): any;
declare module "@acord/events/on" { export = ____0v85jqkfurrk; }

function ____01q4tavemcirf(...args: any[]): any;
declare module "@acord/events/once" { export = ____01q4tavemcirf; }

const ____0w15lenprqpl = { emit: ____0cff70wtnev, off: ____0jpikthnidg, on: ____0v85jqkfurrk, once: ____01q4tavemcirf }
//#endregion

//#region extensions
declare module "@acord/extensions" { export = ____0i6d8venb30o } 

function ____0mu9noa2t9c6(...args: any[]): any;
declare module "@acord/extensions/evaluate" { export = ____0mu9noa2t9c6; }

function ____0nf0nckcu69i(...args: any[]): any;
declare module "@acord/extensions/load" { export = ____0nf0nckcu69i; }

//#region nests
declare module "@acord/extensions/nests" { export = ____0lrgodwr3p5f } 

//#region loaded
declare module "@acord/extensions/nests/loaded" { export = ____04ndant15u5v } 

//#region ghost
declare module "@acord/extensions/nests/loaded/ghost" { export = ____0j07epmqjnlq } 

const ____0j07epmqjnlq = {  }
//#endregion

//#region store
declare module "@acord/extensions/nests/loaded/store" { export = ____0sg5dro9qlv } 

const ____0sg5dro9qlv = {  }
//#endregion

const ____04ndant15u5v = { ghost: ____0j07epmqjnlq, store: ____0sg5dro9qlv }
//#endregion

//#region enabled
declare module "@acord/extensions/nests/enabled" { export = ____000v9pf6jrq3c } 

//#region ghost
declare module "@acord/extensions/nests/enabled/ghost" { export = ____01487bppsu1cm } 

const ____01487bppsu1cm = {  }
//#endregion

//#region store
declare module "@acord/extensions/nests/enabled/store" { export = ____0vk1ef88o4pq } 

const ____0vk1ef88o4pq = {  }
//#endregion

const ____000v9pf6jrq3c = { ghost: ____01487bppsu1cm, store: ____0vk1ef88o4pq }
//#endregion

const ____0lrgodwr3p5f = { loaded: ____04ndant15u5v, enabled: ____000v9pf6jrq3c }
//#endregion

function ____0n4uibl67he(...args: any[]): any;
declare module "@acord/extensions/reload" { export = ____0n4uibl67he; }

function ____0skes06fvq1a(...args: any[]): any;
declare module "@acord/extensions/reloadAll" { export = ____0skes06fvq1a; }

function ____0o02t06f7kwt(...args: any[]): any;
declare module "@acord/extensions/remove" { export = ____0o02t06f7kwt; }

function ____003r5pam74e92d(...args: any[]): any;
declare module "@acord/extensions/start" { export = ____003r5pam74e92d; }

function ____0wji14wp3ju3(...args: any[]): any;
declare module "@acord/extensions/startAll" { export = ____0wji14wp3ju3; }

function ____00n0vhsjsnj6k(...args: any[]): any;
declare module "@acord/extensions/stop" { export = ____00n0vhsjsnj6k; }

function ____0ome1gqe1pe(...args: any[]): any;
declare module "@acord/extensions/stopAll" { export = ____0ome1gqe1pe; }

function ____0tlh352amwb(...args: any[]): any;
declare module "@acord/extensions/toggle" { export = ____0tlh352amwb; }

const ____0i6d8venb30o = { evaluate: ____0mu9noa2t9c6, load: ____0nf0nckcu69i, nests: ____0lrgodwr3p5f, reload: ____0n4uibl67he, reloadAll: ____0skes06fvq1a, remove: ____0o02t06f7kwt, start: ____003r5pam74e92d, startAll: ____0wji14wp3ju3, stop: ____00n0vhsjsnj6k, stopAll: ____0ome1gqe1pe, toggle: ____0tlh352amwb }
//#endregion

//#region i18n
declare module "@acord/i18n" { export = ____0fltie6e5opv } 

//#region messages
declare module "@acord/i18n/messages" { export = ____0qfutukfbpvd } 

const ____0qfutukfbpvd = {  }
//#endregion

function ____096jlw948e6j(...args: any[]): any;
declare module "@acord/i18n/format" { export = ____096jlw948e6j; }

const ____01hkrsk3twb7a = "en_US"
declare module "@acord/i18n/locale" { export = ____01hkrsk3twb7a; }

const ____0fltie6e5opv = { messages: ____0qfutukfbpvd, format: ____096jlw948e6j, locale: ____01hkrsk3twb7a }
//#endregion

//#region modules
declare module "@acord/modules" { export = ____0f25980rrbw } 

//#region common
declare module "@acord/modules/common" { export = ____0prsaikoqlct } 

//#region GuildStore
declare module "@acord/modules/common/GuildStore" { export = ____0qqi0l1j3kls } 

function ____03wfj6g0wh8e(...args: any[]): any;
declare module "@acord/modules/common/GuildStore/getGuild" { export = ____03wfj6g0wh8e; }

function ____01drqm17aw3v(...args: any[]): any;
declare module "@acord/modules/common/GuildStore/getGuildCount" { export = ____01drqm17aw3v; }

function ____0eslbjlco0ig(...args: any[]): any;
declare module "@acord/modules/common/GuildStore/getGuilds" { export = ____0eslbjlco0ig; }

function ____02q9gifrkj6v(...args: any[]): any;
declare module "@acord/modules/common/GuildStore/__getLocalVars" { export = ____02q9gifrkj6v; }

const ____0qqi0l1j3kls = { getGuild: ____03wfj6g0wh8e, getGuildCount: ____01drqm17aw3v, getGuilds: ____0eslbjlco0ig, __getLocalVars: ____02q9gifrkj6v }
//#endregion

//#region ActivityStore
declare module "@acord/modules/common/ActivityStore" { export = ____0weotrv2ln59 } 

function ____04gnav9wmh52(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/findActivity" { export = ____04gnav9wmh52; }

function ____0snswns6hmke(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getActivities" { export = ____0snswns6hmke; }

function ____0q8e0lo0td2(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getActivityMetadata" { export = ____0q8e0lo0td2; }

function ____0r0kitr88mvo(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getAllApplicationActivities" { export = ____0r0kitr88mvo; }

function ____04s9mm9ps1vd(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getPrimaryActivity" { export = ____04s9mm9ps1vd; }

function ____00l0h8sjbo5h(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getState" { export = ____00l0h8sjbo5h; }

function ____08lgl62q9je3(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getStatus" { export = ____08lgl62q9je3; }

function ____0w2p5w80vb47(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/getUserIds" { export = ____0w2p5w80vb47; }

function ____0sbktufvinua(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/isMobileOnline" { export = ____0sbktufvinua; }

function ____0ahfmkf92noe(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/setCurrentUserOnConnectionOpen" { export = ____0ahfmkf92noe; }

function ____074893s7mdo9(...args: any[]): any;
declare module "@acord/modules/common/ActivityStore/__getLocalVars" { export = ____074893s7mdo9; }

const ____0weotrv2ln59 = { findActivity: ____04gnav9wmh52, getActivities: ____0snswns6hmke, getActivityMetadata: ____0q8e0lo0td2, getAllApplicationActivities: ____0r0kitr88mvo, getPrimaryActivity: ____04s9mm9ps1vd, getState: ____00l0h8sjbo5h, getStatus: ____08lgl62q9je3, getUserIds: ____0w2p5w80vb47, isMobileOnline: ____0sbktufvinua, setCurrentUserOnConnectionOpen: ____0ahfmkf92noe, __getLocalVars: ____074893s7mdo9 }
//#endregion

function ____02mo5l8fosd9d(...args: any[]): any;
declare module "@acord/modules/common/Button" { export = ____02mo5l8fosd9d; }

//#region ChannelStore
declare module "@acord/modules/common/ChannelStore" { export = ____0iqall8gso1i } 

function ____0owgli5stlnl(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getAllThreadsForParent" { export = ____0owgli5stlnl; }

function ____0hpbqjjbu7o3(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getBasicChannel" { export = ____0hpbqjjbu7o3; }

function ____0jg0f79a31ol(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getCachedChannelJsonForGuild" { export = ____0jg0f79a31ol; }

function ____05enaidr8kmh(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getChannel" { export = ____05enaidr8kmh; }

function ____0uvarutjraie(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getDMFromUserId" { export = ____0uvarutjraie; }

function ____0gp2nij7t4go(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getDMUserIds" { export = ____0gp2nij7t4go; }

function ____0dwjvkhpk4lf(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getGuildChannelsVersion" { export = ____0dwjvkhpk4lf; }

function ____0hhh0s7tigw(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getInitialOverlayState" { export = ____0hhh0s7tigw; }

function ____09gavrv4e4iv(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getMutableBasicGuildChannelsForGuild" { export = ____09gavrv4e4iv; }

function ____06st92702bpt(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getMutableGuildChannelsForGuild" { export = ____06st92702bpt; }

function ____0u9fj0ucjq14(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getMutablePrivateChannels" { export = ____0u9fj0ucjq14; }

function ____03sdo7s73o7d(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getPrivateChannelsVersion" { export = ____03sdo7s73o7d; }

function ____0s4ge6i17iug(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/getSortedPrivateChannels" { export = ____0s4ge6i17iug; }

function ____0k0t29foh70m(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/hasChannel" { export = ____0k0t29foh70m; }

function ____028h9lknglso(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/hasRestoredGuild" { export = ____028h9lknglso; }

function ____0qfmu8kmjpw(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/loadAllGuildAndPrivateChannelsFromDisk" { export = ____0qfmu8kmjpw; }

function ____021begpc14g0h(...args: any[]): any;
declare module "@acord/modules/common/ChannelStore/__getLocalVars" { export = ____021begpc14g0h; }

const ____0iqall8gso1i = { getAllThreadsForParent: ____0owgli5stlnl, getBasicChannel: ____0hpbqjjbu7o3, getCachedChannelJsonForGuild: ____0jg0f79a31ol, getChannel: ____05enaidr8kmh, getDMFromUserId: ____0uvarutjraie, getDMUserIds: ____0gp2nij7t4go, getGuildChannelsVersion: ____0dwjvkhpk4lf, getInitialOverlayState: ____0hhh0s7tigw, getMutableBasicGuildChannelsForGuild: ____09gavrv4e4iv, getMutableGuildChannelsForGuild: ____06st92702bpt, getMutablePrivateChannels: ____0u9fj0ucjq14, getPrivateChannelsVersion: ____03sdo7s73o7d, getSortedPrivateChannels: ____0s4ge6i17iug, hasChannel: ____0k0t29foh70m, hasRestoredGuild: ____028h9lknglso, loadAllGuildAndPrivateChannelsFromDisk: ____0qfmu8kmjpw, __getLocalVars: ____021begpc14g0h }
//#endregion

//#region DiscordAPI
declare module "@acord/modules/common/DiscordAPI" { export = ____0ci72mwqvbl4 } 

function ____0k71ua9amro7(...args: any[]): any;
declare module "@acord/modules/common/DiscordAPI/delete" { export = ____0k71ua9amro7; }

function ____0b3dqkp4alhc(...args: any[]): any;
declare module "@acord/modules/common/DiscordAPI/get" { export = ____0b3dqkp4alhc; }

function ____0au31hauubdu(...args: any[]): any;
declare module "@acord/modules/common/DiscordAPI/patch" { export = ____0au31hauubdu; }

function ____0fr4r59376ns(...args: any[]): any;
declare module "@acord/modules/common/DiscordAPI/post" { export = ____0fr4r59376ns; }

function ____0w2t3kp45f6(...args: any[]): any;
declare module "@acord/modules/common/DiscordAPI/put" { export = ____0w2t3kp45f6; }

const ____0ci72mwqvbl4 = { delete: ____0k71ua9amro7, get: ____0b3dqkp4alhc, patch: ____0au31hauubdu, post: ____0fr4r59376ns, put: ____0w2t3kp45f6 }
//#endregion

//#region Flux
declare module "@acord/modules/common/Flux" { export = ____0ouvng161av } 

const ____0ouvng161av = {  }
//#endregion

//#region FluxDispatcher
declare module "@acord/modules/common/FluxDispatcher" { export = ____0wtk25urhgrs } 

function ____0g27fjnpl2dj(...args: any[]): any;
declare module "@acord/modules/common/FluxDispatcher/subscribe" { export = ____0g27fjnpl2dj; }

function ____0c9me5nujvou(...args: any[]): any;
declare module "@acord/modules/common/FluxDispatcher/unsubscribe" { export = ____0c9me5nujvou; }

function ____0vk6oah3frp(...args: any[]): any;
declare module "@acord/modules/common/FluxDispatcher/dispatch" { export = ____0vk6oah3frp; }

const ____0wtk25urhgrs = { subscribe: ____0g27fjnpl2dj, unsubscribe: ____0c9me5nujvou, dispatch: ____0vk6oah3frp }
//#endregion

//#region GuildMemberStore
declare module "@acord/modules/common/GuildMemberStore" { export = ____0001vwfqeobe6ig } 

function ____0wwde736on4l(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getCommunicationDisabledUserMap" { export = ____0wwde736on4l; }

function ____0i1jg8c1pffr(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getCommunicationDisabledVersion" { export = ____0i1jg8c1pffr; }

function ____00e3m4ovpa47i(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getMember" { export = ____00e3m4ovpa47i; }

function ____027kfjsnjgrkf(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getMemberIds" { export = ____027kfjsnjgrkf; }

function ____0jcv6r6qmnmj(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getMembers" { export = ____0jcv6r6qmnmj; }

function ____0cvtj51coqac(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getMutableAllGuildsAndMembers" { export = ____0cvtj51coqac; }

function ____02wninqc6mck(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getNick" { export = ____02wninqc6mck; }

function ____0ag57u5t4bop(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getNicknameGuildsMapping" { export = ____0ag57u5t4bop; }

function ____0bqdedjbnqva(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getNicknames" { export = ____0bqdedjbnqva; }

function ____00b2guoqqb2nh(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/getSelfMember" { export = ____00b2guoqqb2nh; }

function ____0ngvtpcc17gh(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/initialize" { export = ____0ngvtpcc17gh; }

function ____0jwv4i5lukpb(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/isMember" { export = ____0jwv4i5lukpb; }

function ____0ubo3lo2k1ip(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/memberOf" { export = ____0ubo3lo2k1ip; }

function ____0wfpt24dbo95(...args: any[]): any;
declare module "@acord/modules/common/GuildMemberStore/__getLocalVars" { export = ____0wfpt24dbo95; }

const ____0001vwfqeobe6ig = { getCommunicationDisabledUserMap: ____0wwde736on4l, getCommunicationDisabledVersion: ____0i1jg8c1pffr, getMember: ____00e3m4ovpa47i, getMemberIds: ____027kfjsnjgrkf, getMembers: ____0jcv6r6qmnmj, getMutableAllGuildsAndMembers: ____0cvtj51coqac, getNick: ____02wninqc6mck, getNicknameGuildsMapping: ____0ag57u5t4bop, getNicknames: ____0bqdedjbnqva, getSelfMember: ____00b2guoqqb2nh, initialize: ____0ngvtpcc17gh, isMember: ____0jwv4i5lukpb, memberOf: ____0ubo3lo2k1ip, __getLocalVars: ____0wfpt24dbo95 }
//#endregion

//#region InviteStore
declare module "@acord/modules/common/InviteStore" { export = ____0bqi5q7p60gs } 

function ____0abiisi6fp52(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/acceptInvite" { export = ____0abiisi6fp52; }

function ____08w74w4scd3j(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/acceptInviteAndTransitionToInviteChannel" { export = ____08w74w4scd3j; }

function ____0rf72pol6jnm(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/createFriendInvite" { export = ____0rf72pol6jnm; }

function ____0p83v6j1ee1r(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/createInvite" { export = ____0p83v6j1ee1r; }

function ____06wkaf1oplnf(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/getAllFriendInvites" { export = ____06wkaf1oplnf; }

function ____0hi531k43mg(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/getInviteContext" { export = ____0hi531k43mg; }

function ____0q1ii0kdw7e(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/openApp" { export = ____0q1ii0kdw7e; }

function ____0mjdolcl5ts(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/openNativeAppModal" { export = ____0mjdolcl5ts; }

function ____0kint75oebfc(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/resolveInvite" { export = ____0kint75oebfc; }

function ____0fa3jq2arbg(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/revokeFriendInvites" { export = ____0fa3jq2arbg; }

function ____0k0boo1fddm4(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/revokeInvite" { export = ____0k0boo1fddm4; }

function ____0uenrknb7f8o(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/transitionToInvite" { export = ____0uenrknb7f8o; }

function ____0k4k5ism0q8(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/transitionToInviteChannelSync" { export = ____0k4k5ism0q8; }

function ____0j0hvm8qi69s(...args: any[]): any;
declare module "@acord/modules/common/InviteStore/transitionToInviteSync" { export = ____0j0hvm8qi69s; }

const ____0bqi5q7p60gs = { acceptInvite: ____0abiisi6fp52, acceptInviteAndTransitionToInviteChannel: ____08w74w4scd3j, createFriendInvite: ____0rf72pol6jnm, createInvite: ____0p83v6j1ee1r, getAllFriendInvites: ____06wkaf1oplnf, getInviteContext: ____0hi531k43mg, openApp: ____0q1ii0kdw7e, openNativeAppModal: ____0mjdolcl5ts, resolveInvite: ____0kint75oebfc, revokeFriendInvites: ____0fa3jq2arbg, revokeInvite: ____0k0boo1fddm4, transitionToInvite: ____0uenrknb7f8o, transitionToInviteChannelSync: ____0k4k5ism0q8, transitionToInviteSync: ____0j0hvm8qi69s }
//#endregion

function ____032dem2qstqv(...args: any[]): any;
declare module "@acord/modules/common/Markdown" { export = ____032dem2qstqv; }

//#region MessageStore
declare module "@acord/modules/common/MessageStore" { export = ____0qjmlkcjvt45 } 

function ____0hea2tg48pr5(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/focusedMessageId" { export = ____0hea2tg48pr5; }

function ____032ocu6uowaa(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/getLastCommandMessage" { export = ____032ocu6uowaa; }

function ____0jpfl2l70am3(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/getLastEditableMessage" { export = ____0jpfl2l70am3; }

function ____008nr6tpq19t9(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/getMessage" { export = ____008nr6tpq19t9; }

function ____05icm9mtqslk(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/getMessages" { export = ____05icm9mtqslk; }

function ____0dvu2wscmmtt(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/getRawMessages" { export = ____0dvu2wscmmtt; }

function ____0cte9730kwmh(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/hasCurrentUserSentMessage" { export = ____0cte9730kwmh; }

function ____0rai68j1031m(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/hasPresent" { export = ____0rai68j1031m; }

function ____04kds5u99979(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/initialize" { export = ____04kds5u99979; }

function ____05jas7i356j2(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/isLoadingMessages" { export = ____05jas7i356j2; }

function ____0cmrfsdwnf5v(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/jumpedMessageId" { export = ____0cmrfsdwnf5v; }

function ____08c0er01osos(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/whenReady" { export = ____08c0er01osos; }

function ____00qkaaporqb59(...args: any[]): any;
declare module "@acord/modules/common/MessageStore/__getLocalVars" { export = ____00qkaaporqb59; }

const ____0qjmlkcjvt45 = { focusedMessageId: ____0hea2tg48pr5, getLastCommandMessage: ____032ocu6uowaa, getLastEditableMessage: ____0jpfl2l70am3, getMessage: ____008nr6tpq19t9, getMessages: ____05icm9mtqslk, getRawMessages: ____0dvu2wscmmtt, hasCurrentUserSentMessage: ____0cte9730kwmh, hasPresent: ____0rai68j1031m, initialize: ____04kds5u99979, isLoadingMessages: ____05jas7i356j2, jumpedMessageId: ____0cmrfsdwnf5v, whenReady: ____08c0er01osos, __getLocalVars: ____00qkaaporqb59 }
//#endregion

//#region NoteStore
declare module "@acord/modules/common/NoteStore" { export = ____0wj2v585vuga } 

function ____03vos82cdaj8(...args: any[]): any;
declare module "@acord/modules/common/NoteStore/getNote" { export = ____03vos82cdaj8; }

function ____0fmwwa5io05l(...args: any[]): any;
declare module "@acord/modules/common/NoteStore/__getLocalVars" { export = ____0fmwwa5io05l; }

const ____0wj2v585vuga = { getNote: ____03vos82cdaj8, __getLocalVars: ____0fmwwa5io05l }
//#endregion

//#region PermissionStore
declare module "@acord/modules/common/PermissionStore" { export = ____0c7q6gioovlh } 

function ____0hep7mhglhpm(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/can" { export = ____0hep7mhglhpm; }

function ____0cvnucfnghbj(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/canAccessGuildSettings" { export = ____0cvnucfnghbj; }

function ____04nbnlb2pngk(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/canManageUser" { export = ____04nbnlb2pngk; }

function ____0af7vmgbi1g2(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/canWithPartialContext" { export = ____0af7vmgbi1g2; }

function ____0h763qvwrdu(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/computePermissions" { export = ____0h763qvwrdu; }

function ____0qfa436j0mi8(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/getChannelPermissions" { export = ____0qfa436j0mi8; }

function ____0rvgbt2voiva(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/getChannelsVersion" { export = ____0rvgbt2voiva; }

function ____0ogqcte5rut(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/getGuildPermissionProps" { export = ____0ogqcte5rut; }

function ____0ijw5w71drv(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/getGuildPermissions" { export = ____0ijw5w71drv; }

function ____0fb7kr9rmnrd(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/getGuildVersion" { export = ____0fb7kr9rmnrd; }

function ____0kplfu30u5cp(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/getHighestRole" { export = ____0kplfu30u5cp; }

function ____0l2quiq8jv0f(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/initialize" { export = ____0l2quiq8jv0f; }

function ____0do5roer3hp7(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/isRoleHigher" { export = ____0do5roer3hp7; }

function ____0vnwwmslch9t(...args: any[]): any;
declare module "@acord/modules/common/PermissionStore/__getLocalVars" { export = ____0vnwwmslch9t; }

const ____0c7q6gioovlh = { can: ____0hep7mhglhpm, canAccessGuildSettings: ____0cvnucfnghbj, canManageUser: ____04nbnlb2pngk, canWithPartialContext: ____0af7vmgbi1g2, computePermissions: ____0h763qvwrdu, getChannelPermissions: ____0qfa436j0mi8, getChannelsVersion: ____0rvgbt2voiva, getGuildPermissionProps: ____0ogqcte5rut, getGuildPermissions: ____0ijw5w71drv, getGuildVersion: ____0fb7kr9rmnrd, getHighestRole: ____0kplfu30u5cp, initialize: ____0l2quiq8jv0f, isRoleHigher: ____0do5roer3hp7, __getLocalVars: ____0vnwwmslch9t }
//#endregion

//#region React
declare module "@acord/modules/common/React" { export = ____08lwph7li4t2 } 

function ____0ne8kiq1wnqs(...args: any[]): any;
declare module "@acord/modules/common/React/cloneElement" { export = ____0ne8kiq1wnqs; }

function ____0j9e3aj2qash(...args: any[]): any;
declare module "@acord/modules/common/React/createContext" { export = ____0j9e3aj2qash; }

function ____0wkj6vsk7t98(...args: any[]): any;
declare module "@acord/modules/common/React/createElement" { export = ____0wkj6vsk7t98; }

function ____0ngs6k8a12bj(...args: any[]): any;
declare module "@acord/modules/common/React/createFactory" { export = ____0ngs6k8a12bj; }

function ____0p0rjup6758u(...args: any[]): any;
declare module "@acord/modules/common/React/createRef" { export = ____0p0rjup6758u; }

function ____0w2ifdq7vge6(...args: any[]): any;
declare module "@acord/modules/common/React/forwardRef" { export = ____0w2ifdq7vge6; }

function ____0h650f94vvec(...args: any[]): any;
declare module "@acord/modules/common/React/isValidElement" { export = ____0h650f94vvec; }

function ____0n6r98j36i2(...args: any[]): any;
declare module "@acord/modules/common/React/lazy" { export = ____0n6r98j36i2; }

function ____00gqbhcq9cen(...args: any[]): any;
declare module "@acord/modules/common/React/memo" { export = ____00gqbhcq9cen; }

function ____0adh1qh4w2p6(...args: any[]): any;
declare module "@acord/modules/common/React/useCallback" { export = ____0adh1qh4w2p6; }

function ____07bqgsa4aolq(...args: any[]): any;
declare module "@acord/modules/common/React/useContext" { export = ____07bqgsa4aolq; }

function ____0sqsur6hk65u(...args: any[]): any;
declare module "@acord/modules/common/React/useDebugValue" { export = ____0sqsur6hk65u; }

function ____0svgj8n9bao8(...args: any[]): any;
declare module "@acord/modules/common/React/useEffect" { export = ____0svgj8n9bao8; }

function ____0v8kqpw8chc8(...args: any[]): any;
declare module "@acord/modules/common/React/useImperativeHandle" { export = ____0v8kqpw8chc8; }

function ____0247k4aokdow(...args: any[]): any;
declare module "@acord/modules/common/React/useLayoutEffect" { export = ____0247k4aokdow; }

function ____0la3ln9f8rn5(...args: any[]): any;
declare module "@acord/modules/common/React/useMemo" { export = ____0la3ln9f8rn5; }

function ____01a5cnti3lefk(...args: any[]): any;
declare module "@acord/modules/common/React/useReducer" { export = ____01a5cnti3lefk; }

function ____0bkelwrqq686(...args: any[]): any;
declare module "@acord/modules/common/React/useRef" { export = ____0bkelwrqq686; }

function ____0k6uq4u4vl06(...args: any[]): any;
declare module "@acord/modules/common/React/useState" { export = ____0k6uq4u4vl06; }

const ____08lwph7li4t2 = { cloneElement: ____0ne8kiq1wnqs, createContext: ____0j9e3aj2qash, createElement: ____0wkj6vsk7t98, createFactory: ____0ngs6k8a12bj, createRef: ____0p0rjup6758u, forwardRef: ____0w2ifdq7vge6, isValidElement: ____0h650f94vvec, lazy: ____0n6r98j36i2, memo: ____00gqbhcq9cen, useCallback: ____0adh1qh4w2p6, useContext: ____07bqgsa4aolq, useDebugValue: ____0sqsur6hk65u, useEffect: ____0svgj8n9bao8, useImperativeHandle: ____0v8kqpw8chc8, useLayoutEffect: ____0247k4aokdow, useMemo: ____0la3ln9f8rn5, useReducer: ____01a5cnti3lefk, useRef: ____0bkelwrqq686, useState: ____0k6uq4u4vl06 }
//#endregion

//#region ReactDOM
declare module "@acord/modules/common/ReactDOM" { export = ____0e61dcdd2fck } 

const ____0e61dcdd2fck = {  }
//#endregion

//#region RelationshipStore
declare module "@acord/modules/common/RelationshipStore" { export = ____0o2c97iv2asu } 

function ____04dffs2u9afb(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/getFriendIDs" { export = ____04dffs2u9afb; }

function ____0rtw28lcndod(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/getNickname" { export = ____0rtw28lcndod; }

function ____08ln0aadvkqc(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/getPendingCount" { export = ____08ln0aadvkqc; }

function ____03h5riplgiawi(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/getRelationshipCount" { export = ____03h5riplgiawi; }

function ____0tat966mn2pb(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/getRelationshipType" { export = ____0tat966mn2pb; }

function ____09w911vroav4(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/getRelationships" { export = ____09w911vroav4; }

function ____060vf86euoa8(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/initialize" { export = ____060vf86euoa8; }

function ____059opciqaf41(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/isBlocked" { export = ____059opciqaf41; }

function ____0l28pt341ot(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/isFriend" { export = ____0l28pt341ot; }

function ____0k6vemco2rf7(...args: any[]): any;
declare module "@acord/modules/common/RelationshipStore/__getLocalVars" { export = ____0k6vemco2rf7; }

const ____0o2c97iv2asu = { getFriendIDs: ____04dffs2u9afb, getNickname: ____0rtw28lcndod, getPendingCount: ____08ln0aadvkqc, getRelationshipCount: ____03h5riplgiawi, getRelationshipType: ____0tat966mn2pb, getRelationships: ____09w911vroav4, initialize: ____060vf86euoa8, isBlocked: ____059opciqaf41, isFriend: ____0l28pt341ot, __getLocalVars: ____0k6vemco2rf7 }
//#endregion

//#region Router
declare module "@acord/modules/common/Router" { export = ____03u3s91u49qw } 

function ____040rabafmnntg(...args: any[]): any;
declare module "@acord/modules/common/Router/replaceWith" { export = ____040rabafmnntg; }

function ____08c8mmjtua3m(...args: any[]): any;
declare module "@acord/modules/common/Router/transitionTo" { export = ____08c8mmjtua3m; }

function ____0260cqm2ja9ue(...args: any[]): any;
declare module "@acord/modules/common/Router/transitionToGuild" { export = ____0260cqm2ja9ue; }

const ____03u3s91u49qw = { replaceWith: ____040rabafmnntg, transitionTo: ____08c8mmjtua3m, transitionToGuild: ____0260cqm2ja9ue }
//#endregion

//#region SelectedChannelStore
declare module "@acord/modules/common/SelectedChannelStore" { export = ____0rpbn34ja6ee } 

function ____0v61d52tdia(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getChannelId" { export = ____0v61d52tdia; }

function ____0msafr9i8cwc(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getCurrentlySelectedChannelId" { export = ____0msafr9i8cwc; }

function ____0suvliiqeo4c(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getLastChannelFollowingDestination" { export = ____0suvliiqeo4c; }

function ____0fsvm7q2bspl(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getLastSelectedChannelId" { export = ____0fsvm7q2bspl; }

function ____0w33giw37o3f(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getLastSelectedChannels" { export = ____0w33giw37o3f; }

function ____01ja4wu6pd696(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getMostRecentSelectedTextChannelId" { export = ____01ja4wu6pd696; }

function ____0ggntiv01h5h(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/getVoiceChannelId" { export = ____0ggntiv01h5h; }

function ____022h51smad58(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/initialize" { export = ____022h51smad58; }

function ____0ho2amphmuom(...args: any[]): any;
declare module "@acord/modules/common/SelectedChannelStore/__getLocalVars" { export = ____0ho2amphmuom; }

const ____0rpbn34ja6ee = { getChannelId: ____0v61d52tdia, getCurrentlySelectedChannelId: ____0msafr9i8cwc, getLastChannelFollowingDestination: ____0suvliiqeo4c, getLastSelectedChannelId: ____0fsvm7q2bspl, getLastSelectedChannels: ____0w33giw37o3f, getMostRecentSelectedTextChannelId: ____01ja4wu6pd696, getVoiceChannelId: ____0ggntiv01h5h, initialize: ____022h51smad58, __getLocalVars: ____0ho2amphmuom }
//#endregion

//#region SelectedGuildStore
declare module "@acord/modules/common/SelectedGuildStore" { export = ____03cd1vdec2pbd } 

function ____081nt8b2emlk(...args: any[]): any;
declare module "@acord/modules/common/SelectedGuildStore/getGuildId" { export = ____081nt8b2emlk; }

function ____0al74dtd03e9(...args: any[]): any;
declare module "@acord/modules/common/SelectedGuildStore/getLastSelectedGuildId" { export = ____0al74dtd03e9; }

function ____0off04u6p8in(...args: any[]): any;
declare module "@acord/modules/common/SelectedGuildStore/getLastSelectedTimestamp" { export = ____0off04u6p8in; }

function ____0bdfwmhevs8m(...args: any[]): any;
declare module "@acord/modules/common/SelectedGuildStore/getState" { export = ____0bdfwmhevs8m; }

function ____03uddqa5wp5n(...args: any[]): any;
declare module "@acord/modules/common/SelectedGuildStore/initialize" { export = ____03uddqa5wp5n; }

function ____0491tbs1hs0m(...args: any[]): any;
declare module "@acord/modules/common/SelectedGuildStore/__getLocalVars" { export = ____0491tbs1hs0m; }

const ____03cd1vdec2pbd = { getGuildId: ____081nt8b2emlk, getLastSelectedGuildId: ____0al74dtd03e9, getLastSelectedTimestamp: ____0off04u6p8in, getState: ____0bdfwmhevs8m, initialize: ____03uddqa5wp5n, __getLocalVars: ____0491tbs1hs0m }
//#endregion

//#region SimpleMarkdown
declare module "@acord/modules/common/SimpleMarkdown" { export = ____01a6ak2c9oum } 

function ____02ajhnfc25h6d(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/ReactMarkdown" { export = ____02ajhnfc25h6d; }

function ____0phhqs3iqv6c(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/anyScopeRegex" { export = ____0phhqs3iqv6c; }

function ____0prqen29ofqj(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/blockRegex" { export = ____0prqen29ofqj; }

function ____043iwrta5d1e(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultBlockParse" { export = ____043iwrta5d1e; }

function ____0g2e0qsk2ow8(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultHtmlOutput" { export = ____0g2e0qsk2ow8; }

function ____0q1ekdgqvae(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultImplicitParse" { export = ____0q1ekdgqvae; }

function ____0usg7v90n3l5(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultInlineParse" { export = ____0usg7v90n3l5; }

function ____0sn1e42p31a(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultOutput" { export = ____0sn1e42p31a; }

function ____09j8df1r7uus(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultParse" { export = ____09j8df1r7uus; }

function ____08ons5cuno4u(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultRawParse" { export = ____08ons5cuno4u; }

function ____00eeccga8hn7c(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/defaultReactOutput" { export = ____00eeccga8hn7c; }

//#region defaultRules
declare module "@acord/modules/common/SimpleMarkdown/defaultRules" { export = ____01hmvm941vh29 } 

const ____01hmvm941vh29 = {  }
//#endregion

function ____047cfhb90hn8(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/htmlFor" { export = ____047cfhb90hn8; }

function ____007ntdv68a2wq(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/htmlTag" { export = ____007ntdv68a2wq; }

function ____0g562q37rgba(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/inlineRegex" { export = ____0g562q37rgba; }

function ____0u2i6nw7kmuf(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/markdownToHtml" { export = ____0u2i6nw7kmuf; }

function ____04rupj5i2ieh(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/markdownToReact" { export = ____04rupj5i2ieh; }

function ____05at9apnvkbf(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/outputFor" { export = ____05at9apnvkbf; }

function ____0un9049i2dtq(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/parseBlock" { export = ____0un9049i2dtq; }

function ____0l9a65sweuqd(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/parseInline" { export = ____0l9a65sweuqd; }

function ____0ba9tsglo6wr(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/parserFor" { export = ____0ba9tsglo6wr; }

function ____0ek4p8heaua4(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/preprocess" { export = ____0ek4p8heaua4; }

function ____073siipne3w6(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/reactElement" { export = ____073siipne3w6; }

function ____09aeebnrduv7(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/reactFor" { export = ____09aeebnrduv7; }

function ____09h9ukaukvjo(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/ruleOutput" { export = ____09h9ukaukvjo; }

function ____0aq1ftqnuhhd(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/sanitizeText" { export = ____0aq1ftqnuhhd; }

function ____0pfsi02esh5g(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/sanitizeUrl" { export = ____0pfsi02esh5g; }

function ____0o9bvnim111u(...args: any[]): any;
declare module "@acord/modules/common/SimpleMarkdown/unescapeUrl" { export = ____0o9bvnim111u; }

const ____01a6ak2c9oum = { ReactMarkdown: ____02ajhnfc25h6d, anyScopeRegex: ____0phhqs3iqv6c, blockRegex: ____0prqen29ofqj, defaultBlockParse: ____043iwrta5d1e, defaultHtmlOutput: ____0g2e0qsk2ow8, defaultImplicitParse: ____0q1ekdgqvae, defaultInlineParse: ____0usg7v90n3l5, defaultOutput: ____0sn1e42p31a, defaultParse: ____09j8df1r7uus, defaultRawParse: ____08ons5cuno4u, defaultReactOutput: ____00eeccga8hn7c, defaultRules: ____01hmvm941vh29, htmlFor: ____047cfhb90hn8, htmlTag: ____007ntdv68a2wq, inlineRegex: ____0g562q37rgba, markdownToHtml: ____0u2i6nw7kmuf, markdownToReact: ____04rupj5i2ieh, outputFor: ____05at9apnvkbf, parseBlock: ____0un9049i2dtq, parseInline: ____0l9a65sweuqd, parserFor: ____0ba9tsglo6wr, preprocess: ____0ek4p8heaua4, reactElement: ____073siipne3w6, reactFor: ____09aeebnrduv7, ruleOutput: ____09h9ukaukvjo, sanitizeText: ____0aq1ftqnuhhd, sanitizeUrl: ____0pfsi02esh5g, unescapeUrl: ____0o9bvnim111u }
//#endregion

//#region TypingStore
declare module "@acord/modules/common/TypingStore" { export = ____0fwq2whq8h7h } 

function ____0hgpn5oi4uk(...args: any[]): any;
declare module "@acord/modules/common/TypingStore/getTypingUsers" { export = ____0hgpn5oi4uk; }

function ____0jah10lva81o(...args: any[]): any;
declare module "@acord/modules/common/TypingStore/isTyping" { export = ____0jah10lva81o; }

function ____0cifk9cvco48(...args: any[]): any;
declare module "@acord/modules/common/TypingStore/__getLocalVars" { export = ____0cifk9cvco48; }

const ____0fwq2whq8h7h = { getTypingUsers: ____0hgpn5oi4uk, isTyping: ____0jah10lva81o, __getLocalVars: ____0cifk9cvco48 }
//#endregion

//#region UserStore
declare module "@acord/modules/common/UserStore" { export = ____0da2u99prbsn } 

function ____04ci9b8r5d8d(...args: any[]): any;
declare module "@acord/modules/common/UserStore/filter" { export = ____04ci9b8r5d8d; }

function ____0lknnl95f4g(...args: any[]): any;
declare module "@acord/modules/common/UserStore/findByTag" { export = ____0lknnl95f4g; }

function ____00pcfp16rquqt(...args: any[]): any;
declare module "@acord/modules/common/UserStore/forEach" { export = ____00pcfp16rquqt; }

function ____0vsf741ke79j(...args: any[]): any;
declare module "@acord/modules/common/UserStore/getCurrentUser" { export = ____0vsf741ke79j; }

function ____0r5mtw6iahf(...args: any[]): any;
declare module "@acord/modules/common/UserStore/getUser" { export = ____0r5mtw6iahf; }

function ____0ruh7bwdwrsl(...args: any[]): any;
declare module "@acord/modules/common/UserStore/getUsers" { export = ____0ruh7bwdwrsl; }

function ____0e9vov9v22gq(...args: any[]): any;
declare module "@acord/modules/common/UserStore/initialize" { export = ____0e9vov9v22gq; }

function ____0n8fq8j9h4o3(...args: any[]): any;
declare module "@acord/modules/common/UserStore/__getLocalVars" { export = ____0n8fq8j9h4o3; }

const ____0da2u99prbsn = { filter: ____04ci9b8r5d8d, findByTag: ____0lknnl95f4g, forEach: ____00pcfp16rquqt, getCurrentUser: ____0vsf741ke79j, getUser: ____0r5mtw6iahf, getUsers: ____0ruh7bwdwrsl, initialize: ____0e9vov9v22gq, __getLocalVars: ____0n8fq8j9h4o3 }
//#endregion

//#region VoiceStateStore
declare module "@acord/modules/common/VoiceStateStore" { export = ____03ndqvepn8r3c } 

function ____01fesmfw7f17o(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getAllVoiceStates" { export = ____01fesmfw7f17o; }

function ____0knh1lttvr2o(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getCurrentClientVoiceChannelId" { export = ____0knh1lttvr2o; }

function ____0jc5w7va0ush(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getUserVoiceChannelId" { export = ____0jc5w7va0ush; }

function ____0htkkghncjp9(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVideoVoiceStatesForChannel" { export = ____0htkkghncjp9; }

function ____02up7jvbscu0c(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVoiceState" { export = ____02up7jvbscu0c; }

function ____01rnpqi4e6jbl(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVoiceStateForChannel" { export = ____01rnpqi4e6jbl; }

function ____0dt92adhwko7(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVoiceStateForSession" { export = ____0dt92adhwko7; }

function ____0bbui50nv0ou(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVoiceStateForUser" { export = ____0bbui50nv0ou; }

function ____0f58a63qj52j(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVoiceStates" { export = ____0f58a63qj52j; }

function ____0qhamnkg73ur(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/getVoiceStatesForChannel" { export = ____0qhamnkg73ur; }

function ____0o4f75buunr4(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/hasVideo" { export = ____0o4f75buunr4; }

function ____0qm1jm7p5ndt(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/isCurrentClientInVoiceChannel" { export = ____0qm1jm7p5ndt; }

function ____0qpikqn7cvsb(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/isInChannel" { export = ____0qpikqn7cvsb; }

function ____0mp1i0eievsl(...args: any[]): any;
declare module "@acord/modules/common/VoiceStateStore/__getLocalVars" { export = ____0mp1i0eievsl; }

const ____03ndqvepn8r3c = { getAllVoiceStates: ____01fesmfw7f17o, getCurrentClientVoiceChannelId: ____0knh1lttvr2o, getUserVoiceChannelId: ____0jc5w7va0ush, getVideoVoiceStatesForChannel: ____0htkkghncjp9, getVoiceState: ____02up7jvbscu0c, getVoiceStateForChannel: ____01rnpqi4e6jbl, getVoiceStateForSession: ____0dt92adhwko7, getVoiceStateForUser: ____0bbui50nv0ou, getVoiceStates: ____0f58a63qj52j, getVoiceStatesForChannel: ____0qhamnkg73ur, hasVideo: ____0o4f75buunr4, isCurrentClientInVoiceChannel: ____0qm1jm7p5ndt, isInChannel: ____0qpikqn7cvsb, __getLocalVars: ____0mp1i0eievsl }
//#endregion

//#region constants
declare module "@acord/modules/common/constants" { export = ____0in4gvrfr013 } 

//#region Permissions
declare module "@acord/modules/common/constants/Permissions" { export = ____0wfa7hi67hef } 

const ____0wfa7hi67hef = {  }
//#endregion

const ____0in4gvrfr013 = { Permissions: ____0wfa7hi67hef }
//#endregion

//#region i18n
declare module "@acord/modules/common/i18n" { export = ____0kkuqcr2a5g } 

function ____0ai9h4v0cm4j(...args: any[]): any;
declare module "@acord/modules/common/i18n/getAvailableLocales" { export = ____0ai9h4v0cm4j; }

function ____0g9gk0abgln(...args: any[]): any;
declare module "@acord/modules/common/i18n/getDefaultLocale" { export = ____0g9gk0abgln; }

function ____0iqwjb5d4l4i(...args: any[]): any;
declare module "@acord/modules/common/i18n/getLanguages" { export = ____0iqwjb5d4l4i; }

function ____0ra1dibi93kd(...args: any[]): any;
declare module "@acord/modules/common/i18n/getLocale" { export = ____0ra1dibi93kd; }

function ____04uddvorhnso(...args: any[]): any;
declare module "@acord/modules/common/i18n/getLocaleInfo" { export = ____04uddvorhnso; }

function ____0glg6l5uehqn(...args: any[]): any;
declare module "@acord/modules/common/i18n/setLocale" { export = ____0glg6l5uehqn; }

function ____0qlbmipcjbdh(...args: any[]): any;
declare module "@acord/modules/common/i18n/setUpdateRules" { export = ____0qlbmipcjbdh; }

function ____0uk2hpnbvqhu(...args: any[]): any;
declare module "@acord/modules/common/i18n/updateMessagesForExperiment" { export = ____0uk2hpnbvqhu; }

const ____0jt8q7wmut = "tr"
declare module "@acord/modules/common/i18n/_chosenLocale" { export = ____0jt8q7wmut; }

//#region Messages
declare module "@acord/modules/common/i18n/Messages" { export = ____0ji5l4a4vjr } 

const ____0ji5l4a4vjr = {  }
//#endregion

const ____0kkuqcr2a5g = { getAvailableLocales: ____0ai9h4v0cm4j, getDefaultLocale: ____0g9gk0abgln, getLanguages: ____0iqwjb5d4l4i, getLocale: ____0ra1dibi93kd, getLocaleInfo: ____04uddvorhnso, setLocale: ____0glg6l5uehqn, setUpdateRules: ____0qlbmipcjbdh, updateMessagesForExperiment: ____0uk2hpnbvqhu, _chosenLocale: ____0jt8q7wmut, Messages: ____0ji5l4a4vjr }
//#endregion

//#region modals
declare module "@acord/modules/common/modals" { export = ____08s4j0tvmqfk } 

function ____0nrw48uucihk(...args: any[]): any;
declare module "@acord/modules/common/modals/ModalComponents" { export = ____0nrw48uucihk; }

function ____0uecl7ikbkd(...args: any[]): any;
declare module "@acord/modules/common/modals/ModalRoot" { export = ____0uecl7ikbkd; }

//#region actions
declare module "@acord/modules/common/modals/actions" { export = ____0497otssjmmr } 

function ____0c5er2gw10a4(...args: any[]): any;
declare module "@acord/modules/common/modals/actions/close" { export = ____0c5er2gw10a4; }

function ____0ft2a3989vhc(...args: any[]): any;
declare module "@acord/modules/common/modals/actions/show" { export = ____0ft2a3989vhc; }

const ____0497otssjmmr = { close: ____0c5er2gw10a4, show: ____0ft2a3989vhc }
//#endregion

const ____08s4j0tvmqfk = { ModalComponents: ____0nrw48uucihk, ModalRoot: ____0uecl7ikbkd, actions: ____0497otssjmmr }
//#endregion

//#region uuid
declare module "@acord/modules/common/uuid" { export = ____0teiqc8ns5u } 

function ____0ow2a7f7e2tt(...args: any[]): any;
declare module "@acord/modules/common/uuid/parse" { export = ____0ow2a7f7e2tt; }

function ____0ejbhmag4q86(...args: any[]): any;
declare module "@acord/modules/common/uuid/unparse" { export = ____0ejbhmag4q86; }

function ____0imp7hlqgoqo(...args: any[]): any;
declare module "@acord/modules/common/uuid/v1" { export = ____0imp7hlqgoqo; }

function ____0nqbct2jarl4(...args: any[]): any;
declare module "@acord/modules/common/uuid/v4" { export = ____0nqbct2jarl4; }

const ____0teiqc8ns5u = { parse: ____0ow2a7f7e2tt, unparse: ____0ejbhmag4q86, v1: ____0imp7hlqgoqo, v4: ____0nqbct2jarl4 }
//#endregion

const ____0prsaikoqlct = { GuildStore: ____0qqi0l1j3kls, ActivityStore: ____0weotrv2ln59, Button: ____02mo5l8fosd9d, ChannelStore: ____0iqall8gso1i, DiscordAPI: ____0ci72mwqvbl4, Flux: ____0ouvng161av, FluxDispatcher: ____0wtk25urhgrs, GuildMemberStore: ____0001vwfqeobe6ig, InviteStore: ____0bqi5q7p60gs, Markdown: ____032dem2qstqv, MessageStore: ____0qjmlkcjvt45, NoteStore: ____0wj2v585vuga, PermissionStore: ____0c7q6gioovlh, React: ____08lwph7li4t2, ReactDOM: ____0e61dcdd2fck, RelationshipStore: ____0o2c97iv2asu, Router: ____03u3s91u49qw, SelectedChannelStore: ____0rpbn34ja6ee, SelectedGuildStore: ____03cd1vdec2pbd, SimpleMarkdown: ____01a6ak2c9oum, TypingStore: ____0fwq2whq8h7h, UserStore: ____0da2u99prbsn, VoiceStateStore: ____03ndqvepn8r3c, constants: ____0in4gvrfr013, i18n: ____0kkuqcr2a5g, modals: ____08s4j0tvmqfk, uuid: ____0teiqc8ns5u }
//#endregion

function ____06w4q3veim68(...args: any[]): any;
declare module "@acord/modules/require" { export = ____06w4q3veim68; }

//#region webpack
declare module "@acord/modules/webpack" { export = ____0raab1pjj65q } 

function ____0r1hdu0ghsld(...args: any[]): any;
declare module "@acord/modules/webpack/find" { export = ____0r1hdu0ghsld; }

function ____0kanrgutplp7(...args: any[]): any;
declare module "@acord/modules/webpack/findAll" { export = ____0kanrgutplp7; }

function ____0i5j4hro0us(...args: any[]): any;
declare module "@acord/modules/webpack/findByKeyword" { export = ____0i5j4hro0us; }

function ____040n9gwjwqab(...args: any[]): any;
declare module "@acord/modules/webpack/findByKeywordAll" { export = ____040n9gwjwqab; }

function ____06grofgn5q3q(...args: any[]): any;
declare module "@acord/modules/webpack/findByNestedProps" { export = ____06grofgn5q3q; }

function ____0o4d2rnrdwgn(...args: any[]): any;
declare module "@acord/modules/webpack/findByNestedPropsAll" { export = ____0o4d2rnrdwgn; }

function ____0b3pr6t1275l(...args: any[]): any;
declare module "@acord/modules/webpack/findByProperties" { export = ____0b3pr6t1275l; }

function ____0c4t4incsved(...args: any[]): any;
declare module "@acord/modules/webpack/findByPropertiesAll" { export = ____0c4t4incsved; }

function ____0s3jeme99r0i(...args: any[]): any;
declare module "@acord/modules/webpack/findByProps" { export = ____0s3jeme99r0i; }

function ____0gtds26ah52(...args: any[]): any;
declare module "@acord/modules/webpack/findByPropsAll" { export = ____0gtds26ah52; }

function ____02elcg65wgg2(...args: any[]): any;
declare module "@acord/modules/webpack/findByPrototypes" { export = ____02elcg65wgg2; }

function ____0beo1apimcqf(...args: any[]): any;
declare module "@acord/modules/webpack/findByPrototypesAll" { export = ____0beo1apimcqf; }

function ____0wbheohik90m(...args: any[]): any;
declare module "@acord/modules/webpack/findByStrings" { export = ____0wbheohik90m; }

function ____0jjkmqw2r7n(...args: any[]): any;
declare module "@acord/modules/webpack/findByStringsAll" { export = ____0jjkmqw2r7n; }

const ____0raab1pjj65q = { find: ____0r1hdu0ghsld, findAll: ____0kanrgutplp7, findByKeyword: ____0i5j4hro0us, findByKeywordAll: ____040n9gwjwqab, findByNestedProps: ____06grofgn5q3q, findByNestedPropsAll: ____0o4d2rnrdwgn, findByProperties: ____0b3pr6t1275l, findByPropertiesAll: ____0c4t4incsved, findByProps: ____0s3jeme99r0i, findByPropsAll: ____0gtds26ah52, findByPrototypes: ____02elcg65wgg2, findByPrototypesAll: ____0beo1apimcqf, findByStrings: ____0wbheohik90m, findByStringsAll: ____0jjkmqw2r7n }
//#endregion

const ____0f25980rrbw = { common: ____0prsaikoqlct, require: ____06w4q3veim68, webpack: ____0raab1pjj65q }
//#endregion

//#region patcher
declare module "@acord/patcher" { export = ____096wwcv61lq5 } 

function ____0o6trwq4acga(...args: any[]): any;
declare module "@acord/patcher/after" { export = ____0o6trwq4acga; }

function ____0s58b4gcwtno(...args: any[]): any;
declare module "@acord/patcher/before" { export = ____0s58b4gcwtno; }

function ____0lt662rfah2k(...args: any[]): any;
declare module "@acord/patcher/injectCSS" { export = ____0lt662rfah2k; }

function ____0prcbhfci5au(...args: any[]): any;
declare module "@acord/patcher/instead" { export = ____0prcbhfci5au; }

function ____0t891t9rkhf7(...args: any[]): any;
declare module "@acord/patcher/unpatchAll" { export = ____0t891t9rkhf7; }

function ____0sqh3cq19oo6(...args: any[]): any;
declare module "@acord/patcher/unpatchAllCSS" { export = ____0sqh3cq19oo6; }

const ____096wwcv61lq5 = { after: ____0o6trwq4acga, before: ____0s58b4gcwtno, injectCSS: ____0lt662rfah2k, instead: ____0prcbhfci5au, unpatchAll: ____0t891t9rkhf7, unpatchAllCSS: ____0sqh3cq19oo6 }
//#endregion

//#region ui
declare module "@acord/ui" { export = ____0mbkjdjone19 } 

//#region contextMenus
declare module "@acord/ui/contextMenus" { export = ____02o9t4ucpjgph } 

//#region build
declare module "@acord/ui/contextMenus/build" { export = ____0967dqcn3wq3 } 

function ____07kpsju6b9vk(...args: any[]): any;
declare module "@acord/ui/contextMenus/build/item" { export = ____07kpsju6b9vk; }

function ____0qc5ig8pmggq(...args: any[]): any;
declare module "@acord/ui/contextMenus/build/menu" { export = ____0qc5ig8pmggq; }

const ____0967dqcn3wq3 = { item: ____07kpsju6b9vk, menu: ____0qc5ig8pmggq }
//#endregion

function ____0vfdrfvgvqse(...args: any[]): any;
declare module "@acord/ui/contextMenus/open" { export = ____0vfdrfvgvqse; }

function ____07sjkqmckhjg(...args: any[]): any;
declare module "@acord/ui/contextMenus/patch" { export = ____07sjkqmckhjg; }

const ____02o9t4ucpjgph = { build: ____0967dqcn3wq3, open: ____0vfdrfvgvqse, patch: ____07sjkqmckhjg }
//#endregion

//#region modals
declare module "@acord/ui/modals" { export = ____09q5m2rdgqe4 } 

function ____0ws252b8pv3l(...args: any[]): any;
declare module "@acord/ui/modals/show" { export = ____0ws252b8pv3l; }

const ____09q5m2rdgqe4 = { show: ____0ws252b8pv3l }
//#endregion

//#region notices
declare module "@acord/ui/notices" { export = ____0ackd2jtelgq } 

function ____0jpdkqeir9ic(...args: any[]): any;
declare module "@acord/ui/notices/show" { export = ____0jpdkqeir9ic; }

const ____0ackd2jtelgq = { show: ____0jpdkqeir9ic }
//#endregion

//#region toasts
declare module "@acord/ui/toasts" { export = ____0do8jhlg35w } 

function ____01wffiuhwkn2(...args: any[]): any;
declare module "@acord/ui/toasts/show" { export = ____01wffiuhwkn2; }

const ____0do8jhlg35w = { show: ____01wffiuhwkn2 }
//#endregion

//#region tooltips
declare module "@acord/ui/tooltips" { export = ____070urdes0nnv } 

function ____0tkvvc5v9k5k(...args: any[]): any;
declare module "@acord/ui/tooltips/create" { export = ____0tkvvc5v9k5k; }

const ____070urdes0nnv = { create: ____0tkvvc5v9k5k }
//#endregion

const ____0mbkjdjone19 = { contextMenus: ____02o9t4ucpjgph, modals: ____09q5m2rdgqe4, notices: ____0ackd2jtelgq, toasts: ____0do8jhlg35w, tooltips: ____070urdes0nnv }
//#endregion

function ____0jhpk8vcvj65(...args: any[]): any;
declare module "@acord/unload" { export = ____0jhpk8vcvj65; }

//#region utils
declare module "@acord/utils" { export = ____08w3tv3c5f55 } 

function ____0ce9bq7sdkho(...args: any[]): any;
declare module "@acord/utils/copyText" { export = ____0ce9bq7sdkho; }

function ____0hf1fp9jpj4(...args: any[]): any;
declare module "@acord/utils/findInTree" { export = ____0hf1fp9jpj4; }

function ____0d2raivhe3je(...args: any[]): any;
declare module "@acord/utils/format" { export = ____0d2raivhe3je; }

function ____0iejd2b4wak8(...args: any[]): any;
declare module "@acord/utils/ifExists" { export = ____0iejd2b4wak8; }

function ____0c8o060ll12q(...args: any[]): any;
declare module "@acord/utils/interval" { export = ____0c8o060ll12q; }

//#region logger
declare module "@acord/utils/logger" { export = ____0du2ohtu1b4t } 

function ____0cpltkloql8s(...args: any[]): any;
declare module "@acord/utils/logger/log" { export = ____0cpltkloql8s; }

function ____0pcs59bswmqb(...args: any[]): any;
declare module "@acord/utils/logger/warn" { export = ____0pcs59bswmqb; }

function ____04jw4dldloka(...args: any[]): any;
declare module "@acord/utils/logger/error" { export = ____04jw4dldloka; }

const ____0du2ohtu1b4t = { log: ____0cpltkloql8s, warn: ____0pcs59bswmqb, error: ____04jw4dldloka }
//#endregion

//#region react
declare module "@acord/utils/react" { export = ____05df9wvgu1jr } 

function ____06t8o2g3k49s(...args: any[]): any;
declare module "@acord/utils/react/getInstance" { export = ____06t8o2g3k49s; }

function ____050bie1u30i(...args: any[]): any;
declare module "@acord/utils/react/getOwnerInstance" { export = ____050bie1u30i; }

function ____0sn91afn3sid(...args: any[]): any;
declare module "@acord/utils/react/findInTree" { export = ____0sn91afn3sid; }

function ____07qpa81clcsm(...args: any[]): any;
declare module "@acord/utils/react/findByDomNode" { export = ____07qpa81clcsm; }

function ____03i1do6vw6bd(...args: any[]): any;
declare module "@acord/utils/react/getComponents" { export = ____03i1do6vw6bd; }

function ____0jkfl6raqftp(...args: any[]): any;
declare module "@acord/utils/react/getProps" { export = ____0jkfl6raqftp; }

function ____0hdpn51lulco(...args: any[]): any;
declare module "@acord/utils/react/getStateNodes" { export = ____0hdpn51lulco; }

const ____05df9wvgu1jr = { getInstance: ____06t8o2g3k49s, getOwnerInstance: ____050bie1u30i, findInTree: ____0sn91afn3sid, findByDomNode: ____07qpa81clcsm, getComponents: ____03i1do6vw6bd, getProps: ____0jkfl6raqftp, getStateNodes: ____0hdpn51lulco }
//#endregion

function ____028pa46s8u14h(...args: any[]): any;
declare module "@acord/utils/sleep" { export = ____028pa46s8u14h; }

function ____0nikft74ar97(...args: any[]): any;
declare module "@acord/utils/timeout" { export = ____0nikft74ar97; }

const ____08w3tv3c5f55 = { copyText: ____0ce9bq7sdkho, findInTree: ____0hf1fp9jpj4, format: ____0d2raivhe3je, ifExists: ____0iejd2b4wak8, interval: ____0c8o060ll12q, logger: ____0du2ohtu1b4t, react: ____05df9wvgu1jr, sleep: ____028pa46s8u14h, timeout: ____0nikft74ar97 }
//#endregion

//#region websocket
declare module "@acord/websocket" { export = ____0ch9n7vrmafi } 

const ____0ch9n7vrmafi = {  }
//#endregion

const main = { dev: ____0p4l88e8l7i, dom: ____07v85jkb403l, events: ____0w15lenprqpl, extensions: ____0i6d8venb30o, i18n: ____0fltie6e5opv, modules: ____0f25980rrbw, patcher: ____096wwcv61lq5, ui: ____0mbkjdjone19, unload: ____0jhpk8vcvj65, utils: ____08w3tv3c5f55, websocket: ____0ch9n7vrmafi }
//#endregion
