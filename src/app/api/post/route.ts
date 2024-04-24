import { NextResponse, type NextRequest } from 'next/server';
import prisma from '@/db/client';
import { createClient } from '@/utils/supabase/server';

const getPosts = (LIMIT: number, PAGE: number) => {
	return prisma.post.findMany({
		skip: LIMIT * PAGE,
		take: LIMIT,
		where: {
			reports: { lt: 5 },
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

const getLikes = (id: string) => {
	return prisma.likes.findMany({
		where: {
			userId: id,
		},
	});
};

const getSaves = (id: string) => {
	return prisma.saved.findMany({
		where: {
			userId: id,
		},
	});
};

export async function GET(request: NextRequest) {
	const supabase = createClient();
	const LIMIT = 50;
	const PAGE: number = Number(request.nextUrl.searchParams.get('page')) || 0;

	const {
		data: { user },
	} = await supabase.auth.getUser();

	try {
		if (user?.id) {
			const userLikes = new Map();
			const userSaved = new Map();

			const [posts, likes, saved] = await Promise.all([
				getPosts(LIMIT, PAGE),
				getLikes(user.id),
				getSaves(user.id),
			]);

			likes.forEach((row) => {
				userLikes.set(row.postId, row.id);
			});
			saved.forEach((row) => {
				userSaved.set(row.postId, row.id);
			});

			let results = posts.map((post) => {
				if (post.authorId === user.id) {
					return { ...post, authorId: 'author' };
				} else {
					return post;
				}
			});

			if (userLikes.size) {
				results = results.map((post) => {
					if (userLikes.has(post.id)) {
						return { ...post, liked: userLikes.get(post.id) };
					}
					return { ...post, liked: null };
				});
			}

			if (userSaved.size) {
				results = results.map((post) => {
					if (userSaved.has(post.id)) {
						return { ...post, saved: userSaved.get(post.id) };
					}
					return { ...post, saved: null };
				});
			}

			return NextResponse.json({ data: results }, { status: 200 });
		} else {
			const posts = await getPosts(LIMIT, PAGE);

			return NextResponse.json({ data: posts }, { status: 200 });
		}
	} catch (err) {
		console.log(err);
		return NextResponse.error();
	} finally {
		await prisma.$disconnect();
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
		await prisma.$disconnect();
	}
}

export async function DELETE(request: NextRequest) {
	const postId = request.nextUrl.searchParams.get('id') as string;

	try {
		await prisma.post.delete({
			where: {
				id: postId,
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
