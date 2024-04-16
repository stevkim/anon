'use client';
import { fetchPosts } from '../lib/fetch';
import { useInfiniteQuery } from '@tanstack/react-query';

const Feed = () => {
	const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam }) => fetchPosts(pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
	});

	return (
		<>
			<div>Feed</div>

			<button onClick={() => fetchNextPage()}>Get more</button>
		</>
	);
};

export default Feed;
