type RecipeIngredientsProps = {
  ingredients: string[];
};

export const RecipeIngredients = ({ ingredients }: RecipeIngredientsProps) => {
  return (
    <>
      {ingredients.map((r) => (
        <div>{r}</div>
      ))}
    </>
  );
};
