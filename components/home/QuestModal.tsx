import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { generateTwitterAuthUrl, selectUserSlice, setIsQuestModalOpen } from "@/store/userSlice";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import closeWhite from "@/assets/close-white.svg";
import pointHexagon from "@/assets/point-hexagon.svg";
import { useMediaQuery } from "usehooks-ts";
import { screenWidth } from "@/lib/helpers";
import Spinner from "../ui/Spinner";
import Markdown from "react-markdown";

const QuestModal = (): JSX.Element => {
  const { isQuestModalOpen, selectedQuest } = useAppSelector(selectUserSlice);
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);

  function handleClick(id: string) {
    if (id === "followFuseOnTwitter") {
      dispatch(generateTwitterAuthUrl());
    }
  }

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if ((e.target as HTMLElement).id === "quest-modal-bg") {
        dispatch(setIsQuestModalOpen(false));
      }
    });
  }, [dispatch]);

  return (
    <AnimatePresence>
      {isQuestModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 z-[80] flex backdrop-blur"
          id="quest-modal-bg"
        >
          <motion.div
            initial={{ opacity: 0, top: "0" }}
            animate={{ opacity: 1, top: "50%" }}
            exit={{ opacity: 0, top: "0" }}
            transition={{
              duration: 0.3,
            }}
            className="bg-tertiary min-h-[572px] xl:min-h-[458px] w-[519px] xl:w-[415px] max-w-[95%] z-[80] absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 rounded-2xl"
          >
            <div className="relative flex flex-col justify-between min-h-[inherit] pt-9 xl:pt-7">
              <div className="absolute right-9 xl:right-7">
                <Image
                  src={closeWhite}
                  alt="close"
                  width={25}
                  height={25}
                  className="cursor-pointer hover:opacity-60"
                  onClick={() => dispatch(setIsQuestModalOpen(false))}
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex justify-center items-center h-[210px] xl:h-auto">
                  <Image
                    src={selectedQuest.image}
                    alt={selectedQuest.title}
                    className="pt-2.5"
                  />
                </div>
                <p className="text-2xl xl:text-xl leading-none text-white font-bold mt-8">
                  {selectedQuest.title}
                </p>
                <p className="text-lg xl:text-base leading-6 text-pale-slate font-medium max-w-md xl:max-w-xs mt-5 whitespace-pre-wrap">
                  <Markdown>{selectedQuest.description}</Markdown>
                </p>
                <div className="flex items-center gap-2 text-left mt-12 max-w-md xl:max-w-xs">
                  <Image
                    src={pointHexagon}
                    alt="point hexagon"
                    width={matches ? 20 : 16}
                    height={matches ? 23 : 19}
                  />
                  <p className="text-lg xl:text-base text-success font-bold">
                    {selectedQuest.point}
                  </p>
                </div>
              </div>
              <div className="min-h-[104px] xl:min-h-fit mt-10">
                <hr className="border-[0.3px] border-davy-gray" />
                <div className="flex justify-end items-center mt-7 mb-8 xl:mt-6 xl:mb-6.5 px-9 xl:px-7">
                  {selectedQuest.button &&
                    <button
                      className="transition ease-in-out bg-primary flex justify-center items-center gap-2 border border-primary rounded-full text-black leading-none font-semibold px-9 py-4 xl:px-7 xl:py-2.5 hover:bg-transparent hover:text-primary"
                      onClick={() => {
                        if (selectedQuest.isFunction) {
                          handleClick(selectedQuest.id);
                        }
                        if (selectedQuest.link) {
                          window.open(selectedQuest.link, "_blank")
                        }
                      }}
                    >
                      {selectedQuest.button}
                      {selectedQuest.isLoading &&
                        <Spinner />
                      }
                    </button>
                  }
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default QuestModal;
