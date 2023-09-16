import { Header } from "antd/es/layout/layout";
import React from "react";
import { Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Layout, Menu, theme } from "antd";

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

function NavbarSec() {
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
    <Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
      className="d-flex justify-content-end"
    >
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
                      src="./profile.jpg"
                      variant="top"
                    />
                  </div>
                  <NavDropdown title="Amr Tarek" id="collasible-nav-dropdown">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </NavDropdown>
                </Navbar.Text>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </Header>
  );
}

export default NavbarSec;
