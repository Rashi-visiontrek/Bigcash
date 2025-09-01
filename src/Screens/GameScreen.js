// import React, { useEffect, useState } from "react";
// import Layout from "../Components/Layout";
// import axios from "axios";
// import {
//   checkUserApi,
//   getQuestionApi,
//   redeemDataApi,
//   reduceUserChanceApi,
// } from "../Api/api";
// import InfoModal from "../Components/Modals/InfoModal";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   increaseQuestionCount,
//   resetQuestionCount,
//   setGameOver,
//   setQuestion,
// } from "../Slices/questionSlice";
// import classes from "../Css/GameScreen.module.css";
// import { decreaseTimer, resetTimer } from "../Slices/timeSlice";
// import { toast } from "react-toastify";
// import {
//   openModalRedeemFive,
//   openModalRedeemTen,
//   resetDrawSpin,
//   resetModalRedeem,
//   setRedeemData,
// } from "../Slices/redeemModalSlice";
// import RedeemDataModal from "../Components/Modals/RedeemDataModal";
// import { ResetStore } from "../Utils/ResetStoreFunction";
// import CorrectAnimation from "../StaticAnimations/correctAnimation.json";
// import WrongAnimation from "../StaticAnimations/wrongAnimation.json";
// import TimeupAnimation from "../StaticAnimations/timeupAnimation.json";
// import Lottie from "lottie-react";
// import Audio from "../Components/Audio";
// import { toggleAudio } from "../Slices/audioSlice";
// import LargeLoader from "../Components/Loaders/LargeLoader";
// import RedeemDataModal2 from "../Components/Modals/RedeemDataModal2";
// import Layout2 from "../Components/Layout2";

// const GameScreen = () => {
//   const [userId, setUserId] = useState("");
//   const [gameId, setGameId] = useState("");
//   const [serviceId, setServiceId] = useState("");
//   const [category, setCategory] = useState("");
//   const [infoModal, setInfoModal] = useState({ open: false, text: "" });
//   const [auth, setAuth] = useState(null);
//   const [timeUp, setTimeUp] = useState(null);
//   const [stopTimer, setStopTimer] = useState(1);
//   const [userSelectedOption, setUserSelectedOption] = useState(null);
//   const [wrong, setWrong] = useState(null);
//   const [correct, setCorrect] = useState(null);
//   const [wrongSound, setWrongSound] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // GET THE AUDIO STATE FROM THE REDUX PERSISTED STORE...
//   const { audio } = useSelector((state) => state?.persisted?.audioSlice);

//   // GET THE STATE OF REDEEM MODAL FOR FIVE , TEN AND WHICH WILL BE USED TO SHOW THE REDEEMDATAMODAL...
//   const { modalRedeemFive, modalRedeemTen } = useSelector(
//     (state) => state?.persisted?.redeemModalSlice
//   );

//   // GET THE QUESTION COUNT , QUESTION AND GAME OVER STATES FROM REDUX PERSISTED STORE...
//   const { questionCount, question, gameOver } = useSelector(
//     (state) => state?.persisted?.questionSlice
//   );

//   // GET THE TIMER STATE FROM THE REDUX PERSISTED STORE...
//   const { timer } = useSelector((state) => state?.persisted?.timeSlice);
//   // const timer =9

//   // CLOSE THE INFO MODAL THAT SHOWS SOME INFO TEXT AND ALSO NAVIGATE BACK TO HOME PAGE...
//   const closeInfoModal = () => {
//     setInfoModal({ open: false, text: "" });
//     navigate(`/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
//   };

//   // CHECK IF THE GAME IS OVER , THAN NAVIGATE TO GAME OVER PAGE ....
//   useEffect(() => {
//     if (gameOver && userId && gameId && serviceId) {
//       navigate(`/game/over/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
//     }
//   }, [gameOver, userId, gameId, serviceId]);

//   // GET THE QUERY PARAMS FROM THE URL AND SET THE STATES AND ALSO CHECK IF USER CAN PLAY THE GAME OR NOT...
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const uid = params.get("uid");
//     const gid = params.get("gid");
//     const svcId = params.get("svcId");
//     const cat = params.get("category");
//     setUserId(uid);
//     setGameId(gid);
//     setServiceId(svcId);
//     setCategory(cat);
//     // only hit the api if the redemm modals are falsy ..
//     if (!modalRedeemFive && !modalRedeemTen) {
//       checkUser(uid, gid, cat);
//     }
//   }, [location, modalRedeemFive, modalRedeemTen]);

