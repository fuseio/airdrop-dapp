import { AnimatePresence } from "framer-motion";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";
import Landing from "@/components/home/Landing";
import SignUp from "@/components/home/SignUp";
import Dashboard from "@/components/home/Dashboard";

export default function Home() {
  const { currentComponent } = useAppSelector(selectUserSlice);

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
