import React from "react";
import ContactUs from "./contact-us";
import About from "./about";
import Service from "./service";
import Links from "./links";

const FooterContent: React.FC<IFooterComponentProps> = ({ place }) => {
  return (
    <>
      <style jsx>{`
        .footer {
          background-color: #1b1b1b;
          color: black;
          padding: 20px 0;
          border-radius: 10px 10px 0 0;
          font-family: 'Arial', sans-serif;
          max-width: 100%;
          margin: 0 auto;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .row.order-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
        }

        .footer h3 {
          font-size: 18px;
          margin-bottom: 10px;
        }

        .footer p {
          font-size: 14px;
          line-height: 1.5;
        }

        .footer a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer a:hover {
          color: #1E90FF;
        }
      `}</style>

      <div style={{ width: "100%", overflowX: "hidden" }}>
        <div className="footer">
          <div className="container">
            <div className="row order-row">
              <ContactUs />
              <About />
              <Service />
              {/* <Links /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterContent;