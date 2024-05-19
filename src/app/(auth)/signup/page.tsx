"use client";
import SignupForm from "@/components/Forms/SignupForm";
import SiteLogo from "@/components/Widgets/SiteLogo";

const Signup = () => {
  return (
    <section className="page flex flex-col items-center gap-4">
      <SiteLogo size="lg" />
      <SignupForm />
    </section>
  );
};

export default Signup;
