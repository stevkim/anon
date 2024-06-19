import prisma from "../client";

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

// returns all posts that the user {id} has saved
export const getSaved = (id: string) => {
  return prisma.saved.findMany({
    where: {
      userId: id,
    },
  });
};

// creates a record - saves a post to a user
export const savePost = (postId: string, userId: string) => {
  return prisma.saved.create({
    data: {
      postId,
      userId,
    },
  });
};

// deletes the record of the saved post - unsave a post
export const unsavePost = (id: string) => {
  return prisma.saved.delete({
    where: {
      id,
    },
  });
};

// finds the record based on matching userId and postId
export const findSavedRecordByIds = (userId: string, postId: string) => {
  return prisma.saved.findFirst({
    where: {
      userId,
      postId,
    },
  });
};
