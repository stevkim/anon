"use client";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

const LoginButton = () => {
  const { push } = useRouter();

  return (
    <button
      className="flex items-center text-left text-[#717E8E] hover:text-popover-foreground"
      onClick={() => push("/login")}
    >
      <LogIn size={16} className="mr-2" />
      Log in
    </button>
  );
};

export default LoginButton;
