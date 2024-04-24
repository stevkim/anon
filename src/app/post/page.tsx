import { redirect } from 'next/navigation';
import Card from '@/components/MainFeed/Card';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/db/client';
import { type TPost } from '@/types/posts';

const getData = async (id: string) => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	let liked;

	if (user?.id) {
		liked = await prisma.likes.findFirst({
			where: {
				userId: user.id,
				postId: id,
			},
		});
	}

	const data: TPost | null = await prisma.post.findFirst({
		where: {
			id,
		},
	});

	if (data) {
		data['liked'] = liked?.id || null;

		return data;
	} else {
		return null;
	}
};

const Post = async ({
	searchParams: { id },
}: {
	searchParams: { id: string };
}) => {
	if (!id) {
		redirect('/');
	}
	const data = await getData(id);

	if (!data) {
		redirect('/');
	}

	return (
		<section className="page">
			<Card post={data} />
		</section>
	);
};

export default Post;
