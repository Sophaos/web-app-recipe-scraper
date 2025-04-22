import { SearchBar } from "./search-bar";
import { RecipesList } from "./recipes-list";
import { useSearchHook } from "./search-hook";
import { useCollectionQuery } from "../hooks/collection-query-hook";
import { selectedCollectionId } from "../store/selected-atom";
import { useAtomValue } from "jotai";
import { ALL_RECIPES_COLLECTION, DEFAULT_COLLECTION_ID } from "../shared/collection-const";

export const RecipesView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();
  const collectionId = useAtomValue(selectedCollectionId);

  const { data: collection } = useCollectionQuery(collectionId);

  const formattedCollection = collectionId === DEFAULT_COLLECTION_ID ? ALL_RECIPES_COLLECTION : collection;

  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">{formattedCollection?.name}</div>
      <div>{formattedCollection?.description}</div>
      <SearchBar setSearchTerm={debouncedSetSearchTerm} placeholder="Type to search your recipe" />
      <RecipesList searchTerm={searchTerm} />
    </div>
  );
};
