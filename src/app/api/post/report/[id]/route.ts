import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const postId = request.nextUrl.pathname.split('/')[4];
	const reason = await request.json();
	console.log(reason);

	try {
		await prisma.reports.create({
			data: {
				postId,
				...reason,
				userId: user?.id as string,
			},
		});

		await prisma.post.update({
			where: {
				id: postId,
			},
			data: {
				reports: {
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
