import React from 'react'
import { Space, Table } from 'antd';

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
        <a>Invite {record.name}</a>
        <a>Delete</a>
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