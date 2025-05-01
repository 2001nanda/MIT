import { Back } from "@/constant/constant";
import { Fragment, useState } from "react";
import { FaBus, FaHotel, FaPlane } from "react-icons/fa"; // Importing Icons
import type { FC } from "react";
const Sidebar: React.FC = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const FaBusIcon: FC<{ size?: number }> = FaBus as FC<{ size?: number }>;
const FaHotelIcon: FC<{ size?: number }> = FaHotel as FC<{ size?: number }>;
const FaPlaneIcon: FC<{ size?: number }> = FaPlane as FC<{ size?: number }>;

const MENUITEMS = [
  { name: "Bus", link: "/home/bus", icon: <FaBusIcon size={24} /> },
  { name: "Hotel", link: "/home/hotels/vector", icon: <FaHotelIcon size={24} /> },
  { name: "Flights", link: "/home/flight/minimal", icon: <FaPlaneIcon size={24} /> },
];
  return (
    <nav>
      <div className="main-navbar">
        <div id="main-nav">
          <div className="toggle-nav">
            <i
              className="fa fa-bars sidebar-bar"
              onClick={() => setToggleSideBar(!toggleSideBar)}
            ></i>
          </div>
          <div className={`menu-overlay ${toggleSideBar ? "show" : ""}`}></div>
          <ul className="nav-menu" style={{ right: toggleSideBar ? "0px" : "" }}>
            <li className="back-btn">
              <div className="mobile-back text-end" onClick={() => setToggleSideBar(!toggleSideBar)}>
                <span>{Back}</span>
                <i aria-hidden="true" className="fa fa-angle-right ps-2"></i>
              </div>
            </li>
            {MENUITEMS.map((item, i) => (
              <Fragment key={i}>
                <li className="nav-item">
                  <a href={item.link} className="nav-link">
                    {item.icon} <span className="menu-text">{item.name}</span>
                  </a>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .nav-menu {
          list-style: none;
          padding: 0;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          font-size: 18px;
          font-weight: bold;
          transition: color 0.3s ease-in-out;
        }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
           color:rgb(0, 0, 0) !important; /* Ensure red color applies */
        }
        .nav-link:hover {
          color: #ff9800 !important;
        }
        .menu-text {
          font-size: 18px;
        }
      `}</style>
    </nav>
  );
};

export default Sidebar;
