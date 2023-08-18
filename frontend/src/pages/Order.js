import React, { useState } from "react";
import { Card, Col, Row, Statistic, Space, Table, Pagination } from "antd";
import { Link } from "react-router-dom";

const Order = () => {
  // const [recentOrders, setRecentOrders] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  // const pageSize = 10; // Number of orders to show per page

  // const columns = [
  //   {
  //     title: "S No",
  //     dataIndex: "key",
  //   },
  //   {
  //     title: "Order Id",
  //     dataIndex: "orderId",
  //   },
  //   {
  //     title: "Product",
  //     dataIndex: "product",
  //   },
  //   {
  //     title: "Status",
  //     dataIndex: "status",
  //   },
  //   {
  //     title: 'Action',
  //     key: 'action',
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <Link to="/orderSchedule">Process</Link>
  //       </Space>
  //     ),
  //   },
  // ];

  // Convert the data from the API to the format expected by the Table
  // const formattedData = recentOrders.map((order, index) => ({
  //   key: index + 1 + (currentPage - 1) * pageSize, // Calculate the serial number based on the current page
  //   orderId: order.orderId,
  //   product:
  //     order.products && order.products.length > 0
  //       ? order.products[0].productId.title
  //       : "N/A",
  //   status: order.status,
  // }));
  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <Row gutter={16}>
          <Col span={12}>
            <Link to="/manageOrder">
              <Card bordered={false}>
                <Statistic
                  title="Placed"
                  value={11.28}
                  precision={2}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                />
              </Card>
            </Link>
          </Col>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Delivered"
                value={9.3}
                precision={2}
                valueStyle={{
                  color: "#cf1322",
                }}
              />
            </Card>
          </Col>
        </Row>
        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Cancelled"
                  value={9.3}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Link to="/manageReturn">
                <Card bordered={false}>
                  <Statistic
                    title="Return"
                    value={9.3}
                    precision={2}
                    valueStyle={{
                      color: "#cf1322",
                    }}
                  />
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
        {/* <div>
          <Link to="/orderDetail">
          <h3 className="mb-4">Orders</h3>
          </Link>
          <div>
            <Table
              columns={columns}
              dataSource={formattedData}
            />
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={10} // Total number of orders (you should update this based on the total count from the backend)
            onChange={(page) => setCurrentPage(page)} // Update the current page when pagination is changes
          />
        </div> */}
      </Space>
    </div>
  );
};

export default Order;
