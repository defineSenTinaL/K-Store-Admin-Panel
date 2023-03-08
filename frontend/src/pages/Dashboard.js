import React from 'react'
import { Table } from 'antd';

const columns = [
  {
    title: 'S No',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Product',
    dataIndex: 'product',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];
const data1 = [];
for (let i = 0; i < 46; i++) {
  data1.push({
    key: i,
    name: `Edward King ${i}`,
    product: 32,
    status: `pending ${i}`,
  });
}

const Dashboard = () => {
  return (
    <div>
      <h3 className='mb-4'>Dashboard</h3>
      <div className='d-flex justify-content-between align-items-center gap-3'>
        <div className='d-flex flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p className='mb-4 fs-4'>Today Sales</p> <h4>$1000</h4>
            </div>
        </div>
        <div className='d-flex flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p className='mb-4 fs-4'>Lowest Order Value Today</p> <h4>$1000</h4>
            </div>
        </div>
        <div className='d-flex flex-grow-1 bg-white p-3 rounded-3'>
            <div>
              <p className='mb-4 fs-4'>Total Order Delivered</p> <h4>$1000</h4>
            </div>
        </div>
      </div>
      <div className='mt-4 d-flex justify-content-between align-items-center gap-3'>
      <div className='d-flex flex-grow-1 bg-white p-3 rounded-3'>
        <h6>Active Users</h6> <h3 className='mb-5 fs-7 p-5'> 45</h3>
      </div>
      <div className='d-flex flex-grow-1 bg-white p-3 rounded-3'>
        <h6>Order to be shipped to today</h6> <h3 className='mb-5 fs-7 p-5'> 45</h3>
      </div>
      </div>
      <div className='mt-4'>
        <h3 className='mb-4'>Recent Orders</h3>
        <div>
        <Table columns={columns} dataSource={data1} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard