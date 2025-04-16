import { RecipeDocument } from 'src/recipe/recipe.schema';

export const RECIPE_DOCUMENT_DAO_MOCK: Partial<RecipeDocument> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  _id: '67db5929dd4358b10d7abb41' as any,
  name: 'Classic Pico de Gallo',
  description:
    "This pico de gallo recipe is fresh, delicious and easy to make! You'll need only 5 ingredients to make this classic Mexican dip—tomato, onion, cilantro, jalapeño and lime. Recipe yields about 4 cups (about 8 servings).",
  ingredients: [
    '1 cup finely chopped white onion (about 1 small onion)',
    '1 medium jalapeño or serrano pepper, ribs and seeds removed, finely chopped (decrease or omit if sensitive to spice, or add another if you love heat)',
    '&frac14; cup lime juice',
    '&frac34; teaspoon fine sea salt, more to taste',
    '1 &frac12; pounds ripe red tomatoes (about 8 small or 4 large), chopped',
    '&frac12; cup finely chopped fresh cilantro (about 1 bunch)',
  ],
  keywords: 'pico de gallo, healthy dip recipe',
  images: [
    'https://cookieandkate.com/images/2018/09/best-pico-de-gallo-recipe-2-225x225.jpg',
    'https://cookieandkate.com/images/2018/09/best-pico-de-gallo-recipe-2-260x195.jpg',
    'https://cookieandkate.com/images/2018/09/best-pico-de-gallo-recipe-2-320x180.jpg',
    'https://cookieandkate.com/images/2018/09/best-pico-de-gallo-recipe-2.jpg',
  ],
  url: 'https://cookieandkate.com/classic-pico-de-gallo-recipe/',
  instructions: [
    'In a medium serving bowl, combine the chopped onion, jalapeño, lime juice and salt. Let it marinate for about 5 minutes while you chop the tomatoes and cilantro.',
    'Add the chopped tomatoes and cilantro to the bowl and stir to combine. Taste, and add more salt if the flavors don&#8217;t quite sing.',
    'For the best flavor, let the mixture marinate for 15 minutes or several hours in the refrigerator. Serve as a dip, or with a slotted spoon or large serving fork to avoid transferring too much watery tomato juice with your pico. Pico de gallo keeps well in the refrigerator, covered, for up to 4 days.',
  ],
  prepTime: 'PT15M',
  totalTime: 'PT15M',
  yield: ['4', '4 cups'],
  category: [],
  cookingMethod: 'Chopped',
  cuisine: 'Mexican',
  rating: '4.9',
  ratingCount: 'undefined',
  datePublished: '2018-09-11',
  __v: 0,
};
