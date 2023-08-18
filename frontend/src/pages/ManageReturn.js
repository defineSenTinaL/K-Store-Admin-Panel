import React, { useState, useEffect } from "react";
import HorizontalCard from "../components/HorizontalCard";
import { getReturnOrder } from "../functions/order";

const ManageReturn = () => {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    // Fetch today sales when the component mounts
    getReturnOrder()
      .then((data) => {
        console.log(data);
        setOrder(data); // Update the state with the fetched data
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ display: "grid", gridGap: "20px", padding: "20px" }}>
      {order.map((order) => (
        <HorizontalCard
          key={order._id}
          imageSrc={order.products[0]?.productId?.image[0]?.url}
          orderId={order.orderId}
          payment={order.paymentMethod}
          quantity={order.products[0].quantity}
          productTitle={order.products[0].productId.title}
          orderDetail={order}
          schedulePath = "/orderReturn"
        />
      ))}
    </div>
  );
};

export default ManageReturn;
