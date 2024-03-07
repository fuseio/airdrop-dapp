"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { selectUserSlice, setCurrentComponent, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import Grid3D from "@/components/ui/Grid3D";
import { AnimatePresence } from "framer-motion";
import Landing from "@/components/home/Landing";
import SignUp from "@/components/home/SignUp";
import Dashboard from "@/components/home/Dashboard";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { currentComponent, isUser } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();
  const topbarRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [homeMarginBottom, setHomeMarginBottom] = useState("mb-[0px]");

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("airdrop"));
  }, [dispatch])

  useEffect(() => {
    if (isUser) {
      dispatch(setCurrentComponent("dashboard"));
    } else {
      dispatch(setCurrentComponent("landing"));
    }
  }, [dispatch, isUser])

  useEffect(() => {
    if (isDisconnected) {
      dispatch(setLogout());
    }
  }, [isDisconnected, dispatch])

  useEffect(() => {
    if (topbarRef.current && homeRef.current) {
      const topbarHeight = topbarRef.current.getBoundingClientRect().height
      const homeHeight = homeRef.current.getBoundingClientRect().height
      const windowHeight = window.innerHeight;

      const gap = windowHeight - (topbarHeight + homeHeight);
      const margin = gap / 2;

      if (margin > 0) {
        setHomeMarginBottom(`${margin}px`);
      }
    }
  }, [])

  return (
    <div className="w-full font-mona justify-end min-h-screen bg-secondary">
      <div className={`flex-col flex items-center min-h-screen ${isUser ? "bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top justify-start" : "relative justify-between"}`}>
        <Topbar topbarRef={topbarRef} />
        <div ref={homeRef} className="w-full flex flex-col items-center" style={{ marginBottom: isUser ? "0px" : homeMarginBottom }}>
          <AnimatePresence initial={false}>
            {currentComponent === "landing" && <Landing />}
            {currentComponent === "signup" && <SignUp />}
            {currentComponent === "dashboard" && <Dashboard />}
          </AnimatePresence>
        </div>
        {currentComponent === "landing" &&
          <div className="absolute left-0 right-0 bottom-0 h-[500px]">
            <Grid3D />
          </div>
        }
        {isUser && <Footer />}
      </div>
    </div>
  );
}
