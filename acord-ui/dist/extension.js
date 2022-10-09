(function (React$1, swc, discordI18N, i18n, dom, modals, toasts, events, extensions, common, require$$0, utils, patcher) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }

  var React__namespace = /*#__PURE__*/_interopNamespace(React$1);
  var swc__default = /*#__PURE__*/_interopDefaultLegacy(swc);
  var discordI18N__default = /*#__PURE__*/_interopDefaultLegacy(discordI18N);
  var i18n__default = /*#__PURE__*/_interopDefaultLegacy(i18n);
  var dom__default = /*#__PURE__*/_interopDefaultLegacy(dom);
  var modals__default = /*#__PURE__*/_interopDefaultLegacy(modals);
  var toasts__default = /*#__PURE__*/_interopDefaultLegacy(toasts);
  var events__default = /*#__PURE__*/_interopDefaultLegacy(events);
  var extensions__default = /*#__PURE__*/_interopDefaultLegacy(extensions);
  var common__default = /*#__PURE__*/_interopDefaultLegacy(common);
  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
  var utils__default = /*#__PURE__*/_interopDefaultLegacy(utils);

  class Patches {
    constructor() {
      this.patches = [];
    }
    add(...unPatchers) {
      this.patches.push(...unPatchers);
    }
    remove(unPatcher) {
      let [f] = this.patches.splice(this.patches.indexOf((i) => i == unPatcher), 1);
      f();
    }
    removeAll() {
      let l = this.patches.splice(0, this.patches.length);
      for (let i = 0; i < l.length; i++) {
        l[i]();
      }
    }
  }
  var patchContainer = new Patches();

  const {
    InviteStore,
    React,
    Button,
    modals: {
      actions: {
        show: showModal
      },
      ModalRoot
    }
  } = common__default["default"];

  const COLORS = {
    DANGER: "#eb3d47",
    SECONDARY: "#8a8e93",
    SUCCESS: "#3aa360",
    PRIMARY: "#5865f2"
  };

  function CloseIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      className: "acord--icon acord--close-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z",
      fill: "currentColor"
    }));
  }

  const scrollClasses$1 = swc__default["default"].findByProps("thin", "scrollerBase");
  function ModalBase({ e, body, name, bodyId }) {
    return /* @__PURE__ */ React__namespace.createElement(ModalRoot, {
      transitionState: e.transitionState,
      size: "large",
      className: "acord--modal-root"
    }, /* @__PURE__ */ React__namespace.createElement("div", {
      className: "acord--modal-header"
    }, /* @__PURE__ */ React__namespace.createElement("h1", {
      className: "acord--modal-title"
    }, name), /* @__PURE__ */ React__namespace.createElement("div", {
      onClick: e.onClose,
      className: "acord--modal-close"
    }, /* @__PURE__ */ React__namespace.createElement(CloseIcon, {
      color: COLORS.SECONDARY
    }))), /* @__PURE__ */ React__namespace.createElement("div", {
      className: `acord--modal-body acord--modal-body--${bodyId} ${scrollClasses$1.thin}`
    }, body));
  }

  let inputClasses = swc__default["default"].findByProps("inputDefault", "copyInput");
  let inputClasses2 = swc__default["default"].findByProps("input", "editable", "disabled", "inputWrapper");
  function TextInput(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("div", {
      className: `${inputClasses2?.input}`
    }, /* @__PURE__ */ React__namespace.createElement("div", {
      className: `${inputClasses?.inputWrapper}`
    }, /* @__PURE__ */ React__namespace.createElement("input", {
      type: "text",
      className: `${inputClasses?.inputDefault}`,
      ...props
    })));
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var react = {};

  var useNest$1 = {};

  var Events = {};

  Object.defineProperty(Events, "__esModule", { value: true });
  Events.default = Object.freeze({
      GET: "GET",
      SET: "SET",
      DELETE: "DELETE",
      UPDATE: "UPDATE",
  });

  var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
      return (mod && mod.__esModule) ? mod : { "default": mod };
  };
  Object.defineProperty(useNest$1, "__esModule", { value: true });
  // Import default from React or CRA fails.
  // Why isn't CRA being updated to modern technologies if it's recommended officially.
  const react_1 = require$$0__default["default"];
  const Events_1 = __importDefault(Events);
  function useNest(nest, transient = false, filter = () => true) {
      // Keep this here for React devtools.
      // @ts-ignore
      (0, react_1.useRef)(nest.ghost);
      const [, forceUpdate] = (0, react_1.useReducer)((n) => ~n, 0);
      (0, react_1.useEffect)(() => {
          function listener(event, data) {
              if (filter(event, data))
                  forceUpdate();
          }
          nest.on(Events_1.default.UPDATE, listener);
          if (!transient) {
              nest.on(Events_1.default.SET, listener);
              nest.on(Events_1.default.DELETE, listener);
          }
          return () => {
              nest.off(Events_1.default.UPDATE, listener);
              if (!transient) {
                  nest.off(Events_1.default.SET, listener);
                  nest.off(Events_1.default.DELETE, listener);
              }
          };
      }, []);
      return nest.ghost;
  }
  useNest$1.default = useNest;

  (function (exports) {
  	var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
  	    return (mod && mod.__esModule) ? mod : { "default": mod };
  	};
  	Object.defineProperty(exports, "__esModule", { value: true });
  	exports.useNest = void 0;
  	var useNest_1 = useNest$1;
  	Object.defineProperty(exports, "useNest", { enumerable: true, get: function () { return __importDefault(useNest_1).default; } });
  } (react));

  function TrashIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "acord--icon acord--trash-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      fill: "currentColor",
      d: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"
    }));
  }

  function RestartIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "acord--icon acord--restart-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      fill: "currentColor",
      d: "M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm4.82-4.924a7 7 0 1 0-1.852 1.266l-.975-1.755A5 5 0 1 1 17 12h-3l2.82 5.076z"
    }));
  }

  function LockIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "acord--icon acord--lock-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      fill: "currentColor",
      d: "M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-7 7.732V18h2v-2.268a2 2 0 1 0-2 0zM16 8V7a4 4 0 1 0-8 0v1h8z"
    }));
  }

  function VerifiedIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "acord--icon acord--verified-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z",
      fill: "currentColor"
    }));
  }

  function CheckBox(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("div", {
      className: "acord--checkbox-container"
    }, /* @__PURE__ */ React__namespace.createElement("input", {
      className: "acord--checkbox",
      type: "checkbox",
      ...props
    }), /* @__PURE__ */ React__namespace.createElement("div", {
      className: "acord--checkbox-visual"
    }, /* @__PURE__ */ React__namespace.createElement("div", null)));
  }

  function CopyIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "acord--icon acord--copy-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      fill: "currentColor",
      d: "M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zm2 0h8v10h2V4H9v2z"
    }));
  }

  function SettingsIcon(props = {}) {
    return /* @__PURE__ */ React__namespace.createElement("svg", {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      className: "acord--icon acord--settings-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      fill: "currentColor",
      d: "M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
    }));
  }

  function ExtensionSettings({ url, extension }) {
    react.useNest(extensions__default["default"].nests.enabled);
    react.useNest(extensions__default["default"].nests.enabled.ghost[url].persist);
    const extensionSrc = extensions__default["default"].nests.enabled.ghost[url];
    const persist = extensionSrc.persist;
    const types = {
      header: (setting2) => {
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", {
          className: "left"
        }), /* @__PURE__ */ React__namespace.createElement("div", {
          className: "center"
        }, setting2.name), /* @__PURE__ */ React__namespace.createElement("div", {
          className: "right"
        }));
      },
      checkbox: (setting2) => {
        return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, /* @__PURE__ */ React__namespace.createElement("div", {
          className: "left info-side"
        }, /* @__PURE__ */ React__namespace.createElement("div", {
          className: "name"
        }, setting2.name), setting2.description ? /* @__PURE__ */ React__namespace.createElement("div", {
          className: "description"
        }, setting2.description) : null), /* @__PURE__ */ React__namespace.createElement("div", {
          className: "right"
        }, /* @__PURE__ */ React__namespace.createElement(CheckBox, {
          checked: persist.ghost.settings?.[setting2.property] ?? setting2.value,
          onChange: (e) => {
            persist.store.settings[setting2.property] = e.target.checked;
          }
        })));
      }
    };
    return /* @__PURE__ */ React__namespace.createElement(React__namespace.Fragment, null, extensionSrc.settings.map((setting) => {
      return (setting.condition ? eval(`(($)=>{ return (${setting.condition}) })`)(persist.ghost.settings || {}) : true) ? /* @__PURE__ */ React__namespace.createElement("div", {
        class: `container container--${setting.type}`
      }, types[setting.type](setting)) : null;
    }));
  }

  const scrollClasses = swc__default["default"].findByProps("thin", "scrollerBase");
  function ExtensionsModal() {
    react.useNest(extensions__default["default"].nests.loaded);
    react.useNest(extensions__default["default"].nests.enabled);
    const [importURL, setImportURL] = React.useState("");
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "import-container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "input-container"
    }, /* @__PURE__ */ React.createElement(TextInput, {
      placeholder: i18n__default["default"].fmt("IMPORT_PLUGIN_PLACEHOLDER"),
      value: importURL,
      onChange: (e) => {
        setImportURL(e.target.value);
      }
    })), /* @__PURE__ */ React.createElement("div", {
      className: "button-container"
    }, /* @__PURE__ */ React.createElement(Button, {
      size: Button.Sizes.MEDIUM,
      onClick: async () => {
        if (!importURL.trim())
          return;
        setImportURL("");
        try {
          await extensions__default["default"].load(importURL);
        } catch (err) {
          let errStr = `${err}`;
          if (errStr.includes("EXTENSION_ALREADY_ENABLED")) {
            toasts__default["default"].show.error(i18n__default["default"].fmt("EXTENSION_ALREADY_ENABLED", extensionName));
          } else {
            toasts__default["default"].show.error(errStr);
          }
        }
      }
    }, i18n__default["default"].fmt("IMPORT_EXTENSION")))), /* @__PURE__ */ React.createElement("div", {
      className: `extensions-container ${scrollClasses.thin}`
    }, Object.entries(extensions__default["default"].nests.loaded.ghost).filter((i) => !i[1].manifest.locked).map(([url, extension]) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: `extension ${extension.manifest.locked ? "locked" : ""}`
      }, /* @__PURE__ */ React.createElement("div", {
        className: "top"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "right"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "title-and-version"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "title-and-icons"
      }, /* @__PURE__ */ React.createElement("div", {
        class: "title"
      }, extension.manifest.about.name), extension.manifest.locked || extension.verified ? /* @__PURE__ */ React.createElement("div", {
        className: "icons"
      }, extension.verified ? /* @__PURE__ */ React.createElement(VerifiedIcon, null) : null, extension.manifest.locked ? /* @__PURE__ */ React.createElement(LockIcon, null) : null) : null), /* @__PURE__ */ React.createElement("div", {
        className: "version"
      }, "v", extension.manifest.about.version)), /* @__PURE__ */ React.createElement("div", {
        className: "status"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "authors"
      }, i18n__default["default"].fmt("X_MADE_BY", extension.manifest.about.authors.join(", "))))), /* @__PURE__ */ React.createElement("div", {
        className: "left"
      }, /* @__PURE__ */ React.createElement(CheckBox, {
        checked: extension.enabled,
        onClick: () => {
          extensions__default["default"].toggle(url);
        }
      }))), /* @__PURE__ */ React.createElement("div", {
        className: "bottom"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "left"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "description"
      }, extension.manifest.about.description)), /* @__PURE__ */ React.createElement("div", {
        className: "right"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "control",
        "acord-tooltip-content": i18n__default["default"].fmt("COPY_LINK"),
        onClick: () => {
          utils__default["default"].copyText(url);
          toasts__default["default"].show(i18n__default["default"].fmt("X_COPIED", url));
        }
      }, /* @__PURE__ */ React.createElement(CopyIcon, null)), Array.isArray(extensions__default["default"].nests.enabled.ghost?.[url]?.settings) ? /* @__PURE__ */ React.createElement("div", {
        className: "control",
        "acord-tooltip-content": i18n__default["default"].fmt("OPEN_EXTENSION_SETTINGS"),
        onClick: () => {
          showModal((e) => {
            return /* @__PURE__ */ React.createElement(ModalBase, {
              e,
              name: i18n__default["default"].fmt("X_EXTENSION_SETTINGS", extension.manifest.about.name),
              body: /* @__PURE__ */ React.createElement(ExtensionSettings, {
                extension,
                url
              }),
              bodyId: "extension-settings"
            });
          });
        }
      }, /* @__PURE__ */ React.createElement(SettingsIcon, null)) : null, /* @__PURE__ */ React.createElement("div", {
        className: "control",
        "acord-tooltip-content": i18n__default["default"].fmt("RELOAD_EXTENSION"),
        onClick: () => {
          extensions__default["default"].reload(url);
        }
      }, /* @__PURE__ */ React.createElement(RestartIcon, null)), /* @__PURE__ */ React.createElement("div", {
        className: "control",
        "acord-tooltip-content": i18n__default["default"].fmt("REMOVE_EXTENSION"),
        onClick: () => {
          extensions__default["default"].remove(url);
        }
      }, /* @__PURE__ */ React.createElement(TrashIcon, null)))));
    })));
  }

  let optionsClasses = swc__default["default"].findByProps("item", "selected", "separator");
  let anchorClasses = swc__default["default"].findByProps("anchor", "anchorUnderlineOnHover");
  let extensionsRegex = /^https\:\/\/raw\.githubusercontent\.com\/AcordPlugin\/(?:plugins|themes)\/main\/([^\/]+).*\/dist\/$/;
  function patchDOM() {
    patchContainer.add(
      events__default["default"].on("domMutation", (mut) => {
        mut.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE)
            return;
          node.querySelectorAll(`[aria-label="${discordI18N__default["default"].Messages.USER_SETTINGS}"].${optionsClasses.side}`).forEach(async (elm) => {
            if (elm.querySelector(".acord--patched"))
              return;
            elm.classList.add("acord--patched");
            let toAdd = [
              dom__default["default"].parseHTML(`<div class="${optionsClasses.header}">Acord</div>`),
              [
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n__default["default"].fmt("EXTENSIONS")}</div>`),
                () => {
                  showModal((e) => {
                    return /* @__PURE__ */ React__namespace.createElement(ModalBase, {
                      e,
                      name: i18n__default["default"].fmt("EXTENSIONS"),
                      body: /* @__PURE__ */ React__namespace.createElement(ExtensionsModal, null),
                      bodyId: "extensions"
                    });
                  });
                }
              ],
              dom__default["default"].parseHTML(`<div class="${optionsClasses.separator}"></div>`)
            ];
            toAdd.forEach((i) => {
              if (!Array.isArray(i)) {
                elm.insertBefore(i, elm.children[elm.children.length - 7]);
                return;
              }
              elm.insertBefore(i[0], elm.children[elm.children.length - 7]);
              i[0].onclick = i[1];
            });
          });
          node.querySelectorAll(`.${anchorClasses.anchor}.${anchorClasses.anchorUnderlineOnHover}`).forEach(async (elm) => {
            if (elm.querySelector(".acord--patched"))
              return;
            elm.classList.add("acord--patched");
            let href = elm.href;
            if (!extensionsRegex.test(href))
              return;
            let extensionName = [...href.match(extensionsRegex) || []]?.[1];
            elm.addEventListener("click", async (e) => {
              e.preventDefault();
              e.stopPropagation();
              let accepted = await modals__default["default"].show.confirmation(
                i18n__default["default"].fmt("IMPORT_EXTENSION"),
                i18n__default["default"].fmt("IMPORT_EXTENSION_DESCRIPTION", extensionName)
              );
              if (!accepted)
                return;
              try {
                await extensions__default["default"].load(elm.href);
              } catch (err) {
                let errStr = `${err}`;
                if (errStr.includes("EXTENSION_ALREADY_ENABLED")) {
                  toasts__default["default"].show.error(i18n__default["default"].fmt("EXTENSION_ALREADY_ENABLED", extensionName));
                } else {
                  toasts__default["default"].show.error(errStr);
                }
              }
            });
          });
        });
      })
    );
  }

  var styles = () => patcher.injectCSS(".acord--modal-root{display:flex;flex-direction:column;padding:16px;transform:translate(-50%,-50%)!important}.acord--modal-header{margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}.acord--modal-title{font-size:28px;color:#efefef;font-weight:600}.acord--modal-close{width:24px;height:24px;cursor:pointer}.acord--modal-close svg{width:24px;height:24px}.acord--modal-body{display:flex;flex-direction:column;height:550px;overflow:auto;contain:content}.acord--modal-body--extensions .import-container{display:flex;align-items:center;gap:8px;margin-bottom:16px}.acord--modal-body--extensions .import-container .input-container{width:100%}.acord--modal-body--extensions .extensions-container{display:flex;flex-direction:column;max-height:500px;height:500px;overflow:auto;contain:content}.acord--modal-body--extensions .extensions-container .extension{display:flex;flex-direction:column;background-color:#00000026;margin-bottom:8px;border-radius:8px;color:#f5f5f5;contain:content}.acord--modal-body--extensions .extensions-container .extension.locked{opacity:.75;pointer-events:none;filter:brightness(.5)}.acord--modal-body--extensions .extensions-container .extension>.top{padding:8px;display:flex;align-items:center;justify-content:space-between;background-color:#00000026}.acord--modal-body--extensions .extensions-container .extension>.top>.right{display:flex;flex-direction:column}.acord--modal-body--extensions .extensions-container .extension>.top>.right .title-and-version{display:flex;align-items:flex-end;margin-bottom:2px}.acord--modal-body--extensions .extensions-container .extension>.top>.right .title-and-version .title-and-icons{display:flex;align-items:center}.acord--modal-body--extensions .extensions-container .extension>.top>.right .title-and-version .title-and-icons .title{font-size:18px;font-weight:500;margin-right:2px}.acord--modal-body--extensions .extensions-container .extension>.top>.right .title-and-version .title-and-icons .icons{display:flex;gap:2px}.acord--modal-body--extensions .extensions-container .extension>.top>.right .title-and-version .title-and-icons .icons .acord--icon{width:14px;height:14px}.acord--modal-body--extensions .extensions-container .extension>.top>.right .title-and-version .version{margin-left:4px;font-size:14px;font-weight:200;opacity:.5;margin-right:4px}.acord--modal-body--extensions .extensions-container .extension>.top>.right .status{font-size:12px;font-weight:200;opacity:.75;display:flex}.acord--modal-body--extensions .extensions-container .extension>.top>.right .status .authors{margin-right:4px;opacity:.75}.acord--modal-body--extensions .extensions-container .extension>.top>.left{font-size:26px;cursor:pointer}.acord--modal-body--extensions .extensions-container .extension>.bottom{padding:8px;display:flex;align-items:center;justify-content:space-between}.acord--modal-body--extensions .extensions-container .extension>.bottom>.left .description{opacity:.9}.acord--modal-body--extensions .extensions-container .extension>.bottom>.right{display:flex}.acord--modal-body--extensions .extensions-container .extension>.bottom>.right .control{background-color:#00000026;padding:8px;border-radius:8px;margin-left:4px;cursor:pointer}.acord--modal-body--extensions .extensions-container .extension>.bottom>.right .control:hover{background-color:#00000040}.acord--modal-body--extensions .extensions-container .extension>.bottom>.right .control:hover svg{opacity:.95}.acord--modal-body--extensions .extensions-container .extension>.bottom>.right .control svg{width:18px;height:18px}.acord--modal-body--extension-settings .container{margin-bottom:8px}.acord--modal-body--extension-settings .container--header{display:flex;align-items:center;width:100%;gap:4px;font-size:20px}.acord--modal-body--extension-settings .container--header .left{width:8px;height:2px;background-color:#ffffff40;border-radius:9999px}.acord--modal-body--extension-settings .container--header .center{color:#fff;font-weight:600;text-transform:uppercase;opacity:.85}.acord--modal-body--extension-settings .container--header .right{width:100%;height:2px;background-color:#ffffff40;border-radius:9999px}.acord--modal-body--extension-settings .container .info-side{width:80%;display:flex;flex-direction:column}.acord--modal-body--extension-settings .container .info-side .name{font-size:18px;font-weight:600;color:#fff;opacity:.9}.acord--modal-body--extension-settings .container .info-side .description{margin-top:4px;color:#fff;opacity:.85}.acord--modal-body--extension-settings .container--checkbox{padding:0 10px;display:flex;align-items:center;justify-content:space-between}.acord--modal-body--extension-settings .container--checkbox>.left{width:80%}.acord--modal-body--extension-settings .container--checkbox>.right{width:20%;align-items:center;justify-content:flex-end;display:flex;font-size:24px}.acord--checkbox-container{display:grid;gap:8px;grid-template-columns:max-content min-content;grid-template-rows:max-content;align-items:center}.acord--checkbox-container>input{grid-column:2/3;grid-row:1/2}.acord--checkbox-container>div{grid-column:2/3;grid-row:1/2}.acord--checkbox{width:100%;height:100%;appearance:none;margin:0;padding:0;cursor:pointer}.acord--checkbox:checked~.acord--checkbox-visual{background:hsl(152deg,45%,48%)}.acord--checkbox:checked~.acord--checkbox-visual>div{left:100%;transform:translate(-100%);background:white;display:grid}.acord--checkbox:checked~.acord--checkbox-visual>div:before{background-color:#43b17e;clip-path:polygon(25% 75%,33% 100%,100% 20%,80% 0%)}.acord--checkbox:checked~.acord--checkbox-visual>div:after{background-color:#43b17e;clip-path:polygon(20% 45%,0% 65%,33.33% 100%,45% 75%)}.acord--checkbox~.acord--checkbox-visual>div{position:relative;left:0;height:.8em;width:.8em;background:white;pointer-events:none;transition:inherit;border-radius:9999px;display:grid;justify-items:stretch;align-items:stretch;padding:.1em}.acord--checkbox~.acord--checkbox-visual>div:before{content:\"\";transition:inherit;background-color:#71747a;grid-column:1/2;grid-row:1/2;clip-path:polygon(20% 0%,0% 20%,80% 100%,100% 80%)}.acord--checkbox~.acord--checkbox-visual>div:after{content:\"\";transition:inherit;background-color:#71747a;grid-column:1/2;grid-row:1/2;clip-path:polygon(0% 80%,20% 100%,100% 20%,80% 0%)}.acord--checkbox-visual{cursor:pointer;position:relative;background:hsl(218deg,4%,46%);transition:.3s cubic-bezier(.83,0,.17,1);font-size:1em;width:2em;height:1em;padding:.1em;border-radius:9999px;pointer-events:none}");

  function patchStyles() {
    patchContainer.add(styles());
  }

  var index = {
    load() {
      patchDOM();
      patchStyles();
    },
    unload() {
      patchContainer.removeAll();
    }
  };

  return index;

})(acord.modules.common.React, acord.modules.swc, acord.modules.common.i18n, acord.i18n, acord.dom, acord.ui.modals, acord.ui.toasts, acord.events, acord.extensions, acord.modules.common, acord.modules.common.React, acord.utils, acord.patcher);
