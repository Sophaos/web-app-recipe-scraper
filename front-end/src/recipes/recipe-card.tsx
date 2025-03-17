import { useNavigate } from "react-router";
import { Recipe } from "../models/recipe";

interface RecipeProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeProps) => {
  const { ingredientsCount, totalTime, name, image } = recipe;
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col w-60 min-h-80 border-2 rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
      onClick={() => navigate("/recipe")}
    >
      <div className="relative min-h-80 border-b-2">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute top-0 left-0 right-0 p-2 text-white bg-black/50">
          <div>Rating</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-2 text-white bg-black/50 flex flex-row gap-2">
          <div>Site Name</div>
        </div>
      </div>
      <div className="flex flex-col justify-between border-2 h-full p-2">
        <div className="font-semibold">{name}</div>
        <div className="flex flex-row justify-between">
          <div> {ingredientsCount} ingredients</div>
          <div> {totalTime} </div>
        </div>
      </div>
    </div>
  );
};
