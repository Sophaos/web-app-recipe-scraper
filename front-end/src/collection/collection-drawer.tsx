import { Drawer } from "antd";
import { openedCollectionDrawer } from "../store/drawer-atom";
import { useAtom } from "jotai";

export const CollectionDrawer = () => {
  const [open, setOpen] = useAtom(openedCollectionDrawer);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Drawer title="Edit Collection" onClose={handleClose} open={open} mask={false}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};
