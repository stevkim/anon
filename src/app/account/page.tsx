'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Display from '@/components/Displays/Display';
import { fetchSavedPosts, fetchUserPosts } from '@/lib/userFetch';
import { Suspense } from 'react';
import ComponentLoader from '@/components/Loaders/ComponentLoader';

const AccountPage = () => {
	return (
		<Tabs
			defaultValue="user"
			className="page"
		>
			<TabsList>
				<TabsTrigger value="user">User Posts</TabsTrigger>
				<TabsTrigger value="saved">Saved Posts</TabsTrigger>
			</TabsList>
			<TabsContent value="user">
				<Suspense fallback={<ComponentLoader />}>
					<Display
						qKey="userPosts"
						fetchFn={fetchUserPosts}
					/>
				</Suspense>
			</TabsContent>
			<TabsContent value="saved">
				<Suspense fallback={<ComponentLoader />}>
					<Display
						qKey="savedPosts"
						fetchFn={fetchSavedPosts}
					/>
				</Suspense>
			</TabsContent>
		</Tabs>
	);
};

export default AccountPage;
