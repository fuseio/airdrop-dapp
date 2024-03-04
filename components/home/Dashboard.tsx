import { motion } from "framer-motion";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, eclipseAddress, hex, path } from "@/lib/helpers";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";
import Leaderboard from "./Leaderboard";
import renameIcon from "@/assets/rename.svg";
import Image from "next/image";
import { useState } from "react";
import { useOutsideClick } from "@/lib/hooks/useOutsideClick";
import AirdropLive from "./AirdropLive";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";
import star from "@/assets/star.svg";
import rightCaret from "@/assets/right-caret.svg";
import airdrop from "@/assets/airdrop.svg";
import bridgeFuse from "@/assets/bridge-fuse.svg";
import voltage from "@/assets/voltage.svg";
import logx from "@/assets/logx.svg";
import bitazza from "@/assets/bitazza.svg";
import lynx from "@/assets/lynx.svg";
import zneakrz from "@/assets/zneakrz.svg";
import meridian from "@/assets/meridian.svg";

const apps = [
  {
    name: "Voltage",
    description: "Trade, invest, and earn with just a few clicks",
    image: voltage,
    background: "absolute inset-0 bg-[url('/vectors/voltage-gradient.svg')] md:bg-none bg-no-repeat bg-right-bottom"
  },
  {
    name: "Logx",
    description: "Trade, invest, and earn with just a few clicks",
    image: logx,
    background: "absolute inset-0 bg-[url('/vectors/logx-gradient.svg')] md:bg-none bg-no-repeat bg-right-bottom"
  },
  {
    name: "Bitazza",
    description: "Trade, invest, and earn with just a few clicks",
    image: bitazza,
    background: "absolute inset-0 bg-[url('/vectors/bitazza-gradient.svg')] md:bg-none bg-no-repeat bg-right-bottom"
  },
  {
    name: "Lynx",
    description: "Trade, invest, and earn with just a few clicks",
    image: lynx,
    background: "absolute inset-0 bg-[url('/vectors/lynx-gradient.svg')] md:bg-none bg-no-repeat bg-right-bottom"
  },
  {
    name: "Zneakrz",
    description: "Trade, invest, and earn with just a few clicks",
    image: zneakrz,
    background: "absolute inset-0 bg-[url('/vectors/zneakrz-gradient.svg')] md:bg-none bg-no-repeat bg-right-bottom"
  },
  {
    name: "Meridian",
    description: "Trade, invest, and earn with just a few clicks",
    image: meridian,
    background: "absolute inset-0 bg-[url('/vectors/meridian-gradient.svg')] md:bg-none bg-no-repeat bg-right-bottom"
  },
]

const leaderboardTimeRanges = [
  {
    name: "All-Time"
  },
  {
    name: "Last 30 days"
  },
  {
    name: "Last 7 days"
  },
  {
    name: "Last 24 hrs"
  },
]

