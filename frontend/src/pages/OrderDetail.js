import React, { useState, useEffect } from "react";
import { Card, Col, Row, Space, List, Steps } from "antd";
import { useParams } from "react-router-dom";
import { getOrderById } from "../functions/order";

const OrderDetail = () => {
  const { Step } = Steps;
  const [currentStep, setCurrentStep] = useState(0);
  const [trackingData, setTrackingData] = useState(null); // Data from Shiprocket API
  const [order, setOrder] = useState("");

  const { _id } = useParams();

  useEffect(() => {
    // Fetch today sales when the component mounts
    getOrderById(_id)
      .then((data) => {
        console.log(data);
        setOrder(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // useEffect(() => {
  //   // Simulate fetching data from Shiprocket API
  //   // Replace this with your actual API call
  //   const fetchTrackingData = async () => {
  //     try {
  //       const response = await fetch('YOUR_SHIPROCKET_API_ENDPOINT');
  //       const data = await response.json();
  //       setTrackingData(data.tracking_data);
  //     } catch (error) {
  //       console.error('Error fetching tracking data:', error);
  //     }
  //   };

  //   fetchTrackingData();
  // }, []);

  // const order = {
  //   orderNumber: "#14535",
  //   products: [
  //     {
  //       name: "Electronics",
  //       sku: "03549064",
  //       quantity: 3,
  //       unitPrice: 80,
  //       totalPrice: 240,
  //     },
  //   ],
  //   subtotal: 300,
  //   vat: 12,
  //   shipping: 10,
  //   total: 322,
  // };

  // Sample data for the initial steps (Placed and Packed)
  const initialSteps = [
    {
      status: "Placed",
      activity: "Your order has been placed.",
    },
    {
      status: "Packed",
      activity: "Your order has been packed.",
    },
  ];

  const steps = [
    ...initialSteps,
    ...(trackingData ? trackingData.shipment_track_activities : []),
  ].map((activity, index) => (
    <Step
      key={index}
      title={activity.status}
      description={activity.activity}
      subTitle={
        index === currentStep && trackingData
          ? `Left ${calculateTimeLeft(trackingData.etd)}`
          : null
      }
    />
  ));

  // Calculate time left based on etd
  const calculateTimeLeft = (etd) => {
    // Calculate the time left logic here
    return "00:00:08"; // Replace this with your actual logic
  };

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: "flex" }}>
        <div>
          <Steps current={currentStep}>{steps}</Steps>
        </div>
        <div className="d-flex flex-column">
          <Row gutter={[16, 16]}>
            <Col lg={8} md={8} sm={24}>
              <Card title="Order Details" bordered={false}>
                <p>Order Id</p>
                <p>Date</p>
                Payment Method Transaction ID
              </Card>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Card title="Customer Details" bordered={false}>
                Name Email Number
              </Card>
            </Col>
            <Col lg={8} md={8} sm={24}>
              <Card title="Document" bordered={false}>
                Invoice Shipping Label
              </Card>
            </Col>
          </Row>
        </div>
        <div className="d-flex flex-column">
          <Row gutter={[16, 16]}>
            <Col lg={12} md={24}>
              <Card
                title="Billing Details"
                bordered={false}
                style={{ width: "100%" }}
              >
                <p>Address</p>
              </Card>
            </Col>
            <Col lg={12} md={24}>
              <Card
                title="Shipping Details"
                bordered={false}
                style={{ width: "100%" }}
              >
                <p>Address</p>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="d-flex flex-column flex">
          <Card title="Order ID" style={{ width: "100%" }}>
            <List
              header={
                <div className="row">
                  <div className="col-6">Product</div>
                  <div className="col-2 text-center">QTY</div>
                  <div className="col-2 text-center">Unit Price</div>
                  <div className="col-2 text-center">Total</div>
                </div>
              }
              dataSource={order.products}
              renderItem={(product) => (
                <List.Item key={product.sku}>
                  <div className="row">
                    <div className="col-6">{product.name}</div>
                    <div className="col-2 text-center">{product.quantity}</div>
                    <div className="col-2 text-center">
                      ${product.unitPrice}
                    </div>
                    <div className="col-2 text-center">
                      ${product.totalPrice}
                    </div>
                  </div>
                </List.Item>
              )}
            />

            <div className="mt-3">
              <List className="text-end pe-5">
                <List.Item className="text-end px-5">
                  <span className="label px-5">Subtotal:</span> $
                  {order.subtotal}
                </List.Item>
                <List.Item className="text-end px-5">
                  <span className="label px-5">VAT:</span> ${order.vat}
                </List.Item>
                <List.Item className="text-end px-5">
                  <span className="label px-5">Shipping:</span> $
                  {order.shipping}
                </List.Item>
                <List.Item
                  style={{ fontWeight: "bold" }}
                  className="text-end px-5"
                >
                  <span className="label px-5">Total:</span> ${order.total}
                </List.Item>
              </List>
            </div>
          </Card>
        </div>
      </Space>
    </>
  );
};

export default OrderDetail;
