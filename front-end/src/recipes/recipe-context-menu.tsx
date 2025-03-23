import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ReactNode } from "react";
import { Recipe } from "../models/recipe";
import { useRecipeNavigation } from "./recipe-navigation-hook";
import { useDeleteRecipe } from "../hooks/recipe-query-hook";
import { enqueueSnackbar } from "notistack";

interface RecipeContextMenuProps {
  recipe: Recipe;
  children: ReactNode;
}

export const RecipeContextMenu = ({ children, recipe }: RecipeContextMenuProps) => {
  const { id } = recipe;
  const { goToRecipe } = useRecipeNavigation(id);
  const { mutateAsync, status } = useDeleteRecipe();

  const deleteRecipe = async () => {
    const recipe = await mutateAsync(id);
    enqueueSnackbar(`The recipe "${recipe.name}" has been succesfully deleted.`, {
      variant: "success",
    });
  };

  const items: MenuProps["items"] = [
    {
      label: "View",
      icon: <EyeOutlined />,
      onClick: () => {
        goToRecipe();
      },
      key: "1",
    },
    {
      label: "Delete",
      key: "2",
      danger: true,
      onClick: () => {
        deleteRecipe();
      },

      icon: <DeleteOutlined />,
    },
  ];

  const isProcessing = status === "pending";
  return (
    <Dropdown menu={{ items }} trigger={["contextMenu"]} disabled={isProcessing}>
      {children}
    </Dropdown>
  );
};
