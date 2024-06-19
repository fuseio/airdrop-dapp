"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { selectUserSlice } from "@/store/userSlice";
import Footer from "@/components/Footer";
import Eligible from "@/components/claim/Eligible";
import { isEligibleToClaimSeason1Reward } from "@/lib/helpers";
import NotEligible from "@/components/claim/NotEligible";

export default function ClaimPage() {
  const dispatch = useAppDispatch();
  const { isUser, user } = useAppSelector(selectUserSlice);

  useEffect(() => {
    dispatch(setSelectedNavbar("claim"));
  }, [dispatch])

  return (
    <div className="w-full font-mona justify-end min-h-screen bg-secondary bg-radial-gradient-green">
      <div className={`flex flex-col justify-between items-center relative min-h-screen bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top`}>
        <Topbar />
        {isEligibleToClaimSeason1Reward(user) ?
          <Eligible /> :
          <NotEligible />
        }
        {isUser && <Footer />}
      </div>
    </div>
  );
}
