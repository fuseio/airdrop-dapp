"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import { EcosystemApp } from "@/lib/types";
import { useIntersectionObserver } from "usehooks-ts";

type EcosystemAppProps = {
  app: EcosystemApp;
}

function EcosystemApp({ app }: EcosystemAppProps) {
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  return (
    <CardContainer containerClassName={`transition-all ease-in-out duration-300 delay-200 block p-0 ${isIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`} className="block">
      <CardBody className="relative bg-tertiary rounded-[20px] flex flex-row md:flex-col justify-between min-h-[249px] xl:min-h-[200px] p-10 xl:p-8 w-auto h-auto">
        <div ref={ref} className={app.background}></div>
        <div className="flex flex-col justify-between xl:gap-2 md:gap-6 z-10 md:mb-16">
          <div className="flex flex-col gap-4 xl:gap-2.5 md:gap-5">
            <CardItem
              as="p"
              translateZ="50"
              className="text-2xl xl:text-xl text-primary font-bold"
            >
              {app.name}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-lg xl:text-base text-pale-slate font-medium max-w-[278px] xl:max-w-[222px]"
            >
              {app.description}
            </CardItem>
          </div>
          <div className="flex items-center gap-3.5 xl:gap-2.5">
            <CardItem
              as="p"
              translateZ="40"
              className="text-lg xl:text-base text-pale-slate font-medium max-w-[200px]"
            >
              Points Status
            </CardItem>
            <CardItem
              as="p"
              translateZ="30"
              className="border-[0.5px] border-gray-goose rounded-full leading-none text-white font-semibold px-3 py-2 xl:px-2 xl:py-1"
            >
              Coming Soon
            </CardItem>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <CardItem
            translateZ="40"
            className="xl:max-w-32 md:max-w-full"
          >
            <Image
              src={app.image}
              alt={app.name}
            />
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default EcosystemApp;
