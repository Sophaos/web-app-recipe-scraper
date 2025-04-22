import { Button, Modal } from "antd";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { openedCollectionModalAtom } from "../store/modal-atom";
import { CollectionsForm } from "../collection/collection-form";
import { Collection } from "../models/collection";

export const CollectionModal = () => {
  const [open, setOpen] = useAtom(openedCollectionModalAtom);

  const onOk = (collection: Collection) => {
    setOpen(false);
    enqueueSnackbar(`The collection "${collection.name}" has been added.`, {
      variant: "success",
      action: (key) => (
        <Button
          onClick={() => {
            closeSnackbar(key);
          }}
        >
          View Collection
        </Button>
      ),
    });
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add Collection" open={open} onCancel={onCancel} footer={null}>
      <CollectionsForm onSubmit={onOk} />
    </Modal>
  );
};
