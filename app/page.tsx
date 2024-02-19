"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import Home from "./Home";
import { selectUserSlice, setCurrentComponent, setHydrate, setInviteCode, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { isUser } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref');

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("airdrop"));    
  }, [dispatch])

  useEffect(() => {
    if(referralCode) {
      dispatch(setInviteCode(referralCode));
    }
  }, [referralCode, dispatch])

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
      <div className="flex-col flex items-center bg-secondary min-h-screen bg-[url('/vectors/mesh-lines.svg')] bg-cover bg-no-repeat bg-top">
        <Topbar />
        <Home />
        {isUser && <Footer />}
      </div>
    </div>
  );
}
