import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface AddButtonProps {
  onClick: () => void;
}

export const AddButton = ({ onClick }: AddButtonProps) => {
  return (
    <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} onClick={onClick}>
      Add
    </Button>
  );
};
