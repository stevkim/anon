'use client';
import { useState } from 'react';
import Editor from './Editor';
import { createPost } from '@/lib/postFetch';
import { Button } from '../ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Loader2 } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

const defaultContent = {
	type: 'doc',
	content: [
		{
			type: 'heading',
			attrs: {
				level: 1,
			},
			content: [
				{
					type: 'text',
					text: 'Header!',
				},
			],
		},
		{
			type: 'paragraph',
			content: [
				{
					type: 'text',
					text: 'Current message',
				},
			],
		},
		{
			type: 'paragraph',
		},
	],
};

const EditorContainer = () => {
	const [content, setContent] = useLocalStorage('content', defaultContent);
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { push } = useRouter();

	const submit = async () => {
		setLoading(true);
		const response = await createPost({ content: content });

		setLoading(false);
		if (!response.ok) {
			return toast({
				title: 'Internal server Error',
				description: 'There was a problem creating your post.',
				variant: 'destructive',
			});
		}

		localStorage.removeItem('content');
		toast({
			title: 'Post Created',
			description: 'Redirecting you to the main page',
		});
		queryClient.invalidateQueries({ queryKey: ['userPosts'] });
		push('/');
	};

	return (
		<>
			<Editor
				initialContent={content}
				onChange={setContent}
			/>
			<div className="mt-4 float-right">
				{loading ? (
					<Button disabled>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Posting
					</Button>
				) : (
					<Button onClick={submit}>Submit</Button>
				)}
			</div>
		</>
	);
};

export default EditorContainer;
