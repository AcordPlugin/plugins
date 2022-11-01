import patchContainer from "./other/patchContainer.js";
import dom from "@acord/dom";
import utils from "@acord/utils";
import patchSCSS from "./styles.scss";
import { persist } from "@acord/extension";

export default {
    load() {
        patchContainer.add(patchSCSS());

        if (persist.ghost?.locked) {
            lockApp();
        }

        patchContainer.add((()=>{

            /** @param {KeyboardEvent} e */
            function onKeyDown(e) {
                let locked = isLocked();
                if (locked) {
                    e.stopPropagation();
                    if (!isNaN(e.key)) {
                        setText(getText() + e.key);
                    } else if (e.code == "Backspace") {
                        setText(getText().slice(0, -1));
                    } else if (e.code == "Enter") {
                        submit();
                    }
                } else if (!locked && e.ctrlKey && e.code == "KeyL") {
                    e.stopPropagation();
                    lockApp();
                }                
            }

            window.addEventListener("keydown", onKeyDown);

            return ()=>{
                window.removeEventListener("keydown", onKeyDown);
            }
        })())
    },
    unload() {
        patchContainer.removeAll();
    },
    settings: {
        data: [
            {
                "type": "input",
                "altType": "text",
                "property": "passCode",
                "maxLength": 8,
                "name": "Pass Code",
                "size": "small",
                "value": "1234"
            }
        ],
        update(key, value) {
            if (key == "passCode") {
                if (`${value || ""}`.length < 1) {
                    persist.store.settings.passCode = "0";
                }
            }
        }
    }
}

function getText() {
    return document.querySelector("#app-lock .text")?.textContent || "";
}

function setText(t) {
    utils.ifExists(document.querySelector("#app-lock .text"), (e)=>{
        e.textContent = t.slice(0, 8);
    });
}

function isLocked() {
    return !!document.querySelector("#app-lock");
}

function lockApp() {
    if (isLocked()) return;

    const appMount = document.querySelector("#app-mount");

    /** @type {Element} */
    let container = dom.parseHTML(`
        <div id="app-lock">
            <div class="al--container">
                <div class="input-container">
                    <div class="text"></div>
                </div>
                <div class="buttons">
                    <div class="line">
                        <div class="button number" data-number="1">1</div>
                        <div class="button number" data-number="2">2</div>
                        <div class="button number" data-number="3">3</div>
                    </div>
                    <div class="line">
                        <div class="button number" data-number="4">4</div>
                        <div class="button number" data-number="5">5</div>
                        <div class="button number" data-number="6">6</div>
                    </div>
                    <div class="line">
                        <div class="button number" data-number="7">7</div>
                        <div class="button number" data-number="8">8</div>
                        <div class="button number" data-number="9">9</div>
                    </div>
                    <div class="line">
                        <div class="button backspace">&lt;</div>
                        <div class="button number" data-number="0">0</div>
                        <div class="button submit">OK</div>
                    </div>
                </div>
            </div>
        </div>
    `);

    container.querySelectorAll(".button.number").forEach(numberButton=>{
        let num = Number(numberButton.getAttribute("data-number"));
        numberButton.onclick = ()=>{
            setText(getText() + num);
        }
    });

    utils.ifExists(container.querySelector(".button.backspace"), (button)=>{
        button.onclick = ()=>{
            setText(getText().slice(0, -1));
        }
    });

    utils.ifExists(container.querySelector(".button.submit"), (button)=>{
        button.onclick = ()=>{
            submit();
        }
    });

    appMount.appendChild(container);
    persist.store.locked = true;
}

function submit() {
    if (getText() == persist.ghost?.settings?.passCode) {
        unlockApp();
    } else {
        setText("");
    }
}

function unlockApp() {
    persist.store.locked = false;
    utils.ifExists(document.querySelector("#app-lock"), (elm)=>{
        elm.remove();
    });
}