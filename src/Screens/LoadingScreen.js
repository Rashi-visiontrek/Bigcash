import React from "react";
import LargeLoader from "../Components/Loaders/LargeLoader";
import classes from "../Css/LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <>
      <div className={classes.loading}>
        <LargeLoader style={{minHeight:"unset"}} />
        {/* <p className={classes.text}>Loading...</p> */}
      </div>
    </>
  );
};

export default LoadingScreen;
