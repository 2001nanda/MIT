import Link from "next/link";

const Logo: React.FC<ILogoProps> = ({ logo }) => {
  const handleReload = () => {
    window.location.href = "/home/bus"; // Forces a full page reload
  };

  return (
    <>
      {logo === "dark" ? (
        <div className="brand-logo1">
          <Link href="/home/bus" onClick={(e) => e.preventDefault()}>
            <img
              src="/assets/images/icon/footer-logo.png"
              alt="logo-dark"
              className="img-fluid"
              style={{ width: "160px", height: "auto" }}
              onClick={handleReload}
            />
          </Link>
        </div>
      ) : (
        <div className="brand-logo1">
          <Link href="/home/bus" onClick={(e) => e.preventDefault()}>
            <img
              src="/assets/images/icon/footer-logo.png"
              alt="logo-clasic"
              className="img-fluid ed"
              style={{ width: "160px", height: "auto" }}
              onClick={handleReload}
            />
          </Link>
        </div>
      )}
    </>
  );
};

export default Logo;
