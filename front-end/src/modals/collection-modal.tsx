import { Button, Modal } from "antd";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { closeSnackbar, enqueueSnackbar } from "notistack";
import { openedCollectionModalAtom } from "../store/modal-atom";
import { CollectionsForm } from "../collection/collection-form";

export const CollectionModal = () => {
  const [open, setOpen] = useAtom(openedCollectionModalAtom);
  const navigate = useNavigate();

  const goToRecipe = (id: string) => {
    navigate(`/recipe/${id}`);
  };

  const onOk = (id: string) => {
    setOpen(false);
    enqueueSnackbar("A recipe has been added.", {
      variant: "success",
      action: (key) => (
        <Button
          onClick={() => {
            goToRecipe(id);
            closeSnackbar(key);
          }}
        >
          View Recipe
        </Button>
      ),
    });
  };

  const onCancel = () => {
    setOpen(false);
  };

  return (
    <Modal title="Add Collection" open={open} onOk={() => onOk} onCancel={onCancel} footer={null}>
      <CollectionsForm onSubmit={onOk} />
    </Modal>
  );
};
