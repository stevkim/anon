'use client';
import Display from '@/components/Displays/Display';
import { fetchPosts } from '@/lib/postFetch';

const HomePage = () => {
	return (
		<section className="page">
			<Display
				qKey={'posts'}
				fetchFn={fetchPosts}
			/>
		</section>
	);
};

export default HomePage;
