import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const AddButton = () => {
  return (
    <Button type="primary" shape="round" size="large" icon={<PlusOutlined />}>
      Add
    </Button>
  );
};
