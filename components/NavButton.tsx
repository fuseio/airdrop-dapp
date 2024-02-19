import ConnectWallet from "@/components/ConnectWallet";
import Hamburger from "@/components/ui/Hamburger";
import { useAppSelector } from "@/store/store";
import { selectUserSlice } from "@/store/userSlice";

type NavButtonProps = {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

const NavButton = ({ isOpen, setOpen }: NavButtonProps) => {
  const { isUser } = useAppSelector(selectUserSlice);

  return (
    <div className="flex order-2 min-w-[150px] md:w-[93%] justify-end items-center">
      {isUser && <ConnectWallet containerClassName="ml-auto" className="transition ease-in-out hover:bg-success hover:text-black" />}
      {!isUser &&
        <a
          href="https://www.fuse.io"
          target="_blank"
          className="transition ease-in-out border border-white px-4 py-2.5 text-sm leading-none text-white font-semibold rounded-full hover:bg-white hover:text-black"
        >
          Fuse Home
        </a>
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
