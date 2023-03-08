import React from 'react'
import { Table } from 'antd';

const columns = [
    {
      title: 'S No',
      dataIndex: 'key',
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
    },
    {
        title: 'Price',
        dataIndex: 'price',
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      brand: `Samsung ${1}`,
      name: `Galaxy S21 FE ${i}`,
      quantity: 32,
      price: '$799',
    });
  }

const ProductList = () => {
  return (
    <div>
        <h2 className='mb-4'>Product List</h2>
        <div>
        <Table columns={columns} dataSource={data1} />

        </div>
    </div>
  )
}

export default ProductList