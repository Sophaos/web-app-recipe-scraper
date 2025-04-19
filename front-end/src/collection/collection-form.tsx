import { Button, Form, FormProps, Input } from "antd";
import { useCreateCollection } from "../hooks/collection-query-hook";

interface CollectionsFormProps {
  onSubmit: (id: string) => void;
}

type FieldType = {
  url: string;
};

export const CollectionsForm = ({ onSubmit }: CollectionsFormProps) => {
  const { mutateAsync, status } = useCreateCollection();
  const [form] = Form.useForm();

  const handleSubmit = async (url: string) => {
    try {
      const res = await mutateAsync(url);
      onSubmit(res.id);
    } catch (e) {
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
      <Form.Item label="Name" name="name" rules={[{ required: true, message: "A collection must have a name !" }]}>
        <Input placeholder="My collection" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <Input placeholder="Dessert, mealprep, etc." />
      </Form.Item>
      <Form.Item label={null}>
        <Button className="w-full" type="primary" shape="round" htmlType="submit" disabled={isProcessing} loading={isProcessing}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
