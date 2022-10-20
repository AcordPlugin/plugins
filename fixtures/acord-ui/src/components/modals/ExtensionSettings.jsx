import { useNest } from "nests/react";
import extensions from "@acord/extensions";
import { CheckBox } from "../CheckBox.jsx";
import { React } from "../../other/apis.js";
import { TextInput } from "../TextInput.jsx";

export function ExtensionSettings({ url, extension }) {
  useNest(extensions.nests.enabled);
  useNest(extensions.nests.enabled.ghost[url].api.extension.persist);
  const [updater, setUpdater] = React.useState("");


  const extensionSrc = extensions.nests.enabled.ghost[url];
  const persist = extensionSrc.api.extension.persist;

  const callUpdate = typeof extensionSrc.settings?.update == "function"
    ? extensionSrc.settings.update
    : () => { };

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
              callUpdate(setting.property, e.target.checked);
              setUpdater(Math.random().toString(36));
            }}
          />
        </div>
      </>
    },
    input: (setting) => {
      return <>
        <div className={`left info-side size-${setting.size || "medium"}`}>
          <div className="name">{setting.name}</div>
          {setting.description ? <div className="description">{setting.description}</div> : null}
        </div>
        <div className="right">
          <TextInput
            value={persist.ghost.settings?.[setting.property] ?? setting.value}
            type={setting.altType || "text"}
            onChange={(e) => {
              persist.store.settings[setting.property] = e.target.value;
              callUpdate(setting.property, e.target.value);
              setUpdater(Math.random().toString(36));
            }}
          />
        </div>
      </>
    }
  }

  return <>
    {
      extensionSrc.settings.data.map(setting => {
        return (
          (setting.condition ? (eval(`(($)=>{ return !!(${setting.condition}) })`))(persist.ghost.settings || {}) : true) ? <div class={`container container--${setting.type}`}>
            {types[setting.type](setting)}
          </div>
          : null
        )
      })
    }
  </>;
}