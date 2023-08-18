import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { returnAccepted, returnRejected } from "../functions/order";

const OrderReturn = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetail = location.state; // Access the passed data
  const authToken = useSelector((state) => state.shiprocket.token);
  const [isReturnAccepted, setIsReturnAccepted] = useState(false); // Initialize the state variable
  const [shipmentId, setshipmentId] = useState(""); // Initialize the state variable

  //Handle Accept Order
  const handleAcceptOrder = async () => {
    try {
      returnAccepted(orderDetail._id)
        .then((response) => {
          toast.success(`"${response.name}" Return Accepted`);
          //window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
      // Show success toast message
      setIsReturnAccepted(true);
      toast.success("Order created successfully!");
      //console.log("Order updated:");
    } catch (error) {
      toast.error("An error occurred while handling the order.");
      console.error("Error handling create order:", error);
    }
  };

  // Handle Reject Order
  const handleRejectOrder = async () => {
    try {
      returnRejected(orderDetail._id)
        .then((response) => {
          toast.success(`"${response.name}" Return Rejected`);
          //window.location.reload();
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
        });
      // Show success toast message
      toast.success("Order created successfully!");
      console.log("Order updated:");
    } catch (error) {
      toast.error("An error occurred while handling the order.");
      console.error("Error handling create order:", error);
    }
  };

  //Handle PickUp Order
  const handleReturnSchedule = async () => {
    try {
      const payload = {
        order_id: orderDetail.returnId,
        order_date: new Date().toISOString(),
        pickup_customer_name: orderDetail.shippingAddress.name,
        pickup_address: orderDetail.shippingAddress.addressLine,
        pickup_address_2: orderDetail.shippingAddress.street,
        pickup_city: orderDetail.shippingAddress.city,
        pickup_state: orderDetail.shippingAddress.state,
        billing_country: "India",
        pickup_pincode: orderDetail.shippingAddress.pincode,
        pickup_email: orderDetail.userId.email,
        pickup_phone: orderDetail.shippingAddress.mobile,
        pickup_isd_code: "91",
        shipping_customer_name: orderDetail.shippingAddress.name,
        shipping_address: orderDetail.shippingAddress.addressLine,
        shipping_address_2: orderDetail.shippingAddress.street,
        shipping_city: orderDetail.shippingAddress.city,
        shipping_pincode: orderDetail.shippingAddress.pincode,
        shipping_state: orderDetail.shippingAddress.state,
        shipping_country: orderDetail.shippingAddress.country,
        shipping_email: orderDetail.seller.email,
        shipping_phone: orderDetail.seller.phone,
        order_items: [
          {
            name: orderDetail.products[0].productId.title,
            sku: orderDetail.products[0].productId.sku, // Update backend if needed
            units: orderDetail.products[0].quantity,
            selling_price: orderDetail.products[0].price.toString(),
            qc_enable: true,
            qc_color: orderDetail.products[0].productId.color,
            qc_brand: orderDetail.products[0].productId.brand,
            qc_ean_barcode: orderDetail.products[0].productId.asin,
            qc_size: orderDetail.products[0].productId.size,
            qc_product_name: orderDetail.products[0].productId.title,
            qc_product_image: orderDetail.products[0]?.productId?.image[0]?.url,
          },
        ],
        payment_method: orderDetail.paymentMethod,
        sub_total: orderDetail.total,
        length: orderDetail.products[0].productId.packageDimension.length,
        breadth: orderDetail.products[0].productId.packageDimension.breadth,
        height: orderDetail.products[0].productId.packageDimension.height,
        weight: orderDetail.products[0].productId.packageWeight, // Update backend if needed
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
          `${process.env.REACT_SHIPROCKET_CREATE_RETURN_API}`
        ),
        payload
      );

      const { order_id, shipment_id } = response.data;

      const updateOrder = await retryFailedAPI(
        axios.post.bind(axios, `${process.env.REACT_APP_API}/order/return`),
        {
          _id: orderDetail._id,
          return_order_id: order_id,
          return_shipment_id: shipment_id,
        }
      );

      const responseAwb = await retryFailedAPI(
        axios.post.bind(
          axios,
          `${process.env.REACT_SHIPROCKET_GENERATE_AWB_API}`
        ),
        {
          shipment_id,
        }
      );
      // Show success toast message
      toast.success("Order created successfully!");
      console.log("Order updated:", updateOrder.data);
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
        <h3>Order Return</h3>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            type="primary"
            onClick={handleAcceptOrder}
            disabled={isReturnAccepted}
            style={{ marginRight: "8px" }} // Add margin to the right
          >
            Accept Return
          </Button>
          <Button
            type="primary"
            onClick={handleRejectOrder}
            disabled={isReturnAccepted}
            style={{ marginRight: "8px" }} // Add margin to the right
          >
            Reject Return
          </Button>
          <Button type="primary" onClick={handleReturnSchedule}>
            Schedule Return
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

export default OrderReturn;
