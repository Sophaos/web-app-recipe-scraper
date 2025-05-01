import { SearchBar } from "./search-bar";
import { RecipesList } from "./recipes-list";
import { useSearchHook } from "../hooks/search-hook";
import { useCollectionQuery, useDeleteCollection } from "../hooks/collection-query-hook";
import { ALL_RECIPES_COLLECTION, DEFAULT_COLLECTION_ID } from "../shared/collection-const";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { enqueueSnackbar } from "notistack";
import { useDeleteRecipes, useRecipesQuery } from "../hooks/recipe-query-hook";
import { useSelectRecipes } from "../hooks/select-recipes-hook";
import { useSelectCollection } from "../hooks/select-collection-hook";

export const RecipesView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();
  const { id: collectionId, isDefaultCollection, openDrawer, drawerOpen } = useSelectCollection();
  const { ids, hasAnyIds, clearIds, addToSavedRecipes } = useSelectRecipes();
  const { data: recipes } = useRecipesQuery(searchTerm);
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
    const recipes = await deleteRecipesAsync(ids);
    clearIds();
    enqueueSnackbar(`${recipes.length} recipes have been succesfully deleted.`, {
      variant: "success",
    });
  };

  const addToCollectionForm = () => {
    addToSavedRecipes(recipes);
  };

  const formattedCollection = collectionId === DEFAULT_COLLECTION_ID ? ALL_RECIPES_COLLECTION : collection;
  const isProcessing = deleteStatus || deletesStatus;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-semibold">{formattedCollection?.name}</div>

        <div className="flex flex-row gap-2">
          <Button icon={<DeleteFilled />} variant="outlined" danger onClick={() => deleteCollection()} disabled={isDefaultCollection}>
            Delete Collection
          </Button>
          <Button icon={<EditFilled />} variant="outlined" onClick={openDrawer} disabled={isDefaultCollection}>
            Edit Collection
          </Button>
        </div>
      </div>
      <div>{formattedCollection?.description}</div>
      <SearchBar setSearchTerm={debouncedSetSearchTerm} placeholder="Type to search your recipe" />
      <div className="flex flex-row gap-2">
        <Button icon={<DeleteFilled />} variant="outlined">
          Select All
        </Button>
        <Button icon={<DeleteFilled />} variant="outlined" onClick={() => clearIds()} disabled={!hasAnyIds}>
          Clear Selection
        </Button>
        <Button icon={<DeleteFilled />} variant="outlined" disabled={!hasAnyIds || !drawerOpen} onClick={() => addToCollectionForm()}>
          Add to Collection Form
        </Button>
        <Button icon={<DeleteFilled />} variant="outlined" danger onClick={() => deleteRecipes()} disabled={!hasAnyIds}>
          {`Delete ${ids.length} recipe${hasAnyIds ? "s" : ""}`}
        </Button>
      </div>
      <RecipesList recipes={recipes} />
    </div>
  );
};
