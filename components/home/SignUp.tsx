import { motion } from "framer-motion";
import SignUpTwitter from "./SignUpTwitter";
import SignUpWallet from "./SignUpWallet";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";
import { season2TwitterLaunchDate, signUpSteps } from "@/lib/helpers";
import SignUpSkip from "./SignUpSkip";

const SignUp = () => {
  const { signupStepCompleted, user } = useAppSelector(selectUserSlice);

  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[86px] md:mt-0 mb-[187px] md:mb-8 md:w-9/10 max-w-7xl"
      key="signup"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <h1 className="text-[2.125rem] leading-none text-white font-medium text-center max-w-[604px] mt-[52px] md:mt-0 mb-16">
        You&apos;re almost there. Connect your wallet and social media
      </h1>
      <div className="flex flex-col gap-5 mb-11">
        <SignUpWallet />
        <SignUpTwitter />
      </div>
      {(signupStepCompleted[signUpSteps.MANDATORY] && new Date(user.createdAt) < season2TwitterLaunchDate) && <SignUpSkip />}
    </motion.div>
  )
}

export default SignUp;
