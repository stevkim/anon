import { useInfiniteQuery } from '@tanstack/react-query';

const usePosts = (
	queryKey: string,
	fetchFn: (pageParam: number) => Promise<any[]>
) => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
		useInfiniteQuery({
			queryKey: [queryKey],
			queryFn: ({ pageParam }) => fetchFn(pageParam),
			initialPageParam: 0,
			getNextPageParam: (lastPage, allPages) => {
				return lastPage && lastPage.length ? allPages.length : null;
			},
			retry: 2,
			retryDelay: (attempts) => {
				return Math.min(attempts * 1000, 3000);
			},
		});

	return {
		posts: data?.pages.flatMap((page) => page) ?? [],
		getNextPage: fetchNextPage,
		hasNextPage,
		isLoading,
		isFetching,
	};
};

export default usePosts;
