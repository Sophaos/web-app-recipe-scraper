import { Button, Form, FormProps, Input } from "antd";
import { useCreateCollection } from "../hooks/collection-query-hook";
import { CreateCollectionRequest } from "../api/collection-requests";
import { Collection } from "../models/collection";

interface CollectionsFormProps {
  onSubmit: (id: string) => void;
}

type CollectionFormType = {
  name: string;
  description: string;
};

const DEFAULT_COLLECTION: Collection = {
  name: "",
  description: "",
};

export const CollectionsForm = ({ onSubmit }: CollectionsFormProps) => {
  const { mutateAsync, status } = useCreateCollection();
  const [form] = Form.useForm();

  const handleSubmit = async (form: CollectionFormType) => {
    try {
      const createCollectionRequest: CreateCollectionRequest = { ...form };

      const res = await mutateAsync(createCollectionRequest);
      if (res.id) {
        onSubmit(res.id);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinish: FormProps<CollectionFormType>["onFinish"] = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

  const isProcessing = status === "pending";

  return (
    <Form name="basic" form={form} initialValues={DEFAULT_COLLECTION} onFinish={onFinish} autoComplete="off" layout="vertical" disabled={isProcessing}>
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
