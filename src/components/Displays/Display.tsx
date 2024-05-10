'use client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef, useMemo } from 'react';
import Card from './Card';
import MainFeedLoader from '../Utilities/MainFeedLoader';
import useThrottle from '@/hooks/useThrottle';
import usePosts from '@/hooks/usePosts';
import ComponentLoader from '../Utilities/ComponentLoader';
import NoMorePosts from '../Utilities/NoMorePosts';

interface Props {
	qKey: string;
	fetchFn: (pageParam: number) => Promise<any[]>;
}

const Display = ({ qKey, fetchFn }: Props) => {
	const contentRef = useRef<HTMLDivElement>(null);
	const { posts, getNextPage, hasNextPage, isLoading, isFetching } = usePosts(
		qKey,
		fetchFn
	);

	//
	const infiniteScroll = useInfiniteScroll(
		contentRef,
		getNextPage,
		hasNextPage
	);
	// throttles the infinite scroll to every 200ms
	const throttled = useThrottle(infiniteScroll, 200);

	const content = useMemo(() => {
		return posts.map((post) => {
			return (
				<Card
					key={post.id + post.liked}
					post={post}
				/>
			);
		});
	}, [posts]);

	if (isLoading) {
		return <MainFeedLoader />;
	}

	return (
		<div
			className="flex flex-col gap-4 w-full h-[90vh] overflow-auto no-scrollbar"
			ref={contentRef}
			onScroll={throttled}
		>
			{content}
			<div>{isFetching ? <ComponentLoader /> : <NoMorePosts />}</div>
		</div>
	);
};

export default Display;
