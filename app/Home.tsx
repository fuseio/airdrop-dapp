import Image from "next/image";
import intoTheFuse from "@/assets/into-the-fuse.svg";
import rightArrow from "@/assets/right-arrow.svg";
import { AnimatePresence, motion } from "framer-motion";

const Landing = () => {
  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[130.98px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Image
        src={intoTheFuse}
        alt="into the Fuse"
      />
      <p className="text-xl text-white max-w-[626.14px] mt-7 mb-16">
        Join the Fuse Airdrop! Get into the Fuse, connect your wallet and earn Rewards with ease: Join the Explosive Airdrop Campaign
      </p>
      <button
        className="transition ease-in-out bg-primary rounded-full text-xl leading-none font-semibold px-[52px] py-4 hover:bg-white"
      >
        Get your Airdrop
      </button>
      <a
        href="#"
        className="group flex items-center gap-2 mt-12"
      >
        <p className="text-xl text-white font-bold">
          Learn about the Airdrop
        </p>
        <Image
          src={rightArrow}
          alt="right arrow"
          className="transition ease-in-out delay-150 group-hover:translate-x-1"
        />
      </a>
    </motion.div>
  )
}

export default function Home() {
  return (
    <div className="w-full flex flex-col items-center">
      <AnimatePresence initial={false}>
        <Landing />
      </AnimatePresence>
    </div>
  )
}
