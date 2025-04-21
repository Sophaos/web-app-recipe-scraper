import { SearchBar } from "./search-bar";
import { RecipesList } from "./recipes-list";
import { useSearchHook } from "./search-hook";

export const RecipesView = () => {
  const { searchTerm, debouncedSetSearchTerm } = useSearchHook();

  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Recipes</div>
      <SearchBar setSearchTerm={debouncedSetSearchTerm} />
      <RecipesList searchTerm={searchTerm} />
    </div>
  );
};
