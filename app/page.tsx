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
    <div className={`w-full font-mona bg-secondary ${currentComponent === "landing" ? "h-screen min-h-[1800px] 2xl:min-h-fit md:min-h-[1500px]" : "min-h-screen bg-radial-gradient-green"}`}>
      <div className={`flex-col flex justify-start items-center bg-cover bg-no-repeat bg-bottom ${currentComponent === "landing" ? "h-screen min-h-[1800px] 2xl:min-h-fit md:min-h-[1500px] bg-[url('/vectors/astronaut-planet.svg')] 2xl:bg-[url('/vectors/astronaut-planet-laptop.svg')] md:bg-[url('/vectors/astronaut-planet.svg')]" : "min-h-screen bg-[url('/vectors/grid.svg')]"}`}>
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
