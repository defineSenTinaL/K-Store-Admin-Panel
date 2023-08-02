import React, { useState } from "react";
import { Button, Space, Tabs, Form } from "antd";
import BasicDetails from "../components/products/BasicDetails";
import FullDetails from "../components/products/FullDetails";
import Description from "../components/products/Description";
import Keyword from "../components/products/Keyword";
import MoreDetails from "../components/products/MoreDetails";
import { toast } from "react-toastify";
import { createProduct } from "../functions/product";
import Variance from "../components/products/Variance";
import ImageUpload from "../components/products/Images";

const ProductAdd = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [basicDetails, setBasicDetails] = useState({});
  const [fullDetails, setFullDetails] = useState({});
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState({});
  const [keyword, setKeyword] = useState({});
  const [moreDetails, setMoreDetails] = useState({});
  const [variance, setVariance] = useState({});

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
      children: <ImageUpload onSubmit={setImages} />,
    },
    {
      key: "4",
      label: `Description`,
      children: <Description onSubmit={setDescription} />,
    },
    {
      key: "5",
      label: `Keyword`,
      children: <Keyword onSubmit={setKeyword} />,
    },
    {
      key: "6",
      label: `MoreDetail`,
      children: <MoreDetails onSubmit={setMoreDetails} />,
    },
    {
      key: "7",
      label: `Variance`,
      children: <Variance onSubmit={setVariance} />,
    },
  ];

  const handleProductSubmit = () => {
    setLoading(true);
    const productData = {
      // Basic Details
      category: basicDetails.selectedCategory,
      subCategory: basicDetails.selectedSubCategory,
      subSubCategory: basicDetails.selectedSubSubCategory,
      sku: basicDetails.sku,
      title: basicDetails.title,
      price: basicDetails.price,
      mrp: basicDetails.mrp,
      kharidi: basicDetails.kharidi,
      quantity: basicDetails.quantity,
      manufacturer: basicDetails.manufacturer,
      manufacturerDetail: basicDetails.manufacturerDetail,
      manufacturerPartNumber: basicDetails.manufacturerPartNumber,
      origin: basicDetails.origin,
      brand: basicDetails.brand,

      //Full Details
      asin: fullDetails.asin,
      warranty: fullDetails.warranty,
      color: fullDetails.color,
      material: fullDetails.material,
      gst: fullDetails.gst,
      condition: fullDetails.condition,
      gift: fullDetails.gift,
      hsn: fullDetails.hsn,
      count: fullDetails.count,
      component: fullDetails.component,
      fragile: fullDetails.fragile,
      shape: fullDetails.shape,
      model: fullDetails.model,
      style: fullDetails.style,
      delivery: fullDetails.delivery,
      return: fullDetails.return,

      // Description
      description: description.description,
      bullet: description.bullet,

      //Keyword
      keyword: keyword.keyword,

      //More Details
      productDimension: moreDetails.productDimension,
      packageDimension: moreDetails.packageDimension,

      // Images
      image: images.map((image) => ({
        url: image.url,
        fileId: image.fileId,
      })),

      variance: variance,
    };

    console.log(productData);
    createProduct(productData)
      .then((response) => {
        setLoading(false);
        toast.success(`"${response.name}" Product is created`);
        window.location.reload();
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
