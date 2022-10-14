export function formatSeconds(s) {
  if (isNaN(parseInt(s))) s = 0;
  s = Math.floor(s);
  let hours = Math.floor((s / 60) / 60);
  return `${hours > 0 ? `${hours.toString().padStart(2, "0")}:` : ""}${Math.floor((s / 60) % 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}