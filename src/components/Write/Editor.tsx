'use client';
import dynamic from 'next/dynamic';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createPost } from '@/lib/fetch';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const options = [
	['bold', 'italic', 'underline', 'strike'],
	['blockquote', 'code-block'],
	[{ list: 'ordered' }, { list: 'bullet' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ size: ['small', false, 'large', 'huge'] }],
];

const Editor = () => {
	const [content, setContent] = useState('');
	const { push } = useRouter();

	const submit = async () => {
		const response = await createPost({ content: content });

		if (!response.ok) {
			toast.error('Internal server error');
		}

		toast.success('Post Created');
		push('/');
	};

	return (
		<>
			<ReactQuill
				modules={{ toolbar: options }}
				onChange={setContent}
			/>
			<button
				type="button"
				onClick={submit}
			>
				Submit
			</button>
		</>
	);
};

export default Editor;
