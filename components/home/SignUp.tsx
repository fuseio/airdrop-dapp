import { motion } from "framer-motion";
import SignUpTwitter from "./SignUpTwitter";
import SignUpWallet from "./SignUpWallet";
import SignUpSkip from "./SignUpSkip";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { create, selectUserSlice, setCurrentComponent } from "@/store/userSlice";
import { useAccount } from "wagmi";
import { signUpSteps } from "@/lib/helpers";
import { useEffect } from "react";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { signupStepCompleted, isAuthenticated, inviteCode, totalSignupStepCompleted, isUser, user } = useAppSelector(selectUserSlice);
  const { address } = useAccount();

  useEffect(() => {
    if (
      totalSignupStepCompleted === signUpSteps.MANDATORY &&
      isAuthenticated &&
      address &&
      inviteCode
    ) {
      dispatch(create({
        createUserDetail: {
          walletAddress: address,
          referralCode: inviteCode
        },
      }));
    }
  }, [address, dispatch, inviteCode, isAuthenticated, totalSignupStepCompleted])


  useEffect(() => {
    if (
      isUser &&
      user.twitterAccountId
    ) {
      dispatch(setCurrentComponent("dashboard"));
    }
  }, [dispatch, isUser, user.twitterAccountId])

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
      {signupStepCompleted[signUpSteps.MANDATORY] && <SignUpSkip />}
    </motion.div>
  )
}

export default SignUp;
