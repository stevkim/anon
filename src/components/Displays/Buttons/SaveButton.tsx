import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useToast } from '../../ui/use-toast';
import { savePost, unsavePost } from '@/lib/userFetch';
import { Bookmark, BookmarkX } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
	postId: string;
	saved: string;
}

const SaveButton = ({ postId, saved }: Props) => {
	const [save, setSave] = useState<string | null>(saved);
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const { toast } = useToast();

	const handleSave = async (type: string) => {
		const supabase = createClient();

		const { error } = await supabase.auth.getUser();

		if (error) {
			return toast({ description: 'Must be logged in to save posts' });
		}

		setLoading(true);
		if (type === 'save') {
			await savePost(postId).then((res) => {
				setSave(res.data.id);
			});
			toast({ title: 'Added to your list' });
		} else {
			setSave(null);
			await unsavePost(postId, save!);
			toast({ title: 'Removed from your list' });
		}
		setLoading(false);
	};

	return (
		<>
			{save ? (
				<button
					disabled={loading}
					onClick={() => handleSave('unsave')}
					className="flex flex-row items-center"
				>
					<BookmarkX size={16} />
					<span className="whitespace-nowrap ml-2">Remove from List</span>
				</button>
			) : (
				<button
					disabled={loading}
					onClick={() => handleSave('save')}
					className="flex flex-row items-center"
				>
					<Bookmark size={16} />
					<span className="whitespace-nowrap ml-2">Save to List</span>
				</button>
			)}
		</>
	);
};

export default SaveButton;
