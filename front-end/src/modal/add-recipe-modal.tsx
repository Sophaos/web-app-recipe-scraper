import { Button, Input, Modal } from "antd";

interface AddRecipeModalProps {
  open: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}
export const AddRecipeModal = ({ open, handleOk, handleCancel }: AddRecipeModalProps) => {
  return (
    <Modal title="Basic Modal" open={open} onOk={handleOk} onCancel={handleCancel}>
      <div className="flex flex-col">
        <div>Add recipe from URL</div>
        <div>Enter the URL of the recipe you want to save</div>
        <Input placeholder="http://" />
        <Button>Save</Button>
      </div>
    </Modal>
  );
};
