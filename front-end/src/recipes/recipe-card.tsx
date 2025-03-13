import { useNavigate } from "react-router";

export const RecipeCard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-60 min-h-80 border-2" onClick={() => navigate("/recipe")}>
      <div className="flex flex-col justify-between image min-h-60 border-2">
        <div>like ration</div>
        <div className="flex flex-row gap-2">
          <div>image</div>
          <div>site name</div>
        </div>
      </div>
      <div className="flex flex-col justify-between border-2 h-full p-2">
        <div className="font-semibold">title</div>
        <div className="flex flex-row justify-between">
          <div># ingredients</div>
          <div>duration</div>
        </div>
      </div>
    </div>
  );
};
