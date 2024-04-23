import type { Metadata } from 'next';
import './globals.css';
import './prosemirror.css';
import Navbar from '@/components/Navbar/Navbar';
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
			<body className="antialiased">
				<Providers>
					<Navbar />
					{children}
				</Providers>
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
