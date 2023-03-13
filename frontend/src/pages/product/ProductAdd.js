import React, { useState } from "react";
import { Menu } from "antd";
import { TbListDetails, TbFileDescription } from "react-icons/tb";
import { VscSymbolKeyword } from "react-icons/vsc";
import { BsImages } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { useNavigate } from "react-router-dom";


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
      <div key="basicDetails" className="basicDetails"></div>
      <div key="fullDetails" className="fullDetails"></div>
    </div>
  );
};

export default ProductAdd;
