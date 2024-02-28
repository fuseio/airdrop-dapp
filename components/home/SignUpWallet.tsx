import { selectNavbarSlice, setIsWalletModalOpen } from "@/store/navbarSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setSignupStepCompleted, setTotalSignupStepCompleted } from "@/store/userSlice";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import Spinner from "../ui/Spinner";
import { arbitrum, polygon, fuse, optimism, bsc, mainnet } from "wagmi/chains";
import Image, { StaticImageData } from "next/image";
import check from "@/assets/check.svg";
import fuseIcon from "@/assets/fuse-icon.svg";
import polygonIcon from "@/assets/polygon-icon.svg";
import optimismIcon from "@/assets/optimism-icon.svg";
import arbitrumIcon from "@/assets/arbitrum-icon.svg";
import bscLogo from "@/assets/bnb-icon.svg";
import ethLogo from "@/assets/ethereum-icon.svg";
import { eclipseAddress } from "@/lib/helpers";

type Icons = {
  [key: string]: string | StaticImageData;
};

const icons: Icons = {
  [fuse.id]: fuseIcon,
  [polygon.id]: polygonIcon,
  [optimism.id]: optimismIcon,
  [arbitrum.id]: arbitrumIcon,
  [mainnet.id]: ethLogo,
  [bsc.id]: bscLogo,
};

const SignUpWallet = () => {
  const dispatch = useAppDispatch();
  const { signupStepCompleted } = useAppSelector(selectUserSlice);
  const { isWalletModalOpen } = useAppSelector(selectNavbarSlice);
  const { address, isConnected, isConnecting, chain } = useAccount();
  const STEP_POSITION = 1;

  useEffect(() => {
    if (
      !signupStepCompleted[STEP_POSITION] &&
      isConnected
    ) {
      dispatch(setSignupStepCompleted({ key: STEP_POSITION, value: true }));
      dispatch(setTotalSignupStepCompleted());
    }
  }, [signupStepCompleted, isConnected, dispatch])

  return (
    <div className="bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-screen md:max-w-9/10 md:m-auto h-[113px] md:h-auto px-10 md:px-4 md:py-6">
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <div className={`transition-all ease-in-out duration-300 relative border-dashed border rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold overflow-hidden ${signupStepCompleted[STEP_POSITION] ? "border-primary" : "border-white"}`}>
          <p className={`transition-all ease-in-out duration-300 absolute left-1/2 ${signupStepCompleted[STEP_POSITION] ? "translate-x-12" : "-translate-x-1/2"}`}>
            {STEP_POSITION}
          </p>
          <Image
            src={check}
            alt="check"
            width={21}
            height={15}
            className={`transition-all ease-in-out duration-300 absolute left-1/2 ${signupStepCompleted[STEP_POSITION] ? "-translate-x-1/2" : "-translate-x-12"}`}
          />
        </div>
        <p className="text-2xl text-white font-bold">
          Connect Wallet
        </p>
      </div>
      {!signupStepCompleted[STEP_POSITION] &&
        <button
          className={`transition ease-in-out bg-primary flex justify-center items-center gap-2 rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] ${signupStepCompleted[STEP_POSITION] ? "" : "hover:bg-white"}`}
          disabled={signupStepCompleted[STEP_POSITION]}
          onClick={() => dispatch(setIsWalletModalOpen(true))}
        >
          Connect
          {(isWalletModalOpen || isConnecting) &&
            <Spinner />
          }
        </button>
      }
      {(signupStepCompleted[STEP_POSITION] && address) &&
        <div className="flex justify-center items-center gap-2 border border-smokey-gray rounded-full w-[163px] py-2.5">
          <Image
            src={icons[chain?.id ?? 122]}
            alt={chain?.name ?? "Fuse"}
            width={25}
            height={25}
          />
          <p className="text-white opacity-70">
            {eclipseAddress(String(address))}
          </p>
        </div>
      }
      {(signupStepCompleted[STEP_POSITION] && !address) &&
        <button
          className="transition ease-in-out bg-primary flex justify-center items-center gap-2 rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] hover:bg-white"
          onClick={() => dispatch(setIsWalletModalOpen(true))}
        >
          Reconnect
          {(isWalletModalOpen || isConnecting) &&
            <Spinner />
          }
        </button>
      }
    </div>
  )
}

export default SignUpWallet;
