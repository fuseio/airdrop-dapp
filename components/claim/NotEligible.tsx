import { path } from "@/lib/helpers";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useDisconnect } from "wagmi";
import { resetConnection } from "@/lib/web3Auth";
import Spinner from "../ui/Spinner";
import { useAppDispatch } from "@/store/store";
import { setLogout } from "@/store/userSlice";

const NotEligible = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { disconnect, isPending } = useDisconnect({
    mutation: {
      onSuccess() {
        dispatch(setLogout());
        resetConnection();
      }
    }
  });

  return (
    <motion.div
      className="w-8/9 flex flex-col items-center text-center leading-none mt-[191px] mb-[187px] xl:mt-[52px] xl:mb-[150px] xl:w-9/12 md:w-9/10 max-w-7xl"
      key="not-eligible"
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
        Sorry, you are not eligible
      </h1>
      <p className="text-lg xl:text-base text-monsoon font-semibold mt-6 xl:mt-5 max-w-[496px]">
        Unfortunately, this address does not meet the
        requirements for receiving an award in the past season.
        Participate in the new season to be rewarded!
      </p>
      <button
        className="transition ease-in-out bg-primary flex justify-center items-center gap-2 w-full max-w-[268px] border border-primary rounded-full text-black font-semibold mt-12 xl:mt-10 px-5 py-[15px] hover:bg-transparent hover:text-primary"
        onClick={() => disconnect()}
      >
        Try another wallet
        {isPending &&
          <Spinner />
        }
      </button>
      <button
        className="transition ease-in-out flex justify-center items-center gap-2 bg-ironside-gray/30 rounded-full leading-none text-white font-bold mt-[136px] xl:mt-28 px-9 py-4 hover:bg-success hover:text-black"
        onClick={() => router.push(path.HOME)}
      >
        Back to dashboard
      </button>
    </motion.div>
  )
}

export default NotEligible;
