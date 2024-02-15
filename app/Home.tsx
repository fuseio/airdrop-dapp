import Image from "next/image";
import intoTheFuse from "@/assets/into-the-fuse.svg";
import rightArrow from "@/assets/right-arrow.svg";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setCurrentComponent, setCurrentSignupStep } from "@/store/userSlice";
import { useRef } from "react";

const Landing = () => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[225px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Image
        src={intoTheFuse}
        alt="into the Fuse"
      />
      <p className="text-xl text-white max-w-[626.14px] mt-7 mb-16">
        Join the Fuse Airdrop! Get into the Fuse, connect your wallet and earn Rewards with ease:
        Join the Explosive Airdrop Campaign
      </p>
      <button
        className="transition ease-in-out bg-primary rounded-full text-xl leading-none font-semibold px-[52px] py-4 hover:bg-white"
        onClick={() => dispatch(setCurrentComponent("signup"))}
      >
        Get your Airdrop
      </button>
      <a
        href="#"
        className="group flex items-center gap-2 mt-12"
      >
        <p className="text-xl text-white font-bold">
          Learn about the Airdrop
        </p>
        <Image
          src={rightArrow}
          alt="right arrow"
          className="transition ease-in-out delay-150 group-hover:translate-x-1"
        />
      </a>
    </motion.div>
  )
}

const SignUpInvite = () => {
  const dispatch = useAppDispatch();
  const { currentSignupStep } = useAppSelector(selectUserSlice);
  const referralCodeRef = useRef<HTMLInputElement>(null);

  function submitReferralCode() {
    if (!referralCodeRef.current || !referralCodeRef.current.value.length) {
      return;
    }

    dispatch(setCurrentSignupStep("twitter"));
  }

  return (
    <div className={`transition-all ease-in-out bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-auto md:h-auto px-10 md:px-4 md:py-6 ${currentSignupStep === "invite" ? "h-[170px] opacity-100" : "h-[113px] opacity-50"}`}>
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
          1
        </p>
        <div className="flex flex-col gap-2.5">
          <p className="text-2xl text-white font-bold">
            Enter Invite Code
          </p>
          {currentSignupStep === "invite" &&
            <p className="transition-all ease-in-out text-gray-cloud max-w-[398px]">
              Enter an invite code to claim your airdrop. You can{" "}
              <a
                href="https://discord.com/invite/jpPMeSZ"
                target="_blank"
                className="transition ease-in-out underline hover:opacity-60"
              >
                join our Discord
              </a>{" "}
              or{" "}
              <a
                href="https://twitter.com/intent/user?screen_name=Fuse_network"
                target="_blank"
                className="transition ease-in-out underline hover:opacity-60"
              >
                check Twitter
              </a>{" "}
              for invites.
            </p>
          }
        </div>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          submitReferralCode();
        }}
      >
        {currentSignupStep === "invite" &&
          <input
            type="text"
            name="referral-code"
            placeholder="Your Code"
            ref={referralCodeRef}
            required
            className="transition-all ease-in-out bg-transparent rounded-full w-[233px] border border-white px-5 py-[15px] text-white placeholder:text-white placeholder:font-semibold"
          />
        }
        <button
          type="submit"
          className={`transition ease-in-out bg-primary rounded-full w-[233px] text-xl leading-none font-semibold py-[15px] ${currentSignupStep === "invite" ? "hover:bg-white" : ""}`}
          disabled={currentSignupStep !== "invite"}
        >
          Enter Code
        </button>
      </form>
    </div>
  )
}

const SignUpTwitter = () => {
  const dispatch = useAppDispatch();
  const { currentSignupStep } = useAppSelector(selectUserSlice);

  return (
    <div className={`transition-all ease-in-out bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-auto h-[113px] md:h-auto px-10 md:px-4 md:py-6 ${currentSignupStep === "twitter" ? "opacity-100" : "opacity-50"}`}>
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
          2
        </p>
        <p className="text-2xl text-white font-bold">
          Connect Twitter/X
        </p>
      </div>
      <button
        className={`transition ease-in-out bg-primary rounded-full w-[233px] text-xl leading-none font-semibold py-[15px] ${currentSignupStep === "twitter" ? "hover:bg-white" : ""}`}
        disabled={currentSignupStep !== "twitter"}
        onClick={() => dispatch(setCurrentSignupStep("wallet"))}
      >
        Connect Twitter/X
      </button>
    </div>
  )
}

const SignUpWallet = () => {
  const { currentSignupStep } = useAppSelector(selectUserSlice);

  return (
    <div className={`transition-all ease-in-out bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-auto h-[113px] md:h-auto px-10 md:px-4 md:py-6 ${currentSignupStep === "wallet" ? "opacity-100" : "opacity-50"}`}>
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
          3
        </p>
        <p className="text-2xl text-white font-bold">
          Connect Wallet
        </p>
      </div>
      <button
        className={`transition ease-in-out bg-primary rounded-full w-[233px] text-xl leading-none font-semibold py-[15px] ${currentSignupStep === "wallet" ? "hover:bg-white" : ""}`}
        disabled={currentSignupStep !== "wallet"}
      >
        Connect Wallet
      </button>
    </div>
  )
}

const SignUp = () => {
  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[86px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Image
        src={intoTheFuse}
        alt="into the Fuse"
        width={365}
        height={165}
      />
      <p className="text-xl text-white text-center max-w-[549px] mt-[52px] mb-16">
        Join the Fuse Airdrop program Join the Fuse Airdrop program Join the Fuse Airdrop program
      </p>
      <div className="flex flex-col gap-5">
        <SignUpInvite />
        <SignUpTwitter />
        <SignUpWallet />
      </div>
    </motion.div>
  )
}

export default function Home() {
  const { currentComponent } = useAppSelector(selectUserSlice);

  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence initial={false}>
        {currentComponent === "landing" && <Landing />}
        {currentComponent === "signup" && <SignUp />}
      </AnimatePresence>
    </div>
  )
}
