'use client';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from 'lucide-react';

const ThemeToggle = () => {
	const { theme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (theme === 'light') {
			setTheme('dark');
		} else {
			setTheme('light');
		}
	};

	return (
		<button onClick={toggleTheme}>
			{theme === 'light' ? <MoonIcon size={16} /> : <SunIcon size={16} />}
		</button>
	);
};

export default ThemeToggle;
