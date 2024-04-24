'use client';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { useRef, useMemo, useState } from 'react';
import Card from './Card';
import MainFeedLoader from '../Loaders/MainFeedLoader';
import useThrottle from '@/hooks/useThrottle';
import usePosts from '@/hooks/usePosts';

interface Props {
	qKey: string;
	fetchFn: (pageParam: number) => Promise<any[]>;
}

const Display = ({ qKey, fetchFn }: Props) => {
	const [menuId, setMenuId] = useState('');
	const contentRef = useRef<HTMLDivElement>(null);
	const { posts, getNextPage, hasNextPage, isLoading } = usePosts(
		qKey,
		fetchFn
	);

	const infiniteScroll = useInfiniteScroll(
		contentRef,
		getNextPage,
		hasNextPage
	);
	const throttled = useThrottle(infiniteScroll, 200);

	const toggleMenu = (id: string) => {
		if (id === menuId) {
			setMenuId('');
		} else {
			setMenuId(id);
		}
	};

	const content = useMemo(() => {
		if (posts.length) {
			return posts.map((post) => {
				return (
					<Card
						key={post.id}
						post={post}
						menuId={menuId}
						toggle={toggleMenu}
					/>
				);
			});
		} else {
			return <div>No posts</div>;
		}
	}, [posts, menuId]);

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
			{hasNextPage || posts.length === 0 ? null : <div>No more posts</div>}
		</div>
	);
};

export default Display;
