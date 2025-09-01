import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toggleAudio } from "../Slices/audioSlice";
import classes from "../Css/PageNotFound.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Audio from "../Components/Audio";

const PageNotFound = () => {
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const navigate = useNavigate();

  // GET THE QUERY PARAMS FROM THE URL AND STORE IN STATE...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("uid");
    const gid = params.get("gid");
    const svcId = params.get("svcId");
    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
  }, [location]);

  // AUDIO STATE FROM THE REDUX PERSISTED STORE
  const { audio } = useSelector((state) => state?.persisted?.audioSlice);

  const dispatch = useDispatch();

  // NAVIGATE TO WHATSAPP , MOBILE NUMBER CHAT...
  const handleWhatsapp = () => {
    window.location.href = "https://wa.me/+2349160000453";
  };

  // NAVIGATE TO FAQ PAGE...
  const handleFaq = () => {
    if (!userId || !gameId) {
      navigate("/faq");
    } else {
      navigate(`/faq?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
    }
  };

  // NAVIGATE TO TERMS PAGE...
  const handleTerms = () => {
    if (!userId || !gameId) {
      navigate("/terms");
    } else {
      navigate(`/terms?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
    }
  };

  // NAVIGATE TO HOME PAGE HANDLER 
  const navigateToHome = () => {
    if (userId && gameId && serviceId) {
      navigate(`/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Layout>
      {audio && <Audio audio="/assets/sounds/startgame.mp3" type="audio/mp3" />}

      <div className={classes.logo_container}>
        <img
          src="/assets/images/logo5.png"
          // src="/assets/images/logo.png"
          alt="Game Win"
          className={classes.logo}
        />
      </div>

      <div className={classes.message_container}>
        <p className={classes.message}>Page or Resource Not Found!</p>
        <button className={classes.back} onClick={() => navigateToHome()}>
          Home
        </button>
      </div>

      <div className={classes.footer}>
        <button type="button" className={classes.faq} onClick={handleFaq}>
          <img
            src="/assets/images/faq.png"
            alt="faq"
            className={classes.icon}
          />
        </button>
        <button type="button" className={classes.terms} onClick={handleTerms}>
          <img
            src="/assets/images/terms-and-conditions.png"
            alt="terms"
            className={classes.icon}
          />
        </button>
        <button
          type="button"
          className={classes.whatsapp}
          onClick={handleWhatsapp}
        >
          <img
            src="/assets/images/whatsapp.png"
            alt="whatsapp"
            className={classes.icon}
          />
        </button>
        {audio ? (
          <button
            type="button"
            className={classes.sound}
            onClick={() => dispatch(toggleAudio())}
          >
            <i className={`fa-solid fa-volume-high ${classes.sound_icon}`}></i>
          </button>
        ) : (
          <button
            type="button"
            className={classes.sound}
            onClick={() => dispatch(toggleAudio())}
          >
            <i className={`fa-solid fa-volume-xmark ${classes.sound_icon}`}></i>
          </button>
        )}
      </div>
    </Layout>
  );
};

export default PageNotFound;
