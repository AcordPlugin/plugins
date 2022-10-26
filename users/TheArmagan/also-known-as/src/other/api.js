import { awaitResponse } from "../connection/socket";

/**
 * @param {string} id 
 * @param {"ALL"|"GUILD"|"USER"} type
 * @returns {string[]}
 */
export async function fetchNames(id, type, offset=0, limit=50) {
  return (await awaitResponse("names", { id, offset, limit, type }))?.data || [];
}

/**
 * 
 * @param {{ userId: string, name: string, from: "USER"|"GUILD", fromId: string }} names 
 */
export async function updateNames(names = []) {
  await awaitResponse("update", { names });
}