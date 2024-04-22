'use client';
import { useState } from 'react';
import type { JSONContent } from 'novel';
import Editor from './Editor';
import { createPost } from '@/lib/fetch';
import { Button } from '../ui/button';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const EditorContainer = () => {
	const [content, setContent] = useState<JSONContent>({
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
	});
	const { push } = useRouter();

	const submit = async () => {
		const response = await createPost({ content: content });

		if (!response.ok) {
			toast.error('Internal server Error');
		}

		toast.success('Post Created');
		push('/');
	};

	return (
		<section>
			<Editor
				initialContent={content}
				onChange={setContent}
			/>
			<Button onClick={submit}>Submit</Button>
		</section>
	);
};

export default EditorContainer;
