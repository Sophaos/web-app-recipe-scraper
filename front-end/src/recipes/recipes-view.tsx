import { SearchBar } from "./search-bar";
import { RecipesList } from "./recipes-list";
import { useSearchHook } from "../hooks/search-hook";
import { useCollectionQuery, useDeleteCollection } from "../hooks/collection-query-hook";
import { selectedCollectionId } from "../store/selected-atom";
import { useAtomValue, useSetAtom } from "jotai";
import { ALL_RECIPES_COLLECTION, DEFAULT_COLLECTION_ID } from "../shared/collection-const";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { openedCollectionDrawer } from "../store/drawer-atom";
import { enqueueSnackbar } from "notistack";

export const RecipesView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();
  const collectionId = useAtomValue(selectedCollectionId);
  const openCollectionDrawer = useSetAtom(openedCollectionDrawer);
  const { mutateAsync, status } = useDeleteCollection();
  const { data: collection } = useCollectionQuery(collectionId);

  const deleteCollection = async () => {
    const recipe = await mutateAsync({ id: collectionId });
    enqueueSnackbar(`The collection "${recipe.name}" has been succesfully deleted.`, {
      variant: "success",
    });
  };

  const openDrawer = () => {
    openCollectionDrawer(true);
  };

  const formattedCollection = collectionId === DEFAULT_COLLECTION_ID ? ALL_RECIPES_COLLECTION : collection;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-semibold">{formattedCollection?.name}</div>
        {collectionId !== DEFAULT_COLLECTION_ID && (
          <div className="flex flex-row gap-2">
            <Button icon={<DeleteFilled />} variant="outlined" danger onClick={() => deleteCollection()}>
              Delete Collection
            </Button>
            <Button icon={<EditFilled />} variant="outlined" onClick={openDrawer}>
              Edit Collection
            </Button>
          </div>
        )}
      </div>
      <div>{formattedCollection?.description}</div>
      <SearchBar setSearchTerm={debouncedSetSearchTerm} placeholder="Type to search your recipe" />
      <RecipesList searchTerm={searchTerm} />
    </div>
  );
};
