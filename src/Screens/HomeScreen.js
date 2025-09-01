import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import classes from "../Css/HomeScreen.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { checkUserApi, verifyUser } from "../Api/api";
import SmallLoader from "../Components/Loaders/SmallLoader";
import CategoryModal from "../Components/Modals/CategoryModal";
import InfoModal from "../Components/Modals/InfoModal";
import { useDispatch, useSelector } from "react-redux";
import { ResetStore } from "../Utils/ResetStoreFunction";
import Audio from "../Components/Audio";
import { toggleAudio } from "../Slices/audioSlice";

const HomeScreen = () => {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  console.log(userId,"==userid==")
  const [gameId, setGameId] = useState("");
  console.log(gameId,"==ga,eid===")
  const [serviceId, setServiceId] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [infoModal, setInfoModal] = useState({
    open: false,
    text: "",
  });

  // AUDIO STATE FROM THE REDUX PERSISTED STORE 
  const { audio } = useSelector((state) => state?.persisted?.audioSlice);

  // CLOSE THE INFO MODAL THAT SHOWS THE INFO TEXT...
  const closeInfoModal = () => {
    setInfoModal({ open: false, text: "" });
  };

  // GET THE QUERY PARAMS FROM THE URL AND STORE IN STATE...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("ani");
    const gid = params.get("gameId");
    const svcId = params.get("serviceId");
    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
  }, [location]);

  // CLOSE THE MODAL THAT SHOWS THE CATEGORIES OF THE GAME...
  const closeModal = () => {
    setModal(false);
  };

  // WHEN USER CLICKS ON PLAY BUTTON , THIS FUNCTION IS CALLED...
  const handlePlayButton = async () => {

    // CHECK FIRST THE USER AND GAME ID'S NOT EXIST , THAN SHOW INFO MODAL WITH TEXT 'NOT SUBSCRIBED!' 
    if (!userId || !gameId) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setInfoModal({ open: true, text: "Not Subscribed!" });
      }, 500);
      return;
    }

    // IF THE USER AND GAME ID EXIST THAN HIT THE CHECKUSERAPI...
    try {
      setLoading(true);
      // let data = { uid: userId, gid: gameId };
      let data = {ani:userId}
      console.log(data,"===data==")
      const response = await axios.post(verifyUser, data);
      console.log(response,'--res---')
      if (response.data.response === true) {
              ResetStore(dispatch);
      const category = "Sports";
      setTimeout(() => {
        setLoading(false);
        navigate(`/game2?category=${category}&ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`);
      }, 500);
        // SET MODAL STATE TO TRUE AND THIS MODAL WILL SHOW THE CATEGORIES OF THE GAME : SPORTS AND CURRENT AFFAIRS...
        // setModal(true);

      } 

      // ELSE SHOW INFO MODAL WITH DIFFERENT TEXT....  
      
      else if (response.data.response === "No More Chances") {
        setInfoModal({ open: true, text: "No More Chances!" });
      } else if (response.data.response === "Your Billing is Pending") {
        setInfoModal({ open: true, text: "Billing is Pending!" });
      } else if (response.data.response === "You are Not Subscribed" || response.data.response==false) {
        setInfoModal({ open: true, text: "You are not Subscribed!" });
      } else {
   
        setInfoModal({ open: true, text: "Something went wrong!" });
        // setInfoModal({ open: true, text: `Something went wrong! (${res})` });

      }
      setLoading(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
      setLoading(false);
    }
  };

  // NAVIGATE TO GAME WITH FIRST RESETTING THE STATE OF THE GAME...
  // const navigateHandler = (category) => {
  //   ResetStore(dispatch);
  //   navigate(
  //     `/game2?category=${category}&uid=${userId}&gid=${gameId}&svcId=${serviceId}`
  //   );
  // };

  // NAVIGATE TO WHATSAPP , MOBILE NUMBER CHAT...
  const handleWhatsapp = () => {
    window.location.href = "https://wa.me/+2349160000453";
  };

  // NAVIGATE TO FAQ PAGE...
  const handleFaq = () => {
    if (!userId || !gameId) {
      navigate("/faq");
    } else {
      navigate(`/faq?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`);
    }
  };

  // NAVIGATE TO TERMS PAGE...
  const handleTerms = () => {
    if (!userId || !gameId) {
      navigate("/terms");
    } else {
      navigate(`/terms?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`);
    }
  };

  const handlePlayAgain = () => {
      if (!userId || !gameId) {
        alert("User or Game ID missing");
        return;
      }
  
      setLoading(true);
      ResetStore(dispatch);
      const category = "Sports"; 
  
      setTimeout(() => {
        setLoading(false);
        navigate(`/game2?category=${category}&ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`);
      }, 500);
    };
    
    useEffect(() => {
  const preventBack = () => {
    console.log("Back button blocked — HomeScreen remains");
    window.history.pushState(null, "", window.location.href);
  };

  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", preventBack);

  return () => {
    window.removeEventListener("popstate", preventBack);
  };
}, []);


  return (
    <Layout loadingFalse={true}>
      {audio && <Audio audio="/assets/sounds/startgame.mp3" type="audio/mp3" />}

      <button
  type="button"
    onClick={handlePlayButton}
  className={`${classes.play_button} ${loading && classes.disable_btn}`}
  style={{
    background: "none",
    border: "none",
    padding: 0,
    cursor: "pointer",
  }}
>
  {loading ? (
    <SmallLoader />
  ) : (
    <img
      src="/btn_play.png"
      alt="Play"
      style={{ width: "150px", height: "150px" }} // you can adjust size
    />
  )}
</button>


      <div className={classes.footer}>
       
        {audio ? (
          <button
            type="button"
            className={classes.sound}
            onClick={() => dispatch(toggleAudio())}
          >
           <img
      src="/btn_soundon.png"
      alt="soundon"
      // style={{ width: "150px", height: "150px" }} // you can adjust size
    />
          </button>
        ) : (
          <button
            type="button"
            className={classes.sound}
            onClick={() => dispatch(toggleAudio())}
          >
              <img
      src="/btn_soundoff.png"
      alt="soundon"
    
    />
          </button>
        )}
      </div> 

      {/* {modal && (
        <CategoryModal
          closeModal={closeModal}
          // navigateHandler={navigateHandler}
        />
      )}*/}
      {infoModal?.open && (
        <InfoModal message={infoModal?.text} closeInfoModal={closeInfoModal} />
      )} 
    </Layout>
  );
};



export default HomeScreen;