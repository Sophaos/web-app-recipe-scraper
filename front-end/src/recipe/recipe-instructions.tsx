import React from "react";

type RecipeInstructionsProps = {
  instructions: string[];
};

export const RecipeInstructions = ({ instructions }: RecipeInstructionsProps) => {
  return (
    <>
      {instructions.map((r, index) => (
        <div key={index}>{r}</div>
      ))}
    </>
  );
};
