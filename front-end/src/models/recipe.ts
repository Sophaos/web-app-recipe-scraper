export interface Recipe {
  id: string;
  name?: string;
  description?: string;
  ingredients?: string[];
  keywords?: string;
  image?: string[];
  url?: string;
  instructions?: string[];
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  yield?: string[];
  category?: string[];
  cookingMethod?: string;
  cuisine?: string;
  rating?: string;
  ratingCount?: string;
  datePublished?: string;
}
