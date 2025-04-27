import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { CreateCollectionRequest, DeleteCollectionRequest, UpdateCollectionRequest } from "../api/collection-requests";
import { createCollection, deleteCollection, getCollection, getCollections, updateCollection } from "../api/collection-api";
import { Collection } from "../models/collection";
import { DEFAULT_COLLECTION_ID } from "../shared/collection-const";

export const useCollectionsQuery = (searchTerm: string): UseQueryResult<Collection[]> => {
  return useQuery({
    queryKey: ["collections", searchTerm],
    queryFn: () => getCollections(searchTerm),
  });
};

export const useCollectionQuery = (id: string, enabled: boolean = true): UseQueryResult<Collection> => {
  return useQuery({
    queryKey: ["collection", id],
    queryFn: () => getCollection({ id }),
    enabled: enabled && id !== DEFAULT_COLLECTION_ID && !!id,
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
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["collections"] });
      queryClient.invalidateQueries({ queryKey: ["collection", variables.id] });
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
