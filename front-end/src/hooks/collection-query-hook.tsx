import { useMutation, useQuery, useQueryClient, UseQueryResult } from "@tanstack/react-query";
import { CreateCollectionRequest, DeleteCollectionRequest, UpdateCollectionRequest } from "../api/collection-requests";
import { createCollection, deleteCollection, getCollection, getCollections, updateCollection } from "../api/collection-api";
import { Collection } from "../models/collection";

export const useCollectionsQuery = (searchTerm: string): UseQueryResult<Collection[]> => {
  return useQuery({
    queryKey: ["collections", searchTerm],
    queryFn: () => getCollections(searchTerm),
  });
};

export const useCollectionQuery = (id: string): UseQueryResult<Collection> => {
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
