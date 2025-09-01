import React from 'react';
import classes from "./SmallLoader.module.css";

const SmallLoader = ({style}) => {
  return (
    <span className={classes.loader} style={style}></span>
  )
}

export default SmallLoader