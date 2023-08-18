import React from "react";
import {
  Table,
  Card,
  Col,
  Row,
  Statistic,
  Space,
  Pagination,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getRecentOrders } from "../functions/dashboard";
import { getTodaySales } from "../functions/dashboard";
import { getPendingOrderCount } from "../functions/dashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state);
  // State to store recent order data
  const [recentOrders, setRecentOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of orders to show per page

  const [todaySales, setTodaySales] = useState(0);
  const [pendingOrder, setPendingOrder] = useState(0);

  // useEffect(() => {
  //   // Check if the user is logged in
  //   if (!seller || !seller.token) {
  //     // Redirect to the login page
  //     navigate("/login", { replace: true });
  //   }
  // }, [seller, navigate]);

  // useEffect(() => {
  //   // Fetch recent orders when the component mounts
  //   getRecentOrders(currentPage, pageSize)
  //     .then((data) => {
  //       setRecentOrders(data); // Update the state with the fetched data
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, [currentPage, pageSize]);

  // useEffect(() => {
  //   // Fetch today sales when the component mounts
  //   getTodaySales()
  //     .then((data) => {
  //       setTodaysSales(data); // Update the state with the fetched data
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  //   useEffect(() => {
  //   // Fetch today sales when the component mounts
  //   getPendingOrderCount()
  //     .then((data) => {
  //       setPendingOrder(data); // Update the state with the fetched data
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);

  const columns = [
    {
      title: "S No",
      dataIndex: "key",
    },
    {
      title: "Order Id",
      dataIndex: "orderId",
    },
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  // Convert the data from the API to the format expected by the Table
  const formattedData = recentOrders.map((order, index) => ({
    key: index + 1 + (currentPage - 1) * pageSize, // Calculate the serial number based on the current page
    orderId: order.orderId,
    product:
      order.products && order.products.length > 0
        ? order.products[0].productId.title
        : "N/A",
    status: order.status,
  }));

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h3 className="mb-4">Dashboard</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Today Sales"
                value={todaySales.count}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Link to="/order">
              <Card bordered={false}>
                <Statistic
                  title="Return Orders"
                  value={5}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                />
              </Card>
            </Link>
          </Col>
        </Row>

        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Link to="/order">
                <Card bordered={false}>
                  <Statistic
                    title="Ship order today"
                    value={pendingOrder.count}
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
                  title="Profit"
                  value={1000}
                  precision={2}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                />
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <h3 className="mb-4">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={formattedData} />
          </div>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={10} // Total number of orders (you should update this based on the total count from the backend)
            onChange={(page) => setCurrentPage(page)} // Update the current page when pagination is changed
          />
        </div>
      </Space>
    </div>
  );
};

export default Dashboard;
