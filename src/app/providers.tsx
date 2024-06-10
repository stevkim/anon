"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { createContext } from "react";

const initialMenuState = {
  menu: "",
  setMenu: (id: string) => {},
};

const initialNavState = {
  open: false,
  setOpen: (input: boolean) => {},
};

export const MenuContext = createContext(initialMenuState);
export const NavContext = createContext(initialNavState);

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  const [menu, setMenu] = useState(""); // Post Option Menu
  const [open, setOpen] = useState(false); // Nav Menu

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: 2,
            // stale time is 1 minute
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      defaultTheme="light"
      attribute="class"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      <NavContext.Provider value={{ open, setOpen }}>
        <MenuContext.Provider value={{ menu, setMenu }}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </MenuContext.Provider>
      </NavContext.Provider>
    </ThemeProvider>
  );
};

export default Providers;
