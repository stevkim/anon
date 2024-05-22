"use client";
import Quill from "@/../public/quill.png";
import Image from "next/image";
import { cn } from "@/lib/utils";

type TSizes = "sm" | "lg";

interface Props {
  size: TSizes;
}

const SiteLogo = ({ size }: Props) => {
  return (
    <span
      data-testId={size === "sm" ? "title-logo" : "form-header"}
      className={cn(
        "flex items-center font-logo",
        size === "sm" ? "text-[36px]" : "text-[72px]",
      )}
    >
      anon
      <Image
        src={Quill}
        alt="quill"
        className={cn(
          "pointer-events-none w-auto rotate-45 invert-[--invert]",
          size === "sm" ? "ml-[.2rem] h-[30px]" : "ml-[.4rem] h-[60px]",
        )}
      />
    </span>
  );
};

export default SiteLogo;
