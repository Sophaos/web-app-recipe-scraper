import { Button, Input, Modal } from "antd";

interface AddRecipeModalProps {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}
export const AddRecipeModal = ({ open, onOk, onCancel }: AddRecipeModalProps) => {
  return (
    <Modal title="Basic Modal" open={open} onOk={onOk} onCancel={onCancel} footer={null}>
      <div className="flex flex-col gap-6">
        <div>Add recipe from URL</div>
        <div>
          <div>Enter the URL of the recipe you want to save</div>
          <Input placeholder="http://" />
        </div>
        <Button onClick={onOk} type="primary" shape="round">
          Save
        </Button>
      </div>
    </Modal>
  );
};
