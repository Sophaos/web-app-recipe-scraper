import { Recipe } from "../models/recipe";
import { StarFilled } from "@ant-design/icons";
import { useRecipeNavigation } from "./recipe-navigation-hook";
import { Checkbox } from "antd";
import { useSelectRecipes } from "../hooks/select-recipes-hook";

interface RecipeProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeProps) => {
  const { goToRecipe } = useRecipeNavigation(recipe.id);
  const { ids, toggleSelect } = useSelectRecipes();

  const isSelected = ids.includes(recipe?.id);

  return (
    <div className={`relative w-68 rounded-xl overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ${isSelected ? "ring-4 ring-blue-500" : ""}`}>
      <div className="relative h-60 w-full">
        <img src={recipe.image} alt={recipe.name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 w-full bg-black/60 text-white px-3 py-2 flex items-center justify-between z-10">
          <div className="flex items-center gap-1 text-sm">
            <StarFilled className="text-yellow-400" />
            <span>
              {recipe.rating} {recipe.ratingCount === "undefined" ? "(N/A)" : `(${recipe.ratingCount} users)`}
            </span>
          </div>
          <Checkbox checked={isSelected} onChange={() => toggleSelect(recipe.id)} />
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs px-3 py-1 truncate z-10">{recipe.url}</div>
      </div>

      <div className="p-4 flex flex-col justify-between h-28 cursor-pointer" onClick={() => goToRecipe()}>
        <div className="text-lg font-semibold line-clamp-2">{recipe.name}</div>
        <div className="flex justify-between text-sm text-gray-700">
          <div>{recipe.ingredientsCount} ingredients</div>
          <div>{recipe.totalTime}</div>
        </div>
      </div>
    </div>
  );
};
