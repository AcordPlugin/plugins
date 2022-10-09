import { Button, React } from "../../other/apis.js";
import i18n from "@acord/i18n"
import toasts from "@acord/ui/toasts"
import { TextInput } from "../TextInput.jsx";
import { useNest } from "nests/react";
import extensions from "@acord/extensions";
import swc from "@acord/modules/swc";
import utils from "@acord/utils";
import { TrashIcon } from "../icons/TrashIcon.jsx";
import { RestartIcon } from "../icons/RestartIcon.jsx";
import { LockIcon } from "../icons/LockIcon.jsx";
import { VerifiedIcon } from "../icons/VerifiedIcon.jsx";
import { CheckBox } from "../CheckBox.jsx";
import { CopyIcon } from "../icons/CopyIcon.jsx";

const scrollClasses = swc.findByProps("thin", "scrollerBase");

export function PluginsModal() {
  useNest(extensions.nests.loaded);
  const [importURL, setImportURL] = React.useState("");

  return <>
    <div className="import-container">
      <div className="input-container">
        <TextInput
          placeholder={i18n.fmt("IMPORT_PLUGIN_PLACEHOLDER")}
          value={importURL}
          onChange={(e) => {
            setImportURL(e.target.value);
          }}
        />
      </div>
      <div className="button-container">
        <Button
          size={Button.Sizes.MEDIUM}
          onClick={() => {
            extensions.load(importURL)
            setImportURL("");
          }}
        >{i18n.fmt("IMPORT_PLUGIN")}</Button>
      </div>
    </div>
    <div className={`extensions-container ${scrollClasses.thin}`}>
      {
        Object.entries(extensions.nests.loaded.ghost).filter(i=>!i[1].manifest.locked).map(([url, extension]) => {
          return <div className={`extension ${extension.manifest.locked ? "locked" : ""}`}>
            <div className="top">
              <div className="right">
                <div className="title-and-version">
                  <div className="title-and-icons">
                    <div class="title">
                      {extension.manifest.about.name}
                    </div>
                    {
                      (extension.manifest.locked || extension.verified) ?
                        <div className="icons">
                          {extension.verified ? <VerifiedIcon /> : null}
                          {extension.manifest.locked ? <LockIcon /> : null}
                        </div>
                        : null
                    }
                  </div>
                  <div className="version">v{extension.manifest.about.version}</div>
                </div>
                <div className="status">
                  <div className="authors">
                    by {extension.manifest.about.authors.join(", ")}
                  </div>
                </div>
              </div>
              <div className="left">
                <CheckBox checked={extension.enabled} onClick={() => {
                  extensions.toggle(url)
                }}/>
              </div>
            </div>
            <div className="bottom">
              <div className="left">
                <div className="description">
                  {extension.manifest.about.description}
                </div>
              </div>
              <div className="right">
                <div
                  className="control"
                  acord-tooltip-content={i18n.fmt("COPY_LINK")}
                  onClick={() => {
                    utils.copyText(url);
                    toasts.show(i18n.fmt("X_COPIED", url));
                  }}
                >
                  <CopyIcon />
                </div>
                <div
                  className="control"
                  acord-tooltip-content={i18n.fmt("RELOAD_PLUGIN")}
                  onClick={() => {
                    extensions.reload(url)
                  }}
                >
                  <RestartIcon />
                </div>
                <div
                  className="control"
                  acord-tooltip-content={i18n.fmt("REMOVE_PLUGIN")}
                  onClick={() => {
                    extensions.remove(url)
                  }}
                >
                  <TrashIcon />
                </div>
              </div>
            </div>
          </div>
        })
      }
    </div>
  </>
}