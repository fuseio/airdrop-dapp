import { useAppDispatch, useAppSelector } from "@/store/store";
import { create, selectUserSlice, setTwitterAccountId } from "@/store/userSlice";
import Spinner from "../ui/Spinner";
import { TOTAL_STEPS, exampleTwitterAccountId } from "@/lib/helpers";
import { useAccount } from "wagmi";

const SignUpSkip = () => {
  const dispatch = useAppDispatch();
  const { totalSignupStepCompleted, isCreating, isRetrieving, inviteCode, twitterAccountId, isAuthenticated } = useAppSelector(selectUserSlice);
  const { address } = useAccount();

  function handleSkip() {
    if (!twitterAccountId) {
      dispatch(setTwitterAccountId(exampleTwitterAccountId));
    }
    if (
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
  }

  return (
    <button
      className={`transition ease-in-out flex justify-center items-center gap-2 bg-ironside-gray/30 rounded-full leading-none text-white font-bold px-9 py-4 ${(isCreating || isRetrieving) ? "" : "hover:bg-success hover:text-black"}`}
      onClick={handleSkip}
      disabled={isCreating || isRetrieving}
    >
      {totalSignupStepCompleted === TOTAL_STEPS ? "Redirecting" : "Skip for now"}
      {(isCreating || isRetrieving) &&
        <Spinner />
      }
    </button>
  )
}

export default SignUpSkip;
