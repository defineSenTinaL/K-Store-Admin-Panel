import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import {
  getCategories,
  getSubCategories,
  getSubSubCategories,
} from "../../functions/category";

const { Option } = Select;

const BasicDetails = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [parentId, setParentId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState([]);

  useEffect(() => {
    loadCategories();
    loadSubCategories();
    loadSubSubCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res);
    });
  };

  const loadSubCategories = () => {
    getSubCategories().then((res) => {
      setSubCategories(res);
    });
  };

  const loadSubSubCategories = () => {
    getSubSubCategories().then((res) => {
      setSubSubCategories(res);
    });
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedSubCategory("");
    const subCategoriesFiltered = subCategories.filter(
      (subCategory) => subCategory.parentId === value
    );
    setFilteredSubCategories(subCategoriesFiltered);
  };

  const handleSubCategoryChange = (value) => {
    setSelectedSubCategory(value);
    setSelectedSubSubCategory("");
    const subSubCategoriesFiltered = subSubCategories.filter(
      (subSubCategory) => subSubCategory.parentId === value
    );
    setFilteredSubSubCategories(subSubCategoriesFiltered);
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        // Bind the form values to the corresponding fields
        values.selectedCategory = selectedCategory;
        values.selectedSubCategory = selectedSubCategory;
        values.selectedSubSubCategory = selectedSubSubCategory;

        // Call the onSubmit function passed as a prop and pass the form values
        onSubmit(values);
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };

  return (
    <>
      <h2>Basic Details</h2>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Category"
          required
          tooltip="Select the category"
        >
          <Select
            size="large"
            placeholder="Select Category"
            onChange={handleCategoryChange}
            value={selectedCategory}
            required
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <br />
        <Form.Item
          label="Parent Subcategory"
          required
          tooltip="Select the parent subcategory"
        >
          <Select
            size="large"
            placeholder="Select Parent Subcategory"
            onChange={handleSubCategoryChange}
            value={selectedSubCategory}
            required
          >
            {filteredSubCategories.map((subcategory) => (
              <Option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <br />

        <Form.Item
          label="Parent Sub Sub Category"
          required
          tooltip="Select the parent Sub Sub category"
        >
          <Select
            size="large"
            placeholder="Select Parent Sub Sub Category"
            onChange={(value) => setSelectedSubSubCategory(value)}
            value={selectedSubSubCategory}
            required
          >
            {filteredSubSubCategories.map((subSubCategory) => (
              <Option key={subSubCategory.id} value={subSubCategory.id}>
                {subSubCategory.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <br />

        <Form.Item
          label="Title"
          name="title"
          rules={[
            { required: true, message: "Please enter the title name" },
          ]}
        >
          <Input placeholder="Title Name" />
        </Form.Item>
        <br />

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input type="number" placeholder="Price" />
        </Form.Item>

        {/* Add more form fields as needed */}
        <br />

        <div>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Form>
    </>
  );
};

export default BasicDetails;
