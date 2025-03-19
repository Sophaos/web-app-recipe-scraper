import { useParams } from "react-router";
import { RecipeIngredients } from "../recipe/recipe-ingredients";
import { RecipeInstructions } from "../recipe/recipe-instructions";
import { RecipeLayout } from "../recipe/recipe-layout";
import { RecipeMainDisplay } from "../recipe/recipe-main-display";
import { useRecipeQuery } from "../hooks/recipe-query-hook";

export const RecipePage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: recipe } = useRecipeQuery(id ?? "");
  const ingredients = recipe?.ingredients ?? [];
  const instructions = recipe?.instructions ?? [];
  const title = recipe?.name ?? "";
  const description = recipe?.description ?? "";
  const image = recipe?.image ?? "";
  const categories = recipe?.category ?? [];

  return (
    <RecipeLayout>
      <div className="w-full border-2">
        <RecipeMainDisplay title={title} description={description} image={image} categories={categories} />
      </div>
      <div className="flex flex-row border-2">
        <div className="w-1/2">
          <RecipeIngredients ingredients={ingredients} />
        </div>
        <div className="w-1/2">
          <RecipeInstructions instructions={instructions} />
        </div>
      </div>
    </RecipeLayout>
  );
};
