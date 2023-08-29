import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { AppstoreFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Layout, Menu, theme } from "antd";
import Search from "./components/Search/Search";
import EmpCards from "./components/Cards/EmpCards";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import {
  faBell,
  faChevronDown,
  faDisplay,
  faHandsHolding,
  faMugSaucer,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import profilePic from "./profile.jpg";
import { Toaster } from "react-hot-toast";
import { Offcanvas } from "react-bootstrap";

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
  getItem("Requests", "5", <FontAwesomeIcon icon={faHandsHolding} />),
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
      <Toaster position="top-center" reverseOrder={false} />
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
          className="d-flex justify-content-end"
        >
          {/* <div className="header">
            <div>
              {day}, {formatDate(today)} {getTime(today)}
            </div>
            <div>
              <Button type="primary" className="signInBtn">
                Sign In
              </Button>
            </div>
            <div className="Line-4"></div>
            <div className="bellIcon">
              <FontAwesomeIcon icon={faBell} />
            </div>
            <div className="Line-4"></div>
            <div className="profileCont d-flex flex-row justify-content-center flex-nowrap gap-1">
              <div className="imageDiv">
                <img
                  alt="profilePic"
                  className=""
                  src={profilePic}
                  variant="top"
                />
              </div>
              <p>Amr Tarek</p>
              <span className="dropIcon">
                <FontAwesomeIcon icon={faChevronDown} />
              </span>
            </div>
            <div className="dropIcon pb-2">
              <FontAwesomeIcon icon={faChevronDown} />
            </div>
          </div> */}

          {/* <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-body-tertiary h-100 navbg"
          >
            <Container className="">
              <Navbar.Brand href="#home">Dashboard</Navbar.Brand>
              <Navbar.Toggle aria-controls="responsive-navbar-nav " />
              <Navbar.Collapse id="responsive-navbar-nav ">
                <Nav className="me-auto ">
                  <Navbar.Text>
                    {day}, {formatDate(today)} {getTime(today)}
                  </Navbar.Text>
                  <Nav.Link>
                    <Button type="primary" className="signInBtn">
                      Sign In
                    </Button>
                  </Nav.Link>
                  <Navbar.Text className="d-flex align-items-center gap-2 flex-wrap mx-2">
                    <div className="Line-4"></div>
                    <div className="d-flex position-relative ">
                      <FontAwesomeIcon className="fs-5" icon={faBell} />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger bg-notif ">
                        1
                      </span>
                    </div>
                    <div className="Line-4"></div>
                  </Navbar.Text>
                  <Navbar.Text className="mr-2">
                    <div className="imageDiv">
                      <img
                        alt="profilePic"
                        className=""
                        src={profilePic}
                        variant="top"
                      />
                    </div>
                  </Navbar.Text>
                  <NavDropdown title="Amr Tarek" id="collasible-nav-dropdown">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar> */}
          <Navbar
            key={"md"}
            expand={"md"}
            className="bg-body-tertiary mb-3 h-100 flex-nowrap navbg"
          >
            <Container fluid>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-md`}
                aria-labelledby={`offcanvasNavbarLabel-expand-md`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title
                    id={`offcanvasNavbarLabel-expand-md`}
                  ></Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3 align-items-center">
                    <Navbar.Text>
                      {day}, {formatDate(today)} {getTime(today)}
                    </Navbar.Text>
                    <Nav.Link>
                      <Button type="primary" className="signInBtn">
                        Sign In
                      </Button>
                    </Nav.Link>
                    <Navbar.Text className="d-flex align-items-center gap-2 flex-wrap mx-2">
                      <div className="Line-4"></div>
                      <div className="d-flex position-relative ">
                        <FontAwesomeIcon className="fs-5" icon={faBell} />
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger bg-notif ">
                          1
                        </span>
                      </div>
                      <div className="Line-4"></div>
                    </Navbar.Text>
                    <Navbar.Text className="mr-2 mt-0 d-flex flew-wrap align-items-center gap-2 gap-md-1">
                      <div className="imageDiv">
                        <img
                          alt="profilePic"
                          className=""
                          src={profilePic}
                          variant="top"
                        />
                      </div>
                      <NavDropdown
                        title="Amr Tarek"
                        id="collasible-nav-dropdown"
                      >
                        <NavDropdown.Item>Profile</NavDropdown.Item>
                      </NavDropdown>
                    </Navbar.Text>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        </Header>
        <Content style={{ backgroundColor: "#fff", height: "90vh" }}>
          <div className="wrapper">
            <div className="mb-4 mb-md-5 ">
              <Search />
            </div>
            <div className="mb-4 mb-md-5 ">
              <EmpCards />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
