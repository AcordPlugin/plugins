import { Button, React } from "../../other/apis.js";
import i18n from "@acord/i18n"
import { TextInput } from "../TextInput.jsx";
import { nests } from "@acord/internal";
import { useNest } from "nests/react";
import extensions from "@acord/extensions";

const nest = nests.make({ urlInput: "" });

export function PluginsModal() {
  useNest(nest);
  useNest(extensions.nests.loaded);

  return <>
    <div className="import-container">
      <div className="input-container">
        <TextInput
          placeholder={i18n.fmt("IMPORT_PLUGIN_PLACEHOLDER")}
          value={nest.ghost.urlInput}
          onChange={(e) => {
            nest.store.urlInput = e.target.value.startWith("h") ? e.target.value : "";
          }}
        />
      </div>
      <div className="button-container">
        <Button size={Button.Sizes.MEDIUM}>{i18n.fmt("IMPORT_PLUGIN")}</Button>
      </div>
    </div>
    <div className="extensions-container">
      {
        Object.entries(extensions.nests.loaded.ghost).map(([url, extension]) => {
          return <div className="extension">
            <div className="top">
              <div className="right">
                <div className="title-and-version">
                  <div class="title">
                    {extension.manifest.about.name}
                  </div>
                  <div className="version">v{extension.manifest.about.version}</div>
                </div>
                <div className="authors">
                  by {extension.manifest.about.authors.join(", ")}
                </div>
              </div>
              <div className="left">

              </div>
            </div>
            <div className="bottom">

            </div>
          </div>
        })
      }
    </div>
  </>
}