import { Button, Form, FormProps, Input } from "antd";

interface RecipesFormProps {
  onSubmit: (url: string) => void;
  isProcessing: boolean;
}

type FieldType = {
  url: string;
};

export const RecipesForm = ({ onSubmit, isProcessing }: RecipesFormProps) => {
  const [form] = Form.useForm();

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const { url } = values;
    onSubmit(url);
    form.resetFields();
  };

  return (
    <Form name="basic" form={form} initialValues={{ url: "" }} onFinish={onFinish} autoComplete="off" layout="vertical" disabled={isProcessing}>
      <Form.Item label="Enter the URL of the recipe you want to save" name="url" rules={[{ required: true, message: "Please paste a url !" }]}>
        <Input placeholder="http://" />
      </Form.Item>
      <Form.Item label={null}>
        <Button className="w-full" type="primary" shape="round" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
