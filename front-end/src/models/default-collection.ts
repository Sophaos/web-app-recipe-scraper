import { Recipe } from "./recipe";

export interface DefaultCollection {
  id: string;
  name: string;
  description: string;
  recipeCount: number;
  recipes: Recipe[];
}
