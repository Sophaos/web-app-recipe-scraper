import { useAtom } from "jotai";
import { openedCollectionDrawer, selectedCollectionId, selectedDrawerCollectionId } from "../store/selected-atom";
import { DEFAULT_COLLECTION_ID } from "../shared/collection-const";

export const useSelectCollection = () => {
  const [id, setId] = useAtom(selectedCollectionId);
  const [drawerId, setDrawerId] = useAtom(selectedDrawerCollectionId);
  const [drawerOpen, setDrawerOpen] = useAtom(openedCollectionDrawer);

  const isDefaultCollection = id === DEFAULT_COLLECTION_ID;

  const displayDefaultCollection = () => {
    setId(DEFAULT_COLLECTION_ID);
  };

  const displayCurrentCollection = (id: string | undefined) => {
    setId(id ?? DEFAULT_COLLECTION_ID);
  };

  const openDrawer = () => {
    setDrawerId(id);
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const selectCollection = (collectionoId?: string) => {
    setId(collectionoId ?? DEFAULT_COLLECTION_ID);
  };

  return {
    id,
    isDefaultCollection,
    drawerOpen,
    drawerId,
    closeDrawer,
    displayDefaultCollection,
    displayCurrentCollection,
    selectCollection,
    openDrawer,
  };
};
