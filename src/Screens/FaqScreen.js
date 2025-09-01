import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import { faqApi } from "../Api/api";
import { toast } from "react-toastify";
import classes from "../Css/FaqScreen.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Audio from "../Components/Audio";
import { toggleAudio } from "../Slices/audioSlice";
import LargeLoader from "../Components/Loaders/LargeLoader";
import LoadingScreen from "./LoadingScreen";

const FaqScreen = () => {
  const [data, setData] = useState("");
  const location = useLocation();
  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [loading, setLoading] = useState(true);

  // GET THE AUDIO STATE FROM THE REDUX PERSISTED STORE....
  const { audio } = useSelector((state) => state?.persisted?.audioSlice);

  const dispatch = useDispatch();

  // FETCH THE FAQ DATA FROM API...
  useEffect(() => {
    fetchFaqData();
  }, []);

  // GET THE QUERY PARAMS FROM THE URL AND SET THE STATES...
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("uid");
    const gid = params.get("gid");
    const svcId = params.get("svcId");
    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
  }, [location]);

  const navigate = useNavigate();

  // FETCH THE FAQ DATA FROM API...
  const fetchFaqData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${faqApi}`);
      setData(response?.data?.response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(
        error?.response?.data?.message ||
          error?.data?.message ||
          error?.message ||
          error
      );
    }
  };

  // NAVIGATE TO HOME PAGE HANDLER...
  const navigateHandler = () => {
    if (!userId || !gameId) {
      navigate(`/`);
    } else {
      navigate(`/?uid=${userId}&gid=${gameId}&svcId=${serviceId}`);
    }
  };

  if (loading) {
    return (
      <Layout loadingFalse={true}>
        <LoadingScreen />
      </Layout>
    );
  }

  return (
    <Layout style={{ paddingTop: "30px" }} loadingFalse={true}>
      {audio && <Audio audio="/assets/sounds/startgame.mp3" type="audio/mp3" />}

      <div className={classes.header}>
        <button
          type="button"
          className={classes.back_icon_container}
          onClick={() => navigateHandler()}
        >
          <i className={`fa-solid fa-arrow-left ${classes.back_icon}`}></i>
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
      <div
        dangerouslySetInnerHTML={{ __html: data }}
        className={classes.faq_section}
      />
    </Layout>
  );
};

export default FaqScreen;
