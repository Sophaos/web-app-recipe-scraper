import { RecipeDTO } from 'src/models/recipe-dto';
import { RecipeDocument } from 'src/schemas/recipe.schema';

export function toRecipeDTO(recipe: RecipeDocument): RecipeDTO {
  return {
    id: recipe._id.toString(),
    name: recipe.name,
    description: recipe.description,
    ingredients: recipe.ingredients,
    ingredientsCount: recipe.ingredients?.length ?? 0, // Derived value
    keywords: recipe.keywords,
    image: recipe.image,
    url: recipe.url,
    instructions: recipe.instructions,
    prepTime: recipe.prepTime,
    cookTime: recipe.cookTime,
    totalTime: recipe.totalTime,
    yield: recipe.yield,
    category: recipe.category,
    cookingMethod: recipe.cookingMethod,
    cuisine: recipe.cuisine,
    rating: recipe.rating,
    ratingCount: recipe.ratingCount,
    datePublished: recipe.datePublished,
  };
}
