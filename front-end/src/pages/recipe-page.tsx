import { RecipeIngredients } from "../recipe/recipe-ingredients";
import { RecipeInstructions } from "../recipe/recipe-instructions";
import { RecipeLayout } from "../recipe/recipe-layout";
import { RecipeMainDisplay } from "../recipe/recipe-main-display";
import { RecipeNutrition } from "../recipe/recipe-nutrion";

export const RecipePage = () => {
  return (
    <RecipeLayout>
      <div className="w-full">
        <RecipeMainDisplay />
      </div>
      <div className="flex flex-row border-2">
        <div className="w-1/2">
          <RecipeIngredients />
        </div>
        <div className="w-1/2">
          <RecipeInstructions />
        </div>
      </div>
      <RecipeNutrition />
    </RecipeLayout>
  );
};
