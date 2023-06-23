import { Button, Form, Input, Select } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createCategory, getCategories } from "../functions/category";

const { Option } = Select;

const CategoryAdd = () => {
  const [form] = Form.useForm();
  const { seller } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [subName, setSubName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      //console.log("This is from CategoryAdd ", res);
      setCategories(res);
    });
  };

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.name}" category is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleSubcategorySubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name, parent: parentId })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setName("");
        toast.success(`"${res.name}" subcategory is created`);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  return (
    <>
      <h2 className="mb-4">Add Categories and Subcategories</h2>
      <Form
        form={form}
        layout="vertical"
        className="category-form"
        onSubmitCapture={handleCategorySubmit}
      >
        <Form.Item
          label="Category Name"
          required
          tooltip="This is a required field"
        >
          <Input
            size="large"
            placeholder="Category Name"
            name="categoryName"
            type="categoryName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
        </Form.Item>
        <Form.Item>
          <Button
            name="submit"
            htmlType="submit"
            className="category-form-button"
            type="primary"
          >
            Add Category
          </Button>
        </Form.Item>
      </Form>

      <Form
        form={form}
        layout="vertical"
        className="subcategory-form"
        onSubmitCapture={handleSubcategorySubmit}
      >
        <Form.Item
          label="Subcategory Name"
          required
          tooltip="This is a required field"
        >
          <Input
            size="large"
            placeholder="Subcategory Name"
            name="subcategoryName"
            type="subcategoryName"
            value={subName}
            onChange={(e) => setSubName(e.target.value)}
            autoFocus
            required
          />
        </Form.Item>
        <Form.Item
          label="Parent Category"
          required
          tooltip="Select the parent category"
        >
          <Select
            size="large"
            placeholder="Select Parent Category"
            onChange={(value) => setParentId(value)}
            value={parentId}
            required
          >
            {categories &&
              categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button
            name="submit"
            htmlType="submit"
            className="subcategory-form-button"
            type="primary"
          >
            Add Subcategory
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoryAdd;
