import { Space, Button } from "antd";
import React from "react";
import CustomInput from "../components/CustomInput";

const CategoryAdd = () => {
  return (
    <div>
        <h2 className='mb-4'>Add a Categories</h2>
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
      <form action=''>
        <p> Category</p>
        <CustomInput type='text' placeholder='Category' id='category' />
        <p> Category ID</p>
        <CustomInput type='text' placeholder='Category ID' id='category_id' />
        <p> Parent Category ID</p>
        <CustomInput type='text' placeholder='Parent Category ID' id='parent_category_id' />
      </form>
      <div className='productButton'>
        <Space wrap>
          <Button type='primary'>Cancel</Button>
          <Button type='primary'>Confirm</Button>
        </Space>
      </div>
    </div>
    </div>
  );
};

export default CategoryAdd;
