"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import { EcosystemApp } from "@/lib/types";

type EcosystemAppProps = {
  app: EcosystemApp;
}

function EcosystemApp({ app }: EcosystemAppProps) {
  return (
    <CardContainer containerClassName="block p-0" className="block">
      <CardBody className="relative bg-tertiary rounded-[20px] flex flex-row md:flex-col justify-between min-h-[249px] p-10 group/card w-auto h-auto">
        <div className={app.background}></div>
        <div className="flex flex-col justify-between md:gap-6 z-10 md:mb-16">
          <div className="flex flex-col gap-4 md:gap-5">
            <CardItem
              as="p"
              translateZ="50"
              className="text-2xl text-primary font-bold"
            >
              {app.name}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-lg text-pale-slate font-medium max-w-[278px]"
            >
              {app.description}
            </CardItem>
          </div>
          <div className="flex items-center gap-3.5">
            <CardItem
              as="p"
              translateZ="40"
              className="text-lg text-pale-slate font-medium max-w-[200px]"
            >
              Points Status
            </CardItem>
            <CardItem
              as="p"
              translateZ="30"
              className="border-[0.5px] border-gray-goose rounded-full leading-none text-white font-semibold px-3 py-2"
            >
              Coming Soon
            </CardItem>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <CardItem translateZ="40">
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
