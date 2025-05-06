import { useAtomValue } from "jotai";
import { ReactNode } from "react";
import { openedCollectionDrawer } from "../store/selected-atom";

interface RecipesLayoutProps {
  children: ReactNode;
}

export const RecipesLayout = ({ children }: RecipesLayoutProps) => {
  const open = useAtomValue(openedCollectionDrawer);
  return (
    <div
      className="flex justify-center pt-5"
      style={{
        flex: 1,
        transition: "margin-right 0.3s ease",
        marginRight: open ? 600 : 0,
      }}
    >
      <div className="flex flex-col gap-3 max-w-6xl w-full p-2">{children}</div>
    </div>
  );
};
