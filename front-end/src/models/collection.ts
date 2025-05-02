import { Recipe } from "./recipe";

export interface Collection {
  id?: string;
  name: string;
  description?: string;
  recipes: Recipe[];
}
