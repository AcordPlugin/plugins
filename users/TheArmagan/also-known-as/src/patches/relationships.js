import { updateNames } from "../other/api";
import { fetchRelationships, FluxDispatcher, UserStore } from "../other/apis";
import patchContainer from "../other/patchContainer";

export async function patchRelationships() {
  
  let patch = (() => {

    function onRelationships({ relationships }) {
      let currentUser = UserStore.getCurrentUser();
      let names = relationships.filter(i => i.nickname).map(i => ({ userId: i.id, name: i.nickname, from: "USER", fromId: currentUser.id }));
      updateNames(names);
    }

    FluxDispatcher.subscribe("LOAD_RELATIONSHIPS_SUCCESS", onRelationships);
    setTimeout(fetchRelationships, 1000);

    let updateInterval = setInterval(fetchRelationships, 60000 * 6);

    
    return () => {
      FluxDispatcher.unsubscribe("LOAD_RELATIONSHIPS_SUCCESS", onRelationships);
      clearInterval(updateInterval);
    }
  })();


  patchContainer.add(patch);
}