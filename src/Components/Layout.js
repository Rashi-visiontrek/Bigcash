// import React, { useEffect, useState } from "react";
// import classes from "../Css/Layout.module.css";
// import Lottie from "lottie-react";
// import snowfallAnimation from "../StaticAnimations/snowfallAnimation.json";
// import thunderAnimation from "../StaticAnimations/thunderAnimation2.json";
// import ReactPlayer from "react-player";
// import LoadingScreen from "../Screens/LoadingScreen";

// const Layout = ({ children, style, loadingFalse }) => {
//   const [loading, setLoading] = useState(() => (loadingFalse ? false : true));

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, [30000]);
//   }, []);

//   return (
//     <div className={classes.game_overlay}>
//       <div className={classes.game_container}>
//         <div className={classes.right_top}>
//           <Lottie
//             animationData={thunderAnimation}
//             loop
//             autoPlay
//             className={classes.right_top_image}
//           />
//         </div>
//         <div className={classes.left_top}>
//           <Lottie
//             animationData={thunderAnimation}
//             loop
//             autoplay
//             className={classes.left_top_image}
//           />
//         </div>
//         <div className={classes.animations}>
//           <Lottie
//             animationData={snowfallAnimation}
//             loop
//             autoPlay
//             className={classes.animation}
//           />
//         </div>
//         <div className={classes.cloud_container}>
//           <ReactPlayer
//             url={`/assets/videos/cloud.mp4`}
//             muted
//             className={classes.video}
//             height="100%"
//             playing={true}
//             loop={true}
//             playsinline
//             onReady={() => setLoading(false)}
//             config={{
//               file: {
//                 attributes: {
//                   playsInline: true,
//                 },
//               },
//             }}
//           />
//         </div>
//         {loading ? (
//           <LoadingScreen />
//         ) : (
//           <div className={classes.game} style={style}>
//             {children}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Layout;

// import React, { useEffect, useState } from "react";
// import classes from "../Css/Layout.module.css";
// import Lottie from "lottie-react";
// import ReactPlayer from "react-player";
// import LoadingScreen from "../Screens/LoadingScreen";
// import coins from '../StaticAnimations/coins.json'
// import play from '../StaticAnimations/play.json'

// const Layout = ({ children, style, loadingFalse }) => {
//   const [loading, setLoading] = useState(() => (loadingFalse ? false : true));

//   useEffect(() => {
//     setTimeout(() => {
//       setLoading(false);
//     }, [30000]);
//   }, []);

//   return (
//     <div className={classes.game_overlay}>
      
//          <div
//         className={classes.game_container}
//         style={{
//           backgroundImage: "url('/bg.png')", // public folder
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//             <div className={classes.coin_animation}>
//           <Lottie
//             animationData={coins}
//             loop
//             autoPlay
//             className={classes.coin_lottie}
//           />
         
//         </div>
//      <div className={classes.play}>
//           <Lottie
//             animationData={play}
//             loop
//             autoPlay
//             className={classes.play_lottie}
//           />
//         </div>
//       </div>
       
//         {loading ? (
//           <LoadingScreen />
//         ) : (
//           <div className={classes.game} style={style}>
//             {children}
         
//           </div>
//         )}
//       </div>
  
//   );
// };

// export default Layout;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import classes from "../Css/Layout.module.css";
import Lottie from "lottie-react";
import LoadingScreen from "../Screens/LoadingScreen";
import coins from "../StaticAnimations/coins.json";
import play from "../StaticAnimations/play.json";

const Layout = ({ children, style, loadingFalse }) => {
  const location = useLocation();

  // Routes that should not use game layout
  const noGameLayoutRoutes = ["/terms", "/privacy", "/about"];
  const isGameLayout = !noGameLayoutRoutes.includes(location.pathname);

  const [loading, setLoading] = useState(() => (loadingFalse ? false : true));

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 30000); // ⏱️ Corrected setTimeout argument
  }, []);

  // Plain layout for routes like /terms or /privacy
  if (!isGameLayout) {
    return <div style={{   padding: "20px",
        paddingTop: "80px", // Adjust for header height if any
        minHeight: "100vh", 
      
     }}>{children}</div>;
  }

  // Game layout
  return (
    <div className={classes.game_overlay}>
      <div
        className={classes.game_container}
        style={{
          backgroundImage: "url('/menubg.jpg')",
          backgroundSize: "contain",              // Ensure image covers entire container
          backgroundPosition: "center",         // Center the image
          backgroundRepeat: "no-repeat",
          height: "100vh",
          
        }}
      >
        {/* Coin Animation */}
        <div className={classes.coin_animation}>
          <Lottie
            animationData={coins}
            loop
            autoPlay
            className={classes.coin_lottie}
          />
        </div>

        {/* Play Icon shown only during loading */}
        {/* {loading && (
          <div className={classes.play}>
            <Lottie
              animationData={play}
              loop
              autoPlay
              className={classes.play_lottie}
            />
          </div>
        )} */}

        {/* Main Content after loading */}
        {!loading && (
          <div className={classes.game} style={style}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
