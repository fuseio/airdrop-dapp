import { RefObject, useState } from "react";
import fuseLogo from "@/assets/fuse-logo.svg";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";
import { useAppSelector } from "@/store/store";
import { selectNavbarSlice } from "@/store/navbarSlice";
import Image from "next/image";

type TopbarProps = {
  topbarRef: RefObject<HTMLElement>;
}

const menuItems = [
  {
    title: "Airdrop",
    link: "/",
  },
  {
    title: "About",
    link: "/about",
  },
  {
    title: "Fuse Home",
    link: "https://www.fuse.io",
  },
]

const Topbar = ({ topbarRef }: TopbarProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { selected } = useAppSelector(selectNavbarSlice);

  return (
    <nav ref={topbarRef} className="w-full h-20 top-0 flex justify-center py-7 md:h-[32px] md:mt-2 z-[60]">
      <div className="flex justify-between h-full items-center w-8/9 xl:w-9/12 md:w-9/10 max-w-7xl relative">
        <span>
          <a href="/">
            <Image
              src={fuseLogo}
              alt="Fuse logo"
              width={86}
              height={24}
              className="z-50"
            />
          </a>
        </span>
        <NavMenu menuItems={menuItems} isOpen={isOpen} selected={selected} liClassName="w-fit whitespace-nowrap px-4 py-2.5" />
        <NavButton isOpen={isOpen} setOpen={setOpen} />
      </div>
    </nav>
  );
};

export default Topbar;
