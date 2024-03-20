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
import checkBorder from "@/assets/check-border.svg";

type QuestProps = {
  quest: Quest;
}

function Quest({ quest }: QuestProps) {
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
          className="relative flex flex-col justify-between gap-2 w-full min-h-[346px] xl:min-h-[277px] p-6 md:p-[30px]"
          onClick={() => {
            if (!quest.isActive || quest.completed) {
              return;
            }
            dispatch(setIsQuestModalOpen(true));
            dispatch(setSelectedQuest(quest));
          }}
        >
          <div ref={ref} className="flex justify-center items-center w-full min-h-[260px] xl:min-h-[208px]">
            <CardItem translateZ="40">
              <Image
                src={quest.image}
                alt={quest.title}
              />
            </CardItem>
          </div>
          {quest.completed &&
            <Image
              src={checkBorder}
              alt="check"
              width={matches ? 47 : 38}
              height={matches ? 47 : 38}
              className="absolute top-[22px] right-5"
            />
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
              <CardItem translateZ="30">
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
                className={`text-lg xl:text-base leading-none ${quest.isActive ? "text-success" : "text-white/50"}`}
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

export default Quest;
