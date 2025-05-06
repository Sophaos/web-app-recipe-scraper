import { SearchBar } from "./search-bar";
import { RecipesList } from "./recipes-list";
import { useSearchHook } from "../hooks/search-hook";
import { useCollectionQuery, useDeleteCollection } from "../hooks/collection-query-hook";
import { DEFAULT_COLLECTION_ID } from "../shared/collection-const";
import { Button } from "antd";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { enqueueSnackbar } from "notistack";
import { useDeleteRecipes, useRecipesQuery } from "../hooks/recipe-query-hook";
import { useSelectRecipes } from "../hooks/select-recipes-hook";
import { useSelectCollection } from "../hooks/select-collection-hook";
import { ConfirmButton } from "../shared/confirm-dialog";

export const RecipesView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();
  const { id: collectionId, isDefaultCollection, openDrawer, drawerOpen } = useSelectCollection();
  const { ids, hasAnyIds, clearIds, addToSavedRecipes, selectAll } = useSelectRecipes();
  const { data: defaultCollection } = useRecipesQuery(searchTerm, isDefaultCollection);
  const { mutateAsync: deleteCollectionAsync, status: deleteStatus } = useDeleteCollection();
  const { mutateAsync: deleteRecipesAsync, status: deletesStatus } = useDeleteRecipes();
  const { data: collection } = useCollectionQuery(collectionId, !isDefaultCollection);

  const recipes = defaultCollection?.recipes ?? [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const partialDefaultCollection = defaultCollection ? (({ recipes: _, ...rest }) => rest)(defaultCollection) : undefined;

  const formattedRecipes = isDefaultCollection ? recipes : collection?.recipes?.filter((recipe) => recipe.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const deleteCollection = async () => {
    const recipe = await deleteCollectionAsync({ id: collectionId });
    enqueueSnackbar(`The collection "${recipe.name}" has been succesfully deleted.`, {
      variant: "success",
    });
  };

  const deleteRecipes = async () => {
    const res = await deleteRecipesAsync(ids);
    clearIds();
    enqueueSnackbar(`${res.length} recipes have been succesfully deleted.`, {
      variant: "success",
    });
  };

  const addToCollectionForm = () => {
    const collectionsToAdd = formattedRecipes?.filter((recipe) => ids.includes(recipe.id));
    addToSavedRecipes(collectionsToAdd);
  };

  const formattedCollection = collectionId === DEFAULT_COLLECTION_ID ? partialDefaultCollection : collection;
  const isProcessing = deleteStatus || deletesStatus;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-row gap-5">
        <div className="text-2xl font-semibold">{formattedCollection?.name}</div>
      </div>
      <div className="flex flex-row gap-2">
        <Button icon={<EditFilled />} variant="outlined" onClick={openDrawer} disabled={isDefaultCollection}>
          Edit Collection
        </Button>
        <ConfirmButton onConfirm={() => deleteCollection()}>
          <Button icon={<DeleteFilled />} variant="outlined" danger disabled={isDefaultCollection}>
            Delete Collection
          </Button>
        </ConfirmButton>
      </div>
      <div>{formattedCollection?.description}</div>
      <SearchBar setSearchTerm={debouncedSetSearchTerm} placeholder="Type to search your recipe" />
      <div className="flex flex-row gap-2">
        <Button icon={<DeleteFilled />} variant="outlined" onClick={() => selectAll(formattedRecipes)}>
          Select All
        </Button>
        <Button icon={<DeleteFilled />} variant="outlined" onClick={() => clearIds()} disabled={!hasAnyIds}>
          Clear Selection
        </Button>
        <Button icon={<DeleteFilled />} variant="outlined" disabled={!hasAnyIds || !drawerOpen} onClick={() => addToCollectionForm()}>
          Add to Collection Form
        </Button>
        <ConfirmButton onConfirm={() => deleteRecipes()}>
          <Button icon={<DeleteFilled />} variant="outlined" danger disabled={!hasAnyIds}>
            {`Delete ${ids.length} recipe${hasAnyIds ? "s" : ""}`}
          </Button>
        </ConfirmButton>
      </div>
      <RecipesList recipes={formattedRecipes} />
    </div>
  );
};
