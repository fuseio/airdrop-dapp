import { motion } from "framer-motion";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, convertTimestampToUTC, currentDate, daysInYear, eclipseAddress, isFloat, path, screenWidth, season2ClaimLaunchDate, season2LaunchDate, sortEvenFirst } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { retrieve, selectUserSlice, setIsBoostModalOpen, setIsQuestModalOpen, setRetrieveTime, setSelectedQuest } from "@/store/userSlice";
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
import { EcosystemApps, Quests } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";
import questionMarkCircle from "@/assets/question-mark-circle.svg";
import dementedGamesColor from "@/assets/demented-games-color.svg";
import followXColor from "@/assets/follow-x-color.svg";
import holdTokensColor from "@/assets/hold-tokens-color.svg";
import joinDiscordColor from "@/assets/join-discord-color.svg";
import joinTelegramColor from "@/assets/join-telegram-color.svg";
import ogWalletColor from "@/assets/og-wallet-color.svg";
import shoebillFinanceColor from "@/assets/shoebill-finance-color.svg";
import voltWalletColor from "@/assets/volt-wallet-color.svg";
import voltageColor from "@/assets/voltage-color.svg";
import goodDollarColor from "@/public/gooddollar-color.png";
import logxColor from "@/public/logx-color.png";
import meridianColor from "@/public/meridian-color.png";
import mirakleColor from "@/public/mirakle-color.png";
import EcosystemAppItem from "./EcosystemApp";
import BoostModal from "./BoostModal";

const isMultiplyPointNotice = false;
const isNextUpdateInfo = false;
const ecosystemAppBackgrounds = {
  green: {
    background: "bg-[url('/vectors/multiply-quest-green-gradient.svg')]",
    beforeBackground: "before:bg-[url('/vectors/multiply-quest-green-gradient.svg')]",
  },
  blue: {
    background: "bg-[url('/vectors/multiply-quest-blue-gradient.svg')]",
    beforeBackground: "before:bg-[url('/vectors/multiply-quest-blue-gradient.svg')]",
  }
}

