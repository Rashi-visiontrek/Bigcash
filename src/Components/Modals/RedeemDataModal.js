import React, { useEffect, useState } from "react";
import classes from "./RedeemDataModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  resetDrawSpin,
  resetModalRedeem,
  setDrawSpin,
} from "../../Slices/redeemModalSlice";
import { redeemPriceApi } from "../../Api/api";
import axios from "axios";
import { toast } from "react-toastify";
import { ResetStore } from "../../Utils/ResetStoreFunction";
import SmallLoader from "../Loaders/SmallLoader";

// MODAL THAT SHOWS THE PRIZE REDEEM UI...
const RedeemDataModal = ({
  modalRedeemFive,
  modalRedeemTen,
  userId,
  gameId,
  serviceId,
  fetchQuestion,
  continuePlayingHandler,
  reduceUserChances,
  navigateToHome,
  playAgainHandler,
}) => {
  const [loading, setLoading] = useState(false);

  // GET THE PRIZE REDEEM DATA FROM THE REDUX PERSISTED STORE...
  const { redeemData } = useSelector(
    (state) => state?.persisted?.redeemModalSlice
  );
  const dispatch = useDispatch();

  // GET THE DRAW SPIN STATE FROM THE REDUX PERSISTED STORE...
  const { drawSpin } = useSelector(
    (state) => state?.persisted?.redeemModalSlice
  );

  // ACCORDING TO DRAW SPIN STATE , WE WILL SHOW INFORMATION , IF IT IS TRUE...
  const [info, setInfo] = useState(() => (drawSpin ? drawSpin : false));

  useEffect(() => {
    setInfo(drawSpin);
  }, [drawSpin]);

  // HIT THE API FOR PRIZE REDEEM 5 IF THE MODAL REDEEM FIVE IS TRUE...
  const spinHandlerFor5QuestionsReward = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 4000);

      // reduceUserChances();
      // const response = await axios.post(
      //   `${redeemPriceApi}userid=${userId}&gameid=${gameId}&coin=${redeemData[5]?.amount}&svc_id=${serviceId}`
      // );
      // console.log(response?.data, "r");
      let wheel = document.querySelector("#wheel");
      let value = Math.ceil(Math.random() * 3600);
      wheel.style.transform = "rotate(" + value + "deg)";
      value += Math.ceil(Math.random() * 36000);
      setTimeout(() => {
        dispatch(setDrawSpin());
      }, 4000);
    } catch (error) {
      toast.error("Something Went Wrong.");
    }
  };

  // HIT THE API FOR PRIZE REDEEM 10 IF THE MODAL REDEEM TEN IS TRUE...
  const spinHandlerFor10QuestionsReward = async () => {
    try {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 4000);

      // reduceUserChances();
      // const response = await axios.post(
      //   `${redeemPriceApi}userid=${userId}&gameid=${gameId}&coin=${redeemData[0]?.amount}&svc_id=${serviceId}`
      // );
      // console.log(response?.data, "r");
      let wheel = document.querySelector("#wheel");
      let value = Math.ceil(Math.random() * 3600);
      wheel.style.transform = "rotate(" + value + "deg)";
      value += Math.ceil(Math.random() * 36000);
      setTimeout(() => {
        dispatch(setDrawSpin());
      }, 4000);
    } catch (error) {
      toast.error("Something Went Wrong.");
    }
  };

  return (
    <div className={classes.redeem_modal}>
      <div className={classes.modal}>
        <div className={`${classes.container} ${info && classes.hide}`}>
          <div
            className={classes.spinBtn}
            onClick={() =>
              modalRedeemFive
                ? spinHandlerFor5QuestionsReward()
                : spinHandlerFor10QuestionsReward()
            }
          >
            Spin
          </div>
          <div
            className={classes.wheel}
            id="wheel"
            onClick={() =>
              modalRedeemFive
                ? spinHandlerFor5QuestionsReward()
                : spinHandlerFor10QuestionsReward()
            }
          >
            {redeemData.map((data, index) => (
              <div
                key={index}
                className={`${classes.wheel_segment} `}
                style={{ "--i": index + 1 }}
              >
                <span
                  className={`${index < 5 && modalRedeemFive && classes.lock}`}
                >
                  {data?.amount}
                </span>
                {index < 5 && modalRedeemFive && (
                  <i className={`fa-solid fa-lock ${classes.icon}`}></i>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className={`${classes.button_container} ${info && classes.hide}`}>
          <button
            className={classes.continue_btn}
            onClick={() => continuePlayingHandler()}
          >
            Continue Playing
          </button>
          {modalRedeemFive ? (
            <p className={classes.info}>
              Continue Playing to Unlock More Prizes...
            </p>
          ) : (
            <p className={classes.info}>Continue Playing...</p>
          )}
        </div>

        {loading ? (
          <SmallLoader style={{width:'36px',height:'36px'}} />
        ) : (
          <div className={`${classes.show_message} ${info && classes.show}`}>
            <div className={classes.message_box}>
              {modalRedeemFive ? (
                <p className={classes.message}>
                  Bravo! You've entered today's draw for '
                  {redeemData[5]?.amount}' prize. Winners would be notified via
                  SMS after the draw. Thank you.
                </p>
              ) : (
                <p className={classes.message}>
                  Bravo! You've entered today's draw for '
                  {redeemData[0]?.amount}' prize. Winners would be notified via
                  SMS after the draw. Thank you.
                </p>
              )}
            </div>
            <div className={classes.buttons_container}>
              <button className={classes.back} onClick={() => navigateToHome()}>
                Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RedeemDataModal;
