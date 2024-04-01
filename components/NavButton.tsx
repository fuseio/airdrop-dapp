import ConnectWallet from "@/components/ConnectWallet";
import Hamburger from "@/components/ui/Hamburger";
import { NEXT_PUBLIC_ENVIRONMENT } from "@/lib/config";
import { setCurrentComingSoonComponent } from "@/store/navbarSlice";
import { useAppDispatch } from "@/store/store";

type NavButtonProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const NavButton = ({ isOpen, setOpen }: NavButtonProps) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex order-2 min-w-[150px] md:w-[93%] justify-end items-center">
      {NEXT_PUBLIC_ENVIRONMENT === "staging" &&
        <ConnectWallet
          containerClassName="ml-auto md:me-3"
          className="transition ease-in-out hover:bg-success hover:text-black hover:border-success"
        />
      }
      {NEXT_PUBLIC_ENVIRONMENT === "production" &&
        <button
          className="transition ease-in-out border border-white text-sm leading-none text-white px-5 py-3 rounded-full font-medium hover:bg-success hover:text-black hover:border-success"
          onClick={() => dispatch(setCurrentComingSoonComponent("notify"))}
        >
          Get notified
        </button>
      }
      <button
        type="button"
        className="p-2 w-10 h-8 hidden md:inline-flex focus:outline-none"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={() => setOpen(!isOpen)}
      >
        <span className="sr-only">Open main menu</span>
        <Hamburger
          isOpen={isOpen}
          height={18}
          strokeWidth={3}
          color="#fff"
        />
      </button>
    </div>
  )
}

export default NavButton;
