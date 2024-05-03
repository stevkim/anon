import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import prisma from '@/db/client';
import { type TPost } from '@/types/posts';
import PageCard from '@/components/Displays/PageCard';

const getData = async (id: string) => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	let liked;
	let saved;

	if (user?.id) {
		liked = await prisma.likes.findFirst({
			where: {
				userId: user.id,
				postId: id,
			},
		});

		saved = await prisma.saved.findFirst({
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
		data['saved'] = saved?.id || null;

		return data;
	} else {
		return null;
	}
};

interface Props {
	searchParams: { id: string };
}

const PostPage = async ({ searchParams: { id } }: Props) => {
	if (!id) {
		redirect('/');
	}
	const data = await getData(id);

	if (!data) {
		redirect('/');
	}

	return (
		<section className="page">
			<PageCard post={data} />
		</section>
	);
};

export default PostPage;
