"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { retrieve, selectUserSlice, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import Eligible from "@/components/claim/Eligible";
import { useRouter } from "next/navigation";
import { isEligibleToClaimSeason1Reward, path } from "@/lib/helpers";
import NotEligible from "@/components/claim/NotEligible";

export default function ClaimPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isHydrated, isUser, user } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("claim"));
  }, [dispatch])

  useEffect(() => {
    if (isHydrated && !isUser) {
      router.push(path.HOME);
    }
  }, [isHydrated, isUser, router])

  useEffect(() => {
    if (isUser) {
      dispatch(retrieve());
    }
  }, [dispatch, isUser])

  useEffect(() => {
    if (isDisconnected) {
      dispatch(setLogout());
    }
  }, [isDisconnected, dispatch])

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
