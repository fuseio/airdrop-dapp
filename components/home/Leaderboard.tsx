import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchLeaderboardUsers, selectUserSlice, setLeaderboardUsers } from "@/store/userSlice";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Image from "next/image";
import fire from "@/assets/fire.svg";
import star from "@/assets/star.svg";
import starGold from "@/assets/star-gold.svg";
import starSilver from "@/assets/star-silver.svg";
import starBronze from "@/assets/star-bronze.svg";
import { eclipseAddress, hex } from "@/lib/helpers";
import Jazzicon from "react-jazzicon/dist/Jazzicon";
import { jsNumberForAddress } from "react-jazzicon";

type PositionStar = {
  name: string;
  icon: string;
}

type PositionStars = {
  [key: number]: PositionStar
}

const PAGE_SIZE = "30";

const leaderboardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] }
  },
  show: {
    opacity: 1,
    y: 0,
    transition: { ease: [0.78, 0.14, 0.15, 0.86] },
  }
};

const positionStars: PositionStars = {
  1: {
    name: "Gold",
    icon: starGold
  },
  2: {
    name: "Silver",
    icon: starSilver
  },
  3: {
    name: "Bronze",
    icon: starBronze
  }
}

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { isLeaderboardUsersLoading, leaderboardUsers, lastLeaderboardUserId, isLeaderboardUsersFinished, user } = useAppSelector(selectUserSlice);
  const STREAK = 6;

  return (
    <AnimatePresence>
      <p className="text-lg text-white font-semibold mb-4">
        Your Ranking
      </p>
      <motion.div
        variants={leaderboardVariants}
        initial="hidden"
        animate="show"
        className="bg-tertiary rounded-[20px] flex items-center gap-2.5 text-white text-lg font-medium px-2.5 py-[22px]"
      >
        <div className="w-[87px] flex justify-center bg-white/10 rounded-full leading-none px-2.5 py-[6.5px]">{new Intl.NumberFormat().format(user.leaderboardPosition)}</div>
        <div className="flex items-center pl-2.5 pr-7 md:pl-2 md:pr-4">
          <Jazzicon diameter={40} seed={jsNumberForAddress((user.walletAddress ?? hex) as string)} />
        </div>
        <div className="grow md:w-8/12">
          <p className="hidden md:block">
            {eclipseAddress(user.walletAddress)}
          </p>
          <p className="md:hidden">
            {user.walletAddress}
          </p>
        </div>
        <div className="w-[84px] flex gap-[7px] text-success">
          <Image
            src={star}
            alt="star"
            width={16}
            height={16}
          />
          <p>
            {user.points}
          </p>
        </div>
      </motion.div>
      <p className="text-lg text-white font-semibold mt-10 mb-4">
        Top users of all-time (Showing top 100)
      </p>
      <Reorder.Group
        axis="y"
        values={leaderboardUsers}
        onReorder={(newleaderboardUsers) => {
          dispatch(setLeaderboardUsers(newleaderboardUsers));
        }}
        layoutScroll
        className="overflow-y-auto h-[450px]"
      >
        <div className="flex flex-col gap-2.5">
          {leaderboardUsers.map((leaderboardUser, index) =>
            <Reorder.Item
              key={leaderboardUser.id}
              value={leaderboardUser.points}
              variants={leaderboardVariants}
              initial="hidden"
              animate="show"
              className="bg-tertiary rounded-[20px] flex items-center gap-2.5 text-white text-lg font-medium px-2.5 py-[22px]"
            >
              <div className="w-[87px] flex justify-center items-center relative">
                {positionStars[index + 1] &&
                  <Image
                    src={positionStars[index + 1].icon}
                    alt={positionStars[index + 1].name}
                    width={36}
                    height={36}
                  />
                }
                <p className="absolute top-[55%] -translate-y-1/2 leading-none">
                  {new Intl.NumberFormat().format(index + 1)}
                </p>
              </div>
              <div className="flex items-center pl-2.5 pr-7 md:pl-2 md:pr-4">
                <Jazzicon diameter={40} seed={jsNumberForAddress((leaderboardUser.walletAddress ?? hex) as string)} />
              </div>
              <div className="grow flex flex-row items-center gap-9 md:gap-4 md:w-8/12">
                <p className="md:hidden">
                  {leaderboardUser.walletAddress}
                </p>
                <p className="hidden md:block">
                  {eclipseAddress(leaderboardUser.walletAddress)}
                </p>
                {index + 1 === STREAK &&
                  <div className="bg-white/10 md:bg-transparent rounded-full flex gap-2.5 px-[13px] py-[5px] md:p-0 md:w-[15px] md:h-5">
                    <Image
                      src={fire}
                      alt="fire"
                      width={15}
                      height={20}
                    />
                    <p className="md:hidden">
                      On a streak!
                    </p>
                  </div>
                }
              </div>
              <div className="w-[84px] flex gap-[7px] text-success">
                <Image
                  src={star}
                  alt="star"
                  width={16}
                  height={16}
                />
                <p>
                  {leaderboardUser.points}
                </p>
              </div>
            </Reorder.Item>
          )}
          {!isLeaderboardUsersFinished &&
            <motion.div
              key={leaderboardUsers.length}
              viewport={{ once: true, margin: "100px" }}
              className="flex gap-2.5 py-[22px]"
              onViewportEnter={() => {
                dispatch(fetchLeaderboardUsers({
                  queryParams: {
                    pageSize: PAGE_SIZE,
                    userIdToStartAfter: lastLeaderboardUserId
                  }
                }))
              }}
            >
              {isLeaderboardUsersLoading &&
                <div className="bg-tertiary animate-pulse rounded-[20px]"></div>
              }
            </motion.div>
          }
        </div>
      </Reorder.Group>
    </AnimatePresence>
  )
}

export default Leaderboard;
