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
import { screenWidth } from "@/lib/helpers";
import { useMediaQuery } from "usehooks-ts";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { currentComponent, isUser } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();
  const topbarRef = useRef<HTMLElement>(null);
  const homeRef = useRef<HTMLDivElement>(null);
  const [homeMargin, setHomeMargin] = useState(0);
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);

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

  function margin() {
    if (isUser) {
      return { top: "0px", bottom: "0px" };
    }

    if (!matches) {
      return { top: "70px", bottom: "70px" };
    }

    if (!homeMargin) {
      return { top: "100px", bottom: "100px" };
    }

    return { top: "0px", bottom: homeMargin };
  }

  return (
    <div className="w-full font-mona justify-end min-h-screen bg-secondary bg-radial-gradient-green">
      <div className={`flex-col flex items-center min-h-screen bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top ${isUser ? "justify-start" : "relative justify-between"}`}>
        <Topbar topbarRef={topbarRef} />
        <div
          ref={homeRef}
          className="w-full flex flex-col items-center"
          style={{
            marginTop: margin().top,
            marginBottom: margin().bottom,
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
