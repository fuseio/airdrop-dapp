import { useAppDispatch, useAppSelector } from "@/store/store";
import { generateTwitterAuthUrl, retrieve, selectUserSlice, setSignupStepCompleted, setTotalSignupStepCompleted } from "@/store/userSlice";
import Image from "next/image";
import check from "@/assets/check.svg";
import { path, season2TwitterLaunchDate, signUpSteps } from "@/lib/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";
import { useAccount } from "wagmi";

const SignUpTwitter = () => {
  const dispatch = useAppDispatch();
  const { isGeneratingTwitterAuthUrl, isCreating, isRetrieving, signupStepCompleted, twitterAuthUrl, user } = useAppSelector(selectUserSlice);
  const searchParams = useSearchParams();
  const twitterConnected = searchParams.get('twitter-connected');
  const [isTwitterConnectedError, setIsTwitterConnectedError] = useState(false);
  const router = useRouter();
  const { isConnected } = useAccount();

  const isAfterSeason2TwitterLaunch = new Date(user.createdAt) >= season2TwitterLaunchDate;
  const isPreviousStepCompleted = signupStepCompleted[signUpSteps.TWITTER - 1];
  const isMandatoryStepsCompleted = signupStepCompleted[signUpSteps.MANDATORY];
  const isTwitterCompleted = signupStepCompleted[signUpSteps.TWITTER];

  const isDisabled = isAfterSeason2TwitterLaunch
    ? !isPreviousStepCompleted || isTwitterCompleted
    : !isMandatoryStepsCompleted || isTwitterCompleted;

  useEffect(() => {
    if (twitterConnected === "true") {
      dispatch(setSignupStepCompleted({ key: signUpSteps.TWITTER, value: true }));
      dispatch(setTotalSignupStepCompleted());
      dispatch(retrieve());
      router.replace(path.HOME);
    } else if (twitterConnected === "false") {
      setIsTwitterConnectedError(true);
      router.replace(path.HOME);
    }
  }, [dispatch, router, twitterConnected])

  useEffect(() => {
    if (twitterAuthUrl) {
      router.push(twitterAuthUrl);
    }
  }, [router, twitterAuthUrl])

  return (
    <div className="bg-oslo-gray/[.22] rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-screen md:max-w-9/10 md:m-auto h-[113px] md:h-auto px-10 md:px-4 md:py-6">
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <div className={`transition-all ease-in-out duration-300 relative border-dashed border rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold overflow-hidden ${signupStepCompleted[signUpSteps.TWITTER] ? "border-primary" : "border-white"}`}>
          <p className={`transition-all ease-in-out duration-300 absolute left-1/2 ${signupStepCompleted[signUpSteps.TWITTER] ? "translate-x-12" : "-translate-x-1/2"}`}>
            {signUpSteps.TWITTER}
          </p>
          <Image
            src={check}
            alt="check"
            width={21}
            height={15}
            className={`transition-all ease-in-out duration-300 absolute left-1/2 ${signupStepCompleted[signUpSteps.TWITTER] ? "-translate-x-1/2" : "-translate-x-12"}`}
          />
        </div>
        <p className="text-2xl text-white font-bold">
          Follow us on X (Twitter)
        </p>
      </div>
      <button
        className={`transition ease-in-out bg-primary flex justify-center items-center gap-2 rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] ${isDisabled ? "opacity-30" : "opacity-100 hover:bg-white"}`}
        disabled={isDisabled}
        onClick={() => dispatch(generateTwitterAuthUrl())}
      >
        {(isTwitterConnectedError && isConnected) && "Retry"}
        {!isTwitterConnectedError && "Follow"}
        {(
          new Date(user.createdAt) >= season2TwitterLaunchDate &&
          (
            isGeneratingTwitterAuthUrl ||
            (signupStepCompleted[signUpSteps.TWITTER] && (isCreating || isRetrieving))
          )
        ) &&
          <Spinner />
        }
      </button>
    </div>
  )
}

export default SignUpTwitter;
