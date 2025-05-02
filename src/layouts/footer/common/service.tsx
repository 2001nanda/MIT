import { Service } from "@/constant/constant";
import Link from 'next/link';

const ServiceComponent: React.FC = () => {
  return (
    <div className="col-xl-2 col-md-3" style={{ width:"25%", marginTop: "20px"}}>
      <div className="footer-space">
        <div className="footer-title">
          <h5>{Service}</h5>
        </div>
        <div className="footer-content">
          <div className="footer-links">
            <ul>
              <li>
                <Link href="/pages/other-pages/about-us-1">Bus</Link>
              </li>
              <li>
                <Link href="/pages/other-pages/faq">Hotels</Link>
              </li>
              <li>
                <Link href="/pages/other-pages/login">Flights</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
