import ky from "ky";

export const api = ky.create({
  prefixUrl: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getRecipes = async () => {
  return api.get("recipes").json();
};

export const getRecipeById = async (id: number) => {
  return api.get(`recipes/${id}`).json();
};

export const addRecipe = async (url: string) => {
  return api.post("recipes", { json: { url } }).json();
};
