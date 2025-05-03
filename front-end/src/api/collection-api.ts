import { gql } from "graphql-request";
import { Collection } from "../models/collection";
import { client } from "./api-const";
import { CreateCollectionRequest, DeleteCollectionRequest, GetCollectionRequest, UpdateCollectionRequest } from "./collection-requests";

export const getCollections = async (searchTerm: string): Promise<Collection[]> => {
  const query = gql`
    query ($search: String!) {
      collections: getCollections(search: $search) {
        id
        name
        description
        recipes {
          id
          name
          description
        }
      }
    }
  `;

  const variables = { search: searchTerm };

  const { collections } = await client.request<{ collections: Collection[] }>(query, variables);
  return collections;
};

export const getCollection = async (data: GetCollectionRequest): Promise<Collection> => {
  const query = gql`
    query getCollection($id: String!) {
      getCollection(id: $id) {
        id
        name
        description
        recipes {
          id
          ingredientsCount
          totalTime
          name
          image
          rating
          url
          ratingCount
        }
      }
    }
  `;
  const { getCollection } = await client.request<{ getCollection: Collection }>(query, data);
  return getCollection;
};

export const createCollection = async (data: CreateCollectionRequest): Promise<Collection> => {
  const mutation = gql`
    mutation createCollection($data: CreateCollectionDto!) {
      createCollection(data: $data) {
        id
        name
        description
        recipes {
          id
          name
          description
        }
      }
    }
  `;

  const { createCollection } = await client.request<{ createCollection: Collection }>(mutation, { data });
  return createCollection;
};

export const updateCollection = async (data: UpdateCollectionRequest): Promise<Collection> => {
  const mutation = gql`
    mutation updateCollection($data: UpdateCollectionDto!) {
      updateCollection(data: $data) {
        id
        name
        description
        recipes {
          id
          name
          description
        }
      }
    }
  `;

  const { updateCollection } = await client.request<{ updateCollection: Collection }>(mutation, { data });
  return updateCollection;
};

export const deleteCollection = async (data: DeleteCollectionRequest): Promise<Collection> => {
  const mutation = gql`
    mutation deleteCollection($data: DeleteCollectionDto!) {
      deleteCollection(data: $data) {
        id
        name
      }
    }
  `;

  const { deleteCollection } = await client.request<{ deleteCollection: Collection }>(mutation, { data });
  return deleteCollection;
};
