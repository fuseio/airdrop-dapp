"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import { EcosystemApp } from "@/lib/types";
import { useIntersectionObserver } from "usehooks-ts";
import { useAppDispatch } from "@/store/store";
import { setIsEcosystemAppModalOpen, setSelectedEcosystemApp } from "@/store/userSlice";

type EcosystemAppProps = {
  ecosystemApp: EcosystemApp;
}

function EcosystemAppItem({ ecosystemApp }: EcosystemAppProps) {
  const dispatch = useAppDispatch();
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  return (
    <CardContainer containerClassName={`transition-all ease-in-out duration-300 delay-200 block p-0 h-full ${isIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`} className="block h-full">
      <CardBody className={`bg-tertiary bg-no-repeat bg-right-bottom rounded-[20px] w-auto h-full ${ecosystemApp.background}`}>
        <CardItem
          as="button"
          translateZ="40"
          className="relative flex justify-between items-center gap-2 w-full min-h-[228px] xl:min-h-[182px] pt-10 pr-[38px] pb-[37px] pl-[37px] md:p-8"
          onClick={() => {
            dispatch(setIsEcosystemAppModalOpen(true));
            dispatch(setSelectedEcosystemApp(ecosystemApp));
          }}
        >
          <CardItem
            translateZ="30"
            className="flex flex-col items-start text-start"
          >
            <div ref={ref}></div>
            <p className="text-2xl xl:text-xl text-success font-bold">
              {ecosystemApp.name}
            </p>
            <p className="text-lg xl:text-base text-pale-slate font-medium mt-[19px] xl:mt-4 max-w-[278px]">
              {ecosystemApp.description}
            </p>
            <div className="rounded-full border border-gray-goose text-base xl:text-sm leading-none text-white mt-6 xl:mt-5 px-3 py-2">
              {ecosystemApp.quests.length} Quests
            </div>
          </CardItem>
          <CardItem
            translateZ="40"
          >
            <Image
              src={ecosystemApp.image}
              alt={ecosystemApp.name}
            />
          </CardItem>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export default EcosystemAppItem;
