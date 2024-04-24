'use client';
import Display from '@/components/Displays/Display';
import { fetchUserPosts } from '@/lib/userFetch';

const SavedPage = () => {
	return (
		<section className="page">
			<Display
				qKey="userPosts"
				fetchFn={fetchUserPosts}
			/>
		</section>
	);
};

export default SavedPage;
