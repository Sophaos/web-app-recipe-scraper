type RecipeIngredientsProps = {
  ingredients: string[];
};

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <>
      {ingredients.map((r, index) => (
        <div key={index}>{r}</div>
      ))}
    </>
  );
};
