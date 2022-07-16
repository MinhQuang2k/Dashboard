import {
  AreaChartOutlined,
  ExclamationCircleOutlined,
  GithubOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className="sidebar">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="user-info">
          <img src="/assets/img/background/bg_1.jpeg" alt="" />
          <div className="user-info__box">
            <div>
              <img
                src="/assets/img/avatar/avatar0.png"
                alt=""
                className="user-info__bg-avatar"
              />
            </div>
            {!collapsed && <div className="user-info__name">Admin</div>}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          className="menu-sidebar"
          items={[
            {
              key: "1",
              icon: <AreaChartOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <UserOutlined />,
              label: <Link to="/customer">Customer</Link>,
            },
            {
              key: "3",
              icon: <ShoppingCartOutlined />,
              label: <Link to="/order">Order</Link>,
            },
            {
              key: "4",
              icon: <ShopOutlined />,
              label: <Link to="/product">Product</Link>,
            },
            {
              key: "5",
              icon: <ExclamationCircleOutlined />,
              label: <Link to="/about">About</Link>,
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-header"
          style={{
            padding: 0,
          }}
        >
          <div className="flex-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              className="btn-text btn-trigger"
              onClick={() => setCollapsed(!collapsed)}
            ></Button>
            <div className="head-title">Demo</div>
          </div>
          <a
            href="https://github.com/MinhQuang2k/Dashboard.git"
            className="link-git"
          >
            <Button
              type="text"
              icon={<GithubOutlined />}
              className="btn-text text-drak btn-git"
            ></Button>
          </a>
        </Header>
        <Content className="site-layout-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
