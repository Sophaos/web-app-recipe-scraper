type RecipeIngredientsProps = {
  ingredients: string[];
};

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Ingredients</h2>
      <ul className="list-disc list-outside space-y-2 text-lg text-gray-700 pl-6">
        {ingredients.map((r, index) => (
          <li key={index} className="leading-relaxed">
            <span className="block">{r}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
