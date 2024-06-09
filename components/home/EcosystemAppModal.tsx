import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setIsEcosystemAppModalOpen } from "@/store/userSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import closeWhite from "@/assets/close-white.svg";
import pointHexagon from "@/assets/point-hexagon.svg";
import { useMediaQuery } from "usehooks-ts";
import { screenWidth } from "@/lib/helpers";
import Markdown from "react-markdown";

const EcosystemAppModal = (): JSX.Element => {
  const { isEcosystemAppModalOpen, selectedEcosystemApp } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "ecosystem-app-modal-bg") {
        dispatch(setIsEcosystemAppModalOpen(false));
      }
    });
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isEcosystemAppModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[80] flex backdrop-blur"
          id="ecosystem-app-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="bg-tertiary w-full max-w-[880px] md:max-w-[95%] z-[80] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl"
          >
            <div className="flex flex-col p-12 xl:p-10">
              <div className="flex justify-between items-start">
                <Image
                  src={selectedEcosystemApp.image}
                  alt={selectedEcosystemApp.name}
                />
                <Image
                  src={closeWhite}
                  alt="close"
                  width={25}
                  height={25}
                  className="cursor-pointer hover:opacity-60"
                  onClick={() => dispatch(setIsEcosystemAppModalOpen(false))}
                />
              </div>
              <p className="text-lg xl:text-base text-white/70 font-medium mt-[29px] xl:mt-5">
                {selectedEcosystemApp.description}
              </p>
              <div className="flex flex-col gap-[22px] mt-[54px] xl:mt-11">
                <p className="text-2xl xl:text-xl text-white font-bold">
                  {selectedEcosystemApp.quests.length} quests
                </p>
                <div className="flex flex-col gap-5">
                  {selectedEcosystemApp.quests.map((selectedEcosystemAppQuest) => (
                    <div key={selectedEcosystemAppQuest.id}>
                      <p className="text-lg xl:text-base text-white font-semibold">
                        {selectedEcosystemAppQuest.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default EcosystemAppModal;
