// fetch posts by page number -- each page is 50 posts
export const fetchPosts = async (page: number) => {
	const results = await fetch(`api/post?page=${page}`);
	return results.json();
};

// create a post -- data is an object with the contents of the post
export const createPost = async (data: any) => {
	const results = await fetch('api/post', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json',
		},
	});
	return results;
};
