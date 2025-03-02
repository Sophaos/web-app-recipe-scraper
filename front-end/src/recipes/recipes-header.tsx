import { useState } from "react";
import { AddRecipeModal } from "../modal/add-recipe-modal";
import { AddButton } from "./add-button";
import { Button } from "antd";
import { useNavigate } from "react-router";

export const RecipesHeader = () => {
  const navigate = useNavigate();
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

  const test = () => {
    navigate("/recipe");
  };
  return (
    <div className="flex flex-row justify-between">
      <div className="text-3xl font-semibold">Saved Recipes</div>
      <Button onClick={test}>test</Button>
      <AddButton onClick={openModal} />
      <AddRecipeModal open={open} onOk={handleOk} onCancel={handleCancel} />
    </div>
  );
};
