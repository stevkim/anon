import { Suspense, ReactNode } from "react";
import ComponentLoader from "@/components/Loaders/ComponentLoader";

const PublishLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Suspense fallback={<ComponentLoader />}>{children}</Suspense>
    </>
  );
};

export default PublishLayout;
