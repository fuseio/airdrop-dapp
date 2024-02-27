import { signDataMessage } from "@/lib/helpers";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { authenticate, create, selectUserSlice, setCurrentSignupStep } from "@/store/userSlice";
import { useEffect } from "react";
import { useAccount, useSignMessage } from "wagmi";
import Spinner from "../ui/Spinner";

const SignUpVerify = () => {
  const dispatch = useAppDispatch();
  const { currentSignupStep, inviteCode, twitterAccountId, isAuthenticating, isAuthenticated, isCreating, isRetrieving, isUser } = useAppSelector(selectUserSlice);
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
      currentSignupStep === "verify" &&
      isAuthenticated &&
      address &&
      inviteCode &&
      twitterAccountId
    ) {
      dispatch(create({
        createUserDetail: {
          walletAddress: address,
          twitterAccountId: twitterAccountId,
          referralCode: inviteCode
        },
      }));
    }
  }, [currentSignupStep, isAuthenticated, address, inviteCode, twitterAccountId, dispatch])

  useEffect(() => {
    if (
      currentSignupStep === "verify" &&
      isUser
    ) {
      dispatch(setCurrentSignupStep("complete"));
    }
  }, [currentSignupStep, isUser, dispatch])

  return (
    <div className={`transition-all ease-in-out bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-screen md:max-w-9/10 md:m-auto h-[113px] md:h-auto px-10 md:px-4 md:py-6 ${currentSignupStep === "verify" ? "opacity-100" : "opacity-50"}`}>
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
          4
        </p>
        <p className="text-2xl text-white font-bold">
          Verify your wallet ownership
        </p>
      </div>
      <button
        className={`transition ease-in-out flex justify-center items-center gap-2 bg-primary rounded-full w-[233px] text-xl leading-none font-semibold py-[15px] ${currentSignupStep === "verify" ? "hover:bg-white" : ""}`}
        disabled={currentSignupStep !== "verify"}
        onClick={() => signMessage({ message: signDataMessage })}
      >
        Sign Message
        {(isPending || isAuthenticating || isCreating || isRetrieving) &&
          <Spinner />
        }
      </button>
    </div>
  )
}

export default SignUpVerify;
