import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';
import { getUserPosts, getLikes } from '@/db/methods';

// get Posts that the user has saved
// expects the pages from searchParams - /api/saved?page={PAGE}
export async function GET(request: NextRequest) {
	const supabase = createClient();
	const LIMIT = 50;
	const PAGE: number = Number(request.nextUrl.searchParams.get('page')) || 0;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	try {
		const userLikes = new Map();

		const [likes, posts] = await Promise.all([
			getLikes(user!.id),
			getUserPosts(user!.id, LIMIT, PAGE),
		]);

		likes.forEach((row) => {
			userLikes.set(row.postId, row.id);
		});

		let results = posts.map((post) => ({
			...post,
			liked: userLikes.get(post.id),
			authorId: 'author',
		}));

		return NextResponse.json({ data: results }, { status: 200 });
	} catch (error) {
		console.log(error);
		return NextResponse.error();
	} finally {
		await prisma.$disconnect();
	}
}
