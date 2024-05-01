'use client';
import Display from '@/components/Displays/Display';
import { fetchSavedPosts } from '@/lib/savedFetch';

const SavedPage = () => {
	return (
		<section className="page">
			<Display
				qKey="userPosts"
				fetchFn={fetchSavedPosts}
			/>
		</section>
	);
};

export default SavedPage;
