import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import {
  getCategories,
  getSubCategories,
  getSubSubCategories,
} from "../functions/category";

const CategoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);

  // useEffect(() => {
  //   loadData();
  // }, []);

  const loadData = async () => {
    try {
      const categoryData = await getCategories();
      const subCategoryData = await getSubCategories();
      const subSubCategoryData = await getSubSubCategories();
      // console.log(subCategories);
      // console.log(subSubCategories);
      setCategories(categoryData);
      setSubCategories(subCategoryData);
      setSubSubCategories(subSubCategoryData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const subSubCategoryColumns = [
    {
      title: "Sub Sub Category Name",
      dataIndex: "sub_sub_category_name",
      key: "sub_sub_category_name",
    },
    {
      title: "Sub Sub Category ID",
      dataIndex: "sub_sub_category_id",
      key: "sub_sub_category_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const subCategoryColumns = [
    {
      title: "Sub Category Name",
      dataIndex: "sub_category_name",
      key: "sub_category_name",
    },
    {
      title: "Sub Category ID",
      dataIndex: "sub_category_id",
      key: "sub_category_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  const expandedRowRender = (record) => {
    //console.log(record);
    const categoryId = record.key; // Use the key of the current category record
    const subCategoryData = subCategories.filter(
      (subCategory) => subCategory.parentId === categoryId
    );

    console.log("Sub Category Data:", subCategoryData);

    if (isLoading) {
      return (
        <div className="center-content">
          <Spin size="large" />
        </div>
      );
    }

    return (
      <Table
        columns={subCategoryColumns}
        dataSource={subCategoryData.map((subCategory) => ({
          key: subCategory._id,
          sub_category_name: subCategory.name,
          sub_category_id: subCategory._id, // Change to _id
          date: subCategory.createdAt,
        }))}
        expandable={{
          expandedRowRender: (subRecord) => {
            const subCategoryId = subRecord.key; // Change to _id
            const subSubCategoryData = subSubCategories.filter(
              (subSubCategory) => subSubCategory.parentId === subCategoryId
            );

            return (
              <Table
                columns={subSubCategoryColumns}
                dataSource={subSubCategoryData.map((subSubCategory) => ({
                  key: subSubCategory._id,
                  sub_sub_category_name: subSubCategory.name,
                  sub_sub_category_id: subSubCategory._id, // Change to _id
                  date: subSubCategory.createdAt,
                }))}
                pagination={false}
              />
            );
          },
        }}
        pagination={false}
      />
    );
  };

  const columns = [
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "Category ID",
      dataIndex: "category_id",
      key: "category_id",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  if (isLoading) {
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={categories.map((category) => ({
        key: category._id,
        category_name: category.name,
        category_id: category._id, // Change to _id
        date: category.createdAt,
      }))}
    />
  );
};

export default CategoryList;
