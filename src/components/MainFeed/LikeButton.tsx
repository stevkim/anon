import { useState } from 'react';
import { likePost, unlikePost } from '@/lib/fetch';
import toast from 'react-hot-toast';
import { createClient } from '@/utils/supabase/client';
import { Heart } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
	liked: string | null;
	likes: number;
	postId: string;
}

const LikeButton = ({ liked, likes, postId }: Props) => {
	const [like, setLike] = useState<string | null>(liked);
	const [likeCount, setLikeCount] = useState<number>(likes);

	const handleLike = async (type: string) => {
		const supabase = createClient();

		const { error } = await supabase.auth.getUser();

		if (error) {
			return toast.error('Must be logged in to like posts');
		}

		if (type === 'like') {
			setLike(postId);
			setLikeCount(likeCount + 1);
			await likePost(postId);
		} else {
			setLike(null);
			setLikeCount(likeCount - 1);
			await unlikePost(postId, liked!);
		}
	};

	return (
		<div className="flex items-center text-gray-400">
			{like ? (
				<button onClick={() => handleLike('unlike')}>
					<Heart
						size="16"
						fill="currentColor"
					/>
				</button>
			) : (
				<button onClick={() => handleLike('like')}>
					<Heart size="16" />
				</button>
			)}
			<span className="ml-1">{likeCount}</span>
		</div>
	);
};

export default LikeButton;
