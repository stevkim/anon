'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes/dist/types';
import { createContext } from 'react';

const initialState = {
	menu: '',
	setMenu: (id: string) => {},
};

export const MenuContext = createContext(initialState);

const Providers = ({ children, ...props }: ThemeProviderProps) => {
	const [menu, setMenu] = useState('');
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnReconnect: false,
						retry: 2,
					},
				},
			})
	);

	return (
		<ThemeProvider
			defaultTheme="light"
			attribute="class"
			enableSystem
			disableTransitionOnChange
			{...props}
		>
			<MenuContext.Provider value={{ menu, setMenu }}>
				<QueryClientProvider client={queryClient}>
					{children}
				</QueryClientProvider>
			</MenuContext.Provider>
		</ThemeProvider>
	);
};

export default Providers;
