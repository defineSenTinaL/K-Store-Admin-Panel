import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";

const CategoryList = () => {
  const expandedRowRender = () => {
    const columns = [
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
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        sub_category_name: "Power Tools",
        sub_category_id: "110507",
        date: "2014-12-24 23:12:00",
      });
    }
    return <Table columns={columns} dataSource={data} />;
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
  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i.toString(),
      category_name: "Screen",
      category_id: "iOS",
      date: "2014-12-24 23:12:00",
    });
  }
  return (
    <>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
      >
      </Table>
    </>
  );
};

export default CategoryList;
