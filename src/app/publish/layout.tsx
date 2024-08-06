import { Suspense, ReactNode } from "react";
import ComponentLoader from "@/components/Loaders/ComponentLoader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "anon. | Publish & Share literature",
};

const PublishLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<ComponentLoader />}>{children}</Suspense>
    </>
  );
};

export default PublishLayout;
