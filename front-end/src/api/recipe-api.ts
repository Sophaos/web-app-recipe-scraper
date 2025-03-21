import { GraphQLClient, gql } from "graphql-request";
import { Recipe } from "../models/recipe";

const client = new GraphQLClient("http://localhost:3000/graphql");

export const getRecipes = async (searchTerm: string): Promise<Recipe[]> => {
  const query = gql`
    query ($search: String!) {
      recipes: getRecipes(search: $search) {
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

  const { recipes } = await client.request<{ recipes: Recipe[] }>(query, variables);
  return recipes;
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
