"use client";
import { createClient } from "@/utils/supabase/client";
import google_logo from "@/../public/google_logo.svg";
import Image from "next/image";
import { Button } from "../ui/button";

const GoogleLogin = () => {
  const handleLogin = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: window.location.origin + "/api/auth/callback",
      },
    });
  };

  return (
    <Button onClick={handleLogin} className="flex w-full max-w-sm items-center">
      <Image
        className="mr-1 h-[30px] w-[30px]"
        src={google_logo}
        alt="google logo"
      />
      Sign in with Google
    </Button>
  );
};

export default GoogleLogin;
