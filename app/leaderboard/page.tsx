"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { retrieve, selectUserSlice, setHydrate, setLogout } from "@/store/userSlice";
import Footer from "@/components/Footer";
import { useAccount } from "wagmi";
import LeaderboardWrapper from "@/components/leaderboard/LeaderboardWrapper";
import { useRouter } from "next/navigation";
import { season2TwitterLaunchDate } from "@/lib/helpers";

export default function LeaderboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isHydrated, isUser, user } = useAppSelector(selectUserSlice);
  const { isDisconnected } = useAccount();

  useEffect(() => {
    dispatch(setHydrate());
    dispatch(setSelectedNavbar("leaderboard"));
  }, [dispatch])

  useEffect(() => {
    if (isHydrated && !(isUser && (new Date(user.createdAt) >= season2TwitterLaunchDate ? user.twitterAccountId : true))) {
      router.push("/");
    }
  }, [isHydrated, isUser, router, user.createdAt, user.twitterAccountId])

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
      <div className={`flex-col flex items-center min-h-screen bg-[url('/vectors/grid.svg')] bg-no-repeat bg-top ${isUser ? "justify-start" : "relative justify-between"}`}>
        <Topbar />
        <LeaderboardWrapper />
        {(isUser && (new Date(user.createdAt) >= season2TwitterLaunchDate ? user.twitterAccountId : true)) && <Footer />}
      </div>
    </div>
  );
}
