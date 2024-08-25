"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/Card3D";
import { type Social } from "@/lib/types";
import { useIntersectionObserver } from "usehooks-ts";

type SocialProps = {
  social: Social;
}

function Social({ social }: SocialProps) {
  const { isIntersecting, ref } = useIntersectionObserver({
    freezeOnceVisible: true,
  });

  return (
    <CardContainer containerClassName={`transition-all ease-in-out duration-300 delay-200 block p-0 h-full ${isIntersecting ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}`} className="block h-full">
      <CardBody className="bg-oslo-gray/[.22] rounded-[20px] w-auto h-full">
        <CardItem
          as="button"
          translateZ="40"
          className="relative flex flex-col justify-center items-center gap-11 w-full min-h-[302px] xl:min-h-[277px] md:p-[30px] pt-14 pb-11 px-2"
          onClick={() => window.open(social.link, "_blank")}
        >
          <div ref={ref} className="flex justify-center items-center w-full min-h-[155px] xl:min-h-[120px]">
            <CardItem translateZ="40">
              <Image
                src={social.image}
                alt={social.title}
              />
            </CardItem>
          </div>
          <CardItem
            translateZ="50"
            as="p"
            className="text-start text-lg xl:text-base md:text-2xl leading-none text-white font-bold"
          >
            {social.title}
          </CardItem>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}

export default Social;
