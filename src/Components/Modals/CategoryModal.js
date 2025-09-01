import React from 'react';
import classes from "./CategoryModal.module.css";

// MODAL THAT SHOWS THE GAME CATEGORY : CURRENT AFFAIRS , SPORTS 
const CategoryModal = ({closeModal,navigateHandler}) => {  
  return (
    <div className={classes.category_modal}>
    <div className={classes.modal}>
        <button type="button" className={classes.close_btn} onClick={closeModal}>
        <i className={`fa-solid fa-x ${classes.icon}`}></i>
        </button>
      <div className={classes.message_container}>
        <p className={classes.message}>Choose the Game Category!</p>
      </div>
      <div className={classes.buttons_container}>
        <button type="button" className={classes.category_btn} onClick={()=>navigateHandler("Current Affairs")}>Current Affairs</button>
        <button type="button" className={classes.category_btn} onClick={()=>navigateHandler("Sports")}>Sports</button>
     </div>
    </div>
  </div>
  )
}

export default CategoryModal