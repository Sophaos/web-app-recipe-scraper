import { Modal } from "antd";
import { RecipesForm } from "../recipes/recipes-form";
import { useRecipeMutation } from "../hooks/recipe-query-hook";

interface AddRecipeModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}

export const AddRecipeModal = ({ open, onOk, onCancel }: AddRecipeModalProps) => {
  const { mutateAsync, status } = useRecipeMutation();
  console.log(status);

  const handleSubmit = async (url: string) => {
    try {
      const res = await mutateAsync(url);
      console.log(res);
      onOk();
    } catch (e) {
      console.error(e);
    }
  };

  const isProcessing = status === "pending";
  return (
    <Modal title="Add recipe from URL" open={open} onOk={onOk} onCancel={onCancel} footer={null}>
      <RecipesForm onSubmit={handleSubmit} isProcessing={isProcessing} />
    </Modal>
  );
};
