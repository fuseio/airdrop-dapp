import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchLeaderboardUsers, selectUserSlice, setLeaderboardUsers } from "@/store/userSlice";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import Image from "next/image";
import fire from "@/assets/fire.svg";
import star from "@/assets/star.svg";
import starGold from "@/assets/star-gold.svg";
import starSilver from "@/assets/star-silver.svg";
import starBronze from "@/assets/star-bronze.svg";
import { daysInYear, eclipseAddress, screenWidth } from "@/lib/helpers";
import Avatar from "../ui/Avatar";
import { useMediaQuery } from "usehooks-ts";
import crown from "@/assets/crown.svg";

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
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const STREAK = 6;
  const OG = 2;

  return (
    <AnimatePresence>
      <p className="text-lg xl:text-base text-white font-semibold mb-4 xl:mb-2.5">
        Your Ranking
      </p>
      <motion.div
        variants={leaderboardVariants}
        initial="hidden"
        animate="show"
        className="bg-tertiary rounded-[20px] flex items-center gap-2.5 xl:gap-2 text-white text-lg font-medium px-2.5 py-[22px] xl:px-2 xl:py-4"
      >
        <div className="w-[87px] xl:w-[70px] flex justify-center">
          <p className="bg-white/10 rounded-full xl:text-sm leading-none px-2.5 py-[6.5px] xl:px-2 xl:py-1">
            {new Intl.NumberFormat().format(user.leaderboardPosition)}
          </p>
        </div>
        <div className="flex items-center pl-2.5 pr-7 xl:pl-2 xl:pr-4">
          <Avatar size={matches ? 40 : 32} />
        </div>
        <div className="grow md:w-8/12">
          <p className="hidden md:block xl:text-sm">
            {eclipseAddress(user.walletAddress)}
          </p>
          <p className="md:hidden xl:text-sm">
            {user.walletAddress}
          </p>
        </div>
        <div className="w-[84px] xl:w-[67px] flex gap-[7px] xl:gap-1 text-success">
          <Image
            src={star}
            alt="star"
            width={matches ? 16 : 12}
            height={matches ? 16 : 12}
          />
          <p className="xl:text-sm">
            {user.points % 1 === 0 ? user.points : user.points.toFixed(2)}
          </p>
        </div>
      </motion.div>
      <p className="text-lg xl:text-base text-white font-semibold mt-10 mb-4 xl:mt-8 xl:mb-2.5">
        Top users of all-time (Showing top 100)
      </p>
      <Reorder.Group
        axis="y"
        values={leaderboardUsers}
        onReorder={(newleaderboardUsers) => {
          dispatch(setLeaderboardUsers(newleaderboardUsers));
        }}
      >
        <div className="flex flex-col gap-2.5 xl:gap-2">
          {leaderboardUsers.map((leaderboardUser, index) =>
            <Reorder.Item
              key={index}
              value={leaderboardUser.points}
              variants={leaderboardVariants}
              initial="hidden"
              animate="show"
              className="bg-tertiary rounded-[20px] flex items-center gap-2.5 xl:gap-2 text-white text-lg xl:text-base font-medium px-2.5 py-[22px] xl:px-2 xl:py-4"
            >
              <div className="w-[87px] xl:w-[70px] flex justify-center items-center relative">
                {positionStars[index + 1] &&
                  <Image
                    src={positionStars[index + 1].icon}
                    alt={positionStars[index + 1].name}
                    width={matches ? 36 : 28}
                    height={matches ? 36 : 28}
                  />
                }
                <p className="absolute top-[55%] -translate-y-1/2 xl:text-sm leading-none">
                  {new Intl.NumberFormat().format(index + 1)}
                </p>
              </div>
              <div className="flex items-center pl-2.5 pr-7 xl:pl-2 xl:pr-4">
                <Avatar size={matches ? 40 : 32} />
              </div>
              <div className="grow flex flex-row items-center gap-9 xl:gap-4 md:w-8/12">
                <p className="md:hidden xl:text-sm">
                  {leaderboardUser.walletAddress}
                </p>
                <p className="hidden md:block xl:text-sm">
                  {eclipseAddress(leaderboardUser.walletAddress)}
                </p>
                {index + 1 === STREAK &&
                  <div className="bg-white/10 md:bg-transparent rounded-full flex gap-2.5 xl:gap-2 px-[13px] py-[5px] xl:px-2.5 xl:py-0.5 md:p-0 md:w-[15px] md:h-5">
                    <Image
                      src={fire}
                      alt="fire"
                      title="On a streak!"
                      width={matches ? 15 : 12}
                      height={matches ? 20 : 16}
                    />
                    <p className="md:hidden xl:text-sm">
                      On a streak!
                    </p>
                  </div>
                }
                {(leaderboardUser.walletAgeInDays && leaderboardUser.walletAgeInDays > daysInYear) &&
                  <div className="bg-white/10 md:bg-transparent rounded-full flex gap-2.5 xl:gap-2 px-[13px] py-[5px] xl:px-2.5 xl:py-0.5 md:p-0 md:w-[15px] md:h-5">
                    <Image
                      src={crown}
                      alt="crown"
                      title="OG!"
                      width={matches ? 24 : 20}
                      height={matches ? 17 : 13}
                    />
                    <p className="md:hidden xl:text-sm">
                      OG!
                    </p>
                  </div>
                }
              </div>
              <div className="w-[84px] xl:w-[67px] flex gap-[7px] xl:gap-1 text-success">
                <Image
                  src={star}
                  alt="star"
                  width={matches ? 16 : 12}
                  height={matches ? 16 : 12}
                />
                <p className="xl:text-sm">
                  {leaderboardUser.points % 1 === 0 ? leaderboardUser.points : leaderboardUser.points.toFixed(2)}
                </p>
              </div>
            </Reorder.Item>
          )}
          {!isLeaderboardUsersFinished &&
            <motion.div
              key={leaderboardUsers.length}
              viewport={{ once: true, margin: "100px" }}
              className="flex gap-2.5 xl:gap-2 py-[22px] xl:py-4"
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
