import { FluxDispatcher, Rest } from "./apis";

export async function loadNotes() {
  try {
    let req = await Rest.get("/users/@me/notes");
    if (!req.ok) throw new Error(req?.body?.message);
    for (const userId in req.body) {
      let note = req.body[userId];
      if (!note) continue;
      FluxDispatcher.dispatch({
        type: "USER_NOTE_LOADED",
        userId,
        note: { note, loading: false }
      });
    }
  } catch (err) { 
    console.error("Unable to load notes!", err);
  };
}