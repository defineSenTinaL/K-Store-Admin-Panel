import React, { useState, useEffect } from "react";
import { Table, Spin, Pagination } from "antd";
import { getBrand } from "../functions/brand";

const Brand = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of orders to show per page
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // Fetch recent orders when the component mounts
    getBrand(currentPage, pageSize)
      .then((data) => {
        console.log(data);
        setData(data); // Update the state with the fetch data
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, [currentPage, pageSize]);

  const columns = [
    {
      title: "Brand Name",
      dataIndex: "brand",
      key: "brand", // Assuming each brand name is a property in the array
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
    <div>
      <Table columns={columns} dataSource={data.map((brand, index) => ({ brand, key: index }))} pagination={false} />
      <div className="d-flex justify-content-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={10} // Update with the actual total count of brands
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default Brand;