const Dashboard = () => {
  const dispatch = useAppDispatch();
  const { isGeneratingTwitterAuthUrl, twitterAuthUrl, isUser, user, retrieveTime } = useAppSelector(selectUserSlice);
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
      title: "Follow @Fuse_network on X",
      point: "50 points",
      description: "Get 50 point for following an official Fuse Network X account",
      image: followXColor,
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
      image: joinTelegramColor,
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/join-fuse-telegram",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "telegram",
    },
    {
      id: "joinFuseDiscord",
      title: "Join Fuse Discord",
      image: joinDiscordColor,
      point: "50 points",
      description: "Get 50 point for joining an official Fuse network Discord channel  \n**Verify the quest 1 hour after completing it on Layer3**",
      isActive: true,
      button: "Go to Quest",
      link: "https://app.layer3.xyz/quests/join-fuse-discord",
      buttonTwo: "Verify Quest",
      isFunctionTwo: true,
      endpointTwo: "join-fuse-discord",
    },
    {
      id: "numOfTokens",
      title: "Holding more than 2 different tokens",
      point: "10 points",
      description: "Get 10 point by holding more than 2 different tokens on your wallet.\nPoints are awarded automatically when the conditions are met.",
      image: holdTokensColor,
      isActive: true,
    },
    {
      id: "walletAge",
      title: "You're an OG! - Wallet older then a year",
      point: "10 points",
      image: ogWalletColor,
      isActive: true,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/sFUSE",
    },
  ])

  const [ecosystemApps] = useState<EcosystemApps>([
    {
      name: "Voltage",
      description: "Trade, invest, and earn with just a few clicks",
      image: voltageColor,
      quests: [
        {
          id: "liquidityVoltage",
          title: "Provide Liquidity to Voltage v3",
          heading: "Multiply your points by providing liquidity on Voltage DEX",
          point: "12 points per $1 in pool daily",
          unBoostedPoint: "8 points per $1 in pool daily",
          description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by putting bridged funds in any V3 liquidity pool on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          isBoosted: true,
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
      description: "Lending and borrowing have never been so easy",
      image: meridianColor,
      quests: [
        {
          id: "meridian",
          title: "Lend on Meridian",
          point: "12 points per $1 in pool daily",
          unBoostedPoint: "8 points per $1 in pool daily",
          heading: "Multiply your points by lend your funds on Meridian",
          description: "Lend on Meridian & Multiply your points easily with these quick steps  \n**Step 1**\nBridge funds to Fuse Network using the Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nVisit the Meridian Finance lending markets  \n**Step 3**\nDouble your points by lending bridged funds in any market = 8 points per $1 of the bridged funds, available once per day.",
          isActive: true,
          isBoosted: true,
          button: "Go to Meridian Lend",
          link: "https://lend.meridianfinance.net/markets/",
        },
        {
          id: "borrowOnMeridian",
          title: "Borrow on Meridian",
          point: "12 points per $1 borrowed",
          heading: "Triple your points by borrowing funds on Meridian",
          description: "Borrow any asset on Meridian to get 12 points per $1 borrowed every day.  \n**Points will begin to accrue 24 hours after the borrow transaction.**",
          isActive: true,
          button: "Go to Meridian Borrow",
          link: "https://lend.meridianfinance.net/borrow/",
        },
      ]
    },
    {
      name: "Volt Wallet",
      description: "Discover the best non-custodial smart-contract wallet",
      image: voltWalletColor,
      quests: [
        {
          id: "exploreVoltWallet",
          title: "Explore Volt wallet",
          heading: "Explore Volt mobile wallet",
          point: "200 points",
          description: "The Volt wallet is the best mobile solution for interacting with the Fuse network, as it is built and developed by the Fuse team. Explore its features and get 200 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
          isActive: true,
          button: "Go to Quest",
          link: "https://app.layer3.xyz/quests/discover-volt-wallet",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          endpointTwo: "explore-volt-wallet",
        },
        {
          id: "depositInVoltApp",
          title: "Top-up Volt with $10",
          point: "500 points",
          heading: "Top-up Volt with 10 USDC using fiat-on-ramp",
          description: "Get 500 points by topping up your Volt wallet directly from your bank account or credit card  \n**Verify the quest 1 hour after completing it on Layer3**",
          isActive: true,
          button: "Go to Quest",
          link: "https://app.layer3.xyz/quests/deposit-10-usdc-on-volt-app",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          endpointTwo: "deposit-in-volt-app",
        },
        {
          id: "stakeFuseOnVolt",
          title: "Stake FUSE on Volt",
          heading: "Stake FUSE on Volt wallet",
          point: "2 points per $1 staked daily",
          description: "Get an additional benefits by participating in the Airdrop with the Volt wallet  \n**Step 1**\nJoin the Airdrop with Volt app  \n**Step 2**\nGo to Earn tab  \n**Step 3**\nStake any amount of FUSE tokens to get 2 points per $1 staked every day",
          isActive: true,
          button: "Go to Volt",
          link: "https://get.voltage.finance/ThLA",
        },
      ]
    },
    {
      name: "LogX",
      description: "Seamless perpetual trading",
      image: logxColor,
      quests: [
        {
          id: "exploreLogXOnFuse",
          title: "Explore LogX on Fuse",
          heading: "Explore LogX on Fuse Network",
          point: "200 points",
          description: "Explore the earning and trading capabilities of LogX DEX and get 200 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
          isActive: true,
          button: "Go to Quest",
          link: "https://app.layer3.xyz/quests/logx-on-fuse",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          endpointTwo: "explore-logx-on-fuse",
        },
        {
          id: "provideLogXLiquidity",
          title: "Provide Liquidity on LogX",
          heading: "Multiply your points by providing Liquidity on LogX",
          point: "8 points per $1 in pool daily",
          description: "Follow these steps:  \n**Step 1**\nBridge USDT to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nGo to LogX and buy LLP tokens  \n**Step 3**\nDouble your points by staking LLP on LogX Liquidity Pool.  \n**Bonus**\nEarn protocol income and claimable USDT rewards.",
          isActive: true,
          button: "Go to LogX",
          link: "https://app.logx.trade/liquidity",
        },
      ]
    },
    {
      name: "Mirakle",
      description: "Spot and perpetual futures trading for traders",
      image: mirakleColor,
      quests: [
        {
          id: "exploreMirakle",
          title: "Explore Mirakle on Fuse",
          heading: "Explore Mirakle on Fuse Network",
          point: "100 points",
          description: "Explore Mirakle DEX capabilities and get 100 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
          isActive: true,
          button: "Go to Quest",
          link: "https://app.layer3.xyz/quests/explore-mirakle-on-fuse-network",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          endpointTwo: "mirakle",
        },
      ]
    },
    {
      name: "Shoebill",
      description: "Trade, invest, and earn with just a few clicks",
      image: shoebillFinanceColor,
      quests: [
        {
          id: "exploreShoebillOnFuse",
          title: "Explore Shoebill on Fuse",
          heading: "Explore Shoebill Finance on Fuse Network",
          point: "200 points per claim",
          description: "Explore Shoebill Finance capabilities and get 200 points.  \n**Verify the quest 1 hour after completing it on Layer3**",
          isActive: true,
          button: "Go to Quest",
          link: "https://app.layer3.xyz/quests/explore-shoebill-finance-on-fuse-network",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          endpointTwo: "explore-shoebill-on-fuse",
        },
      ]
    },
    {
      name: "Demented Games",
      description: "Play, win WFUSE and get unlimited points",
      image: dementedGamesColor,
      quests: [
        {
          id: "dementedRoulette",
          title: "Play Demented Roulette",
          point: "Play to earn unlimited points",
          pointModal: "The more play, the more points get",
          description: "Earn tons of points and win WFUSE by playing the Demented Roulette!  \n**Step 1**\nGo to Demented Roulette  \n**Step 2**\nWin WFUSE and earn unlimited points by playing every round  \n**Step 3**\nPoints earned in roulette are added to Airdrop points in a 1:10 ratio - 1 airdrop point for every 10 roulette points.  \n**You can claim your points from roulette at any time**",
          isActive: true,
          button: "Let's Play",
          link: "https://demented.games/",
          buttonTwo: "Claim points",
          successButtonTwo: "Successfully claimed",
          isFunctionTwo: true,
          endpointTwo: "demented-roulette",
        },
      ]
    },
    {
      name: "GoodDollar",
      description: "Meet one of the largest communities at Fuse",
      image: goodDollarColor,
      quests: [
        {
          id: "goodDollar",
          title: "Claim G$ on GoodDapp",
          heading: "Get points daily for G$ claiming",
          point: "30 points per claim",
          description: "To get 30 points daily, you need to take 6 steps:  \n**Step 1:**\nGo to quest on the Layer3 platform  \n**Step 2:**\nConnect to Layer3 a wallet participating in the airdrop  \n**Step 3:**\nGo to GoodDapp  \n**Step 4:**\nClaim G$ token on Fuse Network  \n**Step 5:**\nVerify quest completion on the Layer3  \n**Step 6:**\nRepeat every day. After 5 claims, the quest will renew automatically and allow you to claim more and more.  \n**Verify the quest 1 hour after completing it on Layer3**",
          isActive: true,
          button: "Go to Quest",
          link: "https://app.layer3.xyz/streaks/claim-dollarg",
          buttonTwo: "Verify Quest",
          isFunctionTwo: true,
          endpointTwo: "gooddollar",
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

  useEffect(() => {
    if (isUser) {
      let isBoostedModalHidden = localStorage.getItem("airdrop-isBoostedModalHidden");
      isBoostedModalHidden = isBoostedModalHidden ? JSON.parse(isBoostedModalHidden) : false;
      if (!isBoostedModalHidden) {
        dispatch(setIsBoostModalOpen(true));
      }
    }
  }, [dispatch, isUser])

  return (
    <>
      <BoostModal />
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
          <h1 className="text-5xl xl:text-3xl text-white font-semibold md:max-w-[198px] md:break-all">
            Hey, {matches ? eclipseAddress(user.walletAddress) : eclipseAddress(user.walletAddress, 4, 2)}
          </h1>
          <AirdropLive />
        </div>
        <div ref={userSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row lg:flex-col justify-between items-center lg:items-start lg:gap-9 bg-oslo-gray/[.22] rounded-[20px] mt-11 mb-[100px] xl:mb-11 p-[42px] xl:p-9 ${isUserSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
          <div className="flex flex-row lg:flex-col justify-between items-center lg:gap-9 w-1/2 lg:w-auto">
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
                <p className="text-lg leading-none text-pale-slate font-medium">
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
                  <p className="text-sm text-pale-slate font-medium">
                    Last update {convertTimestampToUTC(user.pointsLastUpdatedAt)}
                  </p>
                  {isNextUpdateInfo &&
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
            <div className="lg:flex lg:w-full lg:gap-10">
              <div className="hidden lg:block w-[77px] h-1"></div>
              <div>
                <p className="text-lg xl:text-base leading-none text-pale-slate font-medium">
                  Your Rank
                </p>
                <p className="text-5xl xl:text-4xl leading-none text-white font-bold mt-6 xl:mt-2 mb-2 lg:m-0">
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
          </div>
          <div className="flex flex-row items-center gap-[42px] md:gap-10">
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
          <p className="text-3xl text-white font-semibold">
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
          <p className="text-3xl text-white font-semibold">
            Follow Fuse on socials
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
              <p className="text-3xl text-white font-semibold">
                Explore Fuse ecosystem projects & multiply your points
              </p>
              {(NEXT_PUBLIC_ENVIRONMENT === "staging" && isMultiplyPointNotice) &&
                <p className="text-lg text-buff">
                  <span className="font-bold">Notice</span> you have 0 points to multiply! Please bridge to receive points.
                </p>
              }
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-6">
            {(matches ? ecosystemApps : sortEvenFirst(ecosystemApps))
              .map((ecosystemApp, i) => {
                if (ecosystemApp.isHidden) {
                  return
                }
                return (
                  <EcosystemAppItem
                    key={ecosystemApp.name}
                    ecosystemApp={{
                      background: (matches ? i % 2 === 0 : i < Math.ceil(ecosystemApps.length / 2)) ? ecosystemAppBackgrounds.green.background : ecosystemAppBackgrounds.blue.background,
                      beforeBackground: (matches ? i % 2 === 0 : i < Math.ceil(ecosystemApps.length / 2)) ? ecosystemAppBackgrounds.green.beforeBackground : ecosystemAppBackgrounds.blue.beforeBackground,
                      ...ecosystemApp
                    }}
                  />
                )
              })}
          </div>
        </div>
      </motion.div>
    </>
  )
}

export default Dashboard;
