import { Button, Drawer } from "antd";
import { CollectionsForm } from "./collection-form";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Collection } from "../models/collection";
import { useCollectionQuery } from "../hooks/collection-query-hook";
import { useSelectCollection } from "../hooks/select-collection-hook";

export const CollectionDrawer = () => {
  const { drawerId: collectionId, drawerOpen, closeDrawer } = useSelectCollection();
  const { data: collection } = useCollectionQuery(collectionId);

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

  return (
    <Drawer title={`Edit Collection "${collection?.name}"`} onClose={() => closeDrawer()} open={drawerOpen} mask={false}>
      {collection && <CollectionsForm onSubmit={onOk} collection={collection} />}
    </Drawer>
  );
};
