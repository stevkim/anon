import { ReactNode } from "react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getQuote } from "@/lib/quote.fetch";
import Quote from "@/components/Widgets/Quote";
import { Suspense } from "react";
import ComponentLoader from "@/components/Loaders/ComponentLoader";

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
      <Suspense fallback={<ComponentLoader />}>{children}</Suspense>
    </>
  );
};

export default ProfileLayout;
