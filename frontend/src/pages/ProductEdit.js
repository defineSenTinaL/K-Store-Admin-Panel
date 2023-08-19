import React, { useState, useEffect } from "react";
import { Button, Space, Tabs, Form, Spin } from "antd";
import BasicDetails from "../components/products/BasicDetails";
import FullDetails from "../components/products/FullDetails";
import Description from "../components/products/Description";
import Keyword from "../components/products/Keyword";
import MoreDetails from "../components/products/MoreDetails";
import { toast } from "react-toastify";
import { updateProduct } from "../functions/product"; // Assuming you have a function to update product data
import Variance from "../components/products/Variance";
import ImageUpload from "../components/products/Images";
import { getProductById } from "../functions/product";

const EditProduct = ({ productId }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(true);
  const [basicDetails, setBasicDetails] = useState({});
  const [fullDetails, setFullDetails] = useState({});
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState({});
  const [keyword, setKeyword] = useState({});
  const [moreDetails, setMoreDetails] = useState({});
  const [variance, setVariance] = useState({});
  const [productData, setProductData] = useState({});

  useEffect(() => {
    // Fetch the product data from the server using the product ID
    getProductById("64c970fc8610c3f33a82c0f1")
      .then((response) => {
        setProductData(response);
        setBasicDetails({
          // Update basicDetails state with fetched data
          selectedCategory: response.category,
          selectedSubCategory: response.subCategory,
          selectedSubSubCategory: response.subSubCategory,
          sku: response.sku,
          title: response.title,
          price: response.price,
          mrp: response.mrp,
          kharidi: response.kharidi,
          quantity: response.quantity,
          manufacturer: response.manufacturer,
          manufacturerDetail: response.manufacturerDetail,
          manufacturerPartNumber: response.manufacturerPartNumber,
          origin: response.origin,
          brand: response.brand,
        });
        setFullDetails({
          // Update fullDetails state with fetched data
          asin: response.asin,
          warranty: response.warranty,
          color: response.color,
          material: response.material,
          gst: response.gst,
          condition: response.condition,
          gift: response.gift,
          hsn: response.hsn,
          count: response.count,
          component: response.component,
          fragile: response.fragile,
          shape: response.shape,
          model: response.model,
          style: response.style,
          delivery: response.delivery,
          return: response.return,
        });
        setImages({
          image: response.image.map((image) => ({
            url: image.url,
            fileId: image.fileId,
          })),
        });
        setDescription({
          description: response.description,
          bullet: response.bullet,
        });
        setKeyword({
          keyword: response.keyword,
        });
        setMoreDetails({
          productDimension: response.productDimension,
          packageDimension: response.packageDimension,
        });
        setVariance({
          variance: variance,
        });
        setIsLoading(false); // Data fetching is complete

      })
      
      .catch((error) => {
        // Handle error if needed
        console.error("Error fetching product data:", error);
        setIsLoading(false); // Data fetching is complete

      });
  }, []);

  const handleProductSubmit = () => {
    setIsLoading(true);
    // Construct the product data to update
    const productDataToUpdate = {
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

      // Full Details
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

      // Keyword
      keyword: keyword.keyword,

      // More Details
      productDimension: moreDetails.productDimension,
      packageDimension: moreDetails.packageDimension,

      // Images
      image: images.map((image) => ({
        url: image.url,
        fileId: image.fileId,
      })),

      variance: variance,
    };

    console.log(productDataToUpdate);
    // updateProduct(productId, productDataToUpdate) // Assuming productData has an ID property to identify the product
    //   .then((response) => {
    //     setIsLoading(false); // Data fetching is complete
    //     toast.success(`"${response.name}" Product is updated`);
    //     // You can perform additional actions after successful update if needed
    //   })
    //   .catch((err) => {
    //      setIsLoading(false); // Data fetching is complete
    //     if (err.response.status === 400) toast.error(err.response.data);
    //     // Handle error if needed
    //   });
  };

  const items = [
    {
      key: "1",
      label: `Basic Details`,
      children: <BasicDetails data={basicDetails} onSubmit={setBasicDetails} />,
    },
    {
      key: "2",
      label: `Full Details`,
      children: <FullDetails data={fullDetails} onSubmit={setFullDetails} />,
    },
    {
      key: "3",
      label: `Image Upload`,
      children: <ImageUpload data={images} onSubmit={setImages} />,
    },
    {
      key: "4",
      label: `Description`,
      children: <Description data={description} onSubmit={setDescription} />,
    },
    {
      key: "5",
      label: `Keyword`,
      children: <Keyword data={keyword} onSubmit={setKeyword} />,
    },
    {
      key: "6",
      label: `MoreDetail`,
      children: <MoreDetails data={moreDetails} onSubmit={setMoreDetails} />,
    },
    {
      key: "7",
      label: `Variance`,
      children: <Variance data={variance} onSubmit={setVariance} />,
    },
  ];

  if (isLoading) {
    // Show loading spinner while data is being fetched
    return (
      <div className="center-content">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Edit Product</h2>
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

export default EditProduct;
