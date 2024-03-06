"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import Home from "./Home";
import { selectUserSlice, setCurrentComponent, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import Grid3D from "@/components/ui/Grid3D";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { currentComponent, isUser } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();

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

  return (
    <div className="w-full font-mona justify-end min-h-screen bg-secondary">
      <div className={`flex-col flex items-center min-h-screen ${isUser ? "bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top" : "relative"}`}>
        <Topbar />
        <Home />
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
