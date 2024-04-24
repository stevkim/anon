import type { Metadata } from 'next';
import './globals.css';
import './prosemirror.css';
import Navbar from '@/components/Navbar/Navbar';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';

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
				<Toaster />
			</body>
		</html>
	);
}
