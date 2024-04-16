export const fetchPosts = async (page: number) => {
	console.log(page);
	const results = await fetch(`api/post?page=${page}`);
	return results.json();
};
