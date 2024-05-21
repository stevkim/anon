import prisma from "./client";

// general posts endpoint - gets {LIMIT} posts at a time
// returning posts are in descending order and it will not return posts that have 5 or more reports
export const getPosts = (LIMIT: number, PAGE: number) => {
  return prisma.post.findMany({
    skip: LIMIT * PAGE,
    take: LIMIT,
    where: {
      reports: { lt: 5 },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// returns a batch of posts that the user {id} has saved
export const getSavedPosts = (id: string, LIMIT: number, PAGE: number) => {
  return prisma.saved.findMany({
    where: {
      userId: id,
    },
    take: LIMIT,
    skip: LIMIT * PAGE,
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      Post: true,
    },
  });
};

// returns all posts that the user {id} has liked
export const getLikes = (id: string) => {
  return prisma.likes.findMany({
    where: {
      userId: id,
    },
  });
};

// returns all posts that the user {id} has saved
export const getSaved = (id: string) => {
  return prisma.saved.findMany({
    where: {
      userId: id,
    },
  });
};

/*
	creates a record of a like
	used when a user likes a post
	postId - the post that the user liked
	userId - user id
*/
export const createLikeRecord = (postId: string, userId: string) => {
  return prisma.likes.create({
    data: {
      postId,
      userId,
    },
  });
};

// delete the record of a like when a user unlikes a post
// record - id of the record of like
export const deleteLikeRecord = (record: string) => {
  return prisma.likes.delete({
    where: {
      id: record,
    },
  });
};

// works in tandem with createLikeRecord or deleteLikeRecord
// updates the post to increment or decrement the like count
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

/*
	creates a record of a report for a post
	* user can report a post for a specific reason
	postId - id of the post being reported
	data: {reason} - reason for the report
	userId - id of the user reporting the post
*/
export const createReport = (
  postId: string,
  data: { reason: string },
  userId: string,
) => {
  return prisma.reports.create({
    data: {
      postId,
      userId,
      ...data,
    },
  });
};

// works in tandem with createReport to increment the reports field
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

// returns a batch of posts that the user {authorId} has created
export const getUserPosts = (authorId: string, LIMIT: number, PAGE: number) => {
  return prisma.post.findMany({
    where: {
      authorId,
    },
    take: LIMIT,
    skip: LIMIT * PAGE,
    orderBy: {
      createdAt: "desc",
    },
  });
};
