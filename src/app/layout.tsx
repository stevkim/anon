import type { Metadata } from 'next';
import './globals.css';
import Navbar from './components/Navbar';
import Providers from './providers';

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
			</body>
		</html>
	);
}
