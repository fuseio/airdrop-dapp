import { motion } from "framer-motion";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, convertTimestampToUTC, currentDate, daysInYear, eclipseAddress, isFloat, path, screenWidth, season2ClaimLaunchDate, season2LaunchDate } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { retrieve, selectUserSlice, setIsQuestModalOpen, setRetrieveTime, setSelectedQuest } from "@/store/userSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import AirdropLive from "./AirdropLive";
import Avatar from "@/components/ui/Avatar";
import star from "@/assets/star.svg";
import rightCaret from "@/assets/right-caret.svg";
import airdrop from "@/assets/airdrop.svg";
import bridgeFuse from "@/assets/bridge-fuse.svg";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import crownCircle from "@/assets/crown-circle.svg";
import Quest from "./Quest";
import fireTransparent from "@/assets/fire-transparent.svg";
import followX from "@/assets/follow-x.svg";
import holdTokens from "@/assets/hold-tokens.svg";
import ogWallet from "@/assets/og-wallet.svg";
import joinDiscord from "@/assets/join-discord.svg";
import stakeSfuse from "@/assets/stake-sfuse.svg";
import stakeVolt from "@/assets/stake-volt.svg";
import liquidityVoltage from "@/assets/liquidity-voltage.svg";
import sayGm from "@/assets/say-gm.svg";
import meridian from "@/assets/meridian.svg";
import logx from "@/assets/logx.svg";
import bitazza from "@/assets/bitazza.svg";
import zneakrz from "@/assets/zneakrz.svg";
import mirakle from "@/assets/mirakle.svg";
import joinTelegram from "@/assets/join-telegram.svg";
import voltApp from "@/assets/volt-app.svg";
import goodDollar from "@/public/gooddollar.png";
import goodDollarCircle from "@/assets/gooddollar-circle.svg";
import voltWallet from "@/assets/volt-wallet.svg";
import voltWalletTwoLines from "@/assets/volt-wallet-two-lines.svg";
import dementedRoulette from "@/assets/demented-roulette.svg";
import { EcosystemApps, Quests } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";
import questionMarkCircle from "@/assets/question-mark-circle.svg";
import voltage from "@/assets/voltage.svg";

