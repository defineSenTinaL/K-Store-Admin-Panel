import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetail = location.state; // Access the passed data
  const authToken = useSelector((state) => state.shiprocket.token);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false); // Initialize the state variable
  const [shipmentId, setshipmentId] = useState(""); // Initialize the state variable

  //Handle Confirm Order
  const handleConfirmOrder = async () => {
    try {
      const payload = {
        order_id: orderDetail.orderId,
        order_date: new Date().toISOString(),
        pickup_location: "Shop",
        comment: `Seller: Kumavat Enterprises`,
        billing_customer_name: orderDetail.shippingAddress.name,
        billing_last_name: "",
        billing_address: orderDetail.shippingAddress.addressLine,
        billing_address_2: orderDetail.shippingAddress.street,
        billing_city: orderDetail.shippingAddress.city,
        billing_pincode: orderDetail.shippingAddress.pincode,
        billing_state: orderDetail.shippingAddress.state,
        billing_country: "India",
        billing_email: orderDetail.userId.email,
        billing_phone: orderDetail.shippingAddress.mobile,
        shipping_is_billing: true,
        shipping_customer_name: "",
        shipping_last_name: "",
        shipping_address: "",
        shipping_address_2: "",
        shipping_city: "",
        shipping_pincode: "",
        shipping_state: "",
        shipping_country: "India",
        shipping_email: "",
        shipping_phone: "",
        order_items: [
          {
            name: orderDetail.products[0].productId.title,
            sku: orderDetail.products[0].productId.sku, // Update backend if needed
            units: orderDetail.products[0].quantity,
            selling_price: orderDetail.products[0].price.toString(),
          },
        ],
        payment_method: orderDetail.paymentMethod,
        sub_total: orderDetail.total, // Update as needed
        length: orderDetail.products[0].productId.packageDimension.length,
        breadth: orderDetail.products[0].productId.packageDimension.breadth,
        height: orderDetail.products[0].productId.packageDimension.height,
        //weight: orderDetail.products[0].productId.packageWeight, // Update backend if needed
        weight: "1.5",
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const retryFailedAPI = async (apiFunction, payload) => {
        let retryDelay = 2000; // Initial delay of 2 seconds
        let retryCount = 0;
        let MAX_RETRIES = 10000;

        while (retryCount < MAX_RETRIES) {
          try {
            const response = await apiFunction(payload, { headers });

            // Successful response, break the loop
            return response;
          } catch (error) {
            console.error("Error executing API:", error);

            // Increase the delay for the next retry (exponential backoff)
            retryDelay *= 2; // Double the delay
            retryCount++;

            // Wait for a delay before retrying
            await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait for 5 seconds
          }
        }
      };

      const response = await retryFailedAPI(
        axios.post.bind(
          axios,
          `${process.env.REACT_SHIPROCKET_CREATE_ORDER_API}`
        ),
        payload
      );

      const { order_id, shipment_id } = response.data;

      const confirmOrder = await retryFailedAPI(
        axios.post.bind(axios, `${process.env.REACT_APP_API}/order/confirm-order`),
        {
          _id: orderDetail._id,
          order_id,
          shipment_id,
        }
      );

      setshipmentId(shipment_id);
      setIsOrderConfirmed(true);
      // Show success toast message
      toast.success("Order created successfully!");
      console.log("Order updated:", confirmOrder.data);
    } catch (error) {
      toast.error("An error occurred while handling the order.");
      console.error("Error handling create order:", error);
    }
  };

  //Handle PickUp Order
  const handlePickupOrder = async () => {
    try {
      const payload = {
        shipment_id: shipmentId,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      };

      const retryFailedAPI = async (apiFunction) => {
        let retryDelay = 2000; // Initial delay of 2 seconds
        let retryCount = 0;
        let MAX_RETRIES = 10000;

        while (retryCount < MAX_RETRIES) {
          try {
            const response = await apiFunction(payload, { headers });

            // Successful response, break the loop
            return response;
          } catch (error) {
            console.error("Error executing API:", error);

            // Increase the delay for the next retry (exponential backoff)
            retryDelay *= 2; // Double the delay
            retryCount++;

            // Wait for a delay before retrying
            await new Promise((resolve) => setTimeout(resolve, retryDelay)); // Wait for 5 seconds
          }
        }
      };

      const responseAwb = await retryFailedAPI(
        axios.post.bind(
          axios,
          `${process.env.REACT_SHIPROCKET_GENERATE_AWB_API}`
        )
      );

      const responsePickup = await retryFailedAPI(
        axios.post.bind(
          axios,
          `${process.env.REACT_SHIPROCKET_GENERATE_PICKUP_API}`
        )
      );

      const responseManifest = await retryFailedAPI(
        axios.post.bind(
          axios,
          `${process.env.REACT_SHIPROCKET_GENERATE_MANIFEST_API}`
        )
      );

      const responseLabel = await retryFailedAPI(
        axios.post.bind(
          axios,
          `${process.env.REACT_SHIPROCKET_GENERATE_LABEL_API}`
        )
      );

      const pickupResponse = responsePickup.data;
      const manifestUrl = responseManifest.data.manifest_url;
      const labelUrl = responseLabel.data.label_url;

      const data = {
        pickupDetail: pickupResponse,
        manifest_url: manifestUrl,
        label_url: labelUrl,
      };

      const updateOrder = await axios.post(
        `${process.env.REACT_APP_API}/order/confirm-pickup/` + orderDetail._id,
        data,
        { headers }
      );
      
      // Show success toast message
      toast.success("Pick Up Schedule successfully!");
      console.log("Order updated with pickup response:", updateOrder.data);
      navigate(`/orderDetail/${orderDetail._id}`);
    } catch (error) {
      toast.error("An error occurred while scheduling the pick up.");
      console.error("Error handling pickup order:", error);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Order Schedule</h3>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            type="primary"
            onClick={handleConfirmOrder}
            disabled={isOrderConfirmed}
          >
            Confirm Order
          </Button>
          <div style={{ width: "16px" }}></div> {/* Add space of 16px */}
          <Button type="primary" onClick={handlePickupOrder}>
            Confirm Pickup
          </Button>
        </div>
      </div>
      <Card title="Order Details">
        <Card type="inner" title="Customer">
          <div style={{ marginTop: "10px" }}>
            User Id: {orderDetail.userId._id}
          </div>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Shipping Address">
          <div style={{ marginTop: "10px" }}>
            Name: {orderDetail.shippingAddress.name}
          </div>
          <div style={{ marginTop: "10px" }}>
            Mobile: {orderDetail.shippingAddress.mobile}
          </div>
          <div style={{ marginTop: "10px" }}>
            Address Line: {orderDetail.shippingAddress.addressLine}
          </div>
          <div style={{ marginTop: "10px" }}>
            Street: {orderDetail.shippingAddress.street}
          </div>
          <div style={{ marginTop: "10px" }}>
            City: {orderDetail.shippingAddress.city}
          </div>
          <div style={{ marginTop: "10px" }}>
            State: {orderDetail.shippingAddress.state}
          </div>
          <div style={{ marginTop: "10px" }}>
            Pincode: {orderDetail.shippingAddress.pincode}
          </div>
          <div style={{ marginTop: "10px" }}>
            Type: {orderDetail.shippingAddress.addressType}
          </div>
        </Card>
        <Card style={{ marginTop: 16 }} type="inner" title="Product">
          <div style={{ marginTop: "10px" }}>
            Product: {orderDetail.products[0].productId.title}
          </div>
          <div style={{ marginTop: "10px" }}>
            Quantity: {orderDetail.products[0].quantity}
          </div>
          <div style={{ marginTop: "10px" }}>
            Price: {orderDetail.products[0].price}
          </div>
        </Card>
      </Card>
    </div>
  );
};

export default OrderSchedule;
