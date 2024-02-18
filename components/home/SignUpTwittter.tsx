import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setCurrentSignupStep } from "@/store/userSlice";

const SignUpTwitter = () => {
  const dispatch = useAppDispatch();
  const { currentSignupStep } = useAppSelector(selectUserSlice);

  return (
    <div className={`transition-all ease-in-out bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-screen md:max-w-9/10 md:m-auto h-[113px] md:h-auto px-10 md:px-4 md:py-6 ${currentSignupStep === "twitter" ? "opacity-100" : "opacity-50"}`}>
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
          2
        </p>
        <p className="text-2xl text-white font-bold">
          Connect Twitter/X
        </p>
      </div>
      <button
        className={`transition ease-in-out bg-primary rounded-full w-[233px] text-xl leading-none font-semibold py-[15px] ${currentSignupStep === "twitter" ? "hover:bg-white" : ""}`}
        disabled={currentSignupStep !== "twitter"}
        onClick={() => dispatch(setCurrentSignupStep("wallet"))}
      >
        Connect Twitter/X
      </button>
    </div>
  )
}

export default SignUpTwitter;
