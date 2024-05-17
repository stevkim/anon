import type { Metadata } from "next";
import "./globals.css";
import "./prosemirror.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import ComponentLoader from "@/components/Loaders/ComponentLoader";
import { Dancing_Script, Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "anon.",
  description: "Read and share literature anonymously",
};

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancingscript",
});

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dancingScript.variable} ${inter.className} antialiased`}
      >
        <Providers>
          <Navbar />
          <Suspense fallback={<ComponentLoader />}>{children}</Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
