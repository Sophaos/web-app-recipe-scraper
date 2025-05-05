import { GraphQLClient, gql } from "graphql-request";
import { Recipe } from "../models/recipe";
import { DefaultCollection } from "../models/default-collection";

const client = new GraphQLClient("http://localhost:3000/graphql");

export const getRecipes = async (searchTerm: string): Promise<DefaultCollection> => {
  const query = gql`
    query ($search: String!) {
      defaultCollection: getRecipes(search: $search) {
        id
        name
        description
        recipeCount
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

  const variables = { search: searchTerm };

  const { defaultCollection } = await client.request<{ defaultCollection: DefaultCollection }>(query, variables);
  return defaultCollection;
};

export const getRecipe = async (id: string): Promise<Recipe> => {
  const query = gql`
    query getRecipe($id: String!) {
      getRecipe(id: $id) {
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
  const { getRecipe } = await client.request<{ getRecipe: Recipe }>(query, variables);
  return getRecipe;
};

export const addRecipe = async (url: string): Promise<Recipe> => {
  const mutation = gql`
    mutation createRecipe($data: CreateRecipeDto!) {
      createRecipe(data: $data) {
        id
      }
    }
  `;

  const variables = { data: { url } };

  const { createRecipe } = await client.request<{ createRecipe: Recipe }>(mutation, variables);
  return createRecipe;
};

export const deleteRecipe = async (id: string): Promise<Recipe> => {
  const mutation = gql`
    mutation deleteRecipe($data: DeleteRecipeDto!) {
      deleteRecipe(data: $data) {
        id
        name
      }
    }
  `;

  const variables = { data: { id } };

  const { deleteRecipe } = await client.request<{ deleteRecipe: Recipe }>(mutation, variables);
  return deleteRecipe;
};

export const deleteRecipes = async (ids: string[]): Promise<Recipe[]> => {
  const mutation = gql`
    mutation deleteRecipes($data: DeleteRecipesDto!) {
      deleteRecipes(data: $data) {
        id
        name
      }
    }
  `;

  const variables = { data: { ids } };

  const { deleteRecipes: recipes } = await client.request<{ deleteRecipes: Recipe[] }>(mutation, variables);
  return recipes;
};
