import React from "react";
import { Table } from "antd";

const CategoryList = () => {
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
    const subCategoryData = [
      {
        key: "1",
        sub_category_name: "Sub Category 1",
        sub_category_id: "SC1",
        date: "2023-01-01",
      },
      {
        key: "2",
        sub_category_name: "Sub Category 2",
        sub_category_id: "SC2",
        date: "2023-02-01",
      },
    ];

    return (
      <Table
        columns={subCategoryColumns}
        dataSource={subCategoryData}
        expandable={{
          expandedRowRender: (subRecord) => {
            const subSubCategoryData = [
              {
                key: "1",
                sub_sub_category_name: "Sub Sub Category 1",
                sub_sub_category_id: "SSC1",
                date: "2023-03-01",
              },
              {
                key: "2",
                sub_sub_category_name: "Sub Sub Category 2",
                sub_sub_category_id: "SSC2",
                date: "2023-04-01",
              },
            ];

            return (
              <Table
                columns={subSubCategoryColumns}
                dataSource={subSubCategoryData}
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

  const data = [
    {
      key: "1",
      category_name: "Category 1",
      category_id: "C1",
      date: "2023-01-01",
    },
    {
      key: "2",
      category_name: "Category 2",
      category_id: "C2",
      date: "2023-02-01",
    },
  ];

  return (
    <Table
      columns={columns}
      expandable={{
        expandedRowRender,
      }}
      dataSource={data}
    />
  );
};

export default CategoryList;
