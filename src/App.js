import React from "react";
import "./App.css";
import { AppstoreFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Layout, Menu, theme } from "antd";
import Search from "./components/Search/Search";
import EmpCards from "./components/Cards/EmpCards";
import {
  faDisplay,
  faHandsHolding,
  faMugSaucer,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}
const items = [
  getItem("Dashboard", "1", <AppstoreFilled />),
  getItem("Workplace", "2", <FontAwesomeIcon icon={faDisplay} />),
  getItem("Holidays", "3", <FontAwesomeIcon icon={faMugSaucer} />),
  getItem("Employees", "4", <FontAwesomeIcon icon={faUserGroup} />),
  getItem("Inbound Requests", "5", <FontAwesomeIcon icon={faHandsHolding} />),
];

const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Sider
        className="Rectangle-898"
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
          defaultSelectedKeys={["2"]}
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
        <Content style={{ backgroundColor: "#fff", height: "100vh" }}>
          <div className="wrapper">
            <div className="mb-5">
              <Search />
            </div>
            <div className="mb-5 ">
              <EmpCards />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
