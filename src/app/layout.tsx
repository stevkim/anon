import type { Metadata } from "next";
import "./globals.css";
import "./prosemirror.css";
import Navbar from "@/components/Navbar/Navbar";
import Providers from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Dancing_Script, Inter } from "next/font/google";
import NavReset from "@/components/Navbar/NavReset";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "anon. | Share Literature Anonymously",
  description:
    "Read, write, and share literature anonymously. Immerse yourself in a world where creativity knows no bounds.",
  icons: {
    icon: "/icon.ico",
  },
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
          <NavReset>{children}</NavReset>
          <Toaster />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
