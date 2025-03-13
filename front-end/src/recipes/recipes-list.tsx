import { RecipeCard } from "./recipe-card";

export const RecipesList = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Recipes</div>
      <div className="flex flex-wrap gap-3">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </div>
  );
};
