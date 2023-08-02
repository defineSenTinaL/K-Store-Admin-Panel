import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";
import {
  getCategories,
  getSubCategories,
  getSubSubCategories,
} from "../../functions/category";

const { Option } = Select;
const { TextArea } = Input;

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
        // Convert numeric fields to numbers
        values.price = +values.price;
        values.mrp = +values.mrp;
        values.kharidi = +values.kharidi;
        values.quantity = +values.quantity;

        // Bind the form values to the corresponding fields
        values.selectedCategory = selectedCategory;
        values.selectedSubCategory = selectedSubCategory;
        values.selectedSubSubCategory = selectedSubSubCategory;

        //console.log(values);
        // Call the onSubmit function passed as a prop and pass the form values
        onSubmit(values);
      })
      .catch((error) => {
        console.error("Form validation error:", error);
      });
  };

  return (
    <div
      style={{
        maxHeight: "400px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <style>
        {`
          /* Hide scrollbar for Chrome, Safari, and Opera */
          ::-webkit-scrollbar {
            display: none;
          }

          // /* Hide scrollbar for IE, Edge, and Firefox */
          // -ms-overflow-style: none;  /* IE and Edge */
          // scrollbar-width: none;  /* Firefox */
        `}
      </style>
      <h2>Basic Details</h2>
      <Form form={form} layout="vertical">
        <Form.Item label="Category" required tooltip="Select the category">
          <Select
            size="large"
            placeholder="Select Category"
            onChange={handleCategoryChange}
            value={selectedCategory}
            required
          >
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>
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
              <Option key={subcategory._id} value={subcategory._id}>
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
              <Option key={subSubCategory._id} value={subSubCategory._id}>
                {subSubCategory.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <br />

        <Form.Item
          label="SKU (Stock Keeping Unit)"
          name="sku"
          rules={[{ required: true, message: "Please enter the SKU" }]}
        >
          <Input type="text" placeholder="Stock Keeping Unit" size="large" />
        </Form.Item>
        <br />

        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter the title name" }]}
        >
          <Input type="text" placeholder="Title Name" size="large" />
        </Form.Item>
        <br />

        <Form.Item
          label="Brand Name"
          name="brand"
          rules={[{ required: true, message: "Please enter the Brand Name" }]}
        >
          <Input type="text" placeholder="Brand Name" size="large" />
        </Form.Item>
        <br />

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <Input type="number" placeholder="Price" size="large" />
        </Form.Item>
        <br />

        <Form.Item
          label="MRP (Maximum Retail Price)"
          name="mrp"
          rules={[
            { required: true, message: "Please enter Maximum Retail Price" },
          ]}
        >
          <Input
            type="number"
            placeholder="Maximum Retail Price"
            size="large"
          />
        </Form.Item>
        <br />

        <Form.Item
          label="Kharidi (Purchase Price)"
          name="kharidi"
          rules={[{ required: true, message: "Please enter Purchase Price" }]}
        >
          <Input type="number" placeholder="Purchase Price" size="large" />
        </Form.Item>
        <br />

        <Form.Item
          label="Quantity"
          name="quantity"
          rules={[{ required: true, message: "Please enter Quantity" }]}
        >
          <Input type="number" placeholder="Quantity" size="large" />
        </Form.Item>
        <br />

        <Form.Item
          label="Manufacturer Name"
          name="manufacturer"
          rules={[
            { required: true, message: "Please enter Manufacturer Name" },
          ]}
        >
          <Input type="text" placeholder="Manufacturer Name" size="large" />
        </Form.Item>

        <br />

        <Form.Item
          label="Manufacturer Detail"
          name="manufacturerDetail"
          // rules={[
          //   { required: true, message: "Please enter Manufacturer Details" },
          // ]}
        >
          <TextArea type="text" placeholder="Manufacturer Details" />
        </Form.Item>

        <br />

        <Form.Item
          label="Manufacturer Part Number"
          name="manufacturerPartNumber"
          rules={[
            {
              required: true,
              message: "Please enter Manufacturer Part Number",
            },
          ]}
        >
          <Input
            type="text"
            placeholder="Manufacturer Part Number"
            size="large"
          />
        </Form.Item>
        <br />

        <Form.Item
          label="Origin"
          name="origin"
          rules={[
            {
              required: true,
              message: "Please enter the origin of product",
            },
          ]}
        >
          <Input type="text" placeholder="Origin of product" size="large" />
        </Form.Item>
        <br />

        <div>
          <Button type="primary" onClick={handleSubmit}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BasicDetails;
