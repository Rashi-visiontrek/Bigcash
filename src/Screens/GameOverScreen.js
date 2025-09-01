// import React, { useEffect, useState } from "react";
// import Layout from "../Components/Layout";
// import classes from "../Css/GameOverScreen.module.css";
// import Lottie from "lottie-react";
// import GameOverAnimation from "../StaticAnimations/gameOver.json";
// import { useLocation, useNavigate } from "react-router-dom";
// import { ResetStore } from "../Utils/ResetStoreFunction";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { checkUserApi } from "../Api/api";
// import { toast } from "react-toastify";
// import InfoModal from "../Components/Modals/InfoModal";
// import CategoryModal from "../Components/Modals/CategoryModal";
// import SmallLoader from "../Components/Loaders/SmallLoader";
// import Audio from "../Components/Audio";

// const GameOverScreen = () => {
//   const location = useLocation();
//   const [userId, setUserId] = useState("");
//   const [gameId, setGameId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [serviceId, setServiceId] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [modal, setModal] = useState(false);
//   const [infoModal, setInfoModal] = useState({
//     open: false,
//     text: "",
//   });

//   // GET THE AUDIO STATE FROM THE REDUX PERSISTED STORE...
//   const { audio } = useSelector((state) => state?.persisted?.audioSlice);

//   // CLOSE THE INFO MODAL THAT SHOWS SOME INFO TEXT...
//   const closeInfoModal = () => {
//     setInfoModal({ open: false, text: "" });
//   };

//   // GET THE QUERY PARAMS FROM THE URL AND SET THE STATE...
//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const uid = params.get("uid");
//     const gid = params.get("gid");
//     const svcId = params.get("svcId");
//     setUserId(uid);
//     setGameId(gid);
//     setServiceId(svcId);
//   }, [location]);

//   // NAVIGATE TO HOME PAGE HANDLER , FIRST CLEARING THE GAME STATE...
//   const navigateToHome = (path) => {
//     ResetStore(dispatch);
//     navigate(path);
//   };

//   // HANDLE PLAY BUTTON CLICK
//   const handlePlayButton = async () => {

//     // IF THERE IS NO USER AND GAME ID'S , THAN SHOW INFO MODAL WITH TEXT 'NOT SUBSCRIBED...'
//     if (!userId || !gameId) {
//       setLoading(true);
//       setTimeout(() => {
//         setLoading(false);
//         setInfoModal({ open: true, text: "Not Subscribed!" });
//       }, 500);
//       return;
//     }

//     // ELSE HIT THE API AND CHECK IF USER CAN PLAY OR NOT...
//     try {
//       setLoading(true);
//       let data = { uid: userId, gid: gameId };
//       const response = await axios.post(checkUserApi, data);
//       if (response.data.response === "User Can Play") {
//         // IF USER CAN PLAY , THAN SHOW THE MODAL , THAT SHOWS GAME CATEGORIES THAT A USER CAN SELECT AND PLAY...
//         setModal(true);
//       } 
//       // ELSE SHOW INFO MODAL WITH DIFFERENT INFO TEXT....
//       else if (response.data.response === "No More Chances") {
//         setInfoModal({ open: true, text: "No More Chances!" });
//       } else if (response.data.response === "Your Billing is Pending") {
//         setInfoModal({ open: true, text: "Billing is Pending!" });
//       } else if (response.data.response === "You are Not Subscribed") {
//         setInfoModal({ open: true, text: "You are not Subscribed!" });
//       } else {
//         setInfoModal({ open: true, text: "Something went wrong!" });
//       }
//       setLoading(false);
//     } catch (error) {
//       toast.error(
//         error?.response?.data?.message ||
//           error?.data?.message ||
//           error?.message ||
//           error
//       );
//       setLoading(false);
//     }
//   };

//   // GAME CATEGORY MODAL CLOSE HANDLER
//   const closeModal = () => {
//     setModal(false);
//   };

//   // NAVIGATE TO GAME HANDLER , WITH FIRST CLEARING THE GAME STATE...
//   const navigateHandler = (category) => {
//     ResetStore(dispatch);
//     navigate(
//       `/game?category=${category}&uid=${userId}&gid=${gameId}&svcId=${serviceId}`
//     );
//   };

