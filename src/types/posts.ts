import { JsonValue } from '@prisma/client/runtime/library';

/*
	liked - flag to indicate whether the user has liked the post
	saved -  flag to indicate whether the user has saved the pos
*/

export type TPost = {
	id: string;
	createdAt: Date;
	content: JsonValue;
	likes: number;
	reports: number;
	authorId: string;
	liked?: string | null;
	saved?: string | null;
};
