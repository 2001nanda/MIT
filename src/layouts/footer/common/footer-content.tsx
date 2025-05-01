"use client";
import React from "react";
import ContactUs from "./contact-us";
import About from "./about";
import Location from "./location";
import Links from "./links";
import Updates from "./updates";
import TopPlace from "./top-place";

const FooterContent: React.FC<IFooterComponentProps> = ({ place }) => {
  return (
    <>
      <div style={{ width: "100%", overflowX: "hidden" }}>
        <div
          className="footer section-b-space section-t-space"
          style={{ maxWidth: "100%", margin: "0 auto" }}
        >
          <div
            className="container"
            style={{ overflow: "hidden" }}
          >
            <div
              className="row order-row"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                margin: "0 auto",
                width: "100%",
              }}
            >
              <ContactUs />
              <About />
              {place ? <TopPlace /> : <Location />}
              <Links />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterContent;
