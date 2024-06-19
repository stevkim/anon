import prisma from "../client";

// returns all posts that the user {id} has liked
export const getLikes = (id: string) => {
  return prisma.likes.findMany({
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

// finds the record based on matching userId and postId
export const findLikeRecordByIds = (userId: string, postId: string) => {
  return prisma.likes.findFirst({
    where: {
      userId,
      postId,
    },
  });
};
