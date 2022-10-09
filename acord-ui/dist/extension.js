(function (React$1, swc, discordI18N, i18n, dom, events, common, internal, require$$0, extensions, patcher) {
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
  var events__default = /*#__PURE__*/_interopDefaultLegacy(events);
  var common__default = /*#__PURE__*/_interopDefaultLegacy(common);
  var require$$0__default = /*#__PURE__*/_interopDefaultLegacy(require$$0);
  var extensions__default = /*#__PURE__*/_interopDefaultLegacy(extensions);

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
      className: "vi--icon vi--close-icon",
      style: { color: props.color }
    }, /* @__PURE__ */ React__namespace.createElement("path", {
      d: "M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z",
      fill: "currentColor"
    }));
  }

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
      className: `acord--modal-body acord--modal-body--${bodyId}`
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

  const nest = internal.nests.make({ urlInput: "" });
  function PluginsModal() {
    react.useNest(nest);
    react.useNest(extensions__default["default"].nests.loaded);
    return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
      className: "import-container"
    }, /* @__PURE__ */ React.createElement("div", {
      className: "input-container"
    }, /* @__PURE__ */ React.createElement(TextInput, {
      placeholder: i18n__default["default"].fmt("IMPORT_PLUGIN_PLACEHOLDER"),
      value: nest.ghost.urlInput,
      onChange: (e) => {
        nest.store.urlInput = e.target.value.startWith("h") ? e.target.value : "";
      }
    })), /* @__PURE__ */ React.createElement("div", {
      className: "button-container"
    }, /* @__PURE__ */ React.createElement(Button, {
      size: Button.Sizes.MEDIUM
    }, i18n__default["default"].fmt("IMPORT_PLUGIN")))), /* @__PURE__ */ React.createElement("div", {
      className: "extensions-container"
    }, Object.entries(extensions__default["default"].nests.loaded.ghost).map(([url, extension]) => {
      return /* @__PURE__ */ React.createElement("div", {
        className: "extension"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "top"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "right"
      }, /* @__PURE__ */ React.createElement("div", {
        className: "title-and-version"
      }, /* @__PURE__ */ React.createElement("div", {
        class: "title"
      }, extension.manifest.about.name), /* @__PURE__ */ React.createElement("div", {
        className: "version"
      }, "v", extension.manifest.about.version)), /* @__PURE__ */ React.createElement("div", {
        className: "authors"
      }, "by ", extension.manifest.about.authors.join(", "))), /* @__PURE__ */ React.createElement("div", {
        className: "left"
      })), /* @__PURE__ */ React.createElement("div", {
        className: "bottom"
      }));
    })));
  }

  let optionsClasses = swc__default["default"].findByProps("item", "selected", "separator");
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
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n__default["default"].fmt("PLUGINS")}</div>`),
                () => {
                  showModal((e) => {
                    return /* @__PURE__ */ React__namespace.createElement(ModalBase, {
                      e,
                      name: i18n__default["default"].fmt("PLUGINS"),
                      body: /* @__PURE__ */ React__namespace.createElement(PluginsModal, null),
                      bodyId: "plugins"
                    });
                  });
                }
              ],
              [
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n__default["default"].fmt("THEMES")}</div>`),
                () => {
                }
              ],
              [
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">${i18n__default["default"].fmt("ABOUT")}</div>`),
                () => {
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
        });
      })
    );
  }

  var styles = () => patcher.injectCSS(".acord--modal-root{display:flex;flex-direction:column;padding:16px;transform:translate(-50%,-50%)!important}.acord--modal-header{margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}.acord--modal-title{font-size:28px;color:#efefef;font-weight:600}.acord--modal-close{width:24px;height:24px}.acord--modal-close svg{width:24px;height:24px}.acord--modal-body{display:flex;flex-direction:column;max-height:550px;height:100%}.acord--modal-body--plugins .import-container{display:flex;align-items:center;gap:8px;margin-bottom:16px}.acord--modal-body--plugins .import-container .input-container{width:100%}.acord--modal-body--plugins .extensions-container{display:flex;flex-direction:column}.acord--modal-body--plugins .extensions-container .extension{display:flex;flex-direction:column;background-color:#00000026;margin-bottom:8px;border-radius:8px;color:#f5f5f5}.acord--modal-body--plugins .extensions-container .extension>.top{padding:8px;display:flex;align-items:center;justify-content:space-between}.acord--modal-body--plugins .extensions-container .extension>.top>.right{display:flex;flex-direction:column}.acord--modal-body--plugins .extensions-container .extension>.top>.right .title-and-version{display:flex;align-items:flex-end}.acord--modal-body--plugins .extensions-container .extension>.top>.right .title-and-version .title{font-size:18px;font-weight:500;margin-right:4px}.acord--modal-body--plugins .extensions-container .extension>.top>.right .title-and-version .version{font-size:14px;font-weight:200;opacity:.5;margin-right:4px}.acord--modal-body--plugins .extensions-container .extension>.top>.right .authors{font-size:16px;font-weight:200;opacity:.5}");

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

})(acord.modules.common.React, acord.modules.swc, acord.modules.common.i18n, acord.i18n, acord.dom, acord.events, acord.modules.common, acord.internal, acord.modules.common.React, acord.extensions, acord.patcher);
