import React from "react";

import { Toaster } from "react-hot-toast";
import SideBar from "../SideBar/SideBar";
import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import NavbarSec from "../NavbarSec/NavbarSec";

function LayoutWrapper({ children }) {
  return (
    <>
      <Layout hasSider>
        <Toaster position="top-center" reverseOrder={false} />
        <SideBar />
        <Layout
          className="site-layout"
          style={{
            marginLeft: "105px",
          }}
        >
          <NavbarSec />
          <Content style={{ backgroundColor: "#fff", height: "93vh" }}>
            <div className="wrapper">{children}</div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default LayoutWrapper;
