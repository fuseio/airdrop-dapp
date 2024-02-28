import { motion } from "framer-motion";
import SignUpTwitter from "./SignUpTwitter";
import SignUpWallet from "./SignUpWallet";
import SignUpVerify from "./SignUpVerify";
import SignUpSkip from "./SignUpSkip";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { create, selectUserSlice, setTwitterAccountId } from "@/store/userSlice";
import { useAccount } from "wagmi";
import { MANDATORY_STEP_POSITION, TOTAL_STEPS, exampleTwitterAccountId } from "@/lib/helpers";
import { useEffect } from "react";
import SignUpDiscord from "./SignUpDiscord";

const SignUp = () => {
  const dispatch = useAppDispatch();
  const { signupStepCompleted, isAuthenticated, inviteCode, twitterAccountId, totalSignupStepCompleted } = useAppSelector(selectUserSlice);
  const { address } = useAccount();

  useEffect(() => {
    if (!twitterAccountId) {
      dispatch(setTwitterAccountId(exampleTwitterAccountId));
    }

    if (
      totalSignupStepCompleted === TOTAL_STEPS &&
      isAuthenticated &&
      address &&
      inviteCode &&
      twitterAccountId
    ) {
      dispatch(create({
        createUserDetail: {
          walletAddress: address,
          twitterAccountId: twitterAccountId,
          referralCode: inviteCode
        },
      }));
    }
  }, [address, dispatch, inviteCode, isAuthenticated, totalSignupStepCompleted, twitterAccountId])

  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[86px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <h1 className="text-[2.125rem] leading-none text-white font-medium text-center max-w-[604px] mt-[52px] mb-16">
        You&apos;re almost there. Connect your wallets and social media
      </h1>
      <div className="flex flex-col gap-5 mb-11">
        <SignUpWallet />
        <SignUpVerify />
        <SignUpTwitter />
        <SignUpDiscord />
      </div>
      {signupStepCompleted[MANDATORY_STEP_POSITION] && <SignUpSkip />}
    </motion.div>
  )
}

export default SignUp;
