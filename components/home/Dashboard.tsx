import { motion, Reorder } from "framer-motion";
import Info from "../ui/Info";
import Copy from "../ui/Copy";
import copyIcon from "@/assets/copy-gray.svg";
import Link from "next/link";
import { IS_SERVER, eclipseAddress, path } from "@/lib/helpers";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";

const initialRanks = [
  {
    participant: "0x3f1Ba4305A07cEd2bB5e42224D71aBE0BC3C3f26",
    point: 4837369
  },
  {
    participant: "0xc21Ba4305A07cEd2bB5e42224D71aBE0BC3C3f33",
    point: 5945292
  },
  {
    participant: "0x1E1Ba4305A07cEd2bB5e42224D71aBE0BC3C3f47",
    point: 1733670
  },
  {
    participant: "0xa61Ba4305A07cEd2bB5e42224D71aBE0BC3C3f84",
    point: 7287874
  },
  {
    participant: "0x8j1Ba4305A07cEd2bB5e42224D71aBE0BC3C3f59",
    point: 5424723
  },
]

const Dashboard = () => {
  const points = 15;
  const tvl = 0;
  const referralCode = "WkjWjl";
  const position = 130653;
  const { address } = useAccount();
  const [ranks, setRanks] = useState(initialRanks);

  function referralLink() {
    const origin = !IS_SERVER ? window?.location?.origin : ""
    return `${origin}/ref?=${referralCode}`
  }

  useEffect(() => {
    const threeSecondinMillisecond = 3000;

    const intervalId = setInterval(() => {
      const randomRankIndexBetween0and4 = Math.floor(Math.random() * 4);
      const randomPointBetween0and10000000 = Math.floor(Math.random() * 10000000);

      const slicedRanks = ranks.slice();

      slicedRanks[randomRankIndexBetween0and4] = {
        participant: ranks[randomRankIndexBetween0and4].participant,
        point: randomPointBetween0and10000000
      }

      const sortedRanks = slicedRanks.sort((a, b) => b.point - a.point);

      setRanks(sortedRanks)
    }, threeSecondinMillisecond)

    return () => {
      clearInterval(intervalId);
    }
  }, [ranks])

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
            {points} pts
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
              {referralCode}
            </p>
            <Copy
              src={copyIcon}
              text={referralCode}
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
              {points}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col mt-[78px]">
        <p className="text-3xl text-white font-semibold mb-[31px]">
          Leaderboard
        </p>
        <Reorder.Group
          axis="y"
          values={ranks}
          onReorder={setRanks}
          layoutScroll
          className="overflow-y-auto h-[450px]"
        >
          <table className="table-auto text-left divide-y divide-tertiary w-full">
            <thead>
              <tr>
                <th className="text-pale-slate font-medium py-[22px] pl-[22px]">#</th>
                <th className="text-pale-slate font-medium py-[22px]">Participant</th>
                <th className="text-pale-slate font-medium py-[22px] pr-[22px]">Pts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-tertiary">
              {ranks.map((rank, index) =>
                <Reorder.Item
                  as="tr"
                  key={rank.point}
                  value={rank.point}
                >
                  <td className="text-white font-medium py-[22px] pl-[22px] w-2/12">{index + 1}</td>
                  <td className="text-white font-medium py-[22px] w-8/12">{eclipseAddress(rank.participant)}</td>
                  <td className="text-white font-medium py-[22px] pr-[22px] w-2/12">{rank.point}</td>
                </Reorder.Item>
              )}
            </tbody>
          </table>
        </Reorder.Group>
      </div>
    </motion.div>
  )
}

export default Dashboard;
