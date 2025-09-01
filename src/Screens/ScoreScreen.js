
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout2 from "../Components/Layout2";
import { ResetStore } from "../Utils/ResetStoreFunction";
import { useDispatch, useSelector } from "react-redux";
import Audio from "../Components/Audio";
import { toggleAudio } from "../Slices/audioSlice";
import classes from "../Css/ScoreScreen.module.css";
import SmallLoader from "../Components/Loaders/SmallLoader";

const ScoreScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userId, setUserId] = useState("");
  const [gameId, setGameId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);

  const { audio } = useSelector((state) => state?.persisted?.audioSlice);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const uid = params.get("ani");
    const gid = params.get("gameId");
    const svcId = params.get("serviceId");
    const scoreValue = params.get("score");

    setUserId(uid);
    setGameId(gid);
    setServiceId(svcId);
    setScore(scoreValue ? parseInt(scoreValue) : 0);
  }, [location]);

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
      navigate(`/game2?category=${category}&ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`, {
        state: { fromGame: true }, // ✅ send state again
      });
    }, 500);
  };

  // ✅ Detect if accessed via browser back (no location.state)
  useEffect(() => {
    if (!location.state?.fromGame) {
      // User did NOT come from GameScreen → redirect to homepage
      navigate(`/?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`, { replace: true });
      return;
    }

    // Push dummy history to trap back
    window.history.pushState(null, '', window.location.href);

    const handleBack = () => {
      navigate(`/?ani=${userId}&gameId=${gameId}&serviceId=${serviceId}`, { replace: true });
    };

    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, [navigate, location.state, userId, gameId, serviceId]);

  return (
    <>
      <Layout2 loadingFalse={true}>
        {audio && <Audio audio="/assets/sounds/startgame.mp3" type="audio/mp3" />}
        <br /><br /><br />
        <div className={classes.score}>
          <p>Score : {score}</p>
        </div>
        <br /><br />
        <button
          className="btn"
          type="button"
          onClick={handlePlayAgain}
          style={{
            background: "none",
            border: "none",
            padding: 0,
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? (
            <SmallLoader />
          ) : (
            <img src="/btn_playagain.png" alt="Play Again" style={{ width: '20rem' }} />
          )}
        </button>
      </Layout2>
    </>
  );
};

export default ScoreScreen;
