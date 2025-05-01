import { Button, Drawer } from "antd";
import { CollectionsForm } from "./collection-form";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Collection } from "../models/collection";
import { useCollectionQuery } from "../hooks/collection-query-hook";
import { useSelectCollection } from "../hooks/select-collection-hook";

export const CollectionDrawer = () => {
  const { drawerId: collectionId, drawerOpen, closeDrawer } = useSelectCollection();
  const { data: collection } = useCollectionQuery(collectionId);
  const { id, displayDefaultCollection, displayCurrentCollection, isDefaultCollection } = useSelectCollection();

  const onOk = (collection: Collection) => {
    closeDrawer();
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

  const isActiveCollection = id === collection?.id;

  return (
    <Drawer title={`Edit Collection "${collection?.name}"`} onClose={() => closeDrawer()} open={drawerOpen} mask={false}>
      {collection && (
        <CollectionsForm onSubmit={onOk} collection={collection}>
          <Button variant="outlined" onClick={() => displayDefaultCollection()} disabled={isDefaultCollection}>
            Display all recipes collection
          </Button>
          <Button variant="outlined" onClick={() => displayCurrentCollection(collection?.id)} disabled={isActiveCollection}>
            Display current collection
          </Button>
        </CollectionsForm>
      )}
    </Drawer>
  );
};
