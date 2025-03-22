import { AddRecipeModal } from "../modals/add-recipe-modal";
import { AddButton } from "./add-button";

export const RecipesHeader = () => {
  return (
    <div className="flex flex-row justify-between pb-1">
      <div className="text-3xl font-semibold">Saved Recipes</div>
      <AddButton />
      <AddRecipeModal />
    </div>
  );
};
