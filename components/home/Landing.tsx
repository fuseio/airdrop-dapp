import { useAppDispatch, useAppSelector } from "@/store/store";
import { motion } from "framer-motion";
import Image from "next/image";
import rightArrow from "@/assets/right-arrow.svg";
import { authenticate, retrieve, selectUserSlice, setCurrentComponent, setInviteCode } from "@/store/userSlice";
import { path, screenWidth } from "@/lib/helpers";
import Link from "next/link";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { useSearchParams } from "next/navigation";
import AirdropLive from "./AirdropLive";
import { useAccount } from "wagmi";
import airdropGreen from "@/assets/airdrop-green.svg";
import { useMediaQuery } from "usehooks-ts";

const defaultReferralCode = "FUSER";

const Landing = () => {
  const dispatch = useAppDispatch();
  const [invite, setInvite] = useState('');
  const searchParams = useSearchParams();
  const referralCode = searchParams.get('ref');
  const { connectWalletLocation, isHydrated, isAuthenticated, isUser } = useAppSelector(selectUserSlice);
  const { address } = useAccount();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);

  useEffect(() => {
    const threeHundredMillisecond = 300;

    const intervalId = setInterval(() => {
      if (referralCode) {
        clearInterval(intervalId);
        setInvite(referralCode);
        return;
      }
      setInvite(prevInvite => {
        const prevInviteLength = prevInvite.length;
        const defaultReferralCodeLength = defaultReferralCode.length;
        if (prevInviteLength < defaultReferralCodeLength) {
          return prevInvite + defaultReferralCode[prevInviteLength];
        } else {
          clearInterval(intervalId);
          return prevInvite;
        }
      })
    }, threeHundredMillisecond)

    return () => {
      clearInterval(intervalId);
    }
  }, [dispatch, referralCode])

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
      className="relative w-8/9 flex justify-between gap-4 md:w-9/10 max-w-7xl"
      key="landing"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className="flex flex-col items-start max-w-xl">
        <AirdropLive />
        <h1 className="text-[6.875rem] xl:text-4xl leading-none text-white font-semibold max-w-[980.05px] mt-9">
          Welcome to the fuse airdrop
        </h1>
        <p className="text-xl text-white max-w-[440px] mt-7 mb-16">
          Join the Fuse Airdrop! Get into the Fuse, connect your wallet and earn Rewards with ease: Join the Explosive Airdrop Campaign
        </p>
        <p className="text-xl text-white font-bold mb-5">
          Enter invite code
        </p>
        <form
          className="flex flex-row md:flex-col items-center gap-5 md:gap-3 z-10"
          onSubmit={(e) => {
            e.preventDefault();
            if (invite.length !== defaultReferralCode.length) {
              return;
            }
            dispatch(setInviteCode(invite));
            dispatch(setCurrentComponent("signup"));
          }}
        >
          <OTPInput
            value={invite}
            onChange={setInvite}
            numInputs={5}
            renderInput={(props, index) => <input {...props} className={`${props.className} ${invite.length === index ? "animate-blink-underline" : "border-white/50"}`} />}
            containerStyle={"gap-2 bg-oslo-gray/30 rounded-full px-[30px] py-3.5"}
            inputStyle="font-pixeloid bg-transparent border-b text-center text-xl leading-none text-white text-bold w-9 focus:outline-none"
            skipDefaultStyles
          />
          <button
            type="submit"
            className="transition ease-in-out bg-primary rounded-full text-xl leading-none font-semibold px-12 py-4 hover:bg-white"
          >
            Continue
          </button>
        </form>
        <Link
          href={path.ABOUT}
          className="group flex items-center gap-2 mt-24 z-10"
        >
          <p className="text-xl text-white font-bold">
            Learn about the Airdrop
          </p>
          <Image
            src={rightArrow}
            alt="right arrow"
            className="transition ease-in-out delay-150 group-hover:translate-x-1"
          />
        </Link>
      </div>
      <Image
        src={airdropGreen}
        alt="airdrop"
        width={matches ? 522 : 418}
        height={matches ? 734 : 589}
        className="md:hidden"
      />
    </motion.div>
  )
}

export default Landing;
