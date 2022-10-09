(function (swc, i18n, dom, events, common, patcher) {
  'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var swc__default = /*#__PURE__*/_interopDefaultLegacy(swc);
  var i18n__default = /*#__PURE__*/_interopDefaultLegacy(i18n);
  var dom__default = /*#__PURE__*/_interopDefaultLegacy(dom);
  var events__default = /*#__PURE__*/_interopDefaultLegacy(events);

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

  let optionsClasses = swc__default["default"].findByProps("item", "selected", "separator");
  swc__default["default"].findByProps("button", "colorBrand", "lookFilled");
  function patchDOM() {
    patchContainer.add(
      events__default["default"].on("domMutation", (mut) => {
        mut.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE)
            return;
          node.querySelectorAll(`[aria-label="${i18n__default["default"].Messages.USER_SETTINGS}"].${optionsClasses.side}`).forEach(async (elm) => {
            if (elm.querySelector(".acord--patched"))
              return;
            elm.classList.add("acord--patched");
            let toAdd = [
              dom__default["default"].parseHTML(`<div class="${optionsClasses.header}">Acord</div>`),
              [
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">Plugins</div>`),
                () => {
                }
              ],
              [
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">Themes</div>`),
                () => {
                }
              ],
              [
                dom__default["default"].parseHTML(`<div class="${optionsClasses.item} ${optionsClasses.themed}">About</div>`),
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

  var styles = () => patcher.injectCSS("");

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

})(acord.modules.swc, acord.modules.common.i18n, acord.dom, acord.events, acord.modules.common, acord.patcher);
