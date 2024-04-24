import { useInfiniteQuery } from '@tanstack/react-query';

const usePosts = (
	qKey: string,
	fetchFn: (pageParam: number) => Promise<any[]>
) => {
	const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
		queryKey: [qKey],
		queryFn: ({ pageParam }) => fetchFn(pageParam),
		initialPageParam: 0,
		getNextPageParam: (lastPage, allPages) => {
			return lastPage && lastPage.length ? allPages.length : null;
		},
		retryDelay: (attempt) => attempt * 1000,
		staleTime: 2000,
		retry: 2,
	});

	return {
		posts: data?.pages.flatMap((page) => page) ?? [],
		getNextPage: fetchNextPage,
		hasNextPage,
		isLoading,
	};
};

export default usePosts;
