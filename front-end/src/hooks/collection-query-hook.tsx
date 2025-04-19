import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { addRecipe, deleteRecipe, getRecipe, getRecipes } from "../api/recipe-api";
import { Recipe } from "../models/recipe";

export const useCollectionsQuery = (searchTerm: string): UseQueryResult<Recipe[]> => {
  return useQuery({
    queryKey: ["collections", searchTerm],
    queryFn: () => getRecipes(searchTerm),
  });
};

export const useCollectionQuery = (id: string): UseQueryResult<Recipe> => {
  return useQuery({
    queryKey: ["collection", id],
    queryFn: () => getRecipe(id),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
  });
};

export const useUpdateCollection = () => {
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

export const useDeleteCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
  });
};