const Dashboard = () => {
  const lastUpdate = "12:00 UTC";
  const { address } = useAccount();
  const { user } = useAppSelector(selectUserSlice);
  const [rename, setRename] = useState(user.walletAddress);
  const [isRename, setIsRename] = useState(false);
  const [selectedLeaderboardTimeRange, setSelectedLeaderboardTimeRange] = useState(leaderboardTimeRanges[0].name);
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
      className="w-8/9 flex flex-col mt-[65px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className="flex flex-row md:flex-col justify-between items-center md:gap-2">
        <div className="flex flex-row md:flex-col items-center gap-9 md:gap-2">
          <h1 className="flex flex-row md:flex-col items-center gap-2 text-5xl md:text-4xl text-white font-semibold md:break-all">
            Hey, {isRename ?
              <input
                type="text"
                name="rename"
                ref={renameRef}
                value={rename}
                className="bg-transparent focus:outline-none md:w-8/12"
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
            className={`transition-all ease-in-out duration-300 cursor-pointer hover:opacity-50 ${isRename ? "hidden" : ""}`}
            onClick={() => setIsRename(true)}
          />
        </div>
        <AirdropLive />
      </div>
      <div className="flex flex-row md:flex-col justify-between items-center md:gap-8 md:text-center bg-tertiary rounded-[20px] mt-[54px] mb-[100px] p-[42px] md:p-4">
        <div className="flex flex-row md:flex-col justify-between items-center md:gap-8 w-1/2">
          <div className="flex flex-row md:flex-col items-center gap-10">
            <Jazzicon diameter={95} seed={jsNumberForAddress((address ?? hex) as string)} />
            <div>
              <p className="text-lg leading-none text-pale-slate font-medium">
                Your points
              </p>
              <div className="flex items-center md:justify-center gap-1.5 mt-6 mb-2">
                <Image
                  src={star}
                  alt="star"
                  width={30}
                  height={30}
                />
                <p className="text-5xl md:text-4xl leading-none text-white font-bold">
                  {user.points}
                </p>
              </div>
              <p className="text-sm leading-none text-pale-slate font-medium">
                Last update {lastUpdate}
              </p>
            </div>
          </div>
          <div>
            <p className="text-lg leading-none text-pale-slate font-medium">
              Your Rank
            </p>
            <p className="text-5xl md:text-4xl leading-none text-white font-bold mt-6 mb-2">
              {user.leaderboardPosition}
            </p>
            <Link
              href="#leaderboard"
              className="group flex items-center gap-1 text-sm leading-none text-pale-slate font-medium"
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
        <div className="flex flex-row md:flex-col items-center gap-[42px]">
          <Image
            src={airdrop}
            alt="airdrop"
            width={94}
            height={128}
            className="md:hidden"
          />
          <div className="flex flex-col justify-between items-start md:items-center gap-4">
            <p className="text-2xl leading-none text-white font-bold max-w-64">
              Welcome to the Fuse Airdrop program
            </p>
            <Link
              href={path.ABOUT}
              className="transition ease-in-out border border-primary rounded-full text-primary leading-none font-semibold px-9 py-4 hover:bg-primary hover:text-black"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8">
        <p className="text-3xl text-white font-semibold">
          Start earning points
        </p>
        <div className="flex flex-row md:flex-col gap-[30px]">
          <div className="bg-tertiary rounded-[20px] flex flex-col justify-between w-1/2 md:w-auto min-h-[283px] p-10 bg-[url('/vectors/globe.svg')] md:bg-none bg-no-repeat bg-right-bottom">
            <div className="flex flex-col gap-4">
              <p className="text-2xl text-primary font-bold">
                Invite friends
              </p>
              <p className="text-lg text-pale-slate font-medium max-w-[243px]">
                Get 10% of your friend&apos;s total points (Not including)
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <p className="text-sm text-pale-slate font-medium">
                Invite link
              </p>
              <div className="flex items-center gap-1.5">
                <p className="text-xl text-white font-bold">
                  {referralLink()}
                </p>
                <Copy
                  src={copyIcon}
                  text={referralLink()}
                  tooltipText="Referral link copied"
                  className="transition ease-in-out cursor-pointer hover:opacity-60"
                />
              </div>
            </div>
          </div>
          <div className="bg-tertiary rounded-[20px] flex flex-row md:flex-col justify-between md:items-center md:text-center w-1/2 md:w-auto min-h-[283px] p-10">
            <div className="flex flex-col justify-between md:gap-2">
              <div className="flex flex-col gap-4 md:gap-2">
                <p className="text-2xl text-primary font-bold">
                  Bridge FUSE
                </p>
                <p className="text-lg text-pale-slate font-medium max-w-[200px] md:max-w-full">
                  Get 1 point on every $100 you bridge
                </p>
              </div>
              <div>
                <button
                  className="transition ease-in-out border border-primary rounded-full text-primary leading-none font-semibold px-9 py-4 hover:bg-primary hover:text-black"
                  onClick={() => window.open(path.BRIDGE, "_blank")}
                >
                  Go to Bridge
                </button>
              </div>
            </div>
            <Image
              src={bridgeFuse}
              alt="bridge Fuse"
              width={284}
              height={209}
              className="md:order-first"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-24">
        <p className="text-3xl text-white font-semibold">
          Check out our ecosystem apps Earn 2x Points
        </p>
        <div className="grid grid-cols-2 md:grid-cols-1 gap-[30px]">
          {apps.map((app, index) =>
            <div
              key={index}
              className="relative bg-tertiary rounded-[20px] flex flex-row md:flex-col justify-between min-h-[249px] p-10"
            >
              <div className={app.background}></div>
              <div className="flex flex-col justify-between z-10">
                <div className="flex flex-col gap-4">
                  <p className="text-2xl text-primary font-bold">
                    {app.name}
                  </p>
                  <p className="text-lg text-pale-slate font-medium max-w-[278px]">
                    {app.description}
                  </p>
                </div>
                <div className="flex items-center gap-3.5">
                  <p className="text-lg text-pale-slate font-medium max-w-[200px]">
                    Points Status
                  </p>
                  <div className="border-[0.5px] border-gray-goose rounded-full leading-none text-white font-semibold px-3 py-2">
                    Coming Soon
                  </div>
                </div>
              </div>
              <Image
                src={app.image}
                alt={app.name}
                className="md:order-first"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col pt-[78px]" id="leaderboard">
        <div className="flex flex-row md:flex-col justify-between items-end gap-2 mb-[31px]">
          <p className="text-3xl text-white font-semibold">
            Leaderboard
          </p>
          <div className="flex gap-2">
            {leaderboardTimeRanges.map((leaderboardTimeRange, index) =>
              <motion.p
                key={index}
                className={`transition-all ease-in-out duration-300 text-lg font-semibold ${selectedLeaderboardTimeRange === leaderboardTimeRange.name ? "text-white" : "text-monsoon cursor-pointer"}`}
                onClick={() => setSelectedLeaderboardTimeRange(leaderboardTimeRange.name)}
              >
                {leaderboardTimeRange.name}
              </motion.p>
            )}
          </div>
        </div>
        <Leaderboard />
      </div>
    </motion.div>
  )
}

export default Dashboard;
