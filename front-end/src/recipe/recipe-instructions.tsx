type RecipeInstructionsProps = {
  instructions: string[];
};

export const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <div>
      <h2 className="text-3xl font-semibold text-gray-800 mb-4">Instructions</h2>
      <ol className="list-decimal list-outside space-y-3 text-lg text-gray-700 pl-6">
        {instructions.map((r, index) => (
          <li key={index} className="leading-relaxed">
            <span className="block">{r}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};
