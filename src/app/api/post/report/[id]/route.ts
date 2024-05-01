import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { createReport, updatePostReports } from '@/db/methods';

// creates a report for a post
// TODO: validation for reports
export async function POST(request: NextRequest) {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	const postId = request.nextUrl.pathname.split('/')[4];
	const data = await request.json();

	try {
		await Promise.all([
			createReport(postId, data, user!.id),
			updatePostReports(postId),
		]);

		revalidatePath('/', 'layout');

		return NextResponse.json({}, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	} finally {
		await prisma.$disconnect();
	}
}
