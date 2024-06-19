import prisma from "../client";

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
