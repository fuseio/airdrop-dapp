import { motion } from "framer-motion";
import Info from "../ui/Info";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, eclipseAddress, path } from "@/lib/helpers";
import { useAccount } from "wagmi";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";
import Leaderboard from "./Leaderboard";

const Dashboard = () => {
  const tvl = 0;
  const position = 130653;
  const { address } = useAccount();
  const { user } = useAppSelector(selectUserSlice);

  function referralLink() {
    const origin = !IS_SERVER ? window?.location?.origin : ""
    return `${origin}?ref=${user.referralCode}`
  }

  return (
    <motion.div
      className="w-8/9 flex flex-col mt-[65px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <h1 className="text-5xl md:text-4xl text-white font-semibold">
        My Airdrop
      </h1>
      <div className="flex flex-row md:flex-col justify-between md:gap-8 bg-tertiary rounded-[20px] mt-[65px] mb-[70px] px-28 py-12 md:p-4">
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-2 text-lg text-pale-slate font-medium">
            Total points
            <Info>
              <p>
                Total points
              </p>
            </Info>
          </div>
          <p className="text-5xl md:text-4xl text-success font-bold">
            {user.points} pts
          </p>
        </div>
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-2 text-lg text-pale-slate font-medium">
            Total Bridged TVL
            <Info>
              <p>
                Total Bridged TVL
              </p>
            </Info>
          </div>
          <p className="text-5xl md:text-4xl text-white font-bold">
            ${tvl}
          </p>
        </div>
        <div className="flex flex-col gap-[18px]">
          <div className="flex items-center gap-2 text-lg text-pale-slate font-medium">
            My referral code
            <Info>
              <p>
                My referral code
              </p>
            </Info>
          </div>
          <div className="flex items-center gap-5">
            <p className="text-5xl md:text-4xl text-white font-bold">
              {user.referralCode}
            </p>
            <Copy
              src={copyIcon}
              text={user.referralCode}
              tooltipText="Referral code copied"
              className="transition ease-in-out cursor-pointer hover:opacity-60"
            />
          </div>
        </div>
      </div>
      <div className="bg-success rounded-[20px] px-[68px] py-[62px] md:px-4 md:py-6 max-h-[327px] md:max-h-full bg-[url('/vectors/about-cube.svg')] md:bg-none bg-no-repeat bg-right">
        <div className="flex flex-col items-start md:items-center md:text-center">
          <p className="text-3xl text-fuse-black font-semibold">
            About the Fuse airdrop
          </p>
          <p className="text-lg text-black opacity-60 max-w-[552px] mt-[26px] mb-[46px]">
            Provide a seamless user experience without the hassle of dealing
            with complex blockchain processes with the Fuse SDK.
          </p>
          <Link
            href={path.ABOUT}
            className="transition ease-in-out bg-fuse-black hover:bg-white text-white hover:text-fuse-black rounded-full text-lg leading-none font-semibold px-[44px] py-4"
          >
            Learn more about the airdrop
          </Link>
        </div>
      </div>
      <div className="flex flex-col mt-[65px] mb-[63px]">
        <p className="text-3xl text-white font-semibold mb-[31px]">
          How to earn more points
        </p>
        <div className="flex flex-col gap-[30px]">
          <div className="bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center px-10 py-7 md:px-4 md:py-6">
            <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
              <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
                1
              </p>
              <p className="text-2xl text-white font-bold">
                Invite friends
              </p>
            </div>
            <div className="flex items-center gap-[18.5px]">
              <p className="text-2xl md:text-base text-white">
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
          <div className="bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center px-10 py-7 md:px-4 md:py-6">
            <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
              <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
                2
              </p>
              <p className="text-2xl text-white font-bold">
                Bridge FUSE to Earn Points
              </p>
            </div>
            <a
              href={path.BRIDGE}
              target="_blank"
              className="transition ease-in-out bg-success text-black hover:bg-white rounded-full text-lg leading-none font-semibold px-[53px] py-4"
            >
              Go to Bridge
            </a>
          </div>
          <div className="bg-tertiary rounded-[20px] flex flex-col gap-[33px] md:gap-4 md:text-center px-10 py-7 md:px-4 md:py-6">
            <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
              <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
                3
              </p>
              <p className="text-2xl text-white font-bold">
                Check out our Ecosystem and Earn 2x Points
              </p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-1 gap-[35px] md:gap-3">
              {new Array(6).fill(0).map((_, index) =>
                <div
                  key={index}
                  className="bg-storm-dust h-[219px]"
                ></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <p className="text-3xl text-white font-semibold mb-[31px]">
          My Position
        </p>
        <div className="flex flex-row md:flex-col justify-between md:gap-8 bg-tertiary rounded-[20px] px-28 py-12 md:p-4">
          <div className="flex flex-col gap-[18px]">
            <p className="text-lg text-pale-slate font-medium">
              Position
            </p>
            <p className="text-5xl md:text-4xl text-white font-bold">
              {position}
            </p>
          </div>
          <div className="flex flex-col gap-[18px]">
            <p className="text-lg text-pale-slate font-medium">
              Participant
            </p>
            <p className="text-5xl md:text-4xl text-white font-bold">
              {eclipseAddress(String(address))}
            </p>
          </div>
          <div className="flex flex-col gap-[18px]">
            <p className="text-lg text-pale-slate font-medium">
              Pts
            </p>
            <p className="text-5xl md:text-4xl text-white font-bold">
              {user.points}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[78px]">
        <p className="text-3xl text-white font-semibold mb-[31px]">
          Leaderboard
        </p>
        <Leaderboard />
      </div>
    </motion.div>
  )
}

export default Dashboard;
