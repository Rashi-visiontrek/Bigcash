import React from "react";
import classes from "./LargeLoader.module.css";

const LargeLoader = ({ style }) => {
  return (
    <div className={classes.container} style={style}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default LargeLoader;
