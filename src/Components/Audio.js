import React, { useEffect, useState } from "react";

// AUDIO COMPONENT THAT PLAYS THE AUDIO ...
const Audio = ({ audio, type }) => {
  const [isPlay, setIsPlay] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPlay(false);
      } else {
        setIsPlay(true);
      }
    };

    handleVisibilityChange();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      {isPlay ? (
        <audio autoPlay loop>
          <source src={audio} type={type} />
        </audio>
      ) : null}
    </>
  );
};

export default Audio;