//   useEffect(() => {
//     // IF THERE IS NOT QUESTION AND AUTH IS 1 ,i.e USER IS AUTHENTICATED, THAN FETCH THE QUESTION
//     if (!question && auth === 1) {
//       fetchQuestion();
//     }
//     // ELSE DO NOT STOP THE TIMER...
//     else {
//       setStopTimer(null);
//     }
//   }, [question, auth]);

//   useEffect(() => {
//     // IF THE TIMER IS LESS THAN 0 OR 0 THAN SET THE GAME OVER TO TRUE...
//     if (timer <= 0) {
//       setTimeUp(1);
//       // await reduceUserChances();
//       dispatch(setGameOver());
//     }
//     // IF THE REDEEM MODAL FOR FIVE AND TEN IS NOT OPEN
//     if (!modalRedeemFive && !modalRedeemTen) {
//       // AND IF THE STOP TIMER IS NOT 1 OR AUTH IS NOT 1 , THAN DECREASE THE TIMER....
//       if (stopTimer != 1 || auth != 1) {
//         const intervalId = setInterval(() => {
//           dispatch(decreaseTimer());
//         }, 1000);

//         return () => clearInterval(intervalId);
//       }
//     }
//   }, [stopTimer, timer, modalRedeemFive, modalRedeemTen]);

//   // CHECK USER IF HE/SHE CAN PLAY THE GAME OR NOT...
//   const checkUser = async (uid, gid, cat) => {
//     let request = { uid: uid, gid: gid };
//     try {
//       setLoading(true);
//       const response = await axios.post(`${checkUserApi}`, request);
//       if (response.data.response === "User Can Play") {
//         // IF USER CAN PLAY THAN SET AUTH STATE TO 1 ...
//         setAuth(1);
//         setLoading(false);
//       }
//       // ELSE SHOW INFO MODAL WITH DIFFERENT INFO TEXT...
//       else if (response.data.response === "No More Chances") {
//         setInfoModal({ open: true, text: "No More Chances..." });
//         setLoading(false);
//       } else if (response.data.response === "Your Billing is Pending") {
//         setInfoModal({ open: true, text: "Billing is Pending!" });
//         setLoading(false);
//       } else if (response.data.response === "You are Not Subscribed") {
//         setInfoModal({ open: true, text: "You are not Subscribed!" });
//         setLoading(false);
//       }
//     } catch (error) {
//       setInfoModal({ open: true, text: "Something Went Wrong!" });
//       setLoading(false);
//     }
//   };

//   // FETCH THE QUESTION FROM BACKEND ....
//   const fetchQuestion = async (uid, cat) => {
//     let request = { uid: uid ? uid : userId, category: cat ? cat : category };
//     try {
//       // STOP THE TIMER WHILE FETCHING THE QUESTION AND SET LOADING STATE TO TRUE
//       setStopTimer(1);
//       setLoading(true);
//       // HIT THE API TO FETCH THE QUESTION...
//       const response = await axios.post(`${getQuestionApi}`, request);
//       // SET THE QUESTION AND INCREASE THE QUESTION COUNT...
//       dispatch(setQuestion(response?.data?.response));
//       dispatch(increaseQuestionCount());
//       // SET LOADING STATE TO FALSY AND STOP TIMER TO NULL, TO MAKE THE TIMER RUN AGAIN ...
//       setLoading(false);
//       setStopTimer(null);
//     } catch (error) {
//       setLoading(false);
//       setInfoModal({ open: true, text: "Something Went Wrong!" });
//     }
//   };

//   // CHECK ANSWER HANDLER....
//   const checkAnswer = async (selectedOption, correctAnswer) => {
//     // IF THE ANSWER IS CORRECT...
//     if (selectedOption == correctAnswer) {
//       // SET THE CORRECT STATE , USER SELECTED OPTION AND STOP TIMER TO 1.
//       setCorrect(1);
//       setWrong(null);
//       setUserSelectedOption(selectedOption);
//       setStopTimer(1);

