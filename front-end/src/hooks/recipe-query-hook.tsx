import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addRecipe, getRecipes } from "../api/recipe-api";

export const useRecipesQuery = () => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useRecipeQuery = () => {
  return useQuery({
    queryKey: ["recipe"],
    queryFn: getRecipes,
  });
};

export const useRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["posts"],
      });
    },
  });
};
