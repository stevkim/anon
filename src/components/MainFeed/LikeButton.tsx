import { useState } from 'react';
import { likePost, unlikePost } from '@/lib/fetch';
import { createClient } from '@/utils/supabase/client';
import { Heart } from 'lucide-react';
import { useToast } from '../ui/use-toast';

interface Props {
	liked: string | null;
	likes: number;
	postId: string;
}

const LikeButton = ({ liked, likes, postId }: Props) => {
	const [like, setLike] = useState<string | null>(liked);
	const [likeCount, setLikeCount] = useState<number>(likes);
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const handleLike = async (type: string) => {
		const supabase = createClient();

		const { error } = await supabase.auth.getUser();

		if (error) {
			return toast({ description: 'Must be logged in to like posts' });
		}

		setLoading(true);
		if (type === 'like') {
			setLike('loading...');
			setLikeCount(likeCount + 1);

			await likePost(postId).then((res) => {
				setLike(res.data.id);
			});
		} else {
			setLike(null);
			setLikeCount(likeCount - 1);
			await unlikePost(postId, like!);
		}
		setLoading(false);
	};

	return (
		<div className="flex items-center">
			{like ? (
				<button
					type="button"
					disabled={loading}
					onClick={() => handleLike('unlike')}
				>
					<Heart
						size="16"
						fill="currentColor"
					/>
				</button>
			) : (
				<button
					type="button"
					disabled={loading}
					onClick={() => handleLike('like')}
				>
					<Heart size="16" />
				</button>
			)}
			<span className="ml-1">{likeCount}</span>
		</div>
	);
};

export default LikeButton;
