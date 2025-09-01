
import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useLayoutEffect } from "react";
import axios from "axios";
import {
  checkUserApi,
  getQuestionApi,
  redeemDataApi,
  reduceUserChanceApi,
  verifyUser,
} from "../Api/api";
import InfoModal from "../Components/Modals/InfoModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import questionSlice, {
  increaseLevel,
  resetLevel,
  setGameOver,
  setQuestion,
} from "../Slices/questionSlice";
import classes from "../Css/GameScreen.module.css";
import { decreaseTimer, resetTimer } from "../Slices/timeSlice";
import { toast } from "react-toastify";
import {
  openModalRedeemFive,
  openModalRedeemTen,
  resetDrawSpin,
  resetModalRedeem,
  setRedeemData,
} from "../Slices/redeemModalSlice";
import RedeemDataModal from "../Components/Modals/RedeemDataModal";
import { ResetStore } from "../Utils/ResetStoreFunction";
import CorrectAnimation from "../StaticAnimations/correctAnimation.json";
import WrongAnimation from "../StaticAnimations/wrongAnimation.json";
import TimeupAnimation from "../StaticAnimations/timeupAnimation.json";
import Lottie from "lottie-react";
import Audio from "../Components/Audio";
import { toggleAudio } from "../Slices/audioSlice";
import LargeLoader from "../Components/Loaders/LargeLoader";
import Layout3 from "../Components/Layout3";

const GameScreen = () => {
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [category, setCategory] = useState("");
  const [infoModal, setInfoModal] = useState({ open: false, text: "" });
  const [auth, setAuth] = useState(null);
  const [timeUp, setTimeUp] = useState(null);
  const [stopTimer, setStopTimer] = useState(1);
  const [userSelectedOption, setUserSelectedOption] = useState(null);
  const [wrong, setWrong] = useState(null);
  const [correct, setCorrect] = useState(null);
  const [wrongSound, setWrongSound] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { audio } = useSelector((state) => state?.persisted?.audioSlice);
  const { modalRedeemFive, modalRedeemTen } = useSelector(
    (state) => state?.persisted?.redeemModalSlice
  );

  const { currentLevel, totalLevels, question, gameOver } = useSelector(
    (state) => state?.persisted?.questionSlice
  );


  console.log(currentLevel,totalLevels,gameOver,'546789uygfchj')
  const { timer } = useSelector((state) => state?.persisted?.timeSlice);

  const closeInfoModal = () => {
    setInfoModal({ open: false, text: "" });
    navigate(`/?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`);
  };

  // useEffect(() => {
  //   if (gameOver && userId && gameId && serviceId) {
      
  //     navigate(`/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${score}`, { replace: true });

  //   }
  // }, [gameOver, userId, gameId, serviceId]);
   useEffect(() => {
    if (gameOver && userId && gameId && serviceId) {
      navigate(`/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${score}`, {
        replace: true,
        state: { fromGame: true }, // ✅ added
      });
    }
  }, [gameOver, userId, gameId, serviceId]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("ani");
    const gid = params.get("gameId");
    const svcId = params.get("serviceId");
    const cat = params.get("category");
    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
    setCategory(cat);
    if (!modalRedeemFive && !modalRedeemTen) {
      checkUser(uid, gid, cat);
    }
  }, [location, modalRedeemFive, modalRedeemTen]);

  useEffect(() => {
    if (auth === 1) {
      fetchQuestion();
    } else {
      setStopTimer(null);
    }
  }, [auth]); 

  useEffect(() => {
    if (timer <= 0) {
      setTimeUp(1);
      dispatch(setGameOver());
      setTimeout(async () => {
        try {
          if(score>0){
          await axios.post(`https://portalbackend.mtnbigcash.com/saveScore`, {
            ani: userId,
            gameId: gameId,
            serviceId: serviceId,
            score: score
          });
          }
   
               navigate(`/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${score}`, {
            replace: true,
            state: { fromGame: true }, // ✅ added
          });

        } catch (error) {
          setInfoModal({ open: true, text: "Failed to save score!" });
        }
      }, 1500);
    }
    if (!modalRedeemFive && !modalRedeemTen) {
      if (stopTimer != 1 || auth != 1) {
        const intervalId = setInterval(() => {
          dispatch(decreaseTimer());
        }, 1000);
        return () => clearInterval(intervalId);
      }
    }
  }, [stopTimer, timer, modalRedeemFive, modalRedeemTen,score]);
  
  const checkUser = async (uid, gid, cat) => {
    // let request = { uid: uid, gid: gid };
    let request = {ani:uid}
    try {
      setLoading(true);
      const response = await axios.post(`${verifyUser}`, request);
      // if (response.data.response === "User Can Play") {
      if (response.data.response == true) {

        setAuth(1);
        setLoading(false);
      } else if (response.data.response === "No More Chances") {
        setInfoModal({ open: true, text: "No More Chances..." });
        setLoading(false);
      } else if (response.data.response === "Your Billing is Pending") {
        setInfoModal({ open: true, text: "Billing is Pending!" });
        setLoading(false);
      } else if (response.data.response === "You are Not Subscribed") {
        setInfoModal({ open: true, text: "You are not Subscribed!" });
        setLoading(false);
      }
    } catch (error) {
      setInfoModal({ open: true, text: "Something Went Wrong!" });
      setLoading(false);
    }
  };

  const fetchQuestion = async () => {
    try {
      setStopTimer(1);
      setLoading(true);
      const response = await axios.get(`${getQuestionApi}`);
      dispatch(setQuestion(response?.data));
      setLoading(false);
      setStopTimer(null);
    } catch (error) {
      setLoading(false);
      setInfoModal({ open: true, text: "Something Went Wrong!" });
    }
  };

