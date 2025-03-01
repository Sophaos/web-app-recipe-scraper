import { ReactNode } from "react";

interface RecipesLayoutProps {
  children: ReactNode;
}

export const RecipesLayout = ({ children }: RecipesLayoutProps) => {
  return (
    <div className="flex justify-center pt-5">
      <div className="flex flex-col gap-1 max-w-5xl w-full p-2">{children}</div>
    </div>
  );
};
