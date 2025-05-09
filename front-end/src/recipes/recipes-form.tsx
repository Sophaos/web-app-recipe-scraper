import { Button, Form, FormProps, Input, Spin } from "antd";
import { useAddRecipe } from "../hooks/recipe-query-hook";
import { enqueueSnackbar } from "notistack";

interface RecipesFormProps {
  onSubmit: (id: string) => void;
}

type FieldType = {
  url: string;
};

export const RecipesForm = ({ onSubmit }: RecipesFormProps) => {
  const { mutateAsync, status } = useAddRecipe();
  const [form] = Form.useForm();

  const handleSubmit = async (url: string) => {
    try {
      const res = await mutateAsync(url);
      onSubmit(res.id);
    } catch (e) {
      enqueueSnackbar(`The schema does not follow schema.org standard.`, { variant: "error" });
      console.error(e);
    }
  };

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { url } = values;
    handleSubmit(url);
    form.resetFields();
  };

  const isProcessing = status === "pending";

  return (
    <Form name="basic" form={form} initialValues={{ url: "" }} onFinish={onFinish} autoComplete="off" layout="vertical" disabled={isProcessing}>
      <Form.Item label="Enter the URL of the recipe you want to save" name="url" rules={[{ required: true, message: "Please paste a url !" }]}>
        <Input data-testid="recipe-url-input" placeholder="http://" />
      </Form.Item>
      <p className="text-xs text-gray-500 mb-2">
        Only recipes that follow{" "}
        <a href="https://schema.org/Recipe" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          schema.org
        </a>{" "}
        are allowed.
      </p>
      {isProcessing && (
        <div className="p-3">
          <div className="flex flex-col items-center w-full justify-center">
            <Spin size="large" />
            <div>Currently Scraping Recipe</div>
          </div>
        </div>
      )}

      <Form.Item label={null}>
        <Button data-testid="recipe-save-button" className="w-full" type="primary" shape="round" htmlType="submit" disabled={isProcessing} loading={isProcessing}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
