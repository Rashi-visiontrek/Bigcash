import React, { useEffect, useState } from "react";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import HomeScreen from "../Screens/HomeScreen";
// import GameScreen from "../Screens/GameScreen";
import GameOverScreen from "../Screens/GameOverScreen";
import FaqScreen from "../Screens/FaqScreen";
import TermsScreen from "../Screens/TermsScreen";
import LoadingScreen from "../Screens/LoadingScreen";
import PageNotFound from "../Screens/PageNotFound";
import ErrorBoundary from "../Components/ErrorBoundary";
import ScoreScreen from "../Screens/ScoreScreen";
import GameScreen2 from "../Screens/GameScreen2";

// ROUTES FOR THE DIFFERENT URL'S 

const Routes = () => {

 
  
  


  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeScreen />,
      errorElement: <ErrorBoundary />,
    },
    // {
    //   path: "/game",
    //   element: <GameScreen />,
    //   errorElement: <ErrorBoundary />,
    // },
     {
      path: "/game2",
      element: <GameScreen2 />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/game/over",
      element: <GameOverScreen />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/faq",
      element: <FaqScreen />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "/terms",
      element: <TermsScreen />,
      errorElement: <ErrorBoundary />,
    },
    {
      path: "*",
      element: <PageNotFound />,
      errorElement: <ErrorBoundary />,
    },
     {
      path: "/score",
      element: <ScoreScreen />,
      errorElement: <ErrorBoundary />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
