export function CheckBox(props = {}) {
  return (
    <div className="acord--checkbox-container">
      <input className="acord--checkbox" type="checkbox" {...props} />
      <div className="acord--checkbox-visual">
        <div></div>
      </div>
    </div>
  )
}