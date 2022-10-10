export function DOMCopyIcon(props = {}) {
  return `
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="acord--icon acord--copy-icon"
      ${props.color ? `style="color: ${props.color}"` : ""}
    >
      <path fill="currentColor" d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zm2 0h8v10h2V4H9v2z" />
    </svg>
  `;
}