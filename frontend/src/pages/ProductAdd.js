import React, { useState } from "react";
import { Button, Space, Tabs, Form } from "antd";
import BasicDetails from "../components/products/BasicDetails";
import FullDetails from "../components/products/FullDetails";
import { toast } from "react-toastify";
import { createProduct } from "../functions/product";
import Images from "../components/products/Images";

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [basicDetails, setBasicDetails] = useState({});
  const [fullDetails, setFullDetails] = useState({});
  const [images, setImages] = useState([])

  const items = [
    {
      key: "1",
      label: `Basic Details`,
      children: <BasicDetails onSubmit={setBasicDetails} />,
    },
    {
      key: "2",
      label: `Full Details`,
      children: <FullDetails onSubmit={setFullDetails} />,
    },
    {
      key: "3",
      label: `Image Upload`,
      children: <Images onSubmit={setImages} />,
    },
  ];

  const handleProductSubmit = () => {
    setLoading(true);
    const productData = {
      title: basicDetails.title,
      brand: fullDetails.brand,
    };
  
    const formData = new FormData();
    formData.append('productData', JSON.stringify(productData));
  
    images.forEach((image, index) => {
      formData.append(`files`, image.originFileObj);
    });
  
    createProduct(formData)
      .then((response) => {
        setLoading(false);
        toast.success(`"${response.name}" Product is created`);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  
  
  

  return (
    <>
      <h2 className="mb-4">Add a Product</h2>
      <Form form={form}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{
            height: 300,
          }}
          items={items}
          size="large"
        />

        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="productButton">
          <Space wrap>
            <Button type="primary">Cancel</Button>
            <Button type="primary" onClick={handleProductSubmit}>
              Confirm
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
};

export default ProductAdd;
