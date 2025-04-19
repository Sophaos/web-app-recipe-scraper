import { PlusOutlined } from "@ant-design/icons";
import { useSetAtom } from "jotai";
import { openedCollectionModalAtom } from "../store/modal-atom";

export const AddCollectionCard = () => {
  const setOpenedModal = useSetAtom(openedCollectionModalAtom);
  const handleOpen = () => {
    setOpenedModal(true);
  };
  return (
    <div
      onClick={handleOpen}
      className="flex w-44 h-20 rounded-lg p-2 gap-2 border-2 border-dashed border-blue-300 bg-gradient-to-br from-white via-blue-50 to-blue-100 hover:shadow-md transition-shadow cursor-pointer items-center justify-center text-blue-600"
    >
      <div className="flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mb-1">
          <PlusOutlined style={{ fontSize: 16 }} />
        </div>
        <div className="text-sm font-medium">Add Collection</div>
      </div>
    </div>
  );
};
