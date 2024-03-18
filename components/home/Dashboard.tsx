import { motion } from "framer-motion";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, convertTimestampToUTC, daysInYear, eclipseAddress, path, screenWidth } from "@/lib/helpers";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";
import renameIcon from "@/assets/rename.svg";
import Image from "next/image";
import { useState } from "react";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
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
import followX from "@/assets/follow-x.svg";
import joinDiscord from "@/assets/join-discord.svg";
import sayGm from "@/assets/say-gm.svg";
import bridgeAssets from "@/assets/bridge-assets.svg";
import holdTokens from "@/assets/hold-tokens.svg";
import stakeSfuse from "@/assets/stake-sfuse.svg";
import stakeVevolt from "@/assets/stake-vevolt.svg";
import logx from "@/assets/logx.svg";
import bitazza from "@/assets/bitazza.svg";
import zneakrz from "@/assets/zneakrz.svg";

const quests = [
  {
    title: "Follow @Fuse_network on X",
    point: "50 points",
    description: "Get 50 point for following an official Fuse Network X account",
    image: followX,
    isActive: true,
    button: "Go to X",
    link: "https://twitter.com/Fuse_network"
  },
  {
    title: "Join Fuse Discord",
    point: "50 points",
    description: "Get 50 points for joining and verifying on the Fuse Network server in Discord",
    image: joinDiscord,
    isActive: true,
    button: "Go to Discord",
    link: "https://discord.com/invite/jpPMeSZ"
  },
  {
    title: "Say GM in Discord",
    point: "10 points per gm/day",
    description: "Get 10 points every new day for saying GM in the #gm channel",
    image: sayGm,
    isActive: true,
    button: "Go to Discord",
    link: "https://discord.com/channels/619119236362797067/929267035534422017"
  },
  {
    title: "Bridge assets on Fuse",
    point: "4 points per USD",
    description: "Bridge USDT, USDC or ETH to the Fuse Network and receive 4 points daily for every $1 remaining in the network",
    image: bridgeAssets,
    isActive: true,
    button: "Go to Bridge",
    link: "https://console.fuse.io/bridge"
  },
  {
    title: "Holding more than 2 different tokens",
    point: "10 points",
    description: "Get 10 point by holding more than 2 different tokens on your wallet",
    image: holdTokens,
    isActive: true,
    button: "Get Points",
    link: ""
  },
  {
    title: "Stake sFuse on Voltage",
    point: "2 points per sFuse Staked",
    description: "Stake FUSE tokens to receive liquid staked sFuse tokens and get 2 points daily for each sFuse token. The longer funds remain in staking, the more points you receive.",
    image: stakeSfuse,
    isActive: true,
    button: "Go to Voltage",
    link: "https://app.voltage.finance/stake/sFUSE"
  },
  {
    title: "Stake VeVolt on Voltage",
    point: "2 points per VeVolt Staked",
    description: "Stake FUSE tokens to receive liquid staked sFuse tokens and get 2 points daily for each sFuse token. The longer funds remain in staking, the more points you receive.",
    image: stakeVevolt,
    isActive: true,
    button: "Go to Voltage",
    link: "https://app.voltage.finance/stake/veVOLT"
  },
  {
    title: "Trade on LogX",
    point: "",
    description: "Get 1 point on every $100 you bridge Get 1 point on every $100 you bridge Get 1 point on every $100 you bridge",
    image: logx,
    isActive: false,
    button: "Go to Bridge",
    link: "https://console.fuse.io/bridge"
  },
  {
    title: "Create a wallet on Bitazza",
    point: "",
    description: "Get 1 point on every $100 you bridge Get 1 point on every $100 you bridge Get 1 point on every $100 you bridge",
    image: bitazza,
    isActive: false,
    button: "Go to Bridge",
    link: "https://console.fuse.io/bridge"
  },
  {
    title: "Create a wallet on Zneakrz",
    point: "",
    description: "Get 1 point on every $100 you bridge Get 1 point on every $100 you bridge Get 1 point on every $100 you bridge",
    image: zneakrz,
    isActive: false,
    button: "Go to Bridge",
    link: "https://console.fuse.io/bridge"
  },
]

