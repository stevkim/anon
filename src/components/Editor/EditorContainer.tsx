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
import defaultValue from './defaultValue';
import validateContent from '@/lib/validateContent';

const EditorContainer = () => {
	const [content, setContent] = useLocalStorage('content', defaultValue);
	const [loading, setLoading] = useState(false);
	const queryClient = useQueryClient();
	const { toast } = useToast();
	const { push } = useRouter();

	const submit = async () => {
		console.log(content);
		if (!validateContent(content)) {
			return toast({
				title: 'Error Posting',
				description:
					'Please make sure your writing is in your own words and is longer than 2 lines.',
				variant: 'destructive',
			});
		}
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

		localStorage.setItem('content', JSON.stringify(defaultValue));
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
