import type { TPost } from '@/types/posts';

export const fetchUserPosts = async (page: number) => {
	const response = await fetch(`/api/user?page=${page}`, {
		next: { revalidate: 60, tags: ['userPosts'] },
	});
	const results = await response.json();
	return results.data as TPost[];
};

export const savePost = async (postId: string) => {
	const results = await fetch(`/api/user/${postId}`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
	});

	return await results.json();
};

export const unsavePost = async (postId: string, record: string) => {
	const results = await fetch(`/api/user/${postId}?record=${record}`, {
		method: 'DELETE',
		headers: {
			'content-type': 'application/json',
		},
	});

	return results;
};
