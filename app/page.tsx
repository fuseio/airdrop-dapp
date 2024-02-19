"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import Home from "./Home";
import { selectUserSlice, setHydrate } from "@/store/userSlice";
import Footer from "@/components/Footer";

export default function Airdrop() {
  const dispatch = useAppDispatch();
  const { isUser } = useAppSelector(selectUserSlice);

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("airdrop"));
  }, [dispatch])

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
