"use client";
import { ReactNode, useContext } from "react";
import Link from "next/link";
import MenuIcon from "./MenuIcon";
import { Separator } from "../ui/separator";
import { NavContext } from "@/app/providers";
import { NAVS } from "./navData";

interface Props {
  children: ReactNode;
}

const NavMenu = ({ children }: Props) => {
  const { open, setOpen } = useContext(NavContext);

  const handleClick = (
    e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    e.stopPropagation();
    setOpen(!open);
  };

  return (
    <>
      <MenuIcon open={open} setOpen={handleClick} />
      {open ? (
        <div
          data-testid="nav-menu"
          className="absolute left-0 top-[50px] z-[51] flex w-full flex-col gap-2 rounded-[--radius] border bg-popover p-4 text-lg shadow-md md:left-[9%] md:w-[200px]"
          onClick={(e) => handleClick(e)}
        >
          {NAVS.map((nav) => {
            return (
              <Link
                key={nav.name}
                href={nav.link}
                className="flex flex-row items-center text-[#717E8E] hover:text-popover-foreground "
              >
                <nav.icon size={16} className="mr-2" />
                {nav.name}
              </Link>
            );
          })}
          <Separator />
          {children}
        </div>
      ) : null}
    </>
  );
};

export default NavMenu;
