import { Modal } from "antd";
import { RecipesForm } from "../recipes/recipes-form";

interface AddRecipeModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
  isProcessing: boolean;
}

export const AddRecipeModal = ({ open, isProcessing, onOk, onCancel }: AddRecipeModalProps) => {
  return (
    <Modal title="Add recipe from URL" open={open} onOk={onOk} onCancel={onCancel} footer={null}>
      <RecipesForm onSubmit={onOk} isProcessing={false} />
    </Modal>
  );
};
