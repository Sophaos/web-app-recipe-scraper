import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { addRecipe, getRecipe, getRecipes } from "../api/recipe-api";
import { Recipe } from "../models/recipe";

export const useRecipesQuery = (): UseQueryResult<Recipe[]> => {
  return useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
};

export const useRecipeQuery = (id: string): UseQueryResult<Recipe> => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
  });
};

export const useRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });
};
