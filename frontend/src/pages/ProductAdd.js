import React, { useState } from "react";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { TbUserOff, TbUsers, TbUserCircle, TbEdit, TbListDetails, TbFileDescription, } from "react-icons/tb";
import { VscSymbolKeyword } from 'react-icons/vsc';
import { BsImages } from 'react-icons/bs';
import { BiDetail } from 'react-icons/bi';
import { CgDetailsMore } from 'react-icons/cg';


const items = [
  {
    label: 'Basic Details',
    key: 'basicDetails',
    icon: <BiDetail />,
  },
  {
    label: 'Full Details',
    key: 'fullDetails',
    icon: <CgDetailsMore />,
  },
  {
    label: 'Images',
    key: 'images',
    icon: <BsImages />,
  },
  {
    label: 'Description',
    key: 'description',
    icon: <TbFileDescription />,
  },
  {
    label: 'Keywords ',
    key: 'keywords',
    icon: <VscSymbolKeyword />,
  },
  {
    label: 'More Details ',
    key: 'moreDetails',
    icon: <TbListDetails />,
  },
];

const ProductAdd = () => {
  const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div>
        <h2 className='mb-4'>Add a Product</h2>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
      <div>
      <div
        id="basicDetails"
        className="vitalInfo"
        style={{
          width: '78.5vw',
          height: '100vh',
          textAlign: 'center',
          background: 'black',
        }}
      >
      </div>
      </div>
    </div>

  )
}

export default ProductAdd