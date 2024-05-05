import { motion } from "framer-motion";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, convertTimestampToUTC, daysInYear, eclipseAddress, isFloat, path, screenWidth } from "@/lib/helpers";
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
import { Quests } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";
import questionMarkCircle from "@/assets/question-mark-circle.svg";

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
      title: "Follow @Fuse_network on X",
      point: "50 points",
      description: "Get 50 point for following an official Fuse Network X account",
      image: followX,
      isActive: true,
      completed: false,
      button: "Go to X",
      isFunction: true,
    },
    {
      id: "numOfTokens",
      title: "Holding more than 2 different tokens",
      point: "10 points",
      description: "Get 10 point by holding more than 2 different tokens on your wallet.\nPoints are awarded automatically when the conditions are met.",
      image: holdTokens,
      isActive: true,
      completed: false,
      button: "",
    },
    {
      id: "walletAge",
      title: "You're an OG! - Wallet older then a year",
      point: "10 points",
      description: "",
      image: ogWallet,
      isActive: true,
      completed: false,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/sFUSE",
    },
    {
      id: "joinDiscord",
      title: "Join Fuse Discord",
      point: "",
      description: "",
      image: joinDiscord,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "say-gm",
      title: "Say GM in Discord",
      point: "",
      description: "",
      image: sayGm,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "joinTelegram",
      title: "Join Fuse Telegram",
      point: "",
      description: "",
      image: joinTelegram,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "voltApp",
      title: "Deposit at least 10$ to the Volt App",
      point: "",
      description: "",
      image: voltApp,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
  ])

  const [multiplyQuests] = useState<Quests>([
    {
      id: "liquidityVoltage",
      title: "Provide Liquidity to Voltage v3",
      heading: "Multiply your points by providing liquidity on Voltage DEX",
      point: "8 points per $1 in pool daily",
      description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by putting bridged funds in any V3 liquidity pool on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
      image: liquidityVoltage,
      isActive: true,
      completed: false,
      button: "Go to Voltage",
      link: "https://voltage.finance/pool",
      padding: "py-6 pl-6 pr-2",
    },
    {
      id: "staking-sFuse",
      title: "Stake FUSE to get s(FUSE)",
      heading: "Multiply your points by staking FUSE token on Voltage DEX",
      point: "8 points per $1 staked daily",
      description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a FUSE token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
      image: stakeSfuse,
      isActive: true,
      completed: false,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/sFUSE",
    },
    {
      id: "staking-veVolt",
      title: "Stake VOLT for veVOLT",
      heading: "Multiply your points by staking VOLT token on Voltage DEX",
      point: "8 points per $1 staked daily",
      description: "To multiply you points you need to take 2 simple steps:  \n**Step 1**\nBridge funds to the Fuse Network using Fuse bridge = 4 points per $1, available once per day.  \n**Step 2**\nDouble your points by staking bridged funds in a VOLT token liquid staking on Voltage DEX = 8 points per $1 of the bridged funds, available once per day.",
      image: stakeVolt,
      isActive: true,
      completed: false,
      button: "Go to Voltage",
      link: "https://app.voltage.finance/stake/veVOLT",
    },
    {
      id: "meridian",
      title: "Lend on Meridian",
      point: "",
      description: "",
      image: meridian,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "logX",
      title: "Trade on LogX",
      point: "",
      description: "",
      image: logx,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "bitazza",
      title: "Create a wallet on Bitazza",
      point: "",
      description: "",
      image: bitazza,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "zneakrz",
      title: "Create a wallet on Zneakrz",
      point: "",
      description: "",
      image: zneakrz,
      isActive: false,
      completed: false,
      button: "",
      link: "",
    },
    {
      id: "mirakle",
      title: "Trade on Mirakle",
      point: "",
      description: "",
      image: mirakle,
      isActive: false,
      completed: false,
      button: "",
      link: "",
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
          <div className="flex flex-col justify-between items-start gap-4">
            <p className="text-2xl xl:text-xl leading-none text-white font-bold max-w-64 md:max-w-full">
              Welcome to the Fuse Airdrop program
            </p>
            <button
              className="transition ease-in-out border border-primary rounded-full xl:text-sm text-primary leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 md:px-5 hover:bg-primary hover:text-black"
              onClick={() => window.open("https://news.fuse.io/fuse-airdrop-program-is-live/", "_blank")}
            >
              Learn More
            </button>
          </div>
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
                    Get 4 points daily on every 1 USD you bridge to Fuse
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
                          point: "4 point per 1 USD bridged",
                          description: "Get 4 points daily on every 1 USD you bridge to Fuse  \n**Notice the points calculation is updated once every 24 hours**",
                          image: bridgeFuse,
                          isActive: true,
                          completed: false,
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
          Complete quests to receive points
        </p>
        <div className="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
          {quests.map((quest) => {
            if (quest.id === "walletAge" && !quest.completed) {
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
          <Image
            src={fireTransparent}
            alt="fire"
          />
          <div className="flex md:flex-col items-end md:items-start gap-x-9">
            <p className="text-3xl xl:text-2xl text-white font-semibold">
              Multiply your points!
            </p>
            {NEXT_PUBLIC_ENVIRONMENT === "staging" &&
              <p className="text-lg text-buff">
                <span className="font-bold">Notice</span> you have 0 points to multiply! please bridge to receive points
              </p>
            }
          </div>
        </div>
        <div className="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
          {multiplyQuests.map((multiplyQuest) =>
            <Quest key={multiplyQuest.title} quest={multiplyQuest} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard;
