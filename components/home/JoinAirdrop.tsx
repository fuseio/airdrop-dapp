import { defaultReferralCode } from "@/lib/helpers";
import { useAppDispatch } from "@/store/store";
import { setCurrentComponent, setInviteCode } from "@/store/userSlice";
import { useState } from "react";
import OTPInput from "react-otp-input";

type JoinAirdropProps = {
  invite: string;
  setInvite: (invite: string) => void;
}

const JoinAirdrop = ({ invite, setInvite }: JoinAirdropProps) => {
  const dispatch = useAppDispatch();
  const [isInputClicked, setIsInputClicked] = useState(false);

  return (
    <form
      className="flex flex-row md:flex-col items-center gap-5 md:gap-3 z-10"
      onSubmit={(e) => {
        e.preventDefault();
        if (
          invite.length !== defaultReferralCode.length &&
          invite.length !== 0
        ) {
          return;
        }
        dispatch(setInviteCode(invite.length === 0 ? defaultReferralCode : invite));
        dispatch(setCurrentComponent("signup"));
      }}
    >
      <OTPInput
        value={invite}
        onChange={setInvite}
        numInputs={5}
        renderInput={(props, index) =>
          <input
            {...props}
            className={`${props.className} ${invite.length === index ? "animate-blink-underline" : "border-white/50"}`}
            onClick={() => {
              if (isInputClicked) {
                return;
              }
              setInvite("");
              setIsInputClicked(true);
            }}
          />
        }
        containerStyle={"gap-2 bg-oslo-gray/30 rounded-full px-[30px] py-3.5"}
        inputStyle="font-pixeloid bg-transparent border-b text-center text-xl leading-none text-white text-bold w-9 focus:outline-none"
        skipDefaultStyles
      />
      <button
        type="submit"
        className="transition ease-in-out bg-primary rounded-full text-xl leading-none font-semibold px-12 py-4 md:w-full hover:bg-white"
      >
        Join Airdrop
      </button>
    </form>
  )
}

export default JoinAirdrop;
