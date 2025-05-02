import { Button, Form, FormProps, Input, Space, Typography } from "antd";
import { useCreateCollection, useUpdateCollection } from "../hooks/collection-query-hook";
import { CreateCollectionRequest, UpdateCollectionRequest } from "../api/collection-requests";
import { Collection } from "../models/collection";
import { ReactNode, useEffect } from "react";
import { Recipe } from "../models/recipe";
import { MinusCircleOutlined } from "@ant-design/icons";
import { useAtom } from "jotai";
import { savedRecipes } from "../store/selected-atom";

interface CollectionsFormProps {
  collection?: Collection;
  onSubmit: (collection: Collection) => void;
  children?: ReactNode;
}

type CollectionFormType = {
  name: string;
  description: string;
  recipes: Recipe[];
};

const DEFAULT_COLLECTION: Collection = {
  name: "",
  description: "",
  recipes: [],
};

export const CollectionsForm = ({ onSubmit, collection, children }: CollectionsFormProps) => {
  const isEditing = !!collection;
  const { mutateAsync: createCollection, status: createStatus } = useCreateCollection();
  const { mutateAsync: updateCollection, status: updateStatus } = useUpdateCollection();
  const [form] = Form.useForm();
  const [externalRecipes, setExternalRecipes] = useAtom(savedRecipes);

  useEffect(() => {
    form.setFieldsValue(collection || DEFAULT_COLLECTION);
  }, [collection, form]);

  useEffect(() => {
    if (externalRecipes.length > 0) {
      const currentRecipes = (form.getFieldValue("recipes") as Recipe[]) || [];
      const updated = [...currentRecipes, ...externalRecipes];
      form.setFieldsValue({ recipes: updated });

      // clear the external recipes after adding
      setExternalRecipes([]);
    }
  }, [externalRecipes, form, setExternalRecipes]);

  const handleSubmit = async (formData: CollectionFormType) => {
    try {
      if (isEditing && collection?.id) {
        const updateRequest: UpdateCollectionRequest = {
          id: collection.id,
          name: formData.name,
          description: formData.description,
          recipeIds: formData.recipes.map((r) => r.id),
        };
        const res = await updateCollection(updateRequest);
        if (res) onSubmit(res);
      } else {
        const createRequest: CreateCollectionRequest = {
          name: formData.name,
          description: formData.description,
          recipeIds: formData.recipes.map((r) => r.id),
        };
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
      <div>{children}</div>
      <Form.List name="recipes">
        {(fields, { remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="center">
                <Form.Item {...restField} name={[name, "name"]} style={{ margin: 0 }}>
                  <Typography.Text>{form.getFieldValue(["recipes", name, "name"])}</Typography.Text>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
          </>
        )}
      </Form.List>
      <Form.Item label={null}>
        <Button className="w-full" type="primary" shape="round" htmlType="submit" disabled={isProcessing} loading={isProcessing}>
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};
