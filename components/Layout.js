import { ADDRESS_ZERO } from "@/utils";
import React, { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";

export const Layout = ({ children }) => {
  const connector = new MetaMaskConnector();
  const { connect } = useConnect();

  const [viewportWidth, setViewportWidth] = useState(null);

  useEffect(() => {
    setViewportWidth(window.innerWidth);
    function handleResize() {
      setViewportWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let connected = localStorage.getItem("connected");
    console.log("CNCTD", connected);
    if (connected != ADDRESS_ZERO) connect({ connector });
  }, []);

  const isMobile = viewportWidth !== null && viewportWidth <= 1300;

  return (
    <div>
      {isMobile ? (
        <div className="smallScreen">
          <p>Small screen devices are not supported.</p>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
