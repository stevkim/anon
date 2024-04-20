// fetch posts by page number -- each page is 50 posts
export const fetchPosts = async (page: number) => {
	const response = await fetch(`/api/post?page=${page}`, {
		next: { revalidate: 60, tags: ['posts'] },
	});
	const results = await response.json();
	return results.data as any[];
};

// create a post -- data is an object with the contents of the post
export const createPost = async (data: any) => {
	const results = await fetch(`/api/post`, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'content-type': 'application/json',
		},
	});
	return results;
};

// like a post -- path is the id of the post
export const likePost = async (path: string) => {
	const results = await fetch(`/api/post/${path}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
	});

	return results;
};

export const unlikePost = async (path: string, record: string) => {
	const results = await fetch(`/api/post/${path}?record=${record}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
		},
	});

	return results;
};
