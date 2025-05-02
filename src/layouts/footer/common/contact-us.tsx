import { ContactUs } from "@/constant/constant";

const ContactUsComponent: React.FC = () => {
  return (
    <div className="col-xl-2 col-md-3 order-cls" style={{ width:"25%"}}>
      <div className="footer-title mobile-title">
        <h5>{ContactUs}</h5>
      </div>
      <div className="footer-content">
        <div className="contact-detail">
          <div className="footer-logo">
            <a href="/">
              <img src="/assets/images/icon/footer-logo3.png" alt="" className="img-fluid" style={{maxWidth: "65%", borderRadius: "11px"}} />
            </a>
          </div>
          {/* <p>Book your bus tickets effortlessly with MyIconicTrip! Enjoy seamless travel planning, secure payments, and the best deals—all in one place.</p> */}
          <ul className="contact-list">
            {/* <li>
              <i className="fas fa-map-marker-alt"></i> K Narayanapura, Bangalore, India.
            </li> */}
            <li>
              <i className="fas fa-phone-alt"></i> 1234567890
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@gmail.com
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ContactUsComponent;
