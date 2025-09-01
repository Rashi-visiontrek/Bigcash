import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useRouteError } from "react-router-dom";
import classes from "./ErrorBoundary.module.css";
import Layout from "./Layout";

const ErrorBoundary = () => {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const navigate = useNavigate();

  // GET THE QUERY PARAMS FROM THE URL AND STORE IN STATE...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("uid");
    const gid = params.get("gid");
    const svcId = params.get("svcId");
    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
  }, [location]);

  const error = useRouteError();

  // NAVIGATE TO HOME PAGE HANDLER
  const navigateToHome = () => {
    if (userId && gameId && serviceId) {
      navigate(`/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className={classes.logo_container}>
        <img
          src="/assets/images/logo5.png"
          alt="Game Win"
          className={classes.logo}
        />
      </div>

      <div className={classes.message_container}>
        <p className={classes.message}>Some Error Occured!</p>
        <p className={classes.message}>{error?.message || "Unknown Error"}</p>
        <button className={classes.back} onClick={() => navigateToHome()}>
          Home
        </button>
      </div>
    </Layout>
  );
};

export default ErrorBoundary;
