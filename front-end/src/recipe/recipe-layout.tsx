import { ReactNode } from "react";

interface RecipeLayoutProps {
  children: ReactNode;
}

export const RecipeLayout = ({ children }: RecipeLayoutProps) => {
  return (
    <div className="flex justify-center pt-5">
      <div className="flex flex-col gap-1 max-w-7xl w-full p-2">{children}</div>
    </div>
  );
};
