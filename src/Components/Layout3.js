
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "../Css/Layout2.module.css";
import Lottie from "lottie-react";


const Layout3 = ({ children, style, loadingFalse }) => {
  const location = useLocation();

  // Routes that should not use game layout
  const noGameLayoutRoutes = ["/terms", "/privacy", "/about"];
  const isGameLayout = !noGameLayoutRoutes.includes(location.pathname);

  const [loading, setLoading] = useState(() => (loadingFalse ? false : true));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 30000); // ⏱️ Corrected setTimeout argument
  }, []);

  // Plain layout for routes like /terms or /privacy
  if (!isGameLayout) {
    return <div style={{   padding: "20px",
        paddingTop: "80px", // Adjust for header height if any
        minHeight: "100vh", 
      
     }}>{children}</div>;
  }

  // Game layout
  return (
    <div className={classes.game_overlay}>
      <div
        className={classes.game_container}
        style={{
          // backgroundImage: "url('/gamescreenbg.png')",
           backgroundImage: "url('/screenbg.jpg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          
          
        }}
      >
        {!loading && (
          <div className={classes.game} style={style}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout3;
