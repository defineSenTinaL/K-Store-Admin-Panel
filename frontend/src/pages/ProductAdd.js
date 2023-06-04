import React, { useState } from "react";
import { Menu, Button, Space, Form, Input, Modal, Upload } from "antd";
import { TbListDetails, TbFileDescription } from "react-icons/tb";
import { VscSymbolKeyword } from "react-icons/vsc";
import { BsImages } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgDetailsMore } from "react-icons/cg";
import { Outlet, useNavigate } from "react-router-dom";
import { PlusOutlined } from '@ant-design/icons';

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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
  const [form] = Form.useForm();
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Form layout={"vertical"}
      form={form}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      </Form>
    </Space>
    </div>
  );
};

export const FullDetails = () => {
  const [form] = Form.useForm();
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Form layout={"vertical"}
      form={form}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      </Form>
    </Space>
  </div>
  );
};

export const Images = () => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-2',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-3',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-4',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-xxx',
      percent: 50,
      name: 'image.png',
      status: 'uploading',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
    {
      uid: '-5',
      name: 'image.png',
      status: 'error',
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </div>
  );
};

export const Description = () => {
  const [form] = Form.useForm();
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Form layout={"vertical"}
      form={form}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      </Form>
    </Space>
  </div>
  );
};

export const Keyword = () => {
  const [form] = Form.useForm();
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Form layout={"vertical"}
      form={form}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      </Form>
    </Space>
  </div>
  );
};

export const MoreDetails = () => {
  const [form] = Form.useForm();
  return (
    <div className='bg-white mh-100 mw-100 mx-auto p-4'>
    <Space direction="vertical" size="large" style={{ display: 'flex' }}>
      <Form layout={"vertical"}
      form={form}>
      <Form.Item label="Field A">
        <Input placeholder="input placeholder" />
      </Form.Item>
      <Form.Item label="Field B">
        <Input placeholder="input placeholder" />
      </Form.Item>
      </Form>
    </Space>
  </div>
  );
};

export default ProductAdd;
