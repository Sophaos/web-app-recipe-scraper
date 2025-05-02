import { Popconfirm } from "antd";
import { ReactNode } from "react";

interface ConfirmButtonProps {
  onConfirm: () => void;
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
  children: ReactNode;
}

export const ConfirmButton = ({ children, onConfirm, title = "Confirm Delete", description = "You are about to delete this item.", okText = "Confirm", cancelText = "Cancel" }: ConfirmButtonProps) => {
  return (
    <Popconfirm okButtonProps={{ danger: true }} title={title} description={description} onConfirm={onConfirm} okText={okText} cancelText={cancelText} placement="bottom">
      {children}
    </Popconfirm>
  );
};
