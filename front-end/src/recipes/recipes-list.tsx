import { Alert } from "antd";
import { useRecipesQuery } from "../hooks/recipe-query-hook";
import { RecipeCard } from "./recipe-card";
import { useAtomValue } from "jotai";
import { searchTermAtom } from "../store/search-atom";
import { SearchBar } from "./search-bar";
import { AddRecipeCard } from "./add-recipe-card";

export const RecipesList = () => {
  const searchTerm = useAtomValue(searchTermAtom);
  const { data: recipes } = useRecipesQuery(searchTerm);
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Recipes</div>
      <SearchBar />
      {recipes && recipes?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          <AddRecipeCard />
          {recipes?.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <>
          <Alert message="No recipes found. Please add new recipes." type="warning" showIcon />
          <AddRecipeCard />
        </>
      )}
    </div>
  );
};
