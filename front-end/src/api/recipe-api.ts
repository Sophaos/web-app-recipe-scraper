import ky from "ky";
import { Recipe } from "../models/recipe";

export const api = ky.create({
  prefixUrl: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRecipes = async (): Promise<Recipe[]> => {
  return await api.get("recipes").json();
};

export const getRecipeById = async (id: number | string): Promise<Recipe> => {
  return await api.get(`recipes/${id}`).json();
};

export const addRecipe = async (url: string) => {
  return await api.post("recipes", { json: { url } }).json();
};
