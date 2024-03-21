import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import { authenticate, retrieve, selectUserSlice } from "@/store/userSlice";
import { defaultReferralCode } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import JoinAirdrop from "./JoinAirdrop";
import NotifySubscribe from "./NotifySubscribe";


const Landing = () => {
  const dispatch = useAppDispatch();
  const [invite, setInvite] = useState('');
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref');
  const cta = searchParams.get('cta');
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
      className="relative w-8/9 flex flex-col items-center text-center mt-24 mb-12 md:w-9/10 max-w-7xl"
      key="landing"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <h1 className="text-[6.875rem] xl:text-[3.125rem] leading-none text-white font-semibold max-w-[980.05px] md:max-w-none mt-9">
        Welcome to the fuse airdrop
      </h1>
      <p className="text-xl xl:text-lg text-white/70 max-w-[628px] md:max-w-[391px] mt-7 mb-16">
        Join the Fuse Airdrop! Get into the Fuse, connect your wallet and earn Rewards with ease: Join the Explosive Airdrop Campaign
      </p>
      {!cta && <JoinAirdrop invite={invite} setInvite={setInvite} />}
      {cta === "subscribe" && <NotifySubscribe />}
    </motion.div>
  )
}

export default Landing;
