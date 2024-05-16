import type { Metadata } from 'next';
import './globals.css';
import './prosemirror.css';
import Navbar from '@/components/Navbar/Navbar';
import Providers from './providers';
import { Toaster } from '@/components/ui/toaster';
import { Suspense } from 'react';
import ComponentLoader from '@/components/Utilities/ComponentLoader';
import { Dancing_Script } from 'next/font/google';

export const metadata: Metadata = {
	title: 'anon.',
	description: '',
};

const dancingScript = Dancing_Script({
	subsets: ['latin'],
	variable: '--font-dancingscript',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			suppressHydrationWarning
		>
			<body className={`${dancingScript.variable} antialiased`}>
				<Providers>
					<Navbar />
					<Suspense fallback={<ComponentLoader />}>{children}</Suspense>
					<Toaster />
				</Providers>
			</body>
		</html>
	);
}
