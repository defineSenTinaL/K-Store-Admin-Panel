import React, { useEffect } from "react";
import { Space, Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to="/editProduct">Edit</Link>
        <a href='/deleteProduct'>Delete</a>
      </Space>
    ),
  },
];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Aditya`,
      age: `21`,
      address: 'New York No. 1 Lake Park',
    });
  }

const ProductList = () => {
  const location = useLocation();

  useEffect(() => {
    // Store the current route in local storage
    localStorage.setItem("lastVisitedRoute", location.pathname);
  }, [location]);
  return (
    <div>
        <h2 className='mb-4'>Product List</h2>
        <div>
        <Table
        columns={columns}
        pagination={{
          position: ["none", "bottomCenter"],
        }}
        dataSource={data1}
      />
        </div>
    </div>
  )
}

export default ProductList