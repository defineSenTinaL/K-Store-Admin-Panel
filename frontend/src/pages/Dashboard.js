import React from "react";
import { Table, Card, Col, Row, Statistic, Space } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "S No",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
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
  const navigate = useNavigate();
  const { seller } = useSelector((state) => state);

  // useEffect(() => {
  //   // Check if the user is logged in
  //   if (!seller || !seller.token) {
  //     // Redirect to the login page
  //     navigate("/login", { replace: true });
  //   }
  // }, [seller, navigate]);

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ display: "flex" }}>
        <h3 className="mb-4">Dashboard</h3>
        <Row gutter={16}>
          <Col span={12}>
            <Card bordered={false}>
              <Statistic
                title="Today Sales"
                value={500}
                precision={2}
                valueStyle={{
                  color: "#3f8600",
                }}
              />
            </Card>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>

        <div>
          <Row gutter={16}>
            <Col span={12}>
              <Card bordered={false}>
                <Statistic
                  title="Ship order today"
                  value={50}
                  precision={2}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                />
              </Card>
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
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </Space>
    </div>
  );
};

export default Dashboard;
