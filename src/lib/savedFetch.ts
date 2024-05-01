import type { TPost } from '@/types/posts';

// gets list of saved posts by the user
export const fetchSavedPosts = async (page: number) => {
	const response = await fetch(`/api/saved?page=${page}`, {
		next: { revalidate: 60, tags: ['userPosts'] },
	});
	const results = await response.json();
	return results.data as TPost[];
};

// saves a post for the user
export const savePost = async (postId: string) => {
	const results = await fetch(`/api/saved/${postId}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
	});

	return await results.json();
};

// unsave a post for the user
export const unsavePost = async (postId: string, record: string) => {
	const results = await fetch(`/api/saved/${postId}?record=${record}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
		},
	});

	return results;
};
