import { Alert } from "antd";
import { useRecipesQuery } from "../hooks/recipe-query-hook";
import { RecipeCard } from "./recipe-card";

export const RecipesList = () => {
  const { data: recipes } = useRecipesQuery();
  return (
    <div className="flex flex-col gap-3">
      <div className="text-2xl font-semibold">Recipes</div>
      {recipes && recipes?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {recipes?.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <Alert message="No recipes found. Please add new recipes." type="warning" showIcon />
      )}
    </div>
  );
};
