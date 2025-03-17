import { useRecipesQuery } from "../hooks/recipe-query-hook";
import { RecipeCard } from "./recipe-card";

export const RecipesList = () => {
  const { data: recipes } = useRecipesQuery();
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Recipes</div>
      <div className="flex flex-wrap gap-3">
        {recipes?.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </div>
  );
};
