import { Button, Drawer } from "antd";
import { CollectionsForm } from "./collection-form";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { Collection } from "../models/collection";
import { useCollectionQuery, useCreateCollection, useUpdateCollection } from "../hooks/collection-query-hook";
import { useSelectCollection } from "../hooks/select-collection-hook";

export const CollectionDrawer = () => {
  const { drawerId: collectionId, id, isDefaultCollection, drawerOpen, displayDefaultCollection, displayCurrentCollection, closeDrawer } = useSelectCollection();
  const { data: collection } = useCollectionQuery(collectionId);

  const { mutateAsync: createCollection, status: createStatus } = useCreateCollection();
  const { mutateAsync: updateCollection, status: updateStatus } = useUpdateCollection();

  const handleSubmitSuccess = (collection: Collection, hasId: boolean) => {
    closeDrawer();
    enqueueSnackbar(`The collection "${collection.name}" has been ${hasId ? "updated" : "created"}.`, {
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

  const handleCollectionSubmit = async (collection: Collection) => {
    try {
      const request = {
        name: collection.name,
        description: collection.description,
        recipeIds: collection.recipes.map((r) => r.id),
      };

      const res = collection.id ? await updateCollection({ ...request, id: collection.id }) : await createCollection(request);
      handleSubmitSuccess(res, !!collection.id);
    } catch (e) {
      console.error(e);
    }
  };

  const isActiveCollection = id === collection?.id;
  const isProcessing = createStatus === "pending" || updateStatus === "pending";
  const title = collection?.id ? `Edit Collection "${collection?.name}"` : `Create Collection`;
  return (
    <Drawer title={title} onClose={() => closeDrawer()} open={drawerOpen} mask={false}>
      <CollectionsForm onSubmit={handleCollectionSubmit} collection={collection} isProcessing={isProcessing}>
        <Button variant="outlined" onClick={() => displayDefaultCollection()} disabled={isDefaultCollection}>
          Display all recipes collection
        </Button>
        <Button variant="outlined" onClick={() => displayCurrentCollection(collection?.id)} disabled={isActiveCollection}>
          Display current collection
        </Button>
      </CollectionsForm>
    </Drawer>
  );
};
