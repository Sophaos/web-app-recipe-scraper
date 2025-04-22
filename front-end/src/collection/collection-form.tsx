import { Button, Form, FormProps, Input } from "antd";
import { useCreateCollection, useUpdateCollection } from "../hooks/collection-query-hook";
import { CreateCollectionRequest, UpdateCollectionRequest } from "../api/collection-requests";
import { Collection } from "../models/collection";

interface CollectionsFormProps {
  collection?: Collection;
  onSubmit: (collection: Collection) => void;
}

type CollectionFormType = {
  name: string;
  description: string;
};

const DEFAULT_COLLECTION: Collection = {
  name: "",
  description: "",
};

export const CollectionsForm = ({ onSubmit, collection }: CollectionsFormProps) => {
  const isEditing = !!collection;
  const { mutateAsync: createCollection, status: createStatus } = useCreateCollection();
  const { mutateAsync: updateCollection, status: updateStatus } = useUpdateCollection();
  const [form] = Form.useForm();

  const handleSubmit = async (formData: CollectionFormType) => {
    try {
      if (isEditing && collection?.id) {
        const updateRequest: UpdateCollectionRequest = {
          id: collection.id,
          ...formData,
        };
        const res = await updateCollection(updateRequest);
        if (res) onSubmit(res);
      } else {
        const createRequest: CreateCollectionRequest = { ...formData };
        const res = await createCollection(createRequest);
        if (res) onSubmit(res);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onFinish: FormProps<CollectionFormType>["onFinish"] = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

  const isProcessing = createStatus === "pending" || updateStatus === "pending";

  return (
    <Form name="basic" form={form} initialValues={collection || DEFAULT_COLLECTION} onFinish={onFinish} autoComplete="off" layout="vertical" disabled={isProcessing}>
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
