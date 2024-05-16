import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getQuote } from "@/lib/quote.fetch";
import Quote from "@/components/Widgets/Quote";

const ProfileLayout = async ({ children }: { children: ReactNode }) => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const quote = await getQuote();

  return (
    <>
      <Quote quote={quote} />
      {children}
    </>
  );
};

export default ProfileLayout;
