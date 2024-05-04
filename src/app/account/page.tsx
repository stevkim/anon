'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Display from '@/components/Displays/Display';
import { fetchSavedPosts, fetchUserPosts } from '@/lib/userFetch';

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
				<Display
					qKey="userPosts"
					fetchFn={fetchUserPosts}
				/>
			</TabsContent>
			<TabsContent value="saved">
				<Display
					qKey="savedPosts"
					fetchFn={fetchSavedPosts}
				/>
			</TabsContent>
		</Tabs>
	);
};

export default AccountPage;
