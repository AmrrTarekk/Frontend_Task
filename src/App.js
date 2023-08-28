import React from "react";
import "./App.css";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Search from "./components/Search/Search";
import EmpCards from "./components/Cards/EmpCards";
const { Header, Content, Footer, Sider } = Layout;
const items = [
  VideoCameraOutlined,
  UserOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        className="sider"
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: "105px",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
          }}
        >
          <div
            className="mb-5"
            style={{
              padding: 5,
              textAlign: "center",
            }}
          >
            {/* Search Bar and button  */}
            <Search />
          </div>
          <div
            className="mb-5"
            style={{
              padding: 24,
              textAlign: "center",
            }}
          >
            <EmpCards />
            {/* Cards of Employee */}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
