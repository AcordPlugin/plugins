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
    buffCache: {},
    last: ""
};


function audioBufferSlice(buffer, begin, end) {

    let duration = buffer.duration;
    let channels = buffer.numberOfChannels;
    let rate = buffer.sampleRate;

    // milliseconds to seconds
    begin = begin / 1000;
    end = end / 1000;

    if (begin < 0) {
        throw new RangeError('begin time must be greater than 0');
    }

    if (end > duration) end = Math.max(0, duration-10);

    let startOffset = rate * begin;
    let endOffset = rate * end;
    let frameCount = endOffset - startOffset;
    let newArrayBuffer;

    try {
        newArrayBuffer = mem.audioContext.createBuffer(channels, endOffset - startOffset, rate);
        let anotherArray = new Float32Array(frameCount);
        let offset = 0;

        for (let channel = 0; channel < channels; channel++) {
            buffer.copyFromChannel(anotherArray, channel, startOffset);
            newArrayBuffer.copyToChannel(anotherArray, channel, offset);
        }
    } catch (e) {
        throw e;
    }

    return newArrayBuffer;
}

async function playSound(src, volume = 0.5, slice = { begin: 0, end: 5000 }, wantedEnd) {
    if (wantedEnd && slice.end > wantedEnd) return;
    let conns = [...MediaEngineStore.getMediaEngine().connections];

    let buff = mem.buffCache[`${src}`] || (await mem.audioContext.decodeAudioData((await (await fetch(`https://api.codetabs.com/v1/proxy/?quest=${src}`)).arrayBuffer())));
    if (!mem.buffCache[`${src}`]) mem.buffCache[`${src}`] = buff;

    try {
        let slicedBuff = audioBufferSlice(buff, slice.begin, slice.end);

        mem.last = `${src};${volume}`;
        conns[0].startSamplesPlayback(slicedBuff, volume, (err) => { 
            if (!err && mem.last == `${src};${volume}`) {
                playSound(src, volume, { begin: slice.end, end: slice.end + 5000 }, wantedEnd);
            }
        });

        conns.slice(1).forEach(conn => {
            conn.startSamplesPlayback(slicedBuff, volume, () => { });
        });
    } catch (err) {
        console.log(err);
    }
}

const updateTable = _.debounce((v) => {
    let sounds = v || persist.ghost?.settings?.sounds || "";
    mem.buffCache = {};
    if (!sounds.trim()) {
        mem.table = {};
        return;
    }
    mem.table = Object.fromEntries(sounds.trim().split("\n").map(i => { 
        let v = i.trim().split(";"); 
        let begin = (Number(v[3]) || 0) == 0 ? 0 : (Number(v[3]) * 1000);
        return v.length < 2 ? null : [v[0], { src: v[1], volume: Number(v[2]) ?? 1, begin, end: (Number(v[3]) || 0) == 0 ? null : begin + (Number(v[4]) * 1000) }] 
    }).filter(i => i));
});

export default {
    load() {
        patchContainer.add(patchSCSS());
        mem.audioContext = new AudioContext();
        updateTable();

        patchContainer.add((() => {

            function onEvent(e) {
                if (e.ctrlKey && e.code == "KeyB") {
                    openModal((e2) => {
                        return <Modal e={e2} playSound={playSound} names={Object.keys(mem.table)} table={mem.table} />
                    })
                }
            };

            window.addEventListener("keyup", onEvent);

            return () => {
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
        mem.last = "";
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
                "rows": 9
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