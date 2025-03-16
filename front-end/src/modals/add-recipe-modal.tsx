import { Modal } from "antd";
import { RecipesForm } from "../recipes/recipes-form";

interface AddRecipeModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const AddRecipeModal = ({ open, onOk, onCancel }: AddRecipeModalProps) => {
  return (
    <Modal title="Add recipe from URL" open={open} onOk={onOk} onCancel={onCancel} footer={null}>
      <RecipesForm onSubmit={onOk} />
    </Modal>
  );
};
