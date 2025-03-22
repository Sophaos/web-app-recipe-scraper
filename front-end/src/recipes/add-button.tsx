import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useSetAtom } from "jotai";
import { openedModalAtom } from "../store/modal-atom";

export const AddButton = () => {
  const setOpenedModal = useSetAtom(openedModalAtom);
  return (
    <Button type="primary" shape="round" size="large" icon={<PlusOutlined />} onClick={() => setOpenedModal(true)}>
      Add
    </Button>
  );
};
