"use client";
import Image from "next/image";
import { useEffect, useState } from "react";


const Loader: React.FC<ILoaderProps> = ({ loaderTimeout }) => {
  const loadingTime = loaderTimeout;
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false);
    }, loadingTime);

    return () => {
      clearTimeout(timeout);
    };
  }, [show]);
  return (
    <div className={`loader-wrapper img-gif ${show ? "" : "loaderhide"}`}>
      <img src={'/assets/images/loader.gif'} alt="Animated GIF" />
    </div>
  );
};

export default Loader;
