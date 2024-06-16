"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import { Quest } from "@/lib/types";
import { useIntersectionObserver, useMediaQuery } from "usehooks-ts";
import pointHexagon from "@/assets/point-hexagon.svg";
import hourglass from "@/assets/hourglass.svg";
import { screenWidth } from "@/lib/helpers";
import { useAppDispatch } from "@/store/store";
import { setIsQuestModalOpen, setSelectedQuest } from "@/store/userSlice";
import checkBackground from "@/assets/check-background.svg";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";

type QuestProps = {
  quest: Quest;
}

function QuestItem({ quest }: QuestProps) {
  const dispatch = useAppDispatch();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  return (
    <CardContainer containerClassName={`transition-all ease-in-out duration-300 delay-200 block p-0 h-full ${isIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`} className="block h-full">
      <CardBody className="bg-oslo-gray/[.22] rounded-[20px] w-auto h-full">
        <CardItem
          as="button"
          translateZ="40"
          disabled={!quest.isActive || quest.completed}
          className={`relative flex flex-col justify-between gap-2 w-full min-h-[346px] xl:min-h-[277px] md:p-[30px] ${quest.padding ?? "p-6"}`}
          onClick={() => {
            if (!quest.isActive || quest.completed) {
              return;
            }
            dispatch(setIsQuestModalOpen(true));
            dispatch(setSelectedQuest(quest));
          }}
        >
          {quest.image &&
            <div ref={ref} className="flex justify-center items-center w-full min-h-[260px] xl:min-h-[208px]">
              <CardItem translateZ="40">
                <Image
                  src={quest.image}
                  alt={quest.title}
                />
              </CardItem>
            </div>
          }
          {quest.completed &&
            <CardItem translateZ="100" className="absolute top-[22px] right-5">
              <div className="group relative cursor-pointer flex justify-center items-center">
                <Image
                  src={checkBackground}
                  alt="check"
                  width={matches ? 47 : 38}
                  height={matches ? 47 : 38}
                />
                <div className="tooltip-text hidden bottom-16 absolute bg-white p-4 rounded-2xl w-[130px] shadow-lg group-hover:block text-black text-sm font-medium">
                  <p>
                    Task complete
                  </p>
                </div>
              </div>
            </CardItem>
          }
          {(NEXT_PUBLIC_ENVIRONMENT === "staging" && Boolean(quest.accumulatedPoints)) &&
            <CardItem translateZ="100" className="absolute top-[22px] right-5">
              <div className="group relative cursor-pointer flex justify-center items-center">
                <div className="bg-white rounded-full flex justify-center items-center min-w-12 min-h-12 text-center text-sm leading-none text-secondary font-bold">
                  {quest.accumulatedPoints}
                </div>
                <div className="tooltip-text hidden bottom-14 absolute bg-white pl-4 py-3.5 pr-2.5 rounded-2xl w-64 shadow-lg group-hover:block text-black text-sm font-medium">
                  <p>
                    {"Your expected daily reward. Don't remove funds from staking."}
                  </p>
                </div>
              </div>
            </CardItem>
          }
          <div className="flex flex-col gap-3.5">
            <CardItem
              translateZ="50"
              as="p"
              className="text-start text-lg xl:text-base leading-none text-white font-bold"
            >
              {quest.title}
            </CardItem>
            <div className="flex items-center gap-1">
              <CardItem
                translateZ="30"
                className="mb-0.5"
              >
                <Image
                  src={quest.isActive ? pointHexagon : hourglass}
                  alt={quest.isActive ? "point hexagon" : "hourglass"}
                  width={matches ? 12 : 10}
                  height={matches ? 14 : 12}
                />
              </CardItem>
              <CardItem
                translateZ="20"
                as="p"
                className={`text-left text-lg xl:text-base leading-none ${quest.isActive ? "text-success" : "text-white/50"}`}
              >
                {quest.isActive ? quest.point : "Coming Soon"}
              </CardItem>
            </div>
          </div>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export default QuestItem;
