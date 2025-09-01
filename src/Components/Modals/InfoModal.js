import React from "react";
import classes from "./InfoModal.module.css";
import { IoMdClose } from "react-icons/io";


// MODAL THAT SHOWS THE INFO MESSAGE
const InfoModal = ({ message , closeInfoModal}) => {
  return (
    <div className={classes.info_modal}>
      <div className={classes.modal}>
        <button
          type="button"
          className={classes.close_btn}
          onClick={closeInfoModal}
        >
          <IoMdClose color="white" size={20}/>

          {/* <i className={`fa-solid fa-x ${classes.icon}`}></i> */}
        </button>
        <div className={classes.message_container}>
          <p className={classes.message}>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
