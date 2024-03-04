"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import Home from "./Home";
import { selectUserSlice, setCurrentComponent, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { isUser } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("airdrop"));    
  }, [dispatch])

  useEffect(() => {
    if(isUser) {
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
    <div className="w-full font-mona justify-end min-h-screen">
      <div className={`flex-col flex items-center bg-secondary bg-gradient-to-t from-green-200/10 min-h-screen ${isUser ? "bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top" : ""}`}>
        <Topbar />
        <Home />
        {isUser && <Footer />}
      </div>
    </div>
  );
}
