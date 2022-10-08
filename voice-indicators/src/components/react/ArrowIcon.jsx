export function ArrowIcon(props = {}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="vi--icon vi--arrow-icon"
      style={{ color: props.color }}
    >
      <polygon
        fill="currentColor"
        fill-rule="nonzero"
        points="13 20 11 20 11 8 5.5 13.5 4.08 12.08 12 4.16 19.92 12.08 18.5 13.5 13 8"
      ></polygon>
    </svg>
  );
}
