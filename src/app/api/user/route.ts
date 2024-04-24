import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';
import type { TPost } from '@/types/posts';

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

		const posts = await prisma.saved.findMany({
			where: {
				userId: user?.id,
			},
			take: LIMIT,
			skip: LIMIT * PAGE,
			orderBy: {
				createdAt: 'desc',
			},
			select: {
				id: true,
				Post: true,
			},
		});

		let results: any[] = posts;

		if (userLikes.size && posts.length > 0) {
			results = results.map((post) => {
				if (userLikes.has(post.Post.id)) {
					return {
						...post.Post,
						liked: userLikes.get(post.Post.id),
						saved: post.id,
					};
				}
				return { ...post.Post, liked: null, saved: post.id };
			});
		}

		return NextResponse.json({ data: results }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	} finally {
		await prisma.$disconnect();
	}
}
