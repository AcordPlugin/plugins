import webpack from "@acord/modules/webpack";

const interactiveClasses1 = webpack.findByProps("responsiveWidthMobileFirst", "interactive");
const interactiveClasses2 = webpack.findByProps("interactiveSelected", "interactive");
const layoutClasses = webpack.findByProps("wrappedName", "layout", "avatar");

export function DOMSidebarItem({ icon, name } = {}) {

    return `
      <div class="${interactiveClasses1.interactive} ${interactiveClasses2.interactive} ${interactiveClasses2.linkButton}">
        <a class="${interactiveClasses2.link}">
          <div class="${interactiveClasses2.avatarWithText} ${layoutClasses.layout}">
            <div class="${layoutClasses.avatar}">
              ${icon}
            </div>
            <div class="${layoutClasses.content}">
              <div class="${layoutClasses.nameAndDecorators}">
                <div class="${layoutClasses.name}">
                  ${name}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    `;
}