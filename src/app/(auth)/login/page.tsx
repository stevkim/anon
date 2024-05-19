"use client";
import LoginForm from "@/components/Forms/LoginForm";
import { Separator } from "@/components/ui/separator";
import GoogleLogin from "@/components/Forms/GoogleLogin";
import SiteLogo from "@/components/Widgets/SiteLogo";

const Login = () => {
  return (
    <section className="page flex flex-col items-center gap-4">
      <SiteLogo size="lg" />
      <LoginForm />
      <Separator className="max-w-[600px]" />
      <GoogleLogin />
    </section>
  );
};

export default Login;
