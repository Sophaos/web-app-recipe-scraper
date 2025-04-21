import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { Recipe } from "../models/recipe";
import { CreateCollectionRequest, DeleteCollectionRequest, UpdateCollectionRequest } from "../api/collection-requests";
import { createCollection, deleteCollection, getCollection, getCollections, updateCollection } from "../api/collection-api";

export const useCollectionsQuery = (): UseQueryResult<Recipe[]> => {
  return useQuery({
    queryKey: ["collections"],
    queryFn: () => getCollections(),
  });
};

export const useCollectionQuery = (id: string): UseQueryResult<Recipe> => {
  return useQuery({
    queryKey: ["collection", id],
    queryFn: () => getCollection({ id }),
    enabled: !!id,
  });
};

export const useCreateCollection = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCollectionRequest) => createCollection(data),
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
    mutationFn: (data: UpdateCollectionRequest) => updateCollection(data),
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
    mutationFn: (data: DeleteCollectionRequest) => deleteCollection(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    },
  });
};
