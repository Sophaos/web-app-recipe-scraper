import { RecipeIngredients } from "../recipe/recipe-ingredients";
import { RecipeInstructions } from "../recipe/recipe-instructions";
import { RecipeLayout } from "../recipe/recipe-layout";
import { RecipeMainDisplay } from "../recipe/recipe-main-display";
import { RecipeNutrition } from "../recipe/recipe-nutrion";

export const RecipePage = () => {
  return (
    <RecipeLayout>
      <RecipeMainDisplay />
      <RecipeIngredients />
      <RecipeInstructions />
      <RecipeNutrition />
    </RecipeLayout>
  );
};