const Dashboard = () => {
  const { totalSignupStepCompleted, user } = useAppSelector(selectUserSlice);
  const [rename, setRename] = useState(user.walletAddress);
  const [isRename, setIsRename] = useState(false);
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const { isIntersecting: isUserSectionIntersecting, ref: userSection } = useIntersectionObserver({
    freezeOnceVisible: true,
  });
  const { isIntersecting: isEarningSectionIntersecting, ref: earningSection } = useIntersectionObserver({
    freezeOnceVisible: true,
  });
  const MAX_RENAME_CHARACTER = 15;

  function referralLink() {
    const host = !IS_SERVER ? window?.location?.host : ""
    return `${host}?ref=${user.referralCode}`
  }

  const renameRef = useOutsideClick<HTMLInputElement>(() => {
    if (isRename) {
      setIsRename(false);
    }
  });
  
  return (
    <motion.div
      className="w-8/9 flex flex-col mt-[65px] mb-[187px] xl:mt-[52px] xl:mb-[150px] xl:w-9/12 md:w-9/10 max-w-7xl"
      key="dashboard"
      initial={{
        x: totalSignupStepCompleted > 0 ? 300 : undefined,
        y: totalSignupStepCompleted > 0 ? undefined : -300,
        opacity: 0
      }}
      animate={{
        x: totalSignupStepCompleted > 0 ? 0 : undefined,
        y: totalSignupStepCompleted > 0 ? undefined : 0,
        opacity: 1
      }}
      exit={{
        x: totalSignupStepCompleted > 0 ? -300 : undefined,
        y: totalSignupStepCompleted > 0 ? undefined : 300,
        opacity: 0
      }}
    >
      <div className="flex justify-between items-center">
        <div className={`group flex items-center gap-9 xl:gap-7 md:gap-2 md:w-auto ${isRename ? "w-full" : "w-auto"}`}>
          <h1 className={`flex items-center gap-2 text-5xl xl:text-4xl md:text-3xl text-white font-semibold md:max-w-[198px] md:break-all md:truncate md:w-auto ${isRename ? "w-full" : "w-auto"}`}>
            Hey, {isRename ?
              <input
                type="text"
                name="rename"
                ref={renameRef}
                value={rename}
                autoFocus={isRename}
                className={`bg-transparent focus:outline-none xl:w-8/12 ${isRename ? "w-full" : "w-auto"}`}
                onChange={(event) => {
                  if (event.target.value.length > MAX_RENAME_CHARACTER) {
                    return;
                  }
                  setRename(event.target.value);
                }}
              /> :
              user.walletAddress === rename ? eclipseAddress(rename) : rename
            }
          </h1>
          <Image
            src={renameIcon}
            alt="rename"
            width={31}
            height={28}
            className={`transition-all ease-in-out duration-300 cursor-pointer opacity-0 group-hover:opacity-100 hover:opacity-50 ${isRename ? "hidden" : ""}`}
            onClick={() => setIsRename(true)}
          />
        </div>
        <AirdropLive />
      </div>
      <div ref={userSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row md:flex-col justify-between items-center md:items-start md:gap-[74px] bg-oslo-gray/[.22] rounded-[20px] mt-[54px] mb-[100px] xl:mt-11 xl:mb-11 p-[42px] xl:p-9 ${isUserSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
        <div className="flex flex-row justify-between items-center w-1/2 md:w-auto">
          <div className="flex flex-row items-center gap-10">
            <div className="relative">
              <Avatar size={matches ? 95 : 77} />
              {(user.walletAgeInDays && user.walletAgeInDays > daysInYear) &&
                <div className="absolute -top-2 -right-2">
                  <div className="group relative">
                    <Image
                      src={crownCircle}
                      alt="crown circle"
                      className=""
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
                  {user.points}
                </p>
              </div>
              <p className="text-sm xl:text-xs leading-none text-pale-slate font-medium">
                Last update {convertTimestampToUTC(user.pointsLastUpdatedAt)}
              </p>
            </div>
          </div>
          <div className="md:hidden">
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
            <Link
              href={path.ABOUT}
              className="transition ease-in-out border border-primary rounded-full xl:text-sm text-primary leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 md:px-5 hover:bg-primary hover:text-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 xl:gap-6">
        <p className="text-3xl xl:text-2xl text-white font-semibold">
          Start earning points
        </p>
        <div ref={earningSection} className={`transition-all ease-in-out duration-300 delay-200 flex flex-row md:flex-col gap-[30px] xl:gap-5 ${isEarningSectionIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`}>
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
                  Get 10% of your friend&apos;s total points (Not including)
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
                    Get 1 point on every $100 you bridge
                  </CardItem>
                </div>
                <div>
                  <CardItem translateZ="80">
                    <button
                      className="transition ease-in-out border border-primary rounded-full text-primary leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 hover:bg-primary hover:text-black"
                      onClick={() => window.open(path.BRIDGE, "_blank")}
                    >
                      Go to Bridge
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
        </div>
      </div>
      <div className="flex flex-col gap-8 xl:gap-6 mt-24 xl:mt-16">
        <p className="text-3xl xl:text-2xl text-white font-semibold">
          Complete quests to receive points
        </p>
        <div className="grid grid-cols-4 xl:grid-cols-3 md:grid-cols-1 auto-rows-min gap-[30px] xl:gap-5">
          {quests.map((quest) =>
            <Quest key={quest.title} quest={quest} />
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default Dashboard;
