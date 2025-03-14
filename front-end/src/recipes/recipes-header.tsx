import { useState } from "react";
import { AddRecipeModal } from "../modals/add-recipe-modal";
import { AddButton } from "./add-button";

export const RecipesHeader = () => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="text-3xl font-semibold">Saved Recipes</div>
      <AddButton onClick={openModal} />
      <AddRecipeModal open={open} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};
