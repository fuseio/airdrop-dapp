import { eclipseAddress } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchLeaderboardUsers, selectUserSlice, setLeaderboardUsers } from "@/store/userSlice";
import { motion, AnimatePresence, Reorder } from "framer-motion";

const PAGE_SIZE = "30";

const tr = {
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

const Leaderboard = () => {
  const dispatch = useAppDispatch();
  const { isLeaderboardUsersLoading, leaderboardUsers, lastLeaderboardUserId, isLeaderboardUsersFinished } = useAppSelector(selectUserSlice);

  return (
    <AnimatePresence>
      <Reorder.Group
        axis="y"
        values={leaderboardUsers}
        onReorder={(newleaderboardUsers) => {
          dispatch(setLeaderboardUsers(newleaderboardUsers));
        }}
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
            {leaderboardUsers.map((leaderboardUser, index) =>
              <Reorder.Item
                as="tr"
                key={leaderboardUser.id}
                value={leaderboardUser.points}
                variants={tr}
                initial="hidden"
                animate="show"
              >
                <td className="text-white font-medium py-[22px] pl-[22px] w-2/12">{index + 1}</td>
                <td className="text-white font-medium py-[22px] w-8/12">{eclipseAddress(leaderboardUser.walletAddress)}</td>
                <td className="text-white font-medium py-[22px] pr-[22px] w-2/12">{leaderboardUser.points}</td>
              </Reorder.Item>
            )}
            {!isLeaderboardUsersFinished &&
              <motion.tr
                key={leaderboardUsers.length}
                viewport={{ once: true, margin: "100px" }}
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
                  <>
                    <td className="bg-tertiary animate-pulse py-[22px] pl-[22px] w-2/12 rounded-tl-lg rounded-bl-lg"></td>
                    <td className="bg-tertiary animate-pulse py-[22px] w-8/12"></td>
                    <td className="bg-tertiary animate-pulse py-[22px] pr-[22px] w-2/12 rounded-tr-lg rounded-br-lg"></td>
                  </>
                }
              </motion.tr>
            }
          </tbody>
        </table>
      </Reorder.Group>
    </AnimatePresence>
  )
}

export default Leaderboard;
