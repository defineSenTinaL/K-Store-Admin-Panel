import React, { useEffect, useState } from "react";
import {
  Space,
  Table,
  Spin,
  Image,
  InputNumber,
  Button,
  Pagination,
} from "antd";
import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import {
  updateProductPrice,
  updateProductQuantity,
} from "../functions/product";
import { getProducts } from "../functions/product";

const ProductList = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of orders to show per page

  // useEffect(() => {
  //   setIsLoading(true);

  //   // Fetch products with pagination
  //   getProducts(currentPage, pageSize)
  //     .then((response) => {
  //       console.log(response);
  //       // const productsArray = Object.values(response.products);

  //       // const modifiedData = productsArray.map((product) => ({
  //       //   key: product._id,
  //       //   title: product.title,
  //       //   sku: product.sku,
  //       //   price: product.price,
  //       //   quantity: product.quantity,
  //       //   image: product.image[0]?.url || "", // You can add error handling here
  //       // }));
  //       setData(response);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setIsLoading(false);
  //     });

  //   localStorage.setItem("lastVisitedRoute", location.pathname);
  // }, [location, currentPage, pageSize]);

  const handleConfirmPrice = (productId, newPrice) => {
    updateProductPrice(productId, newPrice)
      .then(() => {
        const updatedData = data.map((item) => {
          if (item.key === productId) {
            return { ...item, price: newPrice };
          }
          return item;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error updating price:", error);
      });
  };

  const handleConfirmQuantity = (productId, newQuantity) => {
    updateProductQuantity(productId, newQuantity)
      .then(() => {
        const updatedData = data.map((item) => {
          if (item.key === productId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        });
        setData(updatedData);
      })
      .catch((error) => {
        console.error("Error updating quantity:", error);
      });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <Space>
          <Image src={record.image} width={40} />
          <a>{text}</a>
        </Space>
      ),
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text, record) => (
        <EditableField
          value={text}
          onSave={(newValue) => handleConfirmPrice(record.key, newValue)}
        />
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (text, record) => (
        <EditableField
          value={text}
          onSave={(newValue) => handleConfirmQuantity(record.key, newValue)}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Link to="/editProduct">Edit</Link>
          <Link to={`/deleteProduct?id=${record.key}`}>Delete</Link>{" "}
          {/* Pass product ID as query parameter */}
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4">Product List</h2>
      <div>
        <Table columns={columns} pagination={false} dataSource={data} />
        <div className="d-flex justify-content-center mt-4">
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={10} // Total number of orders (you should update this based on the total count from the backend)
            onChange={(page) => setCurrentPage(page)} // Update the current page when pagination is changed
          />
        </div>
      </div>
    </div>
  );
};

const EditableField = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [newValue, setNewValue] = useState(value);

  const startEditing = () => {
    setEditing(true);
  };

  const handleValueChange = (value) => {
    setNewValue(value);
  };

  const saveChanges = () => {
    onSave(newValue);
    setEditing(false);
  };

  const cancelEditing = () => {
    setEditing(false);
    setNewValue(value); // Reset the value back to the original
  };

  return (
    <div className="editable-field">
      {editing ? (
        <div className="d-flex align-items-center">
          <InputNumber value={newValue} onChange={handleValueChange} />
          <Button className="btn btn-primary btn-sm mx-2" onClick={saveChanges}>
            <CheckOutlined />
          </Button>
          <Button className="btn btn-link btn-sm" onClick={cancelEditing}>
            <CloseOutlined />
          </Button>
        </div>
      ) : (
        <div className="d-flex align-items-center">
          {value}
          <Button className="btn btn-link btn-sm ml-2" onClick={startEditing}>
            <EditOutlined />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductList;
