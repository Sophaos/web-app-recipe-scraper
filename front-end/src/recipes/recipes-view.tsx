import { SearchBar } from "./search-bar";
import { RecipesList } from "./recipes-list";
import { useSearchHook } from "../hooks/search-hook";
import { useCollectionQuery, useDeleteCollection } from "../hooks/collection-query-hook";
import { selectedCollectionId, selectedDrawerCollectionId, selectedRecipesIds } from "../store/selected-atom";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { ALL_RECIPES_COLLECTION, DEFAULT_COLLECTION_ID } from "../shared/collection-const";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { openedCollectionDrawer } from "../store/drawer-atom";
import { enqueueSnackbar } from "notistack";
import { useDeleteRecipes } from "../hooks/recipe-query-hook";

export const RecipesView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();
  const collectionId = useAtomValue(selectedCollectionId);
  const openCollectionDrawer = useSetAtom(openedCollectionDrawer);
  const setSelectedDrawerCollectionId = useSetAtom(selectedDrawerCollectionId);
  const [selectedRecipes, setSelectedRecipes] = useAtom(selectedRecipesIds);
  const { mutateAsync: deleteCollectionAsync, status: deleteStatus } = useDeleteCollection();
  const { mutateAsync: deleteRecipesAsync, status: deletesStatus } = useDeleteRecipes();

  const { data: collection } = useCollectionQuery(collectionId);

  const deleteCollection = async () => {
    const recipe = await deleteCollectionAsync({ id: collectionId });
    enqueueSnackbar(`The collection "${recipe.name}" has been succesfully deleted.`, {
      variant: "success",
    });
  };

  const deleteRecipes = async () => {
    const recipes = await deleteRecipesAsync(selectedRecipes);
    setSelectedRecipes([]);
    enqueueSnackbar(`${recipes.length} recipes have been succesfully deleted.`, {
      variant: "success",
    });
  };

  const openDrawer = () => {
    openCollectionDrawer(true);
    setSelectedDrawerCollectionId(collectionId);
  };

  const formattedCollection = collectionId === DEFAULT_COLLECTION_ID ? ALL_RECIPES_COLLECTION : collection;
  const hasSelectedRecipes = selectedRecipes.length > 0;

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
      <div className="flex flex-row gap-2">
        {hasSelectedRecipes && (
          <>
            <Button icon={<DeleteFilled />} variant="outlined">
              Select All
            </Button>
            <Button icon={<DeleteFilled />} variant="outlined">
              Clear Selection
            </Button>
            <Button icon={<DeleteFilled />} variant="outlined">
              Add to a Collection
            </Button>
            <Button icon={<DeleteFilled />} variant="outlined">
              Add to Collection Form
            </Button>
            <Button icon={<DeleteFilled />} variant="outlined" danger onClick={() => deleteRecipes()}>
              {`Delete ${selectedRecipes.length} recipe${hasSelectedRecipes ? "s" : ""}`}
            </Button>
          </>
        )}
      </div>
      <RecipesList searchTerm={searchTerm} />
    </div>
  );
};
