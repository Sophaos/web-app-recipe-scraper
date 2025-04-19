import { gql } from "graphql-request";
import { Collection } from "../models/collection";
import { client } from "./api-const";

export const getCollections = async (searchTerm: string): Promise<Collection[]> => {
  const query = gql`
    query ($search: String!) {
      collections: getCollections(search: $search) {
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
  `;

  const variables = { search: searchTerm };

  const { collections } = await client.request<{ collections: Collection[] }>(query, variables);
  return collections;
};

export const getCollection = async (id: string): Promise<Collection> => {
  const query = gql`
    query getCollection($id: String!) {
      getCollection(id: $id) {
        id
        name
        ingredients
        instructions
        image
        description
        category
      }
    }
  `;

  const variables = { id };
  const { getCollection } = await client.request<{ getCollection: Collection }>(query, variables);
  return getCollection;
};

export const CreateCollection = async (url: string): Promise<Collection> => {
  const mutation = gql`
    mutation createCollection($data: CreateCollectionDto!) {
      createCollection(data: $data) {
        id
      }
    }
  `;

  const variables = { data: { url } };

  const { createCollection } = await client.request<{ createCollection: Collection }>(mutation, variables);
  return createCollection;
};

export const UpdateCollection = async (url: string): Promise<Collection> => {
  const mutation = gql`
    mutation updateCollection($data: CreateCollectionDto!) {
      updateCollection(data: $data) {
        id
      }
    }
  `;

  const variables = { data: { url } };

  const { createCollection } = await client.request<{ createCollection: Collection }>(mutation, variables);
  return createCollection;
};

export const addToCollection = async (url: string): Promise<Collection> => {
  const mutation = gql`
    mutation addToCollection($data: CreateCollectionDto!) {
      createCollection(data: $data) {
        id
      }
    }
  `;

  const variables = { data: { url } };

  const { createCollection } = await client.request<{ createCollection: Collection }>(mutation, variables);
  return createCollection;
};

export const deleteCollection = async (id: string): Promise<Collection> => {
  const mutation = gql`
    mutation deleteCollection($data: DeleteCollectionDto!) {
      deleteCollection(data: $data) {
        id
        name
      }
    }
  `;

  const variables = { data: { id } };

  const { deleteCollection } = await client.request<{ deleteCollection: Collection }>(mutation, variables);
  return deleteCollection;
};
