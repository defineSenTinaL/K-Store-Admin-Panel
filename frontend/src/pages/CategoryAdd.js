import { Button, Form, Input, Select, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  createSubCategory,
  getSubCategories,
  createSubSubCategory,
} from "../functions/category";
import { useLocation } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

const { Option } = Select;

const CategoryAdd = () => {
  const { seller } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [subName, setsubName] = useState("");
  const [subSubName, setsubSubName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [parentId, setParentId] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [filteredSubCategories, setFilteredSubCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Store the current route in local storage
    localStorage.setItem("lastVisitedRoute", location.pathname);
  }, [location]);

  const [categoryForm] = Form.useForm();
  const [subcategoryForm] = Form.useForm();
  const [subsubcategoryForm] = Form.useForm();

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setCategories(res);
    });
  };

  const handleCategorySubmit = (e) => {
    setIsLoading(true);
    console.log(uploadedImageUrl);
    // createCategory({ name, image: uploadedImageUrl }) // Include the uploaded image URL
    //   .then((response) => {
    //     setIsLoading(false);
    //     setName("");
    //     setUploadedImageUrl(""); // Clear the uploaded image URL
    //     toast.success(`"${response.name}" category is created`);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     if (err.response.status === 400) toast.error(err.response.data);
    //   });
  };

  const loadSubCategories = () => {
    getSubCategories().then((res) => {
      setSubCategories(res);
    });
  };

  const handleSubcategorySubmit = (e) => {
    //e.preventDefault();
    setIsLoading(true);
    createSubCategory({ name: subName, parentId })
      .then((response) => {
        setIsLoading(false);
        setName("");
        setParentId("");
        toast.success(`"${response.name}" subcategory is created`);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleSubSubcategorySubmit = (e) => {
    //e.preventDefault();
    setIsLoading(true);
    createSubSubCategory({ name: subSubName, parentId: selectedSubCategory })
      .then((response) => {
        setIsLoading(false);
        setName("");
        setSelectedSubCategory("");
        toast.success(`"${response.name}" subsubcategory is created`);
      })
      .catch((err) => {
        setIsLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
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

  if (isLoading) {
    // Show loading spinner while data is being fetched
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Add Categories and Subcategories</h2>
      <Form
        form={categoryForm}
        layout="vertical"
        className="category-form"
        onSubmit={handleCategorySubmit}
        onFinish={handleCategorySubmit}
      >
        <Form.Item label="Category Image">
          <ImageUpload onUpload={setUploadedImageUrl} /> {/* Pass the callback */}
        </Form.Item>
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
            htmlType="submit"
            className="category-form-button"
            type="primary"
          >
            Add Category
          </Button>
        </Form.Item>
      </Form>

      <Form
        form={subcategoryForm}
        layout="vertical"
        className="subcategory-form"
        onSubmit={handleSubcategorySubmit}
        onFinish={handleSubcategorySubmit}
      >
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
                <Option key={category._id} value={category._id}>
                  {category.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
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
            onChange={(e) => setsubName(e.target.value)}
            autoFocus
            required
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="subcategory-form-button"
            type="primary"
          >
            Add Subcategory
          </Button>
        </Form.Item>
      </Form>

      <Form
        form={subsubcategoryForm}
        layout="vertical"
        className="subsubcategory-form"
        onSubmit={handleSubSubcategorySubmit}
        onFinish={handleSubSubcategorySubmit}
      >
        <Form.Item
          label="Parent Category"
          required
          tooltip="Select the parent category"
        >
          <Select
            size="large"
            placeholder="Select Parent Category"
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
        <Form.Item
          label="Parent Subcategory"
          required
          tooltip="Select the parent subcategory"
        >
          <Select
            size="large"
            placeholder="Select Parent Subcategory"
            onChange={(value) => setSelectedSubCategory(value)}
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
        <Form.Item
          label="SubSubCategory Name"
          required
          tooltip="This is a required field"
        >
          <Input
            size="large"
            placeholder="Subcategory Name"
            name="subsubcategoryName"
            type="subcategoryName"
            value={subSubName}
            onChange={(e) => setsubSubName(e.target.value)}
            autoFocus
            required
          />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            className="subsubcategory-form-button"
            type="primary"
          >
            Add Subsubcategory
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CategoryAdd;
