import { MenuItems } from "@/lib/types";
import { useMediaQuery } from "usehooks-ts";
import { useRouter } from "next/navigation";

type NavMenuProps = {
  menuItems?: MenuItems;
  isOpen?: boolean;
  selected?: string;
  className?: string;
  liClassName?: string;
};

const NavMenu = ({
  menuItems = [],
  isOpen = false,
  selected = "",
  className = "items-center justify-between w-auto order-1 md:w-full absolute md:translate-y-8 md:top-1/2 md:bg-black left-[50%] -translate-x-[50%] rounded-md",
  liClassName = "w-20"
}: NavMenuProps) => {
  const matches = useMediaQuery("(min-width: 768px)");
  const router = useRouter();

  return (
    <>
      {(isOpen || matches) && (
        <div className={className}>
          <ul className="flex flex-row items-center md:items-start gap-2 p-0 md:p-4 mt-0 text-white font-medium text-base/4 md:flex-col">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex justify-center items-center rounded-full h-9 hover:bg-tertiary md:w-full md:justify-start ${liClassName} ${(item.title.toLowerCase() === selected ? "bg-tertiary py-2.5 px-4 pointer-events-none" : "cursor-pointer group")}`}
                aria-current={
                  item.title.toLowerCase() === selected
                    ? "page"
                    : "false"
                }
                onClick={() => router.push(item.link)}
              >
                <div className="block relative">
                  {item.title}
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavMenu;
