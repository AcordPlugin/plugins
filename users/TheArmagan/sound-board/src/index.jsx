import patchContainer from "./other/patchContainer.js"
import { MediaEngineStore } from "@acord/modules/common";
import { persist } from "@acord/extension";
import patchSCSS from "./styles.scss"
import { openModal } from "./other/apis.js";
import { Modal } from "./components/Modal.jsx";
import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";
import { i18n } from "@acord/extension";

let mem = {
    /** @type {AudioContext} */
    audioContext: null,
    table: {},
    buffCache: {},
    last: ""
};


function audioBufferSlice(buffer, begin, end) {

    let channels = buffer.numberOfChannels;
    let rate = buffer.sampleRate;

    // milliseconds to seconds
    begin = begin / 1000;
    end = end / 1000;

    if (end > buffer.duration) end = buffer.duration;

    let startOffset = rate * begin;
    let endOffset = rate * end;
    let frameCount = Math.max(endOffset - startOffset, 0);

    if (!frameCount) throw "No audio left."

    let newArrayBuffer = mem.audioContext.createBuffer(channels, frameCount, rate);
    let anotherArray = new Float32Array(frameCount);
    let offset = 0;

    for (let channel = 0; channel < channels; channel++) {
        buffer.copyFromChannel(anotherArray, channel, startOffset);
        newArrayBuffer.copyToChannel(anotherArray, channel, offset);
    }

    return newArrayBuffer;
}


async function playSound(src, volume = 0.5, slice = { begin: 0, end: 1000 }, wantedEnd=Infinity) {
    if (wantedEnd && slice.end > wantedEnd) return;
    let conns = [...MediaEngineStore.getMediaEngine().connections].filter(i=>i.context=="default");

    let buff = mem.buffCache[`${src}`] || (await mem.audioContext.decodeAudioData((await (await fetch(`https://api.codetabs.com/v1/proxy/?quest=${src}`)).arrayBuffer())));
    if (!mem.buffCache[`${src}`]) mem.buffCache[`${src}`] = buff;
    let id = `${Math.random()}`;

    try {
        let slicedBuff = audioBufferSlice(buff, slice.begin, slice.end);

        mem.last = id;
        conns[0].startSamplesPlayback(slicedBuff, volume, (err, msg) => { 
            if (mem.last == id) {
                setTimeout(()=>{
                    playSound(src, volume, { begin: slice.end, end: slice.end + 1000 }, wantedEnd);
                }, 0);
            }
        });

        conns.slice(1).forEach(conn => {
            conn.startSamplesPlayback(slicedBuff, volume, () => { });
        });
    } catch {
        
    }

}

function parseSoundsStr(sounds) {
    sounds = sounds.trim();
    if (!sounds) return {};
    return Object.fromEntries(sounds.split("\n").map(i => { 
        let v = i.trim().split(";"); 
        let begin = (Number(v[3]) || 0) == 0 ? 0 : (Number(v[3]) * 1000);
        return v.length < 2 ? null : [v[0], { src: v[1], volume: Number(v[2]) ?? 1, begin, end: (Number(v[3]) || 0) == 0 ? null : begin + (Number(v[4]) * 1000) }] 
    }).filter(i => i));
}

function updateTable(v)  {
    let sounds = v || persist.ghost?.settings?.sounds || "";
    mem.buffCache = {};
    mem.table = parseSoundsStr(sounds);
}

function getFileExtension(urlOrFileName = "") {
    return urlOrFileName.split(/\?|#/)[0].split(".").pop().toLowerCase();
};

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
        })());

        const metadataClasses = webpack.findByProps("metadataDownload", "wrapper");
        const anchorClasses = webpack.findByProps("anchor", "anchorUnderlineOnHover");
        const ALLOWED_EXTS = ["mp3", "wav", "ogg", "m4a"];
        patchContainer.add(
            dom.patch(
                `[class*="anchor-"][class*="anchorUnderlineOnHover-"][class*="metadataDownload-"]`,
                /** @param {Element} elm */ (elm)=>{
                    let href = elm.getAttribute("href");
                    if (!ALLOWED_EXTS.includes(getFileExtension(href))) return;

                    let parent = elm.parentElement;

                    let fileName = `${href.split("/").pop().split(".").slice(0, -1).join(".")}_${href.split("/")[5]}`;

                    /** @type {Element} */
                    let btn = dom.parseHTML(`
                        <div class="${anchorClasses.anchor} ${anchorClasses.anchorUnderlineOnHover} ${metadataClasses.metadataDownload} sb--add-sound">
                            <svg class="${metadataClasses.metadataIcon}" viewBox="0 0 24 24" width="24" height="24">
                                <path fill="currentColor" d="M12.5,17.6l3.6,2.2a1,1,0,0,0,1.5-1.1l-1-4.1a1,1,0,0,1,.3-1l3.2-2.8A1,1,0,0,0,19.5,9l-4.2-.4a.87.87,0,0,1-.8-.6L12.9,4.1a1.05,1.05,0,0,0-1.9,0l-1.6,4a1,1,0,0,1-.8.6L4.4,9a1.06,1.06,0,0,0-.6,1.8L7,13.6a.91.91,0,0,1,.3,1l-1,4.1a1,1,0,0,0,1.5,1.1l3.6-2.2A1.08,1.08,0,0,1,12.5,17.6Z"></path>
                            </svg>
                        </div>
                    `);

                    let innerSvg = btn.querySelector("svg");

                    function update() {
                        let isExists = !!mem.table[fileName];

                        if (isExists) {
                            btn.setAttribute("acord--tooltip-content", i18n.format("REMOVE_FROM_SOUNDBOARD"));
                            innerSvg.classList.add("exists")
                        } else {
                            innerSvg.classList.remove("exists");
                            btn.setAttribute("acord--tooltip-content", i18n.format("ADD_TO_SOUNDBOARD"));
                        };
                    }

                    btn.onclick = ()=>{
                        let isExists = !!mem.table[fileName];
                        if (!isExists) {
                            persist.store.settings.sounds = `${persist.ghost?.settings?.sounds || ""}\n${fileName};${href};1`.trim();
                        } else {
                            let soundLines = (persist.ghost?.settings?.sounds || "").split("\n");
                            let delIdx = soundLines.findIndex(v=>v.trim().split(";")[0] == fileName);
                            soundLines.splice(delIdx, 1);
                            persist.store.settings.sounds = soundLines.join("\n");
                        }
                        updateTable();
                        update();
                    }

                    update();
                    parent.insertBefore(btn, elm);
                }
            )
        )
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