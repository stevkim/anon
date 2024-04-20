'use client';
import { fetchPosts } from '@/lib/fetch';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef, useMemo } from 'react';
import Card from './Card';

const Display = () => {
	const feedRef = useRef<HTMLDivElement>(null);
	const { data, fetchNextPage, hasNextPage, status, isRefetching } =
		useInfiniteQuery({
			queryKey: ['posts'],
			queryFn: ({ pageParam }) => fetchPosts(pageParam),
			initialPageParam: 0,
			getNextPageParam: (lastPage, allPages) => {
				return lastPage.length ? allPages.length : undefined;
			},
		});

	const infiniteScroll = useInfiniteScroll({
		el: feedRef,
		fn: fetchNextPage,
		more: hasNextPage,
	});

	const content = useMemo(
		() =>
			data?.pages.map((page) =>
				page.map((post) => {
					return (
						<Card
							key={post.id + post.liked}
							post={post}
						/>
					);
				})
			),
		[data]
	);

	if (status === 'pending' || isRefetching) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<div>Feed</div>
			<div
				className="flex flex-col gap-4 w-full h-[90vh] overflow-auto px-[20%] no-scrollbar"
				ref={feedRef}
				onScroll={infiniteScroll}
			>
				{content}
				{hasNextPage ? null : <div>No more posts</div>}
			</div>
		</>
	);
};

export default Display;
