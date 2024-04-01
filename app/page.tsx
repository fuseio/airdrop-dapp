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
    if (twitterConnected) {
      dispatch(setCurrentComponent("signup"));
    } else if (!isUser) {
      dispatch(setCurrentComponent("landing"));
    }
  }, [dispatch, isUser, twitterConnected])

  useEffect(() => {
    if (isUser && currentComponent !== "signup") {
      dispatch(setCurrentComponent("dashboard"));
    }
  }, [currentComponent, dispatch, isUser])

  useEffect(() => {
    if (isDisconnected) {
      dispatch(setLogout());
    }
  }, [isDisconnected, dispatch])

  return (
    <div className={`w-full font-mona bg-secondary ${currentComponent === "landing" ? "h-screen" : "min-h-screen bg-radial-gradient-green"}`}>
      <div className={`flex-col flex justify-start items-center bg-cover bg-no-repeat bg-bottom ${currentComponent === "landing" ? "h-screen" : "min-h-screen bg-[url('/vectors/grid.svg')]"}`}>
        {currentComponent === "landing" &&
          <div className="absolute w-full h-full z-0 min-h-[800px] bg-secondary overflow-hidden">
            <div className="absolute w-full h-full z-[4] min-h-[800px] overflow-hidden bg-[url('/vectors/bg-layer1.svg')] bg-no-repeat bg-[center_bottom] bg-100% animate-slide-in-bg-layer1"></div>
            <div className="absolute w-full h-full z-[3] min-h-[800px] overflow-hidden bg-[url('/vectors/bg-layer2.svg')] bg-no-repeat bg-[left_86%_bottom] bg-80% animate-slide-in-bg-layer2 translate-y-1/2 md:bg-[left_86%_bottom]"></div>
            <div className="absolute w-full h-full z-[2] min-h-[800px] overflow-hidden bg-[url('/vectors/bg-layer3.svg')] bg-no-repeat bg-[left_calc(50vw-591px)_bottom_calc((50vw-400px)*0.2)] animate-slide-in-bg-layer3 translate-y-1/2"></div>
            <div className="absolute w-full h-full z-[1] min-h-[800px] overflow-hidden bg-[url('/vectors/bg-layer4.svg')] bg-no-repeat bg-[center_bottom_20vh] bg-contain max-w-[800px] left-[calc(50%-400px)] animate-slide-in-bg-layer4 translate-y-[80%] 4xl:bg-[center_bottom_6vh] 2xl:bg-[center_bottom_-8vh] lg:bg-[center_bottom_-6vh] md:bg-[center_bottom_6vh] md:max-w-full md:left-0"></div>
            <div className="absolute w-full h-full z-[5] min-h-[800px] overflow-hidden bg-[url('/vectors/bg-layer5.svg')] bg-no-repeat bg-[center_top] bg-auto-100% animate-slide-in-bg-layer5 translate-y-1/2"></div>
            <div className="absolute w-full h-full z-[1] min-h-[800px] overflow-hidden bg-[url('/vectors/stars1.svg')] bg-no-repeat bg-[center_0] animate-slide-in-bg-stars1 translate-y-1/2"></div>
            <div className="absolute w-full h-full z-[1] min-h-[800px] overflow-hidden bg-[url('/vectors/stars2.svg')] bg-no-repeat bg-[center_0] animate-slide-in-bg-stars2 translate-y-1/2"></div>
          </div>
        }
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
    </div>
  );
}
