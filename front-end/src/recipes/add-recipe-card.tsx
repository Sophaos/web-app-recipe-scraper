import { PlusOutlined } from "@ant-design/icons";
import { useSetAtom } from "jotai";
import { openedModalAtom } from "../store/modal-atom";

export const AddRecipeCard = () => {
  const setOpenedModal = useSetAtom(openedModalAtom);
  const handleOpen = () => {
    setOpenedModal(true);
  };

  return (
    <div
      onClick={handleOpen}
      className="flex flex-col w-68 min-h-90 rounded-lg overflow-hidden border-2 border-dashed border-blue-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 shadow-inner transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer items-center justify-center text-center p-6"
    >
      <div className="flex flex-col items-center gap-3 text-blue-600">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center shadow-sm">
          <PlusOutlined style={{ fontSize: 24 }} />
        </div>
        <div className="font-semibold text-lg">Add New Recipe</div>
        <div className="text-sm text-gray-500">Click to start creating</div>
      </div>
    </div>
  );
};
