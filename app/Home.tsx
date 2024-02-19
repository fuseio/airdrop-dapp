import { AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setCurrentComponent } from "@/store/userSlice";
import { useEffect } from "react";
import Landing from "@/components/home/Landing";
import SignUp from "@/components/home/SignUp";
import Dashboard from "@/components/home/Dashboard";

export default function Home() {
  const dispatch = useAppDispatch();
  const { currentComponent, isUser } = useAppSelector(selectUserSlice);

  useEffect(() => {
    if(isUser) {
      dispatch(setCurrentComponent("dashboard"))
    }
  }, [dispatch, isUser])

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
