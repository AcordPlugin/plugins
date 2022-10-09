import swc from "@acord/modules/swc";

let inputClasses = swc.findByProps("inputDefault", "copyInput");
let inputClasses2 = swc.findByProps("input", "editable", "disabled", "inputWrapper");

export function TextInput(props = {}) {
  return (
    <div className={`${inputClasses2?.input}`}>
      <div className={`${inputClasses?.inputWrapper}`}>
        <input type="text" className={`${inputClasses?.inputDefault}`} {...props} />
      </div>
    </div>
  )
}