import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import { authenticate, retrieve, selectUserSlice } from "@/store/userSlice";
import { defaultReferralCode } from "@/lib/helpers";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAccount } from "wagmi";
import JoinAirdrop from "./JoinAirdrop";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";
import Countdown from "./Countdown";
import NotifySubscribe from "./NotifySubscribe";
import { selectNavbarSlice, setCurrentComingSoonComponent } from "@/store/navbarSlice";
import rightArrow from "@/assets/right-arrow.svg";
import Image from "next/image";

const Landing = () => {
  const dispatch = useAppDispatch();
  const [invite, setInvite] = useState('');
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref');
  const { connectWalletLocation, isHydrated, isAuthenticated, isUser } = useAppSelector(selectUserSlice);
  const { currentComingSoonComponent } = useAppSelector(selectNavbarSlice);
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
      className="relative w-8/9 flex flex-col items-center text-center mt-24 mb-12 4xl:mt-16 md:w-9/10 max-w-7xl opacity-0 animate-slide-in-heading"
      key="landing"
    >
      <h1 className="text-[5rem] 4xl:text-[3.75rem] xl:text-[3.125rem] leading-none text-white font-semibold max-w-[743px] xl:max-w-[450px] md:max-w-none">
        Light up the Fuse!
      </h1>
      <p className="text-xl 4xl:text-base text-white/70 max-w-[584px] md:max-w-[391px] mt-7 mb-16 4xl:mt-5 4xl:mb-[30px]">
        You are invited to the Fuse Airdrop! Don&apos;t be left out of the chance to explore,
        get points and earn. We are thrilled to have you as a part of the Fuse vibrant community.
        Register today and get notified when we go Live!
      </p>
      {NEXT_PUBLIC_ENVIRONMENT === "staging" &&
        <div className="flex flex-col gap-3.5">
          <p className="text-xl text-white font-bold mb-5 2xl:hidden">
            Enter invite code
          </p>
          <JoinAirdrop invite={invite} setInvite={setInvite} />
        </div>
      }
      {(NEXT_PUBLIC_ENVIRONMENT === "production" && currentComingSoonComponent === "countdown") &&
        <motion.div
          className="flex flex-col gap-3.5"
          key="countdown"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          <p className="text-xl text-white/70 font-bold 2xl:hidden">
            Coming Soon
          </p>
          <Countdown />
          <button
            className="group flex justify-center items-center gap-1 mt-3 2xl:mt-1.5"
            onClick={() => dispatch(setCurrentComingSoonComponent("notify"))}
          >
            <p className="text-xl md:text-base text-white font-bold">
              Get notified when the airdrop is live
            </p>
            <Image
              src={rightArrow}
              alt="right arrow"
              className="transition ease-in-out group-hover:translate-x-0.5"
            />
          </button>
        </motion.div>
      }
      {(NEXT_PUBLIC_ENVIRONMENT === "production" && currentComingSoonComponent === "notify") &&
        <motion.div
          className="flex flex-col gap-3.5"
          key="notify"
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -300, opacity: 0 }}
        >
          <p className="text-xl text-white/70 font-bold 2xl:hidden">
            Get notified when the airdrop is live
          </p>
          <NotifySubscribe />
        </motion.div>
      }
    </motion.div>
  )
}

export default Landing;
