export const fetchPosts = async (page: number) => {
	const results = await fetch(`api/post?page=${page}`);
	return results.json();
};
