"use client";

import Topbar from "@/components/Topbar";
import { setSelectedNavbar } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useEffect } from "react";
import { selectUserSlice } from "@/store/userSlice";
import Footer from "@/components/Footer";
import LeaderboardWrapper from "@/components/leaderboard/LeaderboardWrapper";
import { season2TwitterLaunchDate } from "@/lib/helpers";

export default function LeaderboardPage() {
  const dispatch = useAppDispatch();
  const { isUser, user } = useAppSelector(selectUserSlice);

  useEffect(() => {
    dispatch(setSelectedNavbar("leaderboard"));
  }, [dispatch])

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