//       // IF THE USER ANSERED THE QUESTION NUMBER : 5 OR 10 ...
//       if (questionCount === 5 || questionCount === 10) {
//         try {
//           setLoading(true);
//           let requestData = { uid: userId };
//           // HIT THE API TO GET THE REDEEM PRIZES ....
//           const response = await axios.post(`${redeemDataApi}`, requestData);
//           dispatch(setRedeemData(response?.data?.response));
//           setLoading(false);
//           // IF THE QUESTION NUMBER IS 5 THAN OPEN THE REDEEM MODAL BY SETTING THE STATE FOR REDEEM MODAL FIVE TO TRUE...
//           if (questionCount === 5) {
//             dispatch(openModalRedeemFive());
//           }
//           // ELSE IF THE QUESTION NUMBER IS 10 THAN OPEN THE REDEEM MODAL BY SETTING THE STATE FOR REDEEM MODAL TEN TO TRUE...
//           else if (questionCount === 10) {
//             dispatch(openModalRedeemTen());
//           }
//         } catch (error) {
//           setLoading(false);
//           setInfoModal({ open: true, text: "Something Went Wrong..." });
//         }
//       } else {
//         // ELSE IF THE QUESTION NUMBER IS NOT 5 OR 10 THAN SIMPLY RESET THE STATES AFTER SOME TIME...
//         setTimeout(() => {
//           setCorrect(null);
//           setWrong(null);
//           setUserSelectedOption(null);
//           setStopTimer(null);
//           fetchQuestion();
//           dispatch(resetTimer());
//         }, 1500);
//       }
//     }

//     // ELSE IF THE USER ANSWER IS WRONG , THAN REDUCE THE CHANCE OF THE USER BY HITTING THE API AND RESET THE STATES AND NAVIGATE TO THE GAME OVER PAGE...
//     else {
//       setCorrect(null);
//       setWrong(1);
//       setUserSelectedOption(selectedOption);
//       setStopTimer(1);
//       setWrongSound(1);
//       setTimeout(() => {
//         setCorrect(null);
//         setWrong(null);
//         setUserSelectedOption(null);
//         setStopTimer(null);
//         dispatch(resetTimer());
//         setWrongSound(null);
//         dispatch(resetModalRedeem());
//         dispatch(resetDrawSpin());
//         dispatch(resetQuestionCount());
//         // hit api to reduce chance and navigate to game over page....
//         // reduceUserChances();
//         dispatch(setGameOver());
//       }, 1500);
//     }
//   };

//   // CONTINUE PLAYING HANDLER FOR REDEEM MODAL....
//   const continuePlayingHandler = () => {
//     // IF THE MODAL REDEEM FIVEIS TRUE , THAN CLOSE THE MODAL AND CONTINUE THE GAME , FETCH THE QUESTION NUMBER AND THE GAME CONTINUES WITH QUESTION NUMBER : 6 ...
//     if (modalRedeemFive) {
//       setCorrect(null);
//       setWrong(null);
//       setUserSelectedOption(null);
//       setStopTimer(null);
//       fetchQuestion();
//       dispatch(resetModalRedeem());
//       dispatch(resetDrawSpin());
//       dispatch(resetTimer());
//     }
//     // ELSE PLAY AGAIN HANDLER...
//     else {
//       playAgainHandler();
//     }
//   };

//   const navigateToHome = () => {
//     ResetStore(dispatch);
//     navigate(`/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
//   };

//   // RESET THE GAME STATE AND RELOAD THE WINDOW , THE GAME WILL START FROM QUESTION NUMBER : 1 ....
//   const playAgainHandler = () => {
//     ResetStore(dispatch);
//     window.location.reload();
//   };

//   // REDUCE THE USER CHANCE WHEN THE USER ANSWER IS WRONG , OR WHEN THE USER REDEEM THE PRIZE...
//   const reduceUserChances = async () => {
//     try {
//       let request = { uid: userId, gid: gameId };
//       setLoading(true);
//       const response = await axios.post(`${reduceUserChanceApi}`, request);
//       // console.log(response, "response reduce user chance....");
//       setLoading(false);
//     } catch (error) {
//       toast.error("Something Went Wrong");
//     }
//   };
//   return (
//     <>
//     <Layout2 style={{ paddingTop: "30px" }} loadingFalse={true}
  
//      >
//   {audio && wrongSound != 1 && (
//     <Audio audio="/assets/sounds/checkpoints.mp3" type="audio/mp3" />
//   )}
//   {audio && wrongSound == 1 && (
//     <Audio audio="/assets/sounds/outtime.mp3" type="audio/mp3" />
//   )}

