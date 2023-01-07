import { awaitResponse } from "../connection/socket";

export async function fetchLastMessageInfo(id) {
  let val = (await awaitResponse("at", { id }))?.data || null;
  if (!val) return null;
  return Array.isArray(val) ? val : [val];
}