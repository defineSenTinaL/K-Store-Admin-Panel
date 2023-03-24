import React, { useState } from "react";
import { Menu, Button, Space } from "antd";
import { TbListDetails, TbFileDescription } from "react-icons/tb";
import { VscSymbolKeyword } from "react-icons/vsc";
import { BsImages } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { Outlet, useNavigate } from "react-router-dom";
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
      <h2 className='mb-4'>Add a Product</h2>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        items={items}
      />
      <Outlet />

      <div className='productButton'>
        <Space wrap>
          <Button type='primary'>Cancel</Button>
          <Button type='primary'>Confirm</Button>
        </Space>
      </div>
    </div>
  );
};

export const BasicDetails = () => {
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
      <form action=''>
        <div class='input-group mb-3'>
          <div class='input-group-prepend'></div>
          <select class='custom-select' id='inputGroupSelect01'>
            <option selected>Choose...</option>
            <option value='1'>Home Improvemnt Tools</option>
            <option value='2'>Home Decor</option>
            <option value='3'>Home and Kitchen Appliances</option>
          </select>
        </div>
        <div class='input-group mb-3'>
          <div class='input-group-prepend'></div>
          <select class='custom-select' id='inputGroupSelect01'>
            <option selected>Choose...</option>
            <option value='1'>Power Tools</option>
            <option value='2'>Sanitary</option>
            <option value='3'>Hardware and Electrical</option>
          </select>
        </div>
        <div class='input-group mb-3'>
          <div class='input-group-prepend'></div>
          <select class='custom-select' id='inputGroupSelect01'>
            <option selected>Choose...</option>
            <option value='1'>Angle Grinder</option>
            <option value='2'>Blower</option>
            <option value='3'>Angle Drill</option>
          </select>
        </div>

        <p> Product Code</p>
        <CustomInput type='text' placeholder='ASIN Code' id='asin_code' />
        <p> Item Name</p>
        <CustomInput type='text' placeholder='Brand Name' id='item_name' />
        <p> Brand Name</p>
        <CustomInput type='text' placeholder='Brand Name' id='brand_name' />
        <p> Manufacturer Part Number</p>
        <CustomInput
          type='text'
          placeholder='Brand Name'
          id='manufacturer_part_number'
        />
        <p> Number of Items</p>
        <CustomInput
          type='text'
          placeholder='Brand Name'
          id='number_of_items'
        />
        <p> Unit Count</p>
        <CustomInput type='text' placeholder='Brand Name' id='unit_count' />
        <p> Unit Count Type</p>
        <CustomInput
          type='text'
          placeholder='Brand Name'
          id='unit_count_type'
        />
        <p> Manufacturer</p>
        <CustomInput type='text' placeholder='Brand Name' id='manufacturer' />
      </form>
    </div>
  );
};

export const FullDetails = () => {
  return <div>Full Details</div>;
};

export const Images = () => {
  return <div>Images</div>;
};

export const Description = () => {
  return <div>Description</div>;
};

export const Keyword = () => {
  return <div>Keywords</div>;
};

export const MoreDetails = () => {
  return <div>More Details</div>;
};

export default ProductAdd;
