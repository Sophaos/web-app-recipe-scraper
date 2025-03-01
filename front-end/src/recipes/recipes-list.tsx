import { RecipeCard } from "./recipe-card";

export const RecipesList = () => {
  return (
    <div>
      <div className="text-2xl font-semibold">Recipes</div>
      <div className="inline-grid grid-cols-3 gap-4">
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