//   return (
//     <Layout style={{ paddingTop: "20dvh" }} loadingFalse={true}>
//       {audio && <Audio audio="/assets/sounds/startgame.mp3" type="audio/mp3" />}
//       <div className={classes.container}>
//         <div className={classes.game_over}>
//           <Lottie
//             animationData={GameOverAnimation}
//             loop
//             autoPlay
//             className={classes.game_over_animation}
//           />
//         </div>

//         <div className={classes.buttons_container}>
//           <button className={classes.play_again}>
//           {/* //  onClick={handlePlayButton} */}
//            Wrong Answer
//             {loading && <SmallLoader />}
//           </button>

//         </div>
//       </div>

//       {modal && (
//         <CategoryModal
//           closeModal={closeModal}
//           navigateHandler={navigateHandler}
//         />
//       )}
//       {infoModal?.open && (
//         <InfoModal message={infoModal?.text} closeInfoModal={closeInfoModal} />
//       )}
//     </Layout>
//   );
// };

// export default GameOverScreen;

import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import classes from "../Css/GameOverScreen.module.css";
import Lottie from "lottie-react";
import GameOverAnimation from "../StaticAnimations/gameOver.json";
import { useLocation, useNavigate } from "react-router-dom";
import { ResetStore } from "../Utils/ResetStoreFunction";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { checkUserApi } from "../Api/api";
import { toast } from "react-toastify";
import InfoModal from "../Components/Modals/InfoModal";
import CategoryModal from "../Components/Modals/CategoryModal";
import SmallLoader from "../Components/Loaders/SmallLoader";
import Audio from "../Components/Audio";

const GameOverScreen = () => {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState({ open: false, text: "" });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { audio } = useSelector((state) => state?.persisted?.audioSlice);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("uid");
    const gid = params.get("gid");
    const svcId = params.get("svcId");
    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
  }, [location]);

  // Auto navigate to ScoreScreen after 20 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/score', {
        state: { uid: userId, gid: gameId, svcId: serviceId }
      });
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, [navigate, userId, gameId, serviceId]);

  const closeInfoModal = () => {
    setInfoModal({ open: false, text: "" });
  };

  const handlePlayButton = async () => {
    if (!userId || !gameId) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setInfoModal({ open: true, text: "Not Subscribed!" });
      }, 500);
      return;
    }

    try {
      setLoading(true);
      let data = { uid: userId, gid: gameId };
      const response = await axios.post(checkUserApi, data);
      if (response.data.response === "User Can Play") {
        setModal(true);
      } else if (response.data.response === "No More Chances") {
        setInfoModal({ open: true, text: "No More Chances!" });
      } else if (response.data.response === "Your Billing is Pending") {
        setInfoModal({ open: true, text: "Billing is Pending!" });
      } else if (response.data.response === "You are Not Subscribed") {
        setInfoModal({ open: true, text: "You are not Subscribed!" });
      } else {
        setInfoModal({ open: true, text: "Something went wrong!" });
      }
      setLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.data?.message || error?.message || error
      );
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const navigateHandler = (category) => {
    ResetStore(dispatch);
    navigate(
      `/game?category=${category}&uid=${userId}&gid=${gameId}&svcId=${serviceId}`
    );
  };

  return (
    <Layout style={{ paddingTop: "20dvh" }} loadingFalse={true}>
      {audio && <Audio audio="/assets/sounds/startgame.mp3" type="audio/mp3" />}
      <div className={classes.container}>
        <div className={classes.game_over}>
          <Lottie
            animationData={GameOverAnimation}
            loop
            autoPlay
            className={classes.game_over_animation}
          />
        </div>

        <div className={classes.buttons_container}>
          <button className={classes.play_again}>
            Wrong Answer
            {loading && <SmallLoader />}
          </button>
        </div>
      </div>

      {modal && (
        <CategoryModal
          closeModal={closeModal}
          navigateHandler={navigateHandler}
        />
      )}
      {infoModal?.open && (
        <InfoModal message={infoModal?.text} closeInfoModal={closeInfoModal} />
      )}
    </Layout>
  );
};

export default GameOverScreen;
