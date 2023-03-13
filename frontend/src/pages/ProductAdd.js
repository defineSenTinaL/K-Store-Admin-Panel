import React, { useState } from "react";
import ProductDetails from "../components/ProductDetails";

const ProductAdd = () => {

  return (
    <div>
      <h2 className="mb-4">Add a Product</h2>
      <br />
      <ProductDetails />
    </div>
  );
};

export default ProductAdd;
