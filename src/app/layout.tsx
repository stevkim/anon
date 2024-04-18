import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Providers from './providers';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
	title: 'anon.',
	description: '',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<Providers>{children}</Providers>
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
