import type { Metadata } from 'next';
import './globals.css';
import './prosemirror.css';
import Navbar from '@/components/Navbar/Navbar';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import ComponentLoader from '@/components/Loaders/ComponentLoader';

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
		<html
			suppressHydrationWarning
			lang="en"
		>
			<body className="antialiased">
				<Providers>
					<Navbar />
					<Suspense fallback={<ComponentLoader />}>{children}</Suspense>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
