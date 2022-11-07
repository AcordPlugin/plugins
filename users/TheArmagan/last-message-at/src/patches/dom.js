import patchContainer from "../other/patchContainer.js";
import dom from "@acord/dom";
import webpack from "@acord/modules/webpack";
import utils from "@acord/utils";
import { fetchLastMessageAt } from "../other/api.js";
import { i18n } from "@acord/extension";

let sectionClasses = webpack.findByProps("section", "lastSection");
let colorClasses = webpack.findByProps("defaultColor", "lineClamp1");
let eyebrowClasses = webpack.findByProps("eyebrow", "display-lg", "display-md");
let colorClasses2 = webpack.find(i=>i?.defaultColor && Object.keys(i).length == 1);
let titleClasses = webpack.find(i=>i?.title && i?.body && Object.keys(i).length == 2);

export function patchDOM() {
    patchContainer.add(
        dom.patch(
            `[class*="userPopoutInner-"] [class*="memberSinceContainer-"]`,
            /** @param {Element} elm */ async (elm)=>{

                /** @type {Element} */
                let p = dom.parents(elm, `[class*="section-"]`)?.[0]?.parentElement;
                if (!p) return;

                let user = utils.react.getProps(elm, i => i?.user)?.user;
                if (!user) return;
                
                let dateNum = await fetchLastMessageAt(user.id);

                if (dateNum == -1) return;
                
                let section = dom.parseHTML(`
                    <div class="${sectionClasses.section}">
                        <h2 class="${colorClasses.defaultColor} ${eyebrowClasses.eyebrow} ${colorClasses2.defaultColor} ${titleClasses.title}">${i18n.format("LAST_MESSAGE_AT")}</h2>
                        <div class="${colorClasses.defaultColor} ${titleClasses.body}">${(()=>{ let d = new Date(dateNum); return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}` })()}</div>
                    </div>
                `);

                p.insertBefore(section, p.children[1]);
            }
        )
    );

    patchContainer.add(
        dom.patch(
            `[class*="userProfileModalInner-"] [class*="memberSinceContainer-"]`,
            /** @param {Element} elm */ async (elm)=>{
                /** @type {Element} */
                let p = dom.parents(elm, `[class*="userInfoSection-"]`)?.[0];
                if (!p) return;

                let user = utils.react.getProps(elm, i => i?.user)?.user;
                if (!user) return;
                
                let dateNum = await fetchLastMessageAt(user.id);

                if (dateNum == -1) return;

                let titleElm = dom.parseHTML(`
                    <h2 class="${colorClasses.defaultColor} ${eyebrowClasses.eyebrow} ${colorClasses2.defaultColor} ${titleClasses.title}">${i18n.format("LAST_MESSAGE_AT")}</h2>
                `);

                let contentElm = dom.parseHTML(`
                    <div class="${colorClasses.defaultColor} ${titleClasses.body}" style="margin-bottom: 16px;">${(()=>{ let d = new Date(dateNum); return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}` })()}</div>
                `);

                p.insertBefore(titleElm, p.children[2]);
                p.insertBefore(contentElm, p.children[3]);
            }
        )
    )
}