import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setIsBoostModalOpen } from "@/store/userSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import boostedQuests from "@/assets/boosted-quests.gif";

const BoostModal = (): JSX.Element => {
  const { isBoostModalOpen } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "boost-modal-bg") {
        dispatch(setIsBoostModalOpen(false));
      }
    });
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isBoostModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[80] flex backdrop-blur"
          id="boost-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="flex w-auto h-full md:w-full md:h-auto md:max-w-[95%] z-[80] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col relative m-auto">
              <Image
                src={boostedQuests}
                alt="boosted quests"
                width={600}
                height={600}
                className="cursor-pointer"
                onClick={() => {
                  if (checked) {
                    localStorage.setItem("airdrop-isBoostedModalHidden", "true");
                  }
                  dispatch(setIsBoostModalOpen(false))
                }}
              />
              <label htmlFor="hide-boost-modal" className="flex items-center gap-2.5 relative mt-6 text-white leading-none">
                <input
                  type="checkbox"
                  id="hide-boost-modal"
                  name="hide-boost-modal"
                  className="boost-modal-checkbox appearance-none w-4 h-4 bg-transparent border border-success rounded text-success"
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
                {" Don't show it anymore"}
              </label>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default BoostModal;
