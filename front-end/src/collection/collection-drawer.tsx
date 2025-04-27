import { Button, Drawer } from "antd";
import { openedCollectionDrawer } from "../store/drawer-atom";
import { useAtom, useAtomValue } from "jotai";
import { CollectionsForm } from "./collection-form";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Collection } from "../models/collection";
import { selectedCollectionId, selectedDrawerCollectionId } from "../store/selected-atom";
import { useCollectionQuery } from "../hooks/collection-query-hook";

export const CollectionDrawer = () => {
  const [open, setOpen] = useAtom(openedCollectionDrawer);
  const collectionId = useAtomValue(selectedDrawerCollectionId);
  const { data: collection } = useCollectionQuery(collectionId);
  const handleClose = () => {
    setOpen(false);
  };

  const onOk = (collection: Collection) => {
    setOpen(false);
    enqueueSnackbar(`The collection "${collection.name}" has been updated.`, {
      variant: "success",
      action: (key) => (
        <Button
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          View Collection
        </Button>
      ),
    });
  };

  return (
    <Drawer title={`Edit Collection "${collection?.name}"`} onClose={handleClose} open={open} mask={false}>
      {collection && <CollectionsForm onSubmit={onOk} collection={collection} />}
    </Drawer>
  );
};
