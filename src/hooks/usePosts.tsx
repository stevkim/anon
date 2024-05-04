import { useInfiniteQuery } from '@tanstack/react-query';

const usePosts = (
	qKey: string,
	fetchFn: (pageParam: number) => Promise<any[]>
) => {
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching } =
		useInfiniteQuery({
			queryKey: [qKey],
			queryFn: ({ pageParam }) => fetchFn(pageParam),
			initialPageParam: 0,
			getNextPageParam: (lastPage, allPages) => {
				return lastPage && lastPage.length ? allPages.length : null;
			},
			retry: 2,
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
