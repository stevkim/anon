import prisma from './client';

export const getPosts = (LIMIT: number, PAGE: number) => {
	return prisma.post.findMany({
		skip: LIMIT * PAGE,
		take: LIMIT,
		where: {
			reports: { lt: 5 },
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

export const getSavedPosts = (id: string, LIMIT: number, PAGE: number) => {
	return prisma.saved.findMany({
		where: {
			userId: id,
		},
		take: LIMIT,
		skip: LIMIT * PAGE,
		orderBy: {
			createdAt: 'desc',
		},
		select: {
			id: true,
			Post: true,
		},
	});
};

export const getLikes = (id: string) => {
	return prisma.likes.findMany({
		where: {
			userId: id,
		},
	});
};

export const getSaved = (id: string) => {
	return prisma.saved.findMany({
		where: {
			userId: id,
		},
	});
};

export const createLikeRecord = (postId: string, userId: string) => {
	return prisma.likes.create({
		data: {
			postId,
			userId,
		},
	});
};

export const updatePostLikes = (postId: string, type: string) => {
	return prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			likes: {
				[type]: 1,
			},
		},
	});
};

export const deleteLikeRecord = (record: string) => {
	return prisma.likes.delete({
		where: {
			id: record,
		},
	});
};

export const createReport = (
	postId: string,
	data: { reason: string },
	userId: string
) => {
	return prisma.reports.create({
		data: {
			postId,
			userId,
			...data,
		},
	});
};

export const updatePostReports = (postId: string) => {
	return prisma.post.update({
		where: {
			id: postId,
		},
		data: {
			reports: {
				increment: 1,
			},
		},
	});
};
