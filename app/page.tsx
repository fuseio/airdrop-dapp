"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { selectUserSlice, setCurrentComponent, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
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
  const [homeMargin, setHomeMargin] = useState(0);

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
        setHomeMargin(margin);
      }
    }
  }, [])

  return (
    <div className="w-full font-mona justify-end min-h-screen bg-secondary bg-radial-gradient-green">
      <div className={`flex-col flex items-center min-h-screen bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top ${isUser ? "justify-start" : "relative justify-between"}`}>
        <Topbar topbarRef={topbarRef} />
        <div
          ref={homeRef}
          className="w-full flex flex-col items-center"
          style={{
            marginTop: isUser ? "0px" : homeMargin === 0 ? "100px" : "0px",
            marginBottom: isUser ? "0px" : homeMargin === 0 ? "100px" : homeMargin,
          }}
        >
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
