import { AddButton } from "./add-button";

export const RecipesHeader = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="text-3xl font-semibold">Saved Recipes</div>
      <AddButton />
    </div>
  );
};
