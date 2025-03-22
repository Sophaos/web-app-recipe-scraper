import { Button, Modal } from "antd";
import { RecipesForm } from "../recipes/recipes-form";
import { useNavigate } from "react-router";
import { useAtom } from "jotai";
import { openedModalAtom } from "../store/modal-atom";
import { closeSnackbar, enqueueSnackbar } from "notistack";

export const AddRecipeModal = () => {
  const [open, setOpen] = useAtom(openedModalAtom);
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
    <Modal title="Add recipe from URL" open={open} onOk={() => onOk} onCancel={onCancel} footer={null}>
      <RecipesForm onSubmit={onOk} />
    </Modal>
  );
};
