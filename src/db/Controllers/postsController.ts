import prisma from "../client";

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

// returns a single post by id
export const getPostById = (id: string) => {
  return prisma.post.findFirst({
    where: {
      id,
    },
  });
};
