import patchContainer from "./other/patchContainer.js"
import { MediaEngineStore } from "@acord/modules/common";
import { persist } from "@acord/extension";
import patchSCSS from "./styles.scss"
import { openModal } from "./other/apis.js";
import { Modal } from "./components/Modal.jsx";

let mem = {
    /** @type {AudioContext} */
    audioContext: null,
    table: {},
    buffCache: {}
};

async function playSound(src, volume=0.5) {
    let conns = [...MediaEngineStore.getMediaEngine().connections];

    let buff = mem.buffCache[`${src};${volume}`] || (await mem.audioContext.decodeAudioData((await (await fetch(`https://api.codetabs.com/v1/proxy/?quest=${src}`)).arrayBuffer())));
    if (!mem.buffCache[`${src};${volume}`]) mem.buffCache[`${src};${volume}`] = buff;

    conns.forEach(conn=>{
        conn.startSamplesPlayback(buff, volume, ()=>{});
    });
}

const updateTable = _.debounce((v)=>{
    let sounds = v || persist.ghost?.settings?.sounds || "";
    mem.buffCache = {};
    if (!sounds.trim()) {
        mem.table = {};
        return;
    }
    mem.table = Object.fromEntries(sounds.trim().split("\n").map(i=>{ let v = i.trim().split(";"); return v.length != 3 ? null : [v[0], {src: v[1], volume: Number(v[2]) || 1}]}).filter(i=>i));
});

export default {
    load() {
        patchContainer.add(patchSCSS());
        mem.audioContext = new AudioContext();
        updateTable();

        patchContainer.add((()=>{

            function onEvent(e) {
                if (e.ctrlKey && e.code == "KeyB") {
                    openModal((e2)=>{
                        return <Modal e={e2} playSound={playSound} names={Object.keys(mem.table)} table={mem.table}/>
                    })
                }
            };

            window.addEventListener("keyup", onEvent);

            return ()=>{
                window.removeEventListener("keyup", onEvent);
            }
        })())
    },
    async unload() {
        patchContainer.removeAll();
        mem.audioContext.close();
        mem.audioContext = null;
        mem.table = {};
        mem.buffCache = {};
    },
    settings: {
        data: [
            {
                "type": "textarea",
                "property": "sounds",
                "value": "",
                "placeholder": "SoundName;https://discordcdnlink;0.5",
                "name": "Sounds",
                "description": "Each line is a new sound. Format: SoundName;SoundLink;Volume",
                "rows": 6
            }
        ],
        update(key, value) {
            switch (key) {
                case "sounds": {
                    updateTable(value);
                    break;
                }
            }
        }
    }
}