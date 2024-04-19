'use client';
import { fetchPosts } from '@/lib/fetch';
import { useInfiniteQuery } from '@tanstack/react-query';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef } from 'react';

const Display = () => {
	const feedRef = useRef<HTMLDivElement>(null);
	const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
		queryKey: ['posts'],
		queryFn: ({ pageParam }) => fetchPosts(pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage.length ? allPages.length + 1 : undefined;
		},
	});

	const infiniteScroll = useInfiniteScroll({
		el: feedRef,
		fn: fetchNextPage,
		more: hasNextPage,
	});

	const test = new Array(100).fill('test');

	return (
		<>
			<div>Feed</div>
			<div
				className="flex flex-col gap-4 w-full h-[90vh] overflow-auto px-[20%] no-scrollbar"
				ref={feedRef}
				onScroll={infiniteScroll}
			>
				{test.map((t, i) => {
					return (
						<div
							key={i}
							className="h-[200px] border-2 w-full"
						>
							{i}. {t}
						</div>
					);
				})}
				{hasNextPage ? null : <div>No more posts</div>}
			</div>
		</>
	);
};

export default Display;
