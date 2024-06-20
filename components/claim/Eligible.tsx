import { path, screenWidth, season1Tier } from "@/lib/helpers";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import pointHexagon from "@/assets/point-hexagon.svg";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";

const Eligible = () => {
  const router = useRouter();
  const matches = useMediaQuery(`(min-width: ${screenWidth.EXTRA_LARGE + 1}px)`);
  const { user } = useAppSelector(selectUserSlice);

  return (
    <motion.div
      className="w-8/9 flex flex-col items-center text-center leading-none mt-[191px] mb-[187px] xl:mt-[52px] xl:mb-[150px] xl:w-9/12 md:w-9/10 max-w-7xl"
      key="claim"
      initial={{
        y: 300,
        opacity: 0
      }}
      animate={{
        y: 0,
        opacity: 1
      }}
      exit={{
        y: -300,
        opacity: 0
      }}
      transition={{
        staggerChildren: 0.3,
      }}
    >
      <h1 className="text-5xl xl:text-4xl text-white font-semibold max-w-[550px]">
        Congratulations, you are eligible for an Airdrop!
      </h1>
      <p className="text-lg xl:text-base text-monsoon font-semibold mt-6 xl:mt-5">
        {'Click on the “Claim on Layer3” to claim your points'}
      </p>
      <div className="bg-oslo-gray/[0.22] rounded-[20px] flex flex-col items-center gap-12 xl:gap-10 w-full max-w-[457px] mt-[75px] xl:mt-16 pt-[47px] pb-[50px] xl:pt-10 xl:pb-11">
        <div className="flex flex-col items-center">
          <p className="text-lg xl:text-base text-pale-slate font-medium">
            Season 1 points
          </p>
          <div className="flex items-center gap-2 xl:gap-1.5 mt-5 xl:mt-4">
            <Image
              src={pointHexagon}
              alt="point hexagon"
              width={matches ? 26 : 20}
              height={matches ? 30 : 24}
            />
            <p className="text-5xl xl:text-4xl text-white font-bold">
              {user.seasonOnePoints}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-lg xl:text-base text-pale-slate font-medium">
            Your tier
          </p>
          <div className="mt-5 xl:mt-4">
            <p className="text-5xl xl:text-4xl text-white font-bold">
              {season1Tier(user.seasonOnePoints)}
            </p>
          </div>
        </div>
        <button
          className="transition ease-in-out bg-primary flex justify-center items-center gap-2 w-full max-w-[268px] border border-primary rounded-full text-black font-semibold px-5 py-[15px] hover:bg-transparent hover:text-primary"
          onClick={() => window.open("https://app.layer3.xyz/collections/fuse-airdrop-rewards", "_blank")}
        >
          Claim on Layer3
        </button>
      </div>
      <button
        className="transition ease-in-out flex justify-center items-center gap-2 bg-ironside-gray/30 rounded-full leading-none text-white font-bold mt-28 xl:mt-24 px-9 py-4 hover:bg-success hover:text-black"
        onClick={() => router.push(path.HOME)}
      >
        Back to dashboard
      </button>
    </motion.div>
  )
}

export default Eligible;
