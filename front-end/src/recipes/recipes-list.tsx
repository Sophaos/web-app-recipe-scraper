import { useRecipesQuery } from "../hooks/recipe-query-hook";
import { AddRecipeCard } from "./add-recipe-card";
import { RecipeCard } from "./recipe-card";
import { Alert } from "antd";

interface RecipesListProps {
  searchTerm: string;
}

export const RecipesList = ({ searchTerm }: RecipesListProps) => {
  const { data: recipes } = useRecipesQuery(searchTerm);
  return (
    <>
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
    </>
  );
};
