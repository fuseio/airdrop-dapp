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
  className = "items-center justify-between w-auto order-1 lg:w-full absolute lg:translate-y-8 lg:top-1/2 lg:bg-black left-[50%] -translate-x-[50%] rounded-lg",
  liClassName = "w-20"
}: NavMenuProps) => {
  const matches = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();

  return (
    <>
      {(isOpen || matches) && (
        <div className={className}>
          <ul className="flex flex-row items-center lg:items-start gap-2 p-0 lg:p-4 mt-0 text-white font-medium text-base/4 lg:flex-col">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`flex justify-center items-center rounded-full h-9 hover:bg-tertiary lg:w-full lg:justify-start ${liClassName} ${(item.title.toLowerCase() === selected ? "bg-tertiary py-2.5 px-4 pointer-events-none" : "cursor-pointer group")}`}
                aria-current={
                  item.title.toLowerCase() === selected
                    ? "page"
                    : "false"
                }
                onClick={() => {
                  if (item.isNewTab) {
                    window.open(item.link, "_blank");
                  } else {
                    router.push(item.link);
                  }
                }}
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
