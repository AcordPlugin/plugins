import webpack from "@acord/modules/webpack";

const buttonClasses = webpack.findByProps("button", "lookBlank", "sizeLarge");

export function DOMInputButton({ icon, tooltip }) {
  return `
    <button class="${buttonClasses.button} ${buttonClasses.lookBlank} ${buttonClasses.colorBrand} ${buttonClasses.grow}" acord--tooltip-content="${tooltip}">
    
    </button>
  `;
}