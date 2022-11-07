import webpack from "@acord/modules/webpack";

let inputClasses = webpack.findByProps("textArea", "maxLength", "characterCount");
let inputClasses2 = webpack.findByProps("inputWrapper", "inputDefault");
let scrollClasses = webpack.findByProps("scrollbarDefault", "scrollbar", "scrollbarGhost");

export function TextArea(props = {}) {
    return <div className={`${inputClasses2.inputWrapper}`} style={{width: "100%"}}>
        <textarea className={`${inputClasses2.inputDefault} ${inputClasses.textArea} ${scrollClasses.scrollbarDefault}`} {...props}></textarea>
    </div>
}