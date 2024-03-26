"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { selectUserSlice, setCurrentComponent, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import { AnimatePresence } from "framer-motion";
import Landing from "@/components/home/Landing";
import SignUp from "@/components/home/SignUp";
import Dashboard from "@/components/home/Dashboard";
import { useSearchParams } from "next/navigation";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { currentComponent, isUser } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();
  const searchParams = useSearchParams();
  const twitterConnected = searchParams.get('twitter-connected');

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("airdrop"));
  }, [dispatch])

  useEffect(() => {
    if (isUser) {
      dispatch(setCurrentComponent("dashboard"));
    } else if (twitterConnected) {
      dispatch(setCurrentComponent("signup"));
    } else {
      dispatch(setCurrentComponent("landing"));
    }
  }, [dispatch, isUser, twitterConnected])

  useEffect(() => {
    if (isDisconnected) {
      dispatch(setLogout());
    }
  }, [isDisconnected, dispatch])

  return (
    <div className={`w-full font-mona bg-secondary ${currentComponent === "landing" ? "h-screen md:min-h-[1500px]" : "min-h-screen bg-radial-gradient-green"}`}>
      {/*
      <div className={`flex-col flex justify-start items-center bg-cover bg-no-repeat bg-bottom ${currentComponent === "landing" ? "h-screen md:min-h-[1500px] bg-[url('/vectors/astronaut-planet.svg')] 4xl:bg-[url('/vectors/astronaut-planet-laptop.svg')] md:bg-[url('/vectors/astronaut-planet.svg')]" : "min-h-screen bg-[url('/vectors/grid.svg')]"}`}>
        <Topbar />
        <div className="w-full flex flex-col items-center">
          <AnimatePresence>
            {currentComponent === "landing" && <Landing />}
            {currentComponent === "signup" && <SignUp />}
            {currentComponent === "dashboard" && <Dashboard />}
          </AnimatePresence>
        </div>
        {isUser && <Footer />}
      </div>
  */}

      <div className={`flex-col flex justify-start items-center bg-cover bg-no-repeat bg-bottom page-wrapper`}>
        <div className="page-wrapper-bg">
          <div className="page-wrapper-bg page-wrapper-bg-layer1"></div>
          <div className="page-wrapper-bg page-wrapper-bg-layer2"></div>
          <div className="page-wrapper-bg page-wrapper-bg-layer3"></div>
          <div className="page-wrapper-bg page-wrapper-bg-layer4"></div>
          <div className="page-wrapper-bg page-wrapper-bg-layer5"></div>
          <div className="page-wrapper-bg page-wrapper-bg-stars1"></div>
          <div className="page-wrapper-bg page-wrapper-bg-stars2"></div>
        </div>
          <Topbar />
              <div className="w-full flex flex-col items-center">
                <AnimatePresence>
                  {currentComponent === "landing" && <Landing />}
                  {currentComponent === "signup" && <SignUp />}
                  {currentComponent === "dashboard" && <Dashboard />}
                </AnimatePresence>
              </div>
            {isUser && <Footer />}
        
      </div>

      <style>
        {`
          .page-wrapper {
            height: 100vh;
          }
          .page-wrapper-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: 0;
            min-height: 800px;
            background-color: #333333;
            overflow: hidden;
          }
          .page-wrapper-bg-layer1 {
            background: url('/vectors/bg-layer1.svg') no-repeat center bottom;
            background-size: 100%;
            width: 100%;
            height: 100%;
            z-index: 4;
            animation: 3s ease-out 0s 1 slideInFromBottom50;
            -webkit-animation-fill-mode: forwards;
          }
          .page-wrapper-bg-layer2 {
            background: url('/vectors/bg-layer2.svg') no-repeat left 86% bottom calc((43vw - 1400px) * 0.08);
            background-size: 80%;
            width: 100%;
            height: 100%;
            z-index: 3;
            animation: 3s ease-out 0.5s 1 slideInFromBottom50;
            transform: translateY(50%);
            -webkit-animation-fill-mode: forwards;
          }
          @media only screen and (max-width: 700px){
            .page-wrapper-bg-layer2 {
              background: url('/vectors/bg-layer2.svg') no-repeat left 86% bottom calc((50vw - 275px) * 0.08);
              background-size: 80%;
            }
          }
          .page-wrapper-bg-layer3 {
            background: url('/vectors/bg-layer3.svg') no-repeat left calc(50vw - 591px) bottom calc((50vw - 400px) * 0.2);
            width: 100%;
            height: 100%;
            z-index: 2;
            animation: 3s ease-out 0.9s 1 slideInFromBottom50;
            transform: translateY(50%);
            -webkit-animation-fill-mode: forwards;
          }
          .page-wrapper-bg-layer4 {
            background: url('/vectors/bg-layer4.svg') no-repeat center bottom calc(28vh * 2.2 - 495px);
            background-size: contain;
            width: 100%;
            height: 100%;
            max-width: 800px;
            left: calc(50% - 400px);
            z-index: 1;
            animation: 4s ease-out 2.5s 1 slideInFromBottom50;
            transform: translateY(60%);
            -webkit-animation-fill-mode: forwards;
          }
          @media only screen and (max-width: 700px){
            .page-wrapper-bg-layer4 {
              max-width: 100%;
              left: 0;
            }
          }
          .page-wrapper-bg-layer5 {
            background: url(/vectors/bg-layer5.svg) no-repeat center top;
            background-size: auto 100%;
            width: 100%;
            height: 100%;
            z-index: 5;
            animation: 4s ease-out 0s 1 slideInFromBottom;
            transform: translateY(50%);
            -webkit-animation-fill-mode: forwards;
          }
          .page-wrapper-bg-stars1 {
            background: url(/vectors/stars1.svg) no-repeat center 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            animation: 20s ease-out 0s 1 slideInFromBottom50;
            transform: translateY(50%);
            -webkit-animation-fill-mode: forwards;
          }
          .page-wrapper-bg-stars2 {
            background: url(/vectors/stars2.svg) no-repeat center 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            animation: 30s ease-out 0s 1 slideInFromBottom50;
            transform: translateY(50%);
            -webkit-animation-fill-mode: forwards;
          }

          .landing-title {
            animation: 2s ease-out 3s 1 slideInFromTop;
            -webkit-animation-fill-mode: forwards;
            opacity: 0;
          }
          
          @keyframes slideInFromTop {
            0% {
              transform: translateY(-50%);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideInFromBottom {
            0% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(0);
            }
          }

          @keyframes slideInFromBottom50 {
            0% {
              transform: translateY(50%);
            }
            100% {
              transform: translateY(0);
            }
          }
          
        `}
      </style>

    </div>
  );
}
