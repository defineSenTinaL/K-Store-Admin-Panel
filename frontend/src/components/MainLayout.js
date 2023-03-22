import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineDelete,
  AiOutlineAppstoreAdd,
} from "react-icons/ai";
import {
  MdOutlineCategory,
  MdDeleteOutline,
  MdOutlineFormatListBulleted,
} from "react-icons/md";
import { TbUserOff, TbUsers, TbUserCircle, TbEdit } from "react-icons/tb";
import { SiBrandfolder } from "react-icons/si";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router-dom";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import profile from "../extras/pp.jpg";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();

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
            if (key == "signout") {
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
                  key: "deleteProduct",
                  icon: <AiOutlineDelete className='fs-4' />,
                  label: "Delete a Product",
                },
                {
                  key: "editProduct",
                  icon: <TbEdit className='fs-4' />,
                  label: "Edit a Product",
                },
                {
                  key: "productList",
                  icon: <AiOutlineShoppingCart className='fs-4' />,
                  label: "Product List",
                },
                {
                  key: "brand",
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
                  key: "deleteCategory",
                  icon: <MdDeleteOutline className='fs-4' />,
                  label: "Delete a Category",
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

            {
              key: "brandList",
              icon: <SiBrandfolder className='fs-4' />,
              label: "Brand List",
            }
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
                <img height={32} width={32} src={profile} alt='' />
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
