import webpack from "@acord/modules/webpack";

const buttonClasses = webpack.findByProps("button", "lookFilled", "colorBrand");

export function DOMButton({ contents = "", className = "", color="colorBrand" } = {}) {
  return `
    <button class="${buttonClasses.button} ${buttonClasses.lookFilled} ${buttonClasses[color]} ${buttonClasses.sizeSmall} ${buttonClasses.grow} ${className}">
      <div class="${buttonClasses.contents}">${contents}</div>
    </button>
  `
}