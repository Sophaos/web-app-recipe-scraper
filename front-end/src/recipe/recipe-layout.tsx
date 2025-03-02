import { ReactNode } from "react";

interface RecipeLayoutProps {
  children: ReactNode;
}

export const RecipeLayout = ({ children }: RecipeLayoutProps) => {
  return <div>{children}</div>;
};
