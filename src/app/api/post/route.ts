'use server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
	const LIMIT = 50;
	const PAGE: number = Number(request.nextUrl.searchParams.get('page')) || 0;

	try {
		const results = await prisma.post.findMany({
			skip: LIMIT * PAGE,
			take: LIMIT,
		});
		console.log(results);

		return NextResponse.json({ data: results });
	} catch (err) {
		console.log(err);
		return NextResponse.error();
	} finally {
		prisma.$disconnect();
	}
}

export async function POST(request: NextRequest) {
	const supabase = createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const newPost = await request.json();

	try {
		await prisma.post.create({
			data: {
				...newPost,
				authorId: user?.id,
			},
		});

		return NextResponse.json({}, { status: 201 });
	} catch (err) {
		console.log(err);
		return NextResponse.error();
	} finally {
		prisma.$disconnect();
	}
}
