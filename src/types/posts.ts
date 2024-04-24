import { JsonValue } from '@prisma/client/runtime/library';

export type TPost = {
	id: string;
	createdAt: Date;
	content: JsonValue;
	likes: number | null;
	reports: number | null;
	authorId: string;
	liked?: string | null;
};