const checkAnswer = async (selectedOption, correctAnswer) => {
  if (selectedOption == correctAnswer) {
    setCorrect(1);
    setWrong(null);
    setUserSelectedOption(selectedOption);
    setStopTimer(1);
    
    const newScore = score + 5; // ✅ CHANGED: manually track new score
    setScore(newScore);         // ✅ CHANGED

    dispatch(increaseLevel());  // ✅ Level increases immediately after correct answer

    if (currentLevel + 1 == 10) {
      // ✅ CHANGED: use newScore consistently
      setTimeout(async () => {
        try {
          if(score>0){
          await axios.post(`https://portalbackend.mtnbigcash.com/saveScore`, {
            ani: userId,
            gameId: gameId,
            serviceId: serviceId,
            score: newScore, // ✅ CHANGED
          });
}
          // navigate(
          //   `/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${newScore}`, // ✅ CHANGED
          //   { replace: true }
          // );
             navigate(`/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${newScore}`, {
              replace: true,
              state: { fromGame: true }, // ✅ added
            });
        } catch (error) {
          setInfoModal({ open: true, text: "Failed to save score!" });
        }
      }, 1500);
    } else {
      setTimeout(() => {
        setCorrect(null);
        setWrong(null);
        setUserSelectedOption(null);
        setStopTimer(null);
        fetchQuestion();
        dispatch(resetTimer());
      }, 1500);
    }
  } else {
    setCorrect(null);
    setWrong(1);
    setUserSelectedOption(selectedOption);
    setStopTimer(1);
    setWrongSound(1);
    setTimeout(async () => {
      try {
        if(score>0){
        await axios.post(`https://portalbackend.mtnbigcash.com/saveScore`, {
          ani: userId,
          gameId: gameId,
          serviceId: serviceId,
          score: score
        });}
        // navigate(`/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${score}`);
          navigate(`/score?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}&score=${score}`, {
            replace: true,
            state: { fromGame: true }, // ✅ added
          });
      } catch (error) {
        setInfoModal({ open: true, text: "Failed to save score!" });
      }
    }, 1500);
  }
};

  const continuePlayingHandler = () => {
    if (modalRedeemFive) {
      setCorrect(null);
      setWrong(null);
      setUserSelectedOption(null);
      setStopTimer(null);
      fetchQuestion();
      dispatch(resetModalRedeem());
      dispatch(resetDrawSpin());
      dispatch(resetTimer());
    } else {
      playAgainHandler();
    }
  };

  const navigateToHome = () => {
    ResetStore(dispatch);
    navigate(`/?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`);
  };

  const playAgainHandler = () => {
    ResetStore(dispatch);
    window.location.reload();
  };

  const reduceUserChances = async () => {
    try {
      let request = { uid: userId, gid: gameId };
      setLoading(true);
      await axios.post(`${reduceUserChanceApi}`, request);
      setLoading(false);
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  

  return (
    <>
      <Layout3 loadingFalse={true}>
        {audio && wrongSound != 1 && (
          <Audio audio="/assets/sounds/checkpoints.mp3" type="audio/mp3" />
        )}
        {audio && wrongSound == 1 && (
          <Audio audio="/assets/sounds/outtime.mp3" type="audio/mp3" />
        )}

        <div className={classes.header}>
          <button
            type="button"
            className={classes.back_icon_container}
            // onClick={() =>
            //   navigate(`/?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`)
            // }

            onClick={() => {
  window.location.href = `https://www.bigcashmtnzm.com/homepage`
}}

          >
            <img src="/btn_home.png" alt="soundon" />
          </button>
          {audio ? (
            <button
              type="button"
              className={classes.sound}
              onClick={() => dispatch(toggleAudio())}
            >
              <img src="/btn_soundon.png" alt="soundon" />
            </button>
          ) : (
            <button
              type="button"
              className={classes.sound}
              onClick={() => dispatch(toggleAudio())}
            >
              <img src="/btn_soundoff.png" alt="soundon" />
            </button>
          )}
        </div>

        <br/>
        

        {loading ? (
          <LargeLoader />
        ) : (
          <>
            {question?.question && (
              <>
                <div className={classes.question_info}>
                  <div className={classes.count}>
                    <p>Level: {currentLevel}/{totalLevels}</p>
                  </div>
                  <div className={classes.count}>
                    <p>Time: {timer}</p>
                  </div>
                </div>

                <br/>
                <br/>

                <div className={classes.question_container}>
                  <p className={classes.question}>{question?.question}</p>
                </div>
              </>
            )}

            <br/>
            <br/>
            <br/>
            <br/>
           

            <div className={classes.options_container}>
              {question?.optionA && (
                <button
                  type="button"
                  className={`${
                    userSelectedOption == question?.optionA && correct == 1
                      ? classes.option_correct
                      : userSelectedOption == question?.optionA && wrong == 1
                      ? classes.option_wrong
                      : classes.option
                  }`}
                  onClick={() => checkAnswer(question?.optionA, question?.correct)}
                >
                  A). &nbsp;&nbsp; {question?.optionA}
                </button>
              )}
              {question?.optionB && (
                <button
                  type="button"
                  className={`${
                    userSelectedOption == question?.optionB && correct == 1
                      ? classes.option_correct
                      : userSelectedOption == question?.optionB && wrong == 1
                      ? classes.option_wrong
                      : classes.option
                  }`}
                  onClick={() => checkAnswer(question?.optionB, question?.correct)}
                >
                  B). &nbsp;&nbsp; {question?.optionB}
                </button>
              )}
              {question?.optionC && (
                <button
                  type="button"
                  className={`${
                    userSelectedOption == question?.optionC && correct == 1
                      ? classes.option_correct
                      : userSelectedOption == question?.optionC && wrong == 1
                      ? classes.option_wrong
                      : classes.option
                  }`}
                  onClick={() => checkAnswer(question?.optionC, question?.correct)}
                >
                  C). &nbsp;&nbsp; {question?.optionC}
                </button>
              )}
              {question?.optionD && (
                <button
                  type="button"
                  className={`${
                    userSelectedOption == question?.optionD && correct == 1
                      ? classes.option_correct
                      : userSelectedOption == question?.optionD && wrong == 1
                      ? classes.option_wrong
                      : classes.option
                  }`}
                  onClick={() => checkAnswer(question?.optionD, question?.correct)}
                >
                  D). &nbsp;&nbsp; {question?.optionD}
                </button>
              )}

              {wrong == 1 && (
                <div className={classes.wrong_animation_container}>
                  <Lottie
                    animationData={WrongAnimation}
                    loop={true}
                    autoplay={true}
                    className={classes.wrong_animation}
                  />
                </div>
              )}

              {correct == 1 && (
                <div className={classes.correct_animation_container}>
                  <Lottie
                    animationData={CorrectAnimation}
                    loop={true}
                    autoplay={true}
                    className={classes.correct_animation}
                  />
                </div>
              )}

              {timeUp == 1 && (
                <div className={classes.timeup_animation_container}>
                  <Lottie
                    animationData={TimeupAnimation}
                    loop={true}
                    autoplay={true}
                    className={classes.timeup_animation}
                  />
                </div>
              )}
            </div>
          </>
        )}

        {infoModal?.open && (
          <InfoModal message={infoModal?.text} closeInfoModal={closeInfoModal} />
        )}
        {(modalRedeemFive || modalRedeemTen) && (
          <RedeemDataModal
            modalRedeemFive={modalRedeemFive}
            modalRedeemTen={modalRedeemTen}
            userId={userId}
            gameId={gameId}
            serviceId={serviceId}
            continuePlayingHandler={continuePlayingHandler}
            reduceUserChances={reduceUserChances}
            navigateToHome={navigateToHome}
            playAgainHandler={playAgainHandler}
          />
        )}
      </Layout3>
    </>
  );
};

export default GameScreen;
