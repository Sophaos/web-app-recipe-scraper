import { Button, Form, FormProps, Input, Space, Typography } from "antd";
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
  isProcessing: boolean;
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

export const CollectionsForm = ({ onSubmit, collection, isProcessing, children }: CollectionsFormProps) => {
  const isEditing = !!collection;
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
      setExternalRecipes([]);
    }
  }, [externalRecipes, form, setExternalRecipes]);

  const handleSubmit = async (formData: CollectionFormType) => {
    const collectionData: Collection = {
      ...(collection?.id && { id: collection.id }),
      name: formData.name,
      description: formData.description,
      recipes: formData.recipes,
    };
    onSubmit(collectionData);
  };

  const onFinish: FormProps<CollectionFormType>["onFinish"] = (values) => {
    handleSubmit(values);
    form.resetFields();
  };

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
          {isEditing ? "Save" : "Create"}
        </Button>
      </Form.Item>
    </Form>
  );
};
