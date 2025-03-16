import { useRecipesQuery } from "../hooks/recipe-query-hook";
import { RecipeCard } from "./recipe-card";

export const RecipesList = () => {
  const { data: recipes } = useRecipesQuery();
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Recipes</div>
      <div className="flex flex-wrap gap-3">
        {/* TODO remove index and use real id */}
        {recipes.map((r, index) => (
          <RecipeCard key={index} />
        ))}
        {/* <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard /> */}
      </div>
    </div>
  );
};
