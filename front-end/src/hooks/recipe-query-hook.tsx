import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { addRecipe, deleteRecipe, deleteRecipes, getRecipe, getRecipes } from "../api/recipe-api";
import { Recipe } from "../models/recipe";
import { DefaultCollection } from "../models/default-collection";

export const useRecipesQuery = (searchTerm: string, enabled: boolean = true): UseQueryResult<DefaultCollection> => {
  return useQuery({
    queryKey: ["recipes", searchTerm],
    queryFn: () => getRecipes(searchTerm),
    enabled: enabled,
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

export const useDeleteRecipes = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipes,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });
};
