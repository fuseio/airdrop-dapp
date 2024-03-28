import { useAppDispatch, useAppSelector } from "@/store/store";
import { selectUserSlice, submitComingSoonSubscribe } from "@/store/userSlice";
import { useState } from "react";
import Spinner from "../ui/Spinner";

const NotifySubscribe = () => {
  const dispatch = useAppDispatch();
  const { isSubmittingComingSoonSubscribe, isSubmittedComingSoonSubscribe, isErrorSubmittingComingSoonSubscribe } = useAppSelector(selectUserSlice);
  const [email, setEmail] = useState("");

  return (
    <form
      className="flex flex-row md:flex-col items-center gap-5 md:gap-3 z-10 w-auto md:w-[100%]"
      onSubmit={(e) => {
        e.preventDefault();
        if (!email) {
          return;
        }
        dispatch(submitComingSoonSubscribe({ email }))
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        className="flex gap-2 bg-oslo-gray/30 rounded-full text-xl leading-none text-white px-[30px] py-3.5 focus:outline-none placeholder:text-white w-[100%]"
      />
      <button
        type="submit"
        className={`transition ease-in-out bg-primary flex justify-center items-center gap-2 rounded-full text-xl leading-none font-semibold px-12 py-4 md:w-full ${isSubmittedComingSoonSubscribe ? "" : "hover:bg-white"}`}
        disabled={isSubmittedComingSoonSubscribe}
      >
        {isSubmittedComingSoonSubscribe && "Thanks"}
        {isErrorSubmittingComingSoonSubscribe && "Retry"}
        {(!isSubmittedComingSoonSubscribe && !isErrorSubmittingComingSoonSubscribe) && "Subscribe"}
        {isSubmittingComingSoonSubscribe &&
          <Spinner />
        }
      </button>
    </form>
  )
}

export default NotifySubscribe;
