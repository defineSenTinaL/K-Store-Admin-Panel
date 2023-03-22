import React, { useState } from "react";
import { Menu, Button, Space } from "antd";
import { TbListDetails, TbFileDescription } from "react-icons/tb";
import { VscSymbolKeyword } from "react-icons/vsc";
import { BsImages } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";


const items = [
  {
    label: "Basic Details",
    key: "basicDetails",
    icon: <BiDetail />,
  },
  {
    label: "Full Details",
    key: "fullDetails",
    icon: <CgDetailsMore />,
  },
  {
    label: "Images",
    key: "images",
    icon: <BsImages />,
  },
  {
    label: "Description",
    key: "description",
    icon: <TbFileDescription />,
  },
  {
    label: "Keywords ",
    key: "keywords",
    icon: <VscSymbolKeyword />,
  },
  {
    label: "More Details ",
    key: "moreDetails",
    icon: <TbListDetails />,
  },
];

const ProductAdd = () => {
const navigate = useNavigate();
  const [current, setCurrent] = useState("");
  const onClick = (e) => {
    navigate(e.key);
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <div>
      <h2 className="mb-4">Add a Product</h2>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
			<Outlet/>

      <div className="productButton">
      <Space wrap>
      <Button type="primary">
            Cancel
          </Button>
          <Button  type="primary">
            Confirm
          </Button>
          </Space>
        </div>
    </div>
  );
};

export const BasicDetails = () => {
	return (
    <div className="bg-white mh-100 mw-100 mx-auto p-4">
      <form action=''>
      <p> Product Code</p>
      <CustomInput type='text' placeholder='ASIN Code' id='asin_code' />
      <p> Brand Name</p>
      <CustomInput type='text' placeholder='Brand Name' id='brand_name' />

      </form>
    </div>
  );
}

export const FullDetails = () => {
	return <div>Full Details</div>;
}

export const Images = () => {
	return <div>Images</div>;
}

export const Description = () => {
	return <div>Description</div>;
}

export const Keyword = () => {
	return <div>Keywords</div>;
}

export const MoreDetails = () => {
	return <div>More Details</div>;
}

export default ProductAdd;