//   <div className={classes.header}>
//     <button
//       type="button"
//       className={classes.back_icon_container}
//       onClick={() =>
//         navigate(`/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`)
//       }
//     >
//             <img
//       src="/btn_home.png"
//       alt="soundon"
//     />
//     </button>
//     {audio ? (
//       <button
//         type="button"
//         className={classes.sound}
//         onClick={() => dispatch(toggleAudio())}
//       >
//               <img
//       src="/btn_soundon.png"
//       alt="soundon"
//     />
//       </button>
//     ) : (
//       <button
//         type="button"
//         className={classes.sound}
//         onClick={() => dispatch(toggleAudio())}
//       >
//                 <img
//       src="/btn_soundoff.png"
//       alt="soundon"
//     />
//       </button>
//     )}
//   </div>
//   {loading ? (
//     <LargeLoader />
//   ) : (
//     <>
//       {question?.question && (
//         <>
//           <div className={classes.question_info}>
//             <div className={classes.count}>
//               <p>Question: {questionCount}</p>
//             </div>
//             <div className={classes.count}>
//               <p>Time: {timer}</p>
//             </div>
//           </div>

//           <div className={classes.question_container}>
//             <p className={classes.question}>{question?.question}</p>
//           </div>
//         </>
//       )}

//       <div className={classes.options_container}>
//         {question?.optionA && (
//           <button
//             type="button"
//             className={`${
//               userSelectedOption == question?.optionA && correct == 1
//                 ? classes.option_correct
//                 : userSelectedOption == question?.optionA && wrong == 1
//                 ? classes.option_wrong
//                 : classes.option
//             }`}
//             onClick={() => checkAnswer(question?.optionA, question?.correct)}
//           >
//             A). &nbsp;&nbsp; {question?.optionA}
//           </button>
//         )}

//         {question?.optionB && (
//           <button
//             type="button"
//             className={`${
//               userSelectedOption == question?.optionB && correct == 1
//                 ? classes.option_correct
//                 : userSelectedOption == question?.optionB && wrong == 1
//                 ? classes.option_wrong
//                 : classes.option
//             }`}
//             onClick={() => checkAnswer(question?.optionB, question?.correct)}
//           >
//             B). &nbsp;&nbsp; {question?.optionB}
//           </button>
//         )}

//         {question?.optionC && (
//           <button
//             type="button"
//             className={`${
//               userSelectedOption == question?.optionC && correct == 1
//                 ? classes.option_correct
//                 : userSelectedOption == question?.optionC && wrong == 1
//                 ? classes.option_wrong
//                 : classes.option
//             }`}
//             onClick={() => checkAnswer(question?.optionC, question?.correct)}
//           >
//             C). &nbsp;&nbsp; {question?.optionC}
//           </button>
//         )}

//         {question?.optionD && (
//           <button
//             type="button"
//             className={`${
//               userSelectedOption == question?.optionD && correct == 1
//                 ? classes.option_correct
//                 : userSelectedOption == question?.optionD && wrong == 1
//                 ? classes.option_wrong
//                 : classes.option
//             }`}
//             onClick={() => checkAnswer(question?.optionD, question?.correct)}
//           >
//             D). &nbsp;&nbsp; {question?.optionD}
//           </button>
//         )}

//         {wrong == 1 && (
//           <div className={classes.wrong_animation_container}>
//             <Lottie
//               animationData={WrongAnimation}
//               loop={true}
//               autoplay={true}
//               className={classes.wrong_animation}
//             />
//           </div>
//         )}

//         {correct == 1 && (
//           <div className={classes.correct_animation_container}>
//             <Lottie
//               animationData={CorrectAnimation}
//               loop={true}
//               autoplay={true}
//               className={classes.correct_animation}
//             />
//           </div>
//         )}

//         {timeUp == 1 && (
//           <div className={classes.timeup_animation_container}>
//             <Lottie
//               animationData={TimeupAnimation}
//               loop={true}
//               autoplay={true}
//               className={classes.timeup_animation}
//             />
//           </div>
//         )}
//       </div>
//     </>
//   )}

//   {infoModal?.open && (
//     <InfoModal message={infoModal?.text} closeInfoModal={closeInfoModal} />
//   )}
//   {(modalRedeemFive || modalRedeemTen) && (
//     <RedeemDataModal
//       modalRedeemFive={modalRedeemFive}
//       modalRedeemTen={modalRedeemTen}
//       userId={userId}
//       gameId={gameId}
//       serviceId={serviceId}
//       continuePlayingHandler={continuePlayingHandler}
//       reduceUserChances={reduceUserChances}
//       navigateToHome={navigateToHome}
//       playAgainHandler={playAgainHandler}
//     />
//   )}
// {/* </div> */}
// </Layout2>
//     </>
//   );
// };

// export default GameScreen;
