import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { UUID } from 'crypto';

export async function POST(request: NextRequest) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const postId = request.nextUrl.pathname.split('/')[3];

	try {
		await prisma.likes.create({
			data: {
				postId,
				userId: user?.id as string,
			},
		});
		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likes: {
					increment: 1,
				},
			},
		});

		revalidatePath('/', 'layout');

		return NextResponse.json({}, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	} finally {
		await prisma.$disconnect();
	}
}

export async function DELETE(request: NextRequest) {
	const postId = request.nextUrl.pathname.split('/')[3];
	const record = request.nextUrl.searchParams.get('record') as string;
	console.log(postId, record);

	try {
		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				likes: {
					decrement: 1,
				},
			},
		});
		await prisma.likes.delete({
			where: {
				id: record,
			},
		});

		return NextResponse.json({}, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	} finally {
		await prisma.$disconnect();
	}
}
