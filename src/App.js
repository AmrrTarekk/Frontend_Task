import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AppstoreFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Layout, Menu, theme } from "antd";
import Search from "./components/Search/Search";
import EmpCards from "./components/Cards/EmpCards";
import {
  faBell,
  faChevronDown,
  faDisplay,
  faHandsHolding,
  faMugSaucer,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import profilePic from "./profile.jpg";

const today = new Date();
function formatDate(date) {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);
  const [month, day] = formattedDate.split(" ");
  const str2 = month.charAt(0).toUpperCase() + month.slice(1);
  return `${day.split(",")[0]} ${str2}`;
}
const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = weekday[today.getDay()];
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
  let current_time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const getTime = (date) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime =
      hours +
      ":" +
      minutes +
      ":" +
      +today.getSeconds() +
      " " +
      ampm.toUpperCase();
    return strTime;
  };

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
        >
          <div className="header">
            <div>
              {day}, {formatDate(today)} {getTime(today)}
            </div>
            <div>
              <Button type="primary" className="signInBtn">
                Sign In
              </Button>
            </div>
            <div class="Line-4"></div>
            <div className="bellIcon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div class="Line-4"></div>
            <div className="profileCont d-flex flex-row justify-content-center flex-nowrap gap-1">
              <div className="imageDiv">
                <img className="" src={profilePic} variant="top" />
              </div>
              <p>Amr Tarek</p>
              <span className="dropIcon">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </div>
            <div className="dropIcon pb-2">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div>
        </Header>
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
