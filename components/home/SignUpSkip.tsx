import { useAppDispatch, useAppSelector } from "@/store/store";
import { create, selectUserSlice } from "@/store/userSlice";
import Spinner from "../ui/Spinner";
import { useAccount } from "wagmi";

const SignUpSkip = () => {
  const dispatch = useAppDispatch();
  const { isCreating, isRetrieving, inviteCode, isAuthenticated, isUser, user } = useAppSelector(selectUserSlice);
  const { address } = useAccount();

  function handleSkip() {
    if (
      isAuthenticated &&
      address &&
      inviteCode
    ) {
      dispatch(create({
        createUserDetail: {
          walletAddress: address,
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
      {(isUser && user.twitterAccountId) && "Redirecting"}
      {isCreating && "Creating"}
      {isRetrieving && "Retrieving"}
      {(!isUser && !user.twitterAccountId && !isCreating && !isRetrieving) && "Skip for now"}
      {(isCreating || isRetrieving) &&
        <Spinner />
      }
    </button>
  )
}

export default SignUpSkip;
