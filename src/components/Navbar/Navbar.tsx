import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ThemeToggle from "./ThemeToggle";
import NavMenu from "./NavMenu";

const Navbar = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="flex h-[50px] flex-row items-center px-[10%] shadow-md">
      <NavMenu>{user ? <LogoutButton /> : <LoginButton />}</NavMenu>
      <Link href={"/"} className="ml-auto mr-auto font-logo text-4xl md:mr-4">
        anon.
      </Link>
      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
