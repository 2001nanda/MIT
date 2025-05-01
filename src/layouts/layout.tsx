"use client";
import { ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal, Button, Box ,Menu, MenuItem, IconButton } from "@mui/material";
import Loader from "./loader/page"; 
import LoaderFood from "./loader/loader-food";
import PreLoader from "./loader/skelton/pre-loader";
import GoodLoader from "./loader/loader-good-luck";
import LoaderFlight from "./loader/loader-flight";
import MapLoader from "./loader/skelton/map-loader";
import TapToTop from "./tab-to-top/page";
import FooterMain from "./footer/page";
import Logo from "./header/logo/page";
import Sidebar from "./header/menus/page";
import LoginPage from "./loginorsignin/LoginPage";
import { FaUserCircle } from "react-icons/fa"; // Profile icon
import type { FC } from "react";
interface CustomLayoutProps {
  children: ReactNode;
  title?: string;
  logo?: string;
  footerPlace?: boolean;
  userBgClass?: string;
  footer?: string;
  hideFooter?: boolean;
  footerClass?: string;
  loader?: string;
}

const CustomLayout: React.FC<CustomLayoutProps> = ({
  children,
  title,
  logo,
  footerPlace,
  footer,
  hideFooter,
  loader,
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 500); // Loader timeout
    return () => clearTimeout(timeout);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const makeSearch = () => push("/pages/other-pages/login");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setIsLoggedIn(false); // Log user out
    handleMenuClose();
  };
  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login state
    setOpen(false); // Close modal
  };

  const FaUserCircleIcon: FC<{ size?: number; color?: string }> = FaUserCircle as FC<{ size?: number; color?: string }>;
  
  return (
    <>
      {showLoader ? (
        loader === "food" ? (
          <LoaderFood loaderTimeout={5000} />
        ) : loader === "pre" ? (
          <PreLoader loaderTimeout={5000} side="left" />
        ) : loader === "right" ? (
          <PreLoader loaderTimeout={5000} side="right" />
        ) : loader === "no-sidebar" ? (
          <PreLoader loaderTimeout={5000} side="no" />
        ) : loader === "map-loader" ? (
          <MapLoader loaderTimeout={5000} side="right" />
        ) : loader === "map-left" ? (
          <MapLoader loaderTimeout={5000} side="left" />
        ) : loader === "good" ? (
          <GoodLoader loaderTimeout={5000} />
        ) : loader === "flight" ? (
          <LoaderFlight loaderTimeout={5000} />
        ) : loader === "no" ? (
          <Loader loaderTimeout={1000} />
        ) : (
          <Loader loaderTimeout={50000} />
        )
      ) : (
        <>
          <header
            className={title}
            style={{
              backgroundColor: "rgba(255, 255, 255, 0)", // Transparent background
              backdropFilter: "blur(2px)", // Subtle blur effect
              boxShadow: "0 4px 10px rgba(0, 0, 0, 1)", // Soft shadow
              zIndex: 1000,
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="menu">
                    <Logo logo={logo} />
                    <Sidebar />
                     {/* Show Profile Icon if Logged In, Else Show Login Button */}
                     {isLoggedIn ? (
  <>
    <IconButton onClick={handleMenuOpen}>
      <FaUserCircleIcon size={35} color="#0c618e" />
    </IconButton>

    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => console.log("Go to Profile")}>
        Profile
      </MenuItem>
      <MenuItem onClick={() => console.log("View Booking Details")}>
        Booking Details
      </MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
    </Menu>
  </>
) : (
  <Button
    variant="contained"
    color="primary"
    onClick={handleOpen}
    style={{
      backgroundColor: "#0c618e",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    }}
  >
    <FaUserCircleIcon size={20} />
    Login · SignIn
  </Button>
)}

                  </div>
                </div>
              </div>
            </div>
          </header>

          <Modal open={open} onClose={handleClose}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 500,
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
              }}
            >
              <LoginPage onLoginSuccess={handleLoginSuccess} />
            </Box>
          </Modal>

          {children}

          {!hideFooter && <FooterMain footerType={footer} footerPlaceCom={footerPlace} />}
          <TapToTop />
          {/* <CustomizePage /> */}
        </>
      )}
    </>
  );
};

export default CustomLayout;
