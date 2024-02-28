import { signDataMessage } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { authenticate, selectUserSlice, setSignupStepCompleted, setTotalSignupStepCompleted } from "@/store/userSlice";
import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Spinner from "../ui/Spinner";
import Image from "next/image";
import check from "@/assets/check.svg";

const SignUpVerify = () => {
  const dispatch = useAppDispatch();
  const { signupStepCompleted, isAuthenticating, isAuthenticated } = useAppSelector(selectUserSlice);
  const STEP_POSITION = 2;
  const { address } = useAccount();
  const { isPending, signMessage } = useSignMessage({
    mutation: {
      onSuccess(data) {
        if (!address) {
          return;
        }
        dispatch(authenticate({
          signData: {
            message: signDataMessage,
            signature: data,
            eoaAddress: address
          },
        }));
      }
    }
  });

  useEffect(() => {
    if (
      !signupStepCompleted[STEP_POSITION] &&
      isAuthenticated
    ) {
      dispatch(setSignupStepCompleted({ key: STEP_POSITION, value: true }));
      dispatch(setTotalSignupStepCompleted());
    }
  }, [signupStepCompleted, dispatch, isAuthenticated])

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
          Verify your wallet ownership
        </p>
      </div>
      <button
        className={`transition ease-in-out flex justify-center items-center gap-2 bg-primary rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] ${signupStepCompleted[STEP_POSITION - 1] && !signupStepCompleted[STEP_POSITION] ? "opacity-100 hover:bg-white" : "opacity-30"}`}
        disabled={signupStepCompleted[STEP_POSITION - 1] && !signupStepCompleted[STEP_POSITION] ? false : true}
        onClick={() => signMessage({ message: signDataMessage })}
      >
        Verify
        {(isPending || isAuthenticating) &&
          <Spinner />
        }
      </button>
    </div>
  )
}

export default SignUpVerify;
