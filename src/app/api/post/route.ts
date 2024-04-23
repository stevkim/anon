import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: NextRequest) {
	const supabase = createClient();
	const LIMIT = 50;
	const PAGE: number = Number(request.nextUrl.searchParams.get('page')) || 0;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	try {
		const userLikes = new Map();

		if (user?.id) {
			const likes = await prisma.likes.findMany({
				where: {
					userId: user.id,
				},
			});
			likes.forEach((row) => {
				userLikes.set(row.postId, row.id);
			});
		}

		const posts = await prisma.post.findMany({
			skip: LIMIT * PAGE,
			take: LIMIT,
			where: {
				reports: { lt: 5 },
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		let results = posts;

		if (userLikes.size) {
			results = posts.map((post) => {
				if (userLikes.has(post.id)) {
					return { ...post, liked: userLikes.get(post.id) };
				}
				return { ...post, liked: null };
			});
		}

		return NextResponse.json({ data: results }, { status: 200 });
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
