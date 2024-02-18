import { useAppDispatch } from "@/store/store";
import { motion } from "framer-motion";
import Image from "next/image";
import intoTheFuse from "@/assets/into-the-fuse.svg";
import rightArrow from "@/assets/right-arrow.svg";
import { setCurrentComponent } from "@/store/userSlice";
import { path } from "@/lib/helpers";
import Link from "next/link";

const Landing = () => {
  const dispatch = useAppDispatch();

  return (
    <motion.div
      className="w-8/9 flex flex-col items-center mt-[225px] mb-[187px] md:w-9/10 max-w-7xl"
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <Image
        src={intoTheFuse}
        alt="into the Fuse"
      />
      <p className="text-xl text-white max-w-[626.14px] mt-7 mb-16">
        Join the Fuse Airdrop! Get into the Fuse, connect your wallet and earn Rewards with ease:
        Join the Explosive Airdrop Campaign
      </p>
      <button
        className="transition ease-in-out bg-primary rounded-full text-xl leading-none font-semibold px-[52px] py-4 hover:bg-white"
        onClick={() => dispatch(setCurrentComponent("signup"))}
      >
        Get your Airdrop
      </button>
      <Link
        href={path.ABOUT}
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
      </Link>
    </motion.div>
  )
}

export default Landing;
