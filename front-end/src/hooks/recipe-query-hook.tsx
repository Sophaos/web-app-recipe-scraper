import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { addRecipe, deleteRecipe, getRecipe, getRecipes } from "../api/recipe-api";
import { Recipe } from "../models/recipe";

export const useRecipesQuery = (searchTerm: string): UseQueryResult<Recipe[]> => {
  return useQuery({
    queryKey: ["recipes", searchTerm],
    queryFn: () => getRecipes(searchTerm),
  });
};

export const useRecipeQuery = (id: string): UseQueryResult<Recipe> => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
  });
};

export const useAddRecipe = () => {
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

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });
};

export const useBatchDeleteRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });
};
