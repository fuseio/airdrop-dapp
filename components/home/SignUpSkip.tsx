import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setCurrentComponent } from "@/store/userSlice";
import Spinner from "../ui/Spinner";

const SignUpSkip = () => {
  const dispatch = useAppDispatch();
  const { isCreating, isRetrieving } = useAppSelector(selectUserSlice);

  return (
    <button
      className={`transition ease-in-out flex justify-center items-center gap-2 bg-ironside-gray/30 rounded-full leading-none text-white font-bold px-9 py-4 ${(isCreating || isRetrieving) ? "" : "hover:bg-success hover:text-black"}`}
      onClick={() => dispatch(setCurrentComponent("dashboard"))}
      disabled={isCreating || isRetrieving}
    >
      {isCreating && "Creating"}
      {isRetrieving && "Retrieving"}
      {(!isCreating && !isRetrieving) && "Skip for now"}
      {(isCreating || isRetrieving) &&
        <Spinner />
      }
    </button>
  )
}

export default SignUpSkip;
