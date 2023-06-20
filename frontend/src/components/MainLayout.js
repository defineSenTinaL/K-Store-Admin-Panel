import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import {
  MdOutlineCategory,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import { TbUserOff, TbUsers, TbUserCircle } from "react-icons/tb";
import { SiBrandfolder } from "react-icons/si";
import { Layout, Menu, theme, Dropdown, Space, Avatar } from "antd";

import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import firebase from "firebase/compat/app";

import { useDispatch } from "react-redux";
import { logoutSeller } from "../features/seller/sellerSlice";


const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();

const handleMenuClick = ({ key }) => {
  if (key === 'profile') {
    profile();
  } else if (key === 'logout') {
    logout();
  }
};

  const items = [
    {
      label: 'Profile',
      key: 'profile',
    },
    {
      label: 'Logout',
      key: 'logout',
    },
    
  ];

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // firebase logout

  const logout = () => { 

    firebase.auth().signOut()

    dispatch(logoutSeller(null))

    navigate('/login');
  }

  const profile = () => { 

    navigate('/profile');
  }

 

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className='logo'>
          <h2 className='text-white fs-5 text-center py-3 mb-0 '>
            <span className='sm-logo'>O</span>
            <span className='lg-logo'>Admin</span>
          </h2>
        </div>
        <Menu
          theme='dark'
          mode='inline'
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "dashboard",
              icon: <AiOutlineDashboard className='fs-4' />,
              label: "Dashboard",
            },
            {
              key: "catalog",
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: "Catalog",
              children: [
                {
                  key: "addProduct",
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: "Add a Product",
                },
                {
                  key: "productList",
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: "Product List",
                },
                {
                  key: "brandList",
                  icon: <SiBrandfolder className='fs-4' />,
                  label: "Brand List",
                },
              ],
            },

            {
              key: "categories",
              icon: <MdOutlineCategory className='fs-4' />,
              label: "Categories",
              children: [
                {
                  key: "addCategory",
                  icon: <AiOutlineAppstoreAdd className='fs-4' />,
                  label: "Add a Category",
                },

                {
                  key: "categoryList",
                  icon: <MdOutlineFormatListBulleted className='fs-4' />,
                  label: "Category List",
                },
              ],
            },

            {
              key: "users",
              icon: <TbUsers className='fs-4' />,
              label: "Users",
              children: [
                {
                  key: "activeUser",
                  icon: <TbUserCircle className='fs-4' />,
                  label: "Active Users",
                },

                {
                  key: "blockedUser",
                  icon: <TbUserOff className='fs-4' />,
                  label: "Blocked User",
                },
              ],
            },
          ]}
        />
      </Sider>
      <Layout className='site-layout'>
        <Header
          className='d-flex justify-content-between'
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className='d-flex gap-3 align-items-center'>
            <div></div>
            <div className='d-flex gap-3 align-items-center'>
              <div>
              <Space wrap>
    <Dropdown menu={menuProps}>
    <Avatar
    size={{
      xl: 50,
    }}
    icon={<UserOutlined />}
  >
    </Avatar>
    </Dropdown>
  </Space>
              </div>
              <div>
                <h5 className='mb-0'>Aditya</h5>
                <p className='mb-0'>kumavat@gmail.com</p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
