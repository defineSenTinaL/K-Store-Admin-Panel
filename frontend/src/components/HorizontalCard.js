import React from "react";
import { ScheduleOutlined, CloseOutlined } from "@ant-design/icons";
import { Card, Row, Col, Tag } from "antd";
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

const HorizontalCard = ({
  imageSrc,
  orderId,
  quantity,
  payment,
  productTitle,
  orderDetail,
  schedulePath, // Pass the order details as a prop
}) => {
  const navigate = useNavigate(); // Get the navigation function

  const handleScheduleClick = () => {
    //console.log(orderDetail);
    // Use the navigate function to navigate to "/orderSchedule"
    navigate(schedulePath, { state: orderDetail });
  };

  return (
    <Card style={{ width: "100%", height: "100%" }}>
      <Tag color={payment === "COD" ? "red" : "green"}>{payment}</Tag>
      <Row gutter={50} align="middle">
        <Col flex="none">
          <img
            alt="example"
            src={imageSrc}
            style={{
              width: 100,
              height: 100,
              objectFit: "cover",
              marginTop: 10,
            }}
          />
        </Col>
        <Col flex="auto">
          <Meta title={`Order ID: ${orderId}`} />
          <div style={{ marginTop: "10px" }}>Product: {productTitle}</div>
          <div style={{ marginTop: "10px" }}>Quantity: {quantity}</div>
        </Col>
        <Col flex="none">
          <ScheduleOutlined
            style={{ fontSize: 24, marginRight: 16, cursor: "pointer" }}
            onClick={handleScheduleClick} // Handle click to navigate to OrderSchedule
          />
          <CloseOutlined style={{ fontSize: 24, cursor: "pointer" }} />
        </Col>
      </Row>
    </Card>
  );
};

export default HorizontalCard;
