import { useAppDispatch, useAppSelector } from "@/store/store";
import { generateTwitterAuthUrl, retrieve, selectUserSlice, setSignupStepCompleted, setTotalSignupStepCompleted } from "@/store/userSlice";
import Image from "next/image";
import check from "@/assets/check.svg";
import { signUpSteps } from "@/lib/helpers";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Spinner from "../ui/Spinner";

const SignUpTwitter = () => {
  const dispatch = useAppDispatch();
  const { isGeneratingTwitterAuthUrl, signupStepCompleted, twitterAuthUrl } = useAppSelector(selectUserSlice);
  const searchParams = useSearchParams();
  const twitterConnected = searchParams.get('twitter-connected');
  const [isTwitterConnectedError, setIsTwitterConnectedError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (twitterConnected === "true") {
      dispatch(setSignupStepCompleted({ key: signUpSteps.TWITTER, value: true }));
      dispatch(setTotalSignupStepCompleted());
      dispatch(retrieve());
    } else if (twitterConnected === "false") {
      setIsTwitterConnectedError(true);
    }
  }, [dispatch, twitterConnected])

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
        className={`transition ease-in-out bg-primary flex justify-center items-center gap-2 rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] ${signupStepCompleted[signUpSteps.MANDATORY] && !signupStepCompleted[signUpSteps.TWITTER] ? "opacity-100 hover:bg-white" : "opacity-30"}`}
        disabled={signupStepCompleted[signUpSteps.MANDATORY] && !signupStepCompleted[signUpSteps.TWITTER] ? false : true}
        onClick={() => dispatch(generateTwitterAuthUrl())}
      >
        {isTwitterConnectedError ? "Retry" : "Follow"}
        {isGeneratingTwitterAuthUrl &&
          <Spinner />
        }
      </button>
    </div>
  )
}

export default SignUpTwitter;
