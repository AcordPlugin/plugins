import { Button, React, showModal } from "../../other/apis.js";
import i18n from "@acord/i18n"
import toasts from "@acord/ui/toasts"
import { TextInput } from "../TextInput.jsx";
import { useNest } from "nests/react";
import extensions from "@acord/extensions";
import webpack from "@acord/modules/webpack";
import utils from "@acord/utils";
import { TrashIcon } from "../icons/TrashIcon.jsx";
import { RestartIcon } from "../icons/RestartIcon.jsx";
import { LockIcon } from "../icons/LockIcon.jsx";
import { VerifiedIcon } from "../icons/VerifiedIcon.jsx";
import { CheckBox } from "../CheckBox.jsx";
import { CopyIcon } from "../icons/CopyIcon.jsx";
import { SettingsIcon } from "../icons/SettingsIcon.jsx";
import { ModalBase } from "./ModalBase.jsx";
import { ExtensionSettings } from "./ExtensionSettings.jsx";

const scrollClasses = webpack.findByProps("thin", "scrollerBase");

let extensionsRegex = /^https?:\/\/acord\.app\/(plugin|theme)s?\/(.*)$/;
let extensionsRegex2 = /^https?\:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(plugins|themes)\/main\/users\/(.+)\/dist\/$/;

export function ExtensionsModal({ extensionsType }) {
  useNest(extensions.nests.loaded);
  useNest(extensions.nests.enabled);
  const [importURL, setImportURL] = React.useState("");
  const [searchText, setSearchText] = React.useState("");

  let extensionsTypeUpper = extensionsType.toUpperCase();

  return <>
    <div className="inputs-container">
      <div className="search-container">
        <TextInput
          placeholder={i18n.format(`SEARCH`)}
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value.toLowerCase());
          }}
        />
      </div>
      <div className="import-container">
        <TextInput
          placeholder={i18n.format(`IMPORT_${extensionsTypeUpper}_PLACEHOLDER`)}
          value={importURL}
          onChange={(e) => {
            setImportURL(e.target.value);
          }}
        />
      </div>
      <div className="import-button-container">
        <Button
          size={Button.Sizes.MEDIUM}
          onClick={async () => {
            if (!importURL.trim()) return;
            setImportURL("");
            let href = importURL;
            if (extensionsRegex.test(href)) {
              let [, extensionType, extensionPath] = importURL.match(extensionsRegex);
              if (extensionType.endsWith("s")) extensionType = extensionType.slice(0, -1);
              href = `https://raw.githubusercontent.com/AcordPlugin/${extensionType}s/main/users/${extensionPath.endsWith("/") ? extensionPath.slice(0, -1) : extensionPath}/dist/`;
            }

            try {
              await extensions.load(href);
            } catch (err) {
              let errStr = `${err}`;
              if (errStr.includes("EXTENSION_ALREADY_ENABLED")) {
                toasts.show.error(i18n.format("EXTENSION_ALREADY_ENABLED", "Unknown"));
              } else {
                toasts.show.error(errStr);
              }
            }
          }}
        >{i18n.format(`IMPORT_${extensionsTypeUpper}`)}</Button>
      </div>
    </div>
    <div className={`extensions-container ${scrollClasses.thin}`}>
      {
        Object.entries(extensions.nests.loaded.ghost).filter(i => (!i[1].manifest.locked && i[1].manifest.type == extensionsType) && (i[1].manifest.about.name.toLowerCase().includes(searchText))).map(([url, extension]) => {
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
                    {i18n.format("X_MADE_BY", extension.manifest.about.authors.join(", "))}
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
                  acord--tooltip-content={i18n.format(`COPY_${extensionsTypeUpper}_LINK`)}
                  onClick={() => {
                    let href = url;
                    if (extensionsRegex2.test(href)) {
                      let [, extensionType, extensionPath] = href.match(extensionsRegex2);
                      href = `https://acord.app/${extensionType}/${extensionPath}/`;
                    }
                    utils.copyText(href);
                    toasts.show(i18n.format("X_COPIED", href));
                  }}
                >
                  <CopyIcon />
                </div>
                {
                  Array.isArray(extensions.nests.enabled.ghost?.[url]?.settings?.data) ? <div
                    className="control"
                    acord--tooltip-content={i18n.format(`OPEN_${extensionsTypeUpper}_SETTINGS`)}
                    onClick={() => {
                      showModal((e) => {
                        return <ModalBase e={e} name={i18n.format("X_EXTENSION_SETTINGS", extension.manifest.about.name)} body={<ExtensionSettings extension={extension} url={url} />} bodyId="extension-settings"></ModalBase>
                      })
                    }}
                  >
                    <SettingsIcon />
                  </div> : null
                }
                <div
                  className="control"
                  acord--tooltip-content={i18n.format(`RELOAD_${extensionsTypeUpper}`)}
                  onClick={() => {
                    extensions.reload(url)
                  }}
                >
                  <RestartIcon />
                </div>
                <div
                  className="control"
                  acord--tooltip-content={i18n.format(`REMOVE_${extensionsTypeUpper}`)}
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