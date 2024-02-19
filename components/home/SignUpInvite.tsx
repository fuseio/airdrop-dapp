import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, setCurrentSignupStep, setInviteCode } from "@/store/userSlice";
import { useRef } from "react";

const SignUpInvite = () => {
  const dispatch = useAppDispatch();
  const { currentSignupStep } = useAppSelector(selectUserSlice);
  const referralCodeRef = useRef<HTMLInputElement>(null);

  function submitReferralCode() {
    if (!referralCodeRef.current || !referralCodeRef.current.value.length) {
      return;
    }

    dispatch(setInviteCode(referralCodeRef.current.value));
    dispatch(setCurrentSignupStep("twitter"));
  }

  return (
    <div className={`transition-all ease-in-out bg-tertiary rounded-[20px] flex flex-row md:flex-col md:gap-4 justify-between items-center md:text-center w-[849px] md:w-screen md:max-w-9/10 md:m-auto md:h-auto px-10 md:px-4 md:py-6 ${currentSignupStep === "invite" ? "h-[170px] opacity-100" : "h-[113px] opacity-50"}`}>
      <div className="flex flex-row md:flex-col md:gap-2 items-center gap-6">
        <p className="bg-carbon-gray rounded-full flex justify-center items-center w-[45px] h-[45px] text-2xl leading-none text-white font-bold">
          1
        </p>
        <div className="flex flex-col gap-2.5">
          <p className="text-2xl text-white font-bold">
            Enter Invite Code
          </p>
          {currentSignupStep === "invite" &&
            <p className="transition-all ease-in-out text-gray-cloud max-w-[398px]">
              Enter an invite code to claim your airdrop. You can{" "}
              <a
                href="https://discord.com/invite/jpPMeSZ"
                target="_blank"
                className="transition ease-in-out underline hover:opacity-60"
              >
                join our Discord
              </a>{" "}
              or{" "}
              <a
                href="https://twitter.com/intent/user?screen_name=Fuse_network"
                target="_blank"
                className="transition ease-in-out underline hover:opacity-60"
              >
                check Twitter
              </a>{" "}
              for invites.
            </p>
          }
        </div>
      </div>
      <form
        className="flex flex-col gap-4"
        onSubmit={e => {
          e.preventDefault();
          submitReferralCode();
        }}
      >
        {currentSignupStep === "invite" &&
          <input
            type="text"
            name="referral-code"
            placeholder="Your Code"
            ref={referralCodeRef}
            required
            className="transition-all ease-in-out bg-transparent rounded-full w-[233px] border border-white px-5 py-[15px] text-white placeholder:text-white placeholder:font-semibold"
          />
        }
        <button
          type="submit"
          className={`transition ease-in-out bg-primary rounded-full w-[233px] text-xl leading-none font-semibold py-[15px] ${currentSignupStep === "invite" ? "hover:bg-white" : ""}`}
          disabled={currentSignupStep !== "invite"}
        >
          Enter Code
        </button>
      </form>
    </div>
  )
}

export default SignUpInvite;
