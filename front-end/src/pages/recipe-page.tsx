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
      <div className="w-full mb-8">
        <RecipeMainDisplay title={title} description={description} image={image} categories={categories} />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <RecipeIngredients ingredients={ingredients} />
        </div>
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
          <RecipeInstructions instructions={instructions} />
        </div>
      </div>
    </RecipeLayout>
  );
};
