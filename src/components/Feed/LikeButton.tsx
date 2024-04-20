import { useState } from 'react';
import { likePost, unlikePost } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';

interface Props {
	liked: string | null;
	likes: number;
	postId: string;
}

const LikeButton = ({ liked, likes, postId }: Props) => {
	const [like, setLike] = useState<string | null>(liked);
	const [likeCount, setLikeCount] = useState<number>(likes);

	const handleLike = async () => {
		const supabase = createClient();

		const { error } = await supabase.auth.getUser();

		if (error) {
			return toast.error('Must be logged in to like posts');
		}
		setLike(postId);
		setLikeCount(likeCount + 1);
		await likePost(postId);
	};

	const handleUnlike = async () => {
		const supabase = createClient();

		const { error } = await supabase.auth.getUser();

		if (error) {
			return toast.error('Must be logged in to like posts');
		}
		console.log(liked);
		setLike(null);
		setLikeCount(likeCount - 1);
		await unlikePost(postId, liked!);
	};

	return (
		<div className="flex items-center text-gray-400">
			{like ? (
				<button onClick={handleUnlike}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="gray"
						viewBox="0 0 24 24"
						strokeWidth={1}
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
						/>
					</svg>
				</button>
			) : (
				<button onClick={handleLike}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1}
						stroke="currentColor"
						className="w-4 h-4"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
						/>
					</svg>
				</button>
			)}
			<span>{likeCount}</span>
		</div>
	);
};

export default LikeButton;
