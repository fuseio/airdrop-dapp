import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import { authenticate, retrieve, selectUserSlice } from "@/store/userSlice";
import { defaultReferralCode } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import JoinAirdrop from "./JoinAirdrop";

const Landing = () => {
  const dispatch = useAppDispatch();
  const [invite, setInvite] = useState('');
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref');
  const { connectWalletLocation, isHydrated, isAuthenticated, isUser } = useAppSelector(selectUserSlice);
  const { address } = useAccount();

  useEffect(() => {
    if (referralCode) {
      setInvite(referralCode);
    } else {
      setInvite(defaultReferralCode);
    }
  }, [referralCode])

  useEffect(() => {
    if (
      isHydrated &&
      connectWalletLocation === "navbar" &&
      address &&
      !isUser
    ) {
      if (isAuthenticated) {
        dispatch(retrieve());
      } else {
        dispatch(authenticate({ eoaAddress: address }));
      }
    }
  }, [address, connectWalletLocation, dispatch, isAuthenticated, isHydrated, isUser])

  return (
    <motion.div
      className="relative w-8/9 flex flex-col items-center text-center mt-24 mb-12 4xl:mt-[53px] md:w-9/10 max-w-7xl"
      key="landing"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <h1 className="text-[5rem] 4xl:text-[3.75rem] xl:text-[3.125rem] leading-none text-white font-semibold max-w-[700px] 4xl:max-w-[546px] xl:max-w-[450px] md:max-w-none">
        Welcome to the Fuse airdrop
      </h1>
      <p className="text-xl 4xl:text-base md:text-lg text-white/70 max-w-[628px] 4xl:max-w-[493px] md:max-w-[391px] mt-7 mb-16 4xl:mt-5 4xl:mb-[30px]">
        Join the Fuse Airdrop! Get into the Fuse, connect your wallet and earn Rewards with ease: Join the Explosive Airdrop Campaign
      </p>
      <JoinAirdrop invite={invite} setInvite={setInvite} />
    </motion.div>
  )
}

export default Landing;
