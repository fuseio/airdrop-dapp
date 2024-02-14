import { useState } from "react";
import fuseLogo from "@/assets/fuse-logo.svg";
import NavMenu from "./NavMenu";
import NavButton from "./NavButton";
import { useAppSelector } from "@/store/store";
import { selectNavbarSlice } from "@/store/navbarSlice";
import Image from "next/image";

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
    title: "Bridge",
    link: "/bridge",
  },
]

const Topbar = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { selected } = useAppSelector(selectNavbarSlice);

  return (
    <nav className="w-full h-20 sticky top-0 bg-light-gray/60 backdrop-blur-xl flex justify-center py-7 md:h-[32px] md:mt-2 border-b-[0.5px] border-pastel-gray">
      <div className="flex justify-between h-full items-center w-8/9 md:w-9/10 max-w-7xl relative">
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
        <NavMenu menuItems={menuItems} isOpen={isOpen} selected={selected} />
        <NavButton isOpen={isOpen} setOpen={setOpen} />
      </div>
    </nav>
  );
};

export default Topbar;
