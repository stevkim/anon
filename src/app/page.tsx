'use client';
import Display from '@/components/Displays/Display';
import { fetchPosts } from '@/lib/postFetch';
import { useContext } from 'react';
import { MenuContext } from './providers';

const HomePage = () => {
	const { setMenu } = useContext(MenuContext);

	return (
		<section
			className="page"
			onClick={() => setMenu('')}
		>
			<Display
				queryKey={'posts'}
				fetchFn={fetchPosts}
			/>
		</section>
	);
};

export default HomePage;
