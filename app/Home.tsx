import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setCurrentComponent } from "@/store/userSlice";
import { useEffect } from "react";
import Landing from "@/components/home/Landing";
import SignUp from "@/components/home/SignUp";
import Dashboard from "@/components/home/Dashboard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { currentComponent, isAuthenticated } = useAppSelector(selectUserSlice);

  useEffect(() => {
    if(isAuthenticated) {
      dispatch(setCurrentComponent("dashboard"))
    }
  }, [dispatch, isAuthenticated])

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence initial={false}>
        {currentComponent === "landing" && <Landing />}
        {currentComponent === "signup" && <SignUp />}
        {currentComponent === "dashboard" && <Dashboard />}
      </AnimatePresence>
    </div>
  )
}
