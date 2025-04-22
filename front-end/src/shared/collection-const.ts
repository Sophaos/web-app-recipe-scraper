import { Collection } from "../models/collection";

export const DEFAULT_COLLECTION_ID: string = "all-recipes";

export const ALL_RECIPES_COLLECTION: Collection = {
  id: DEFAULT_COLLECTION_ID,
  name: "All Recipes",
  description: "A collection of every recipes.",
  recipes: [],
};
