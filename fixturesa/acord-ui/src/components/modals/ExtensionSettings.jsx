import { useNest } from "nests/react";
import extensions from "@acord/extensions";
import { CheckBox } from "../CheckBox.jsx";

export function ExtensionSettings({ url, extension }) {
  useNest(extensions.nests.enabled);
  useNest(extensions.nests.enabled.ghost[url].persist);

  const extensionSrc = extensions.nests.enabled.ghost[url];
  const persist = extensionSrc.persist;

  const types = {
    header: (setting) => {
      return <>
        <div className="left"></div>
        <div className="center">{setting.name}</div>
        <div className="right"></div>
      </>
    },
    checkbox: (setting) => {
      return <>
        <div className="left info-side">
          <div className="name">{setting.name}</div>
          {setting.description ? <div className="description">{setting.description}</div> : null}
        </div>
        <div className="right">
          <CheckBox
            checked={persist.ghost.settings?.[setting.property] ?? setting.value}
            onChange={(e) => {
              persist.store.settings[setting.property] = e.target.checked;
            }}
          />
        </div>
      </>
    }
  }

  return <>
    {
      extensionSrc.settings.map(setting => {
        return (
          (setting.condition ? (eval(`(($)=>{ return (${setting.condition}) })`))(persist.ghost.settings || {}) : true) ? <div class={`container container--${setting.type}`}>
            {types[setting.type](setting)}
          </div>
          : null
        )
      })
    }
  </>;
}