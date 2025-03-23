import { useNavigate } from "react-router";

export const useRecipeNavigation = (id: string) => {
  const navigate = useNavigate();
  const goToRecipe = () => {
    navigate(`/recipe/${id}`);
  };
  return {
    goToRecipe,
  };
};
