import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setSignupStepCompleted, setTotalSignupStepCompleted, setTwitterAccountId } from "@/store/userSlice";
import Image from "next/image";
import check from "@/assets/check.svg";
import { MANDATORY_STEP_POSITION, exampleTwitterAccountId } from "@/lib/helpers";

const SignUpDiscord = () => {
  const dispatch = useAppDispatch();
  const { signupStepCompleted } = useAppSelector(selectUserSlice);
  const STEP_POSITION = 4;

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
          Join our Discord
        </p>
      </div>
      <button
        className={`transition ease-in-out bg-primary rounded-full w-[163px] text-xl leading-none font-semibold py-[15px] ${signupStepCompleted[MANDATORY_STEP_POSITION] && !signupStepCompleted[STEP_POSITION] ? "opacity-100 hover:bg-white" : "opacity-30"}`}
        disabled={signupStepCompleted[MANDATORY_STEP_POSITION] && !signupStepCompleted[STEP_POSITION] ? false : true}
        onClick={() => {
          dispatch(setTwitterAccountId(exampleTwitterAccountId));
          dispatch(setSignupStepCompleted({ key: STEP_POSITION, value: true }));
          dispatch(setTotalSignupStepCompleted());
        }}
      >
        Join
      </button>
    </div>
  )
}

export default SignUpDiscord;
