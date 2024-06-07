"use client";
import { NavContext } from "@/app/providers";
import { ReactNode, useContext } from "react";

interface Props {
  children: ReactNode;
}

const NavReset = ({ children }: Props) => {
  const { setOpen } = useContext(NavContext);

  return <div onClick={() => setOpen(false)}>{children}</div>;
};

export default NavReset;
