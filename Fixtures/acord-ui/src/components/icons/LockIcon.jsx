export function LockIcon(props = {}) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className="acord--icon acord--lock-icon"
      style={{ color: props.color }}
    >
      <path fill="currentColor" d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-7 7.732V18h2v-2.268a2 2 0 1 0-2 0zM16 8V7a4 4 0 1 0-8 0v1h8z" />
    </svg>
  );
}