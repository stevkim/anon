'use client';
import { useState } from 'react';
import Editor from './Editor';
import { createPost } from '@/lib/fetch';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useLocalStorage from '@/hooks/useLocalStorage';
import { Loader2 } from 'lucide-react';

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
	const { push } = useRouter();

	const submit = async () => {
		setLoading(true);
		const response = await createPost({ content: content });

		setLoading(false);
		if (!response.ok) {
			return toast.error('Internal server Error');
		}

		localStorage.removeItem('content');
		toast.success('Post Created');
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
