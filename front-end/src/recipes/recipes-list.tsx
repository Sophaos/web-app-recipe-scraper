import { useSelectCollection } from "../hooks/select-collection-hook";
import { Recipe } from "../models/recipe";
import { AddRecipeCard } from "./add-recipe-card";
import { RecipeCard } from "./recipe-card";
import { Alert } from "antd";

interface RecipesListProps {
  recipes?: Recipe[];
}

export const RecipesList = ({ recipes }: RecipesListProps) => {
  const { isDefaultCollection } = useSelectCollection();
  return (
    <>
      {recipes && recipes?.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {isDefaultCollection && <AddRecipeCard />}
          {recipes?.map((r) => (
            <RecipeCard key={r.id} recipe={r} />
          ))}
        </div>
      ) : (
        <>
          <Alert message="No recipes found. Please add new recipes." type="warning" showIcon />
          {isDefaultCollection && <AddRecipeCard />}
        </>
      )}
    </>
  );
};
