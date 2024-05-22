"use client";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [docTheme, setDocTheme] = useState("light");
  const { setTheme } = useTheme();

  const toggleTheme = () => {
    docTheme === "light" ? setDocTheme("dark") : setDocTheme("light");
  };

  useEffect(() => {
    setTheme(docTheme);
  }, [docTheme, setTheme]);

  return (
    <button
      data-testId="theme-button"
      onClick={toggleTheme}
      className="hover:-rotate-[10deg]"
    >
      {docTheme === "light" ? <MoonIcon size={20} /> : <SunIcon size={20} />}
    </button>
  );
};

export default ThemeToggle;
