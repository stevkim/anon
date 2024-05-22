"use client";
import { ReactNode, useState } from "react";
import Link from "next/link";
import { Home, Pencil, CircleUser } from "lucide-react";
import MenuIcon from "./MenuIcon";
import { Separator } from "../ui/separator";

const NAVS = [
  {
    name: "Home",
    link: "/",
    icon: Home,
  },
  {
    name: "Publish",
    link: "/publish",
    icon: Pencil,
  },
  {
    name: "Profile",
    link: "/profile",
    icon: CircleUser,
  },
];

interface Props {
  children: ReactNode;
}

const NavMenu = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <MenuIcon open={open} setOpen={handleClick} />
      {open ? (
        <div
          data-testId="nav-menu"
          className="absolute left-0 top-[50px] z-[51] flex w-full flex-col gap-2 rounded-[--radius] border bg-popover p-4 text-lg shadow-md md:left-[9%] md:w-[200px]"
          onClick={handleClick}
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
