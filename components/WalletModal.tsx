import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import close from "@/assets/close.svg";
import metamask from "@/public/metamask.png";
import wc from "@/assets/wc.svg";
import coinbase from "@/assets/coinbase.svg";
import fb from "@/assets/fb.svg";
import twitter2 from "@/assets/twitter2.svg";
import discord2 from "@/assets/discord2.svg";
import google from "@/assets/google.svg";
import twitch from "@/assets/twitch.svg";
import gh from "@/assets/gh.svg";
import Image from "next/image";
import WalletButton from "./WalletButton";
import SocialButton from "./SocialButton";
import { useAccount, useConnect } from "wagmi";
import ReactGA from "react-ga4";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectNavbarSlice, setIsWalletModalOpen } from "@/store/navbarSlice";
import * as amplitude from "@amplitude/analytics-browser";
import { detectDevice, walletType } from "@/lib/helpers";
import { selectUserSlice } from "@/store/userSlice";

const WalletModal = (): JSX.Element => {
  const [connectingWalletId, setConnectingWalletId] = useState<string>("");
  const { connect, connectors } = useConnect();
  const emailRef = useRef<HTMLInputElement>(null);
  const { isWalletModalOpen } = useAppSelector(selectNavbarSlice);
  const dispatch = useAppDispatch();
  const { address, connector, isConnected } = useAccount();
  const { user } = useAppSelector(selectUserSlice);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "modal-bg") {
        dispatch(setIsWalletModalOpen(false));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    if (isConnected) {
      dispatch(setIsWalletModalOpen(false));
    }
  }, [dispatch, isConnected])

  useEffect(() => {
    if (address && connector && user.points) {
      amplitude.setUserId(address);
      
      amplitude.track("Wallet connected", {
        walletType: walletType[connector.id],
        walletAddress: address,
        points: user.points
      });
    }
  }, [address, connector, user.points])

  const connectionEvent = (id: string) => {
    ReactGA.event({
      category: "Connection",
      action: "Connecting wallet",
      label: id,
    });
  };

  const connectWallet = (id: string) => {
    connectionEvent(id);
    setConnectingWalletId(id);
    const selectedConnector = connectors.find((connector) => connector.id === id);
    if (selectedConnector) {
      localStorage.setItem("Fuse-selectedConnectorId", selectedConnector.id);
      connect({ connector: selectedConnector });
    }
  }

  return (
    <AnimatePresence>
      {isWalletModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 z-50 flex"
          id="modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="bg-white max-w-[95%] z-50 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 items-center flex flex-col min-h-[625px] md:min-h-[400px] w-[548px] pt-[47.5px] px-[62px] pb-[60px] md:px-5 md:py-8 rounded-[20px]"
          >
            <span className="flex w-full justify-between items-start">
              <p className="text-[20px] font-bold">
                Connect Wallet
              </p>
              <Image
                src={close}
                alt="close"
                className="cursor-pointer w-6 absolute top-[15px] right-5"
                onClick={() => {
                  dispatch(setIsWalletModalOpen(false));
                }}
              />
            </span>
            <span className="text-sm pt-2">
              <p>
                Connecting your wallet is like “logging in” to Web3. Select
                your wallet from the options to get started.
              </p>
              <a
                href="https://news.fuse.io/what-is-a-web3-wallet"
                target="_blank"
                className="text-[#1877F2] underline"
              >
                What is Web3 wallet?
              </a>
            </span>
            <div className="grid grid-cols-3 w-full pt-[43.5px] gap-2.5">
              <WalletButton
                icon={metamask}
                text="MetaMask"
                className="w-[35px]"
                id={detectDevice().isMobile ? "metaMaskSDK" : "injected"}
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet(detectDevice().isMobile ? "metaMaskSDK" : "injected")}
              />
              <WalletButton
                icon={wc}
                text="WalletConnect"
                className="w-[35px]"
                id="walletConnect"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("walletConnect")}
              />
              <WalletButton
                icon={coinbase}
                text="Coinbase"
                className="h-[30px]"
                id="coinbaseWallet"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("coinbaseWallet")}
              />
            </div>
            <div className="flex w-full justify-between text-[#9F9F9F] items-center pt-6 text-sm md:text-[10px]">
              <hr className="w-[37%]" />
              <p>or connect with</p>
              <hr className="w-[37%]" />
            </div>
            <div className="grid grid-cols-3 w-full pt-6 gap-x-2.5 gap-y-2">
              <SocialButton
                icon={google}
                className="bg-[#F3F3F3] h-[55px]"
                id="google"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("google")}
              />
              <SocialButton
                icon={fb}
                className="bg-[#F3F3F3] h-[55px]"
                id="facebook"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("facebook")}
              />
              <SocialButton
                icon={twitter2}
                className="bg-[#F3F3F3] h-[55px]"
                id="twitter"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("twitter")}
              />
              <SocialButton
                icon={discord2}
                className="bg-[#F3F3F3] h-[55px]"
                id="discord"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("discord")}
              />
              <SocialButton
                icon={twitch}
                className="bg-[#F3F3F3] h-[55px]"
                id="twitch"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("twitch")}
              />
              <SocialButton
                icon={gh}
                className="bg-[#F3F3F3] h-[55px]"
                id="github"
                connectingWalletId={connectingWalletId}
                onClick={() => connectWallet("github")}
              />
            </div>
            <div className="flex w-full justify-between text-[#9F9F9F] items-center pt-6 text-sm md:text-[10px]">
              <hr className="w-[40%]" />
              <p>or with email</p>
              <hr className="w-[40%]" />
            </div>
            <div className="flex w-full pt-6">
              <div className="flex bg-[#F2F2F2] p-2 w-2/3 rounded-[40px] h-[45px]">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="outline-none w-full bg-[#F2F2F2] text-base leading-none font-medium px-[29.21px] py-[14.5px] placeholder:text-text-dark-gray"
                  ref={emailRef}
                />
              </div>
              <button
                className="bg-black w-1/3 ml-2 text-white rounded-[40px] text-base leading-none font-bold h-[45px]"
                onClick={() => {
                  if (!emailRef.current || !emailRef.current.value.length) {
                    return
                  }
                  localStorage.setItem("Fuse-loginHint", emailRef.current.value);
                  connectWallet("email_passwordless");
                }}
              >
                Connect
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default WalletModal;
