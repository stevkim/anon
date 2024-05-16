'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Display from '@/components/Displays/Display';
import { fetchSavedPosts, fetchUserPosts } from '@/lib/userFetch';
import { useContext } from 'react';
import { MenuContext } from '../providers';

const AccountPage = () => {
	const { setMenu } = useContext(MenuContext);

	return (
		<section
			className="page"
			onClick={() => setMenu('')}
		>
			<Tabs defaultValue="user">
				<TabsList>
					<TabsTrigger value="user">User Posts</TabsTrigger>
					<TabsTrigger value="saved">Saved Posts</TabsTrigger>
				</TabsList>
				<TabsContent value="user">
					<Display
						queryKey="userPosts"
						fetchFn={fetchUserPosts}
					/>
				</TabsContent>
				<TabsContent value="saved">
					<Display
						queryKey="savedPosts"
						fetchFn={fetchSavedPosts}
					/>
				</TabsContent>
			</Tabs>
		</section>
	);
};

export default AccountPage;
