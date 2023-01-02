import webpack from "@acord/modules/webpack";

let inputClasses = webpack.findByProps("inputDefault", "copyInput");
let inputClasses2 = webpack.findByProps("input", "editable", "disabled", "inputWrapper");

export function TextInput(props = {}) {
  return (
    <div className={`${inputClasses2?.input}`}>
      <div className={`${inputClasses?.inputWrapper}`}>
        <input type="text" className={`${inputClasses?.inputDefault}`} {...props} />
      </div>
    </div>
  )
}