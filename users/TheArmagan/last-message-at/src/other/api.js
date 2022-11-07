import { awaitResponse } from "../connection/socket";

export async function fetchLastMessageAt(id) {
  return (await awaitResponse("at", { id }))?.data || -1;
}