import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDisplay,
  faHandsHolding,
  faMugSaucer,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { AppstoreFilled } from "@ant-design/icons";
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
  getItem("Requests", "5", <FontAwesomeIcon icon={faHandsHolding} />),
];

function SideBar() {
  return (
    <Sider
      className="Rectangle-898"
      style={{
        overflow: "auto",
        height: "80vh",
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
  );
}

export default SideBar;
