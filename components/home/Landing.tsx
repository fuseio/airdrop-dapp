import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import { authenticate, retrieve, selectUserSlice, setCurrentComponent, setInviteCode } from "@/store/userSlice";
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
  const { isHydrated, isAuthenticated, isUser } = useAppSelector(selectUserSlice);
  const { address, isConnected } = useAccount();

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
      address &&
      !isUser
    ) {
      if (isAuthenticated) {
        dispatch(retrieve());
      } else {
        dispatch(authenticate({ eoaAddress: address }));
      }
    }
  }, [address, dispatch, isAuthenticated, isHydrated, isUser])

  useEffect(() => {
    if (isConnected && !isUser) {
      dispatch(setInviteCode(defaultReferralCode));
      dispatch(setCurrentComponent("signup"));
    }
  }, [dispatch, isConnected, isUser])

  return (
    <motion.div
      className="relative w-8/9 flex flex-col items-center text-center mt-24 mb-12 4xl:mt-16 md:w-9/10 max-w-7xl opacity-0 animate-slide-in-heading"
      key="landing"
    >
      <h1 className="text-[5rem] 4xl:text-[3.75rem] xl:text-[3.125rem] leading-none text-white font-semibold max-w-[743px] xl:max-w-[450px] md:max-w-none">
        Light up the Fuse!
      </h1>
      <p className="text-xl 4xl:text-base text-white/70 max-w-[783px] 3xl:max-w-[628px] md:max-w-[391px] mt-7 mb-16 4xl:mt-5 4xl:mb-[30px]">
        You are invited to the Fuse Airdrop! Don&apos;t be left out of the chance to explore,
        get points and earn. We are thrilled to have you as a part of the Fuse vibrant community.
      </p>
      <div className="flex flex-col gap-3.5">
        <p className="text-xl text-white font-bold mb-5 2xl:hidden">
          Enter invite code
        </p>
        <JoinAirdrop invite={invite} setInvite={setInvite} />
      </div>
    </motion.div>
  )
}

export default Landing;