const isMultiplyPointNotice = false;

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isGeneratingTwitterAuthUrl, twitterAuthUrl, user, retrieveTime } = useAppSelector(selectUserSlice);
  const router = useRouter();
  const searchParams = useSearchParams();
  const twitterConnected = searchParams.get('twitter-connected');
  const [isTwitterConnectedError, setIsTwitterConnectedError] = useState(false);
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const { isIntersecting: isUserSectionIntersecting, ref: userSection } = useIntersectionObserver({
    freezeOnceVisible: true,
  });
  const { isIntersecting: isEarningSectionIntersecting, ref: earningSection } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  const [quests, setQuests] = useState<Quests>([
    {
      id: "followFuseOnTwitter",
      title: "Follow Fuse on X",
      point: "50 points",
      description: "Get 50 point for following an official Fuse Network X account",
      image: followX,
      isActive: true,
      button: "Go to X",
      isFunction: true,
    },
    {
      id: "telegramSubscription",
      title: "Join Fuse Telegram",
      heading: "Join Fuse Telegram channel",
      point: "50 points",
      description: "Get 50 point for joining an official Fuse Network Telegram channel  \n**Verify the quest 1 hour after completing it on Layer3**",
      image: joinTelegram,
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/join-fuse-telegram",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "telegram",
    },
    {
      id: "numOfTokens",
      title: "Holding more than 2 different tokens",
      point: "10 points",
      description: "Get 10 point by holding more than 2 different tokens on your wallet.\nPoints are awarded automatically when the conditions are met.",
      image: holdTokens,
      isActive: true,
    },
    {
      id: "walletAge",
      title: "You're an OG! - Wallet older then a year",
      point: "10 points",
      image: ogWallet,
      isActive: true,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/sFUSE",
    },
    {
      id: "goodDollar",
      title: "Claim G$ on GoodDapp",
      heading: "Get points daily for G$ claiming",
      point: "30 points per claim",
      description: "To get 30 points daily, you need to take 6 steps:  \n**Step 1:**\nGo to quest on the Layer3 platform  \n**Step 2:**\nConnect to Layer3 a wallet participating in the airdrop  \n**Step 3:**\nGo to GoodDapp  \n**Step 4:**\nClaim G$ token on Fuse Network  \n**Step 5:**\nVerify quest completion on the Layer3  \n**Step 6:**\nRepeat every day. After 5 claims, the quest will renew automatically and allow you to claim more and more.  \n**Verify the quest 1 hour after completing it on Layer3**",
      image: goodDollarCircle,
      isActive: true,
      isHidden: currentDate < season2LaunchDate,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/streaks/claim-dollarg",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "gooddollar",
      imageHeight: "h-[100px]"
    },
    {
      id: "exploreMirakle",
      title: "Explore Mirakle on Fuse",
      heading: "Explore Mirakle on Fuse Network",
      point: "100 points",
      description: "Explore Mirakle DEX capabilities and get 100 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
      image: mirakle,
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/explore-mirakle-on-fuse-network",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "mirakle",
      imageHeight: "h-[100px]"
    },
    {
      id: "exploreVoltWallet",
      title: "Explore Volt wallet",
      heading: "Explore Volt mobile wallet",
      point: "200 points",
      description: "The Volt wallet is the best mobile solution for interacting with the Fuse network, as it is built and developed by the Fuse team. Explore its features and get 200 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
      image: voltWalletTwoLines,
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/discover-volt-wallet",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "explore-volt-wallet",
      imageHeight: "h-[100px]"
    },
    {
      id: "depositInVoltApp",
      title: "Top-up Volt with $10",
      point: "500 points",
      heading: "Top-up Volt with 10 USDC using fiat-on-ramp",
      description: "Get 500 points by topping up your Volt wallet directly from your bank account or credit card  \n**Verify the quest 1 hour after completing it on Layer3**",
      image: voltWalletTwoLines,
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/deposit-10-usdc-on-volt-app",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "deposit-in-volt-app",
      imageHeight: "h-[100px]"
    },
    {
      id: "joinDiscord",
      title: "Join Fuse Discord",
      image: joinDiscord,
      point: "50 points",
      description: "Get 50 point for joining an official Fuse network Discord channel  \n**Verify the quest 1 hour after completing it on Layer3**",
      isActive: false,
      isHidden: currentDate >= season2LaunchDate,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/join-fuse-discord",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
    },
    {
      id: "say-gm",
      title: "Say GM in Discord",
      image: sayGm,
      isHidden: currentDate >= season2LaunchDate,
    },
    {
      id: "voltApp",
      title: "Deposit at least 10$ to the Volt App",
      heading: "Buy $10 or more through the fiat-on-ramp",
      point: "500 points",
      description: "To get 500 points you need to take 3 simple steps:  \n**Step 1**\nInstall the Volt app to your mobile device  \n**Step 2**\nCreate a wallet  \n**Step 3**\nBuy at least $10 in USDC or FUSE tokens through one of the fiat-on-ramp services.",
      image: voltApp,
      isActive: false,
      isHidden: currentDate >= season2LaunchDate,
      button: "Get Volt app",
      link: "https://voltage.finance/mobile",
    },
  ])

  const [multiplyQuests] = useState<Quests>([
    {
      id: "liquidityVoltage",
      title: "Provide Liquidity to Voltage v3",
      heading: "Multiply your points by providing liquidity on Voltage DEX",
      point: "8 points per $1 in pool daily",
      description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by putting bridged funds in any V3 liquidity pool on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
      image: currentDate >= season2LaunchDate ? voltage : liquidityVoltage,
      isActive: true,
      button: "Go to Voltage",
      link: "https://voltage.finance/pool?filter=v3",
      padding: "py-6 pl-6 pr-2",
      imageHeight: currentDate >= season2LaunchDate ? "h-[100px]" : undefined,
    },
    {
      id: "staking-sFuse",
      title: "Stake FUSE to get s(FUSE)",
      heading: "Multiply your points by staking FUSE token on Voltage DEX",
      point: "8 points per $1 staked daily",
      description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a FUSE token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
      image: currentDate >= season2LaunchDate ? voltage : stakeSfuse,
      isActive: true,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/sFUSE",
      imageHeight: currentDate >= season2LaunchDate ? "h-[100px]" : undefined,
    },
    {
      id: "staking-veVolt",
      title: "Stake VOLT for veVOLT",
      heading: "Multiply your points by staking VOLT token on Voltage DEX",
      point: "8 points per $1 staked daily",
      description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a VOLT token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
      image: currentDate >= season2LaunchDate ? voltage : stakeVolt,
      isActive: true,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/veVOLT",
      imageHeight: currentDate >= season2LaunchDate ? "h-[100px]" : undefined,
    },
    {
      id: "stakeFuseOnVolt",
      title: "Stake FUSE on Volt",
      heading: "Stake FUSE on Volt wallet",
      point: "2 points per $1 staked daily",
      description: "Get an additional benefits by participating in the Airdrop with the Volt wallet  \n**Step 1**\nJoin the Airdrop with Volt app  \n**Step 2**\nGo to Earn tab  \n**Step 3**\nStake any amount of FUSE tokens to get 2 points per $1 staked every day",
      image: voltWalletTwoLines,
      isActive: true,
      isHidden: currentDate < season2LaunchDate,
      button: "Go to Volt",
      link: "https://get.voltage.finance/ThLA",
      imageHeight: "h-[100px]"
    },
    {
      id: "meridian",
      title: "Lend on Meridian",
      point: "8 points per $1 in pool daily",
      heading: "Multiply your points by lend your funds on Meridian",
      description: "Lend on Meridian & Multiply your points easily with these quick steps  \n**Step 1**\nBridge funds to Fuse Network using the Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nVisit the Meridian Finance lending markets  \n**Step 3**\nDouble your points by lending bridged funds in any market = 8 points per $1 of the bridged funds, available once per day.",
      image: meridian,
      isActive: true,
      button: "Go to Meridian Lend",
      link: "https://lend.meridianfinance.net/markets/",
      imageHeight: "h-[100px]"
    },
    {
      id: "dementedRoulette",
      title: "Play Demented Roulette",
      point: "More play - more points",
      pointModal: "The more play, the more points get",
      description: "Earn tons of points and win WFUSE by playing the Demented Roulette!  \n**Step 1**\nGo to Demented Roulette  \n**Step 2**\nWin WFUSE and earn unlimited points by playing every round  \n**Step 3**\nPoints earned in roulette will be added to Airdrop points in a 1:1 ratio  \n**You can claim your points from roulette at any time**",
      image: dementedRoulette,
      isActive: true,
      button: "Let's Play",
      link: "https://demented.games/",
      buttonTwo: "Claim coming soon",
      isDisabledTwo: true,
      isFunctionTwo: true,
      imageHeight: "h-[100px]"
    },
    {
      id: "logX",
      title: "Provide Liquidity on LogX",
      heading: "Multiply your points by providing Liquidity on LogX",
      point: "8 points per $1 in pool daily",
      description: "Follow these steps:  \n**Step 1**\nBridge USDT to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nGo to LogX and buy LLP tokens  \n**Step 3**\nDouble your points by staking LLP on LogX Liquidity Pool.  \n**Bonus**\nEarn protocol income and claimable USDT rewards.",
      image: logx,
      isActive: false,
      isHidden: currentDate >= season2LaunchDate,
      button: "Go to LogX",
      link: "https://app.logx.trade/liquidity",
      imageHeight: "h-[100px]"
    },
    {
      id: "bitazza",
      title: "Create a wallet on Bitazza",
      image: bitazza,
      isHidden: currentDate >= season2LaunchDate,
    },
    {
      id: "zneakrz",
      title: "Create a wallet on Zneakrz",
      image: zneakrz,
      isHidden: currentDate >= season2LaunchDate,
    },
  ])

  const [ecosystemApps] = useState<EcosystemApps>([
    {
      name: "Voltage",
      description: "Trade, invest, and earn with just a few clicks",
      image: voltage,
      background: "bg-[url('/vectors/voltage-gradient.svg')]",
      beforeBackground: "before:bg-[url('/vectors/voltage-gradient.svg')]",
      quests: [
        {
          id: "liquidityVoltage",
          title: "Provide Liquidity to Voltage v3",
          heading: "Multiply your points by providing liquidity on Voltage DEX",
          point: "8 points per $1 in pool daily",
          description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by putting bridged funds in any V3 liquidity pool on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          button: "Go to Voltage",
          link: "https://voltage.finance/pool?filter=v3",
        },
        {
          id: "staking-sFuse",
          title: "Stake FUSE to get s(FUSE)",
          heading: "Multiply your points by staking FUSE token on Voltage DEX",
          point: "8 points per $1 staked daily",
          description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a FUSE token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          button: "Go to Voltage",
          link: "https://app.voltage.finance/stake/sFUSE",
        },
        {
          id: "staking-veVolt",
          title: "Stake VOLT for veVOLT",
          heading: "Multiply your points by staking VOLT token on Voltage DEX",
          point: "8 points per $1 staked daily",
          description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a VOLT token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          button: "Go to Voltage",
          link: "https://app.voltage.finance/stake/veVOLT",
        },
      ]
    },
    {
      name: "Meridian",
      description: "Trade, invest, and earn with just a few clicks",
      image: meridian,
      background: "bg-[url('/vectors/meridian-gradient.svg')]",
      beforeBackground: "before:bg-[url('/vectors/meridian-gradient.svg')]",
      quests: [
        {
          id: "meridian",
          title: "Lend on Meridian",
          point: "8 points per $1 in pool daily",
          heading: "Multiply your points by lend your funds on Meridian",
          description: "Lend on Meridian & Multiply your points easily with these quick steps  \n**Step 1**\nBridge funds to Fuse Network using the Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nVisit the Meridian Finance lending markets  \n**Step 3**\nDouble your points by lending bridged funds in any market = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          button: "Go to Meridian Lend",
          link: "https://lend.meridianfinance.net/markets/",
        },
      ]
    },
    {
      name: "GoodDollar",
      description: "Trade, invest, and earn with just a few clicks",
      image: goodDollar,
      background: "bg-[url('/vectors/gooddollar-gradient.svg')]",
      beforeBackground: "before:bg-[url('/vectors/gooddollar-gradient.svg')]",
      quests: [
        {
          id: "goodDollar",
          title: "Claim G$ on GoodDapp",
          heading: "Get points daily for G$ claiming",
          point: "30 points per claim",
          description: "To get 30 points daily, you need to take 6 simple steps:  \n**Step 1:**\nGo to quest on the Layer3 platform  \n**Step 2:**\nConnect to Layer3 a wallet participating in the airdrop  \n**Step 3:**\nGo to GoodDapp  \n**Step 4:**\nClaim G$ token on Fuse Network  \n**Step 5:**\nVerify quest completion on the Layer3  \n**Step 6:**\nRepeat every day. After 5 claims, the quest will renew automatically and allow you to claim more and more.",
          isActive: NEXT_PUBLIC_ENVIRONMENT === "staging",
          button: "Go to Meridian Lend",
          link: "https://app.layer3.xyz/streaks/claim-dollarg",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          imageHeight: "h-[100px]"
        },
      ]
    },
    {
      name: "Volt Wallet",
      description: "Trade, invest, and earn with just a few clicks",
      image: voltWallet,
      background: "bg-[url('/vectors/voltage-gradient.svg')]",
      beforeBackground: "before:bg-[url('/vectors/voltage-gradient.svg')]",
      quests: [
        {
          id: "stakeFuseOnVolt",
          title: "Stake FUSE on Volt",
          heading: "Stake FUSE on Volt wallet",
          point: "2 points per $1 staked daily",
          description: "Get an additional benefits by participating in the Airdrop with the Volt wallet  \n**Step 1**\nJoin the Airdrop with Volt app  \n**Step 2**\nGo to Earn tab  \n**Step 3**\nStake any amount of FUSE tokens to get 2 points per $1 staked every day",
          isActive: true,
          button: "Go to Volt",
          link: "https://get.voltage.finance/gBMb",
        },
      ]
    },
  ])

  function referralLink() {
    const host = !IS_SERVER ? window?.location?.host : ""
    return `${host}?ref=${user.referralCode}`
  }

  useEffect(() => {
    const RETRIEVE_DIFFERENCE_IN_MILLISECONDS = 600000;

    function retrieveUser() {
      const currentTime = new Date();
      const retrieveUserTime = new Date(retrieveTime);
      if ((currentTime.getTime() - retrieveUserTime.getTime()) > RETRIEVE_DIFFERENCE_IN_MILLISECONDS) {
        dispatch(retrieve());
        dispatch(setRetrieveTime());
      }
    }

    const intervalId = setInterval(() => retrieveUser, RETRIEVE_DIFFERENCE_IN_MILLISECONDS);

    return () => {
      clearInterval(intervalId);
    }
  }, [dispatch, retrieveTime])

  useEffect(() => {
    setQuests((prevQuests) => {
      const newQuests = [...prevQuests];
      newQuests.map((newQuest) => {
        user.completedQuests?.map((completedQuest) => {
          let completedQuestId = completedQuest.type;
          if (completedQuest.stakingType) {
            completedQuestId = `${completedQuest.type}-${completedQuest.stakingType}`;
          }
          if (newQuest.id === completedQuestId) {
            newQuest.completed = true;
          }
        })
        return newQuest;
      });
      return newQuests;
    })
  }, [user.completedQuests])

  useEffect(() => {
    const twitterQuestId = "followFuseOnTwitter";
    let twitterQuest = quests.find((quest) => quest.id === twitterQuestId);
    if (twitterQuest) {
      twitterQuest = { ...twitterQuest };
      twitterQuest.isLoading = isGeneratingTwitterAuthUrl;
      dispatch(setSelectedQuest(twitterQuest));
    }
  }, [dispatch, isGeneratingTwitterAuthUrl, quests])

  useEffect(() => {
    const twitterQuestId = "followFuseOnTwitter";
    let twitterQuest = quests.find((quest) => quest.id === twitterQuestId);
    if (twitterQuest) {
      twitterQuest = { ...twitterQuest };
      twitterQuest.button = isTwitterConnectedError ? "Retry" : "Go to X";
      dispatch(setSelectedQuest(twitterQuest));
    }
  }, [dispatch, isTwitterConnectedError, quests])

  useEffect(() => {
    if (twitterConnected === "true") {
      dispatch(retrieve());
      router.replace(path.HOME);
    } else if (twitterConnected === "false") {
      setIsTwitterConnectedError(true);
      router.replace(path.HOME);
    }
  }, [dispatch, router, twitterConnected])

  useEffect(() => {
    if (twitterAuthUrl) {
      router.push(twitterAuthUrl);
    }
  }, [router, twitterAuthUrl])

  return (
    <motion.div
      className="w-8/9 flex flex-col mt-[65px] mb-[187px] xl:mt-[52px] xl:mb-[150px] xl:w-9/12 md:w-9/10 max-w-7xl"
      key="dashboard"
      initial={{
        y: 300,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      exit={{
        y: -300,
        opacity: 0
      }}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-5xl xl:text-4xl md:text-3xl text-white font-semibold md:max-w-[198px] md:break-all md:truncate">
          Hey, {eclipseAddress(user.walletAddress)}
        </h1>
        <AirdropLive />
      </div>
      <div ref={userSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row lg:flex-col justify-between items-center lg:items-start lg:gap-[74px] bg-oslo-gray/[.22] rounded-[20px] mt-11 mb-[100px] xl:mb-11 p-[42px] xl:p-9 ${isUserSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
        <div className="flex flex-row justify-between items-center w-1/2 lg:w-auto">
          <div className="flex flex-row items-center gap-10">
            <div className="relative">
              <Avatar size={matches ? 95 : 77} />
              {(user.walletAgeInDays && user.walletAgeInDays > daysInYear) &&
                <div className="absolute -top-2 -right-2">
                  <div className="group relative">
                    <Image
                      src={crownCircle}
                      alt="crown circle"
                    />
                    <div className="tooltip-text hidden absolute translate-x-1/2 -translate-y-1/2 top-[calc(-50%-30px)] right-1/2 bg-white p-6 rounded-2xl w-[250px] xl:w-[200px] shadow-lg group-hover:block text-black text-sm font-medium">
                      <p>
                        You&apos;re an OG! your wallet is more than 1 year old
                      </p>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div>
              <p className="text-lg xl:text-base leading-none text-pale-slate font-medium">
                Your points
              </p>
              <div className="flex items-center gap-1.5 mt-6 xl:mt-2 mb-2">
                <Image
                  src={star}
                  alt="star"
                  width={30}
                  height={30}
                  className="mb-0.5"
                />
                <p className="text-5xl xl:text-4xl md:text-3xl leading-none text-white font-bold">
                  {isFloat(user.points) ? user.points.toFixed(2) : user.points}
                </p>
              </div>
              <div className="flex md:flex-col items-center md:items-start gap-2">
                <p className="text-sm xl:text-xs leading-none text-pale-slate font-medium xl:max-w-28">
                  Last update {convertTimestampToUTC(user.pointsLastUpdatedAt)}
                </p>
                {NEXT_PUBLIC_ENVIRONMENT === "staging" &&
                  <div className="group relative cursor-pointer flex justify-center items-center mb-1">
                    <Image
                      src={questionMarkCircle}
                      alt="question mark"
                    />
                    <div className="tooltip-text-up hidden top-8 absolute bg-white p-6 rounded-2xl w-[290px] shadow-lg group-hover:block text-black text-sm font-medium">
                      <p>
                        Points calculation updated every 24 hours. Next update {convertTimestampToUTC(user.nextRewardDistributionTime)}
                      </p>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="lg:hidden">
            <p className="text-lg xl:text-base leading-none text-pale-slate font-medium">
              Your Rank
            </p>
            <p className="text-5xl xl:text-4xl leading-none text-white font-bold mt-6 xl:mt-2 mb-2">
              {user.leaderboardPosition}
            </p>
            <Link
              href={path.LEADERBOARD}
              className="group flex items-center gap-1 text-sm xl:text-xs leading-none text-pale-slate font-medium"
            >
              View Leaderboard
              <Image
                src={rightCaret}
                alt="right caret"
                width={7}
                height={13}
                className="transition ease-in-out group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center gap-[42px] md:gap-9">
          <Image
            src={airdrop}
            alt="airdrop"
            width={matches ? 94 : 75}
            height={matches ? 128 : 102}
          />
          {currentDate >= season2ClaimLaunchDate ?
            <div className="flex flex-col justify-between items-start gap-2.5">
              <p className="text-2xl xl:text-xl leading-none text-white font-bold">
                Claim reward for Season 1
              </p>
              <p className="text-sm text-pale-slate font-medium max-w-[254px]">
                You can claim your tokens now!
              </p>
              <button
                className="transition ease-in-out bg-primary border border-primary rounded-full xl:text-sm text-black leading-none font-semibold mt-[5px] px-9 py-4 xl:px-7 xl:py-2.5 md:px-5 hover:bg-transparent hover:text-primary"
                onClick={() => router.push(path.CLAIM)}
              >
                Claim your tokens
              </button>
            </div> :
            <div className="flex flex-col justify-between items-start gap-2.5">
              <p className="text-2xl xl:text-xl leading-none text-white font-bold">
                Reward for the Season 1 is coming
              </p>
              <p className="text-sm text-pale-slate font-medium max-w-[254px]">
                Claiming will be available very soon, we are calculating your rewards
              </p>
              <button
                className="transition ease-in-out bg-transparent border border-primary rounded-full xl:text-sm text-primary leading-none font-semibold mt-[5px] px-9 py-4 xl:px-7 xl:py-2.5 md:px-5"
                disabled
              >
                Coming Soon
              </button>
            </div>
          }
        </div>
      </div>
      <div className="flex flex-col gap-8 xl:gap-6">
        <p className="text-3xl xl:text-2xl text-white font-semibold">
          Start earning points
        </p>
        <div ref={earningSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row md:flex-col gap-[30px] xl:gap-5 ${isEarningSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <CardContainer containerClassName="block p-0 w-1/2 md:w-auto min-h-[283px] xl:min-h-56" className="block h-full">
            <CardBody className="bg-oslo-gray/[.22] rounded-[20px] flex md:flex-col justify-between md:gap-4 p-10 xl:p-[30px] w-auto h-full">
              <div className="flex flex-col justify-between md:gap-2">
                <div className="flex flex-col gap-4 xl:gap-3 md:gap-2">
                  <CardItem
                    as="p"
                    translateZ="50"
                    className="text-2xl xl:text-xl text-primary font-bold"
                  >
                    Bridge FUSE
                  </CardItem>
                  <CardItem
                    as="p"
                    translateZ="60"
                    className="text-lg xl:text-base text-pale-slate font-medium max-w-[200px] md:max-w-[243px]"
                  >
                    Get 4 points daily on every $1 you bridge to Fuse
                  </CardItem>
                </div>
                <div>
                  <CardItem translateZ="80">
                    <button
                      className="transition ease-in-out border border-primary rounded-full text-primary leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 hover:bg-primary hover:text-black"
                      onClick={() => {
                        dispatch(setIsQuestModalOpen(true));
                        dispatch(setSelectedQuest({
                          id: "bridge",
                          title: "Bridge FUSE",
                          heading: "Bridge to Fuse Network",
                          point: "4 point per 1 USD bridged",
                          image: bridgeFuse,
                          isActive: true,
                          button: "Go to the Bridge",
                          link: "https://console.fuse.io/bridge",
                        }));
                      }}
                    >
                      Learn More
                    </button>
                  </CardItem>
                </div>
              </div>
              <CardItem
                translateZ="40"
                className="md:m-auto"
              >
                <Image
                  src={bridgeFuse}
                  alt="bridge Fuse"
                  width={matches ? 284 : 227}
                  height={matches ? 209 : 167}
                />
              </CardItem>
            </CardBody>
          </CardContainer>
          <CardContainer containerClassName="block p-0 w-1/2 md:w-auto min-h-[283px] xl:min-h-56 md:min-h-[430px]" className="block h-full md:min-h-[430px]">
            <CardBody className="bg-oslo-gray/[.22] rounded-[20px] flex flex-col justify-between md:justify-start xl:gap-2 md:gap-12 p-10 xl:p-[30px] w-auto h-full md:min-h-[430px] bg-[url('/vectors/globe.svg')] md:bg-[url('/vectors/globe-mobile.svg')] bg-no-repeat bg-right-bottom md:bg-bottom xl:bg-contain">
              <div className="flex flex-col gap-4 xl:gap-3">
                <CardItem
                  as="p"
                  translateZ="50"
                  className="text-2xl xl:text-xl text-primary font-bold"
                >
                  Invite friends
                </CardItem>
                <CardItem
                  as="p"
                  translateZ="60"
                  className="text-lg xl:text-base text-pale-slate font-medium max-w-[243px]"
                >
                  Get 20% of your friend&apos;s total points
                </CardItem>
              </div>
              <div className="flex flex-col gap-2.5 xl:gap-2">
                <CardItem
                  as="p"
                  translateZ="40"
                  className="text-sm xl:text-xs text-pale-slate font-medium"
                >
                  Invite link
                </CardItem>
                <div className="flex items-center gap-1.5 xl:gap-1">
                  <CardItem
                    as="p"
                    translateZ="70"
                    className="text-2xl xl:text-xl text-white font-bold md:max-w-[243px]"
                  >
                    {referralLink()}
                  </CardItem>
                  <CardItem translateZ="80">
                    <Copy
                      src={copyIcon}
                      text={referralLink()}
                      tooltipText="Referral link copied"
                      className="transition ease-in-out cursor-pointer hover:opacity-60"
                    />
                  </CardItem>
                </div>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      <div className="flex flex-col gap-8 xl:gap-6 mt-24 xl:mt-16">
        <p className="text-3xl xl:text-2xl text-white font-semibold">
          {currentDate >= season2LaunchDate ?
            'Explore Fuse and ecosystem projects' :
            'Complete quests to receive points'
          }
        </p>
        <div className="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
          {quests.map((quest) => {
            if (quest.id === "walletAge" && !quest.completed) {
              return
            }
            if (quest.isHidden) {
              return
            }
            return (
              <Quest key={quest.title} quest={quest} />
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-8 xl:gap-6 mt-24 xl:mt-16">
        <div className="flex items-center gap-2.5">
          {currentDate < season2LaunchDate &&
            <Image
              src={fireTransparent}
              alt="fire"
            />
          }
          <div className="flex md:flex-col items-end md:items-start gap-x-9">
            <p className="text-3xl xl:text-2xl text-white font-semibold">
              Multiply your points!
            </p>
            {(NEXT_PUBLIC_ENVIRONMENT === "staging" && isMultiplyPointNotice) &&
              <p className="text-lg text-buff">
                <span className="font-bold">Notice</span> you have 0 points to multiply! Please bridge to receive points.
              </p>
            }
          </div>
        </div>
        <div className="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
          {multiplyQuests.map((multiplyQuest) => {
            if (multiplyQuest.isHidden) {
              return
            }
            return (
              <Quest key={multiplyQuest.title} quest={multiplyQuest} />
            )
          }
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard;
